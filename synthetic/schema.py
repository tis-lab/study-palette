"""
Build Parquet from harmonized JSONL, with column types derived from BDCHM.

Why not let DuckDB infer: inference reads the data, so a column that happens to
be all-null in one run types differently in the next, and consumers see the
schema shift under them. Deriving from BDCHM makes the schema a property of the
model rather than of the sample.

Why BDCHM alone is not enough: whether a slot arrives as a nested object or as a
reference is decided by the *transformation spec*, not the model. BDCHM gives
`associated_participant` a range of `Participant`, but the spec materialises it
as a uuid5 string, while `value_quantity` is nested inline. So this reads both —
BDCHM for leaf types, the specs for which slots nest.

    python schema.py --study study_one
"""

import argparse
import json
from pathlib import Path

import duckdb
import yaml

# LinkML builtin ranges to DuckDB types. Identifiers stay VARCHAR rather than
# UUID: they are uuid5 today, but nothing in the model requires that, and a
# stricter type would break the day one is not.
TYPE_MAP = {
    "string": "VARCHAR",
    "uriorcurie": "VARCHAR",
    "uri": "VARCHAR",
    "curie": "VARCHAR",
    "ncname": "VARCHAR",
    "integer": "BIGINT",
    "decimal": "DOUBLE",
    "double": "DOUBLE",
    "float": "DOUBLE",
    "boolean": "BOOLEAN",
    "date": "DATE",
    "datetime": "TIMESTAMP",
    "time": "TIME",
}

unmapped = set()
mismatches = []


class Model:
    """BDCHM, indexed for slot lookup with inheritance."""

    def __init__(self, path):
        """Load and index the model."""
        schema = yaml.safe_load(open(path))
        self.classes = schema.get("classes", {})
        self.slots = schema.get("slots", {})
        self.enums = set(schema.get("enums", {}))
        self.types = set(schema.get("types", {}))

    def slot(self, class_name, slot_name):
        """
        Find a slot on a class or any ancestor.

        BDCHM defines slots three ways and a class can use all of them: inline
        under `attributes`, by reference under `slots` to a top-level definition,
        and refined per class under `slot_usage`. A definition is assembled from
        whichever apply, with slot_usage taking precedence — that is where
        cardinality and range are often narrowed for a particular class.
        """
        merged = {}
        seen = set()
        current = class_name
        chain = []
        while current and current in self.classes and current not in seen:
            seen.add(current)
            chain.append(self.classes[current])
            current = self.classes[current].get("is_a")

        # Walk from the most distant ancestor down so subclasses win.
        for cls in reversed(chain):
            if slot_name in (cls.get("slots") or []):
                merged.update(self.slots.get(slot_name) or {})
            attrs = cls.get("attributes") or {}
            if slot_name in attrs:
                merged.update(attrs[slot_name] or {})
            usage = (cls.get("slot_usage") or {}).get(slot_name)
            if usage:
                merged.update(usage)

        # A slot referenced only through slot_usage still inherits the
        # top-level definition, which is where multivalued usually lives.
        if merged and slot_name in self.slots:
            base = dict(self.slots[slot_name])
            base.update(merged)
            merged = base

        return merged or None

    def duckdb_type(self, class_name, slot_name, nested=None):
        """Resolve the DuckDB type for one slot. `nested` maps slot -> nested spec."""
        slot = self.slot(class_name, slot_name)
        rng = (slot or {}).get("range")
        multivalued = bool((slot or {}).get("multivalued"))

        if nested:
            inner = self.struct_type(nested["class"], nested["slots"])
            return f"{inner}[]" if multivalued else inner

        if rng in TYPE_MAP:
            typ = TYPE_MAP[rng]
        elif rng in self.enums or rng in self.classes:
            # Enums serialise as their permissible value; class-ranged slots that
            # are not nested by the spec arrive as identifier strings.
            typ = "VARCHAR"
        else:
            if rng:
                unmapped.add(f"{class_name}.{slot_name} ({rng})")
            typ = "VARCHAR"

        return f"{typ}[]" if multivalued else typ

    def struct_type(self, class_name, slots):
        """Compose a STRUCT for a nested object, recursing where it nests further."""
        fields = []
        for name, child in slots.items():
            fields.append(f'"{name}" {self.duckdb_type(class_name, name, child)}')
        return "STRUCT(" + ", ".join(fields) + ")"


def spec_shape(spec_dir):
    """
    Read the transform specs to learn which slots nest, and into what.

    Returns {target_class: {slot: None | {class, slots, multivalued}}}.
    """

    def walk(class_derivations):
        shape = {}
        for cls, cd in (class_derivations or {}).items():
            slots = {}
            for name, sd in (cd.get("slot_derivations") or {}).items():
                nested = sd.get("class_derivations")
                if nested:
                    inner_cls, inner_cd = next(iter(nested[0].items()))
                    slots[name] = {
                        "class": inner_cls,
                        "slots": walk({inner_cls: inner_cd})[inner_cls],
                    }
                else:
                    slots[name] = None
            shape[cls] = slots
        return shape

    merged = {}
    for path in sorted(Path(spec_dir).glob("*.yaml")):
        for doc in yaml.safe_load(open(path)) or []:
            for cls, slots in walk(doc.get("class_derivations")).items():
                merged.setdefault(cls, {}).update(slots)
    return merged


def reconcile(columns, jsonl_path, class_name):
    """
    Compare the model-derived cardinality against what the data actually holds.

    Where they disagree the data wins, because the goal is a loadable artifact —
    but every disagreement is reported. These are real findings: BDCHM declares
    `identity` multivalued while the transformation specs, RTI's included, emit a
    scalar. A schema derived strictly from the model would not load real
    harmonized data either.
    """
    with open(jsonl_path) as fh:
        first = json.loads(fh.readline() or "{}")

    for name, typ in list(columns.items()):
        if name not in first or first[name] is None:
            continue
        is_list = isinstance(first[name], list)
        declared_list = typ.endswith("[]")
        if is_list and not declared_list:
            columns[name] = f"{typ}[]"
            mismatches.append(f"{class_name}.{name}: model says single, data is a list")
        elif declared_list and not is_list:
            columns[name] = typ[:-2]
            mismatches.append(f"{class_name}.{name}: model says multivalued, data is scalar")
    return columns


def build(model, shape, jsonl_path, parquet_path, class_name):
    """Convert one class's JSONL to Parquet under an explicit schema."""
    slots = shape[class_name]
    columns = {n: model.duckdb_type(class_name, n, child) for n, child in slots.items()}
    columns = reconcile(columns, jsonl_path, class_name)

    # A struct literal, not JSON: DuckDB wants {'col': 'TYPE'}, and the double
    # quotes around nested field names are literal inside the single-quoted
    # type string.
    literal = ", ".join(f"'{name}': '{typ}'" for name, typ in columns.items())

    con = duckdb.connect()
    # noqa justification: every interpolated value originates in BDCHM, the
    # specs, or our own paths — none of it is user input. DuckDB's columns
    # argument takes a struct literal, which cannot be parameterised.
    sql = (
        f"COPY (SELECT * FROM read_json('{jsonl_path}', columns := {{{literal}}})) "  # noqa: S608
        f"TO '{parquet_path}' (FORMAT PARQUET)"
    )
    con.execute(sql)
    return columns


def main():
    """Build Parquet for every class the study produced."""
    here = Path(__file__).parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--study", default="study_one")
    parser.add_argument("--output", type=Path, default=here / "output")
    parser.add_argument("--schema", type=Path, default=here / "bdchm.yaml")
    args = parser.parse_args()

    slug = "example_" + args.study
    model = Model(args.schema)
    shape = spec_shape(here / "specs" / slug)

    mapped = args.output / args.study / "mapped-data"
    dest = args.output / args.study / "parquet"
    dest.mkdir(parents=True, exist_ok=True)

    for jsonl in sorted(mapped.glob("*.jsonl")):
        class_name = jsonl.stem.split("-")[1]
        if class_name not in shape:
            print(f"  skip {class_name}: not in specs")
            continue
        target = dest / f"{class_name}.parquet"
        build(model, shape, jsonl, target, class_name)
        print(
            f"{class_name:26} {jsonl.stat().st_size / 1024:8.1f} KB jsonl"
            f" -> {target.stat().st_size / 1024:7.1f} KB parquet"
        )

    if unmapped:
        print("\nslots with no mapped range, defaulted to VARCHAR:")
        for u in sorted(unmapped):
            print(f"  {u}")

    if mismatches:
        print("\nmodel and data disagree on cardinality (data used):")
        for m in mismatches:
            print(f"  {m}")


if __name__ == "__main__":
    main()
