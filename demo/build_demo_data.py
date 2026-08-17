"""
Assemble the demo dataset: VarLib concepts, Monarch KG context, corpus counts.

Three real sources, no mocking:

  BDC-VarLib      which harmonized concepts exist, their ontology mappings, and
                  which studies contribute each one
  Monarch KG      what those ontology terms mean — labels, definitions,
                  synonyms, and the parent/child hierarchy used for expansion
  synthetic corpus  participants coded with those concepts

The KG lookups are baked in here rather than left to the browser so the demo
does not depend on the network at showtime. The UI still queries Monarch live
for free-text search; this is the floor it falls back to.

    python demo/build_demo_data.py
"""

import argparse
import json
import random
import time
import urllib.parse
import urllib.request
from pathlib import Path

import yaml

MONARCH = "https://api-v3.monarchinitiative.org/v3/api"

# Only these vocabularies resolve in Monarch. OMOP, ATC and RxCUI appear in
# VarLib's mappings but are not in the KG, so they are carried through as
# identifiers without enrichment.
RESOLVABLE = ("MONDO:", "HP:", "OBA:")


def fetch(path, **params):
    """One Monarch call, returning None rather than raising on failure."""
    url = f"{MONARCH}/{path}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url, timeout=20) as response:  # noqa: S310
            return json.load(response)
    except Exception as exc:  # noqa: BLE001 - a missing term should not stop the build
        print(f"    ! {path}: {exc}")
        return None


def annotation(slot, tag):
    """VarLib keeps study and accession lists in annotations, as delimited strings."""
    ann = (slot.get("annotations") or {}).get(tag)
    value = ann.get("value") if isinstance(ann, dict) else ann
    return [v.strip() for v in str(value).split(",") if v.strip()] if value else []


def load_varlib(path):
    """Flatten VarLib into concepts, each with mappings and contributing studies."""
    schema = yaml.safe_load(open(path))
    slots = schema.get("slots", {})

    category_of = {}
    for cls_name, cls in schema.get("classes", {}).items():
        for slot_name in cls.get("slots") or []:
            category_of[slot_name] = cls_name

    concepts = []
    for name, slot in slots.items():
        concepts.append(
            {
                "name": name,
                "title": slot.get("title") or name,
                "description": slot.get("description") or "",
                "category": category_of.get(name, "Uncategorized"),
                "bdchm_class": (
                    (slot.get("annotations") or {}).get("bdchm_class", {}) or {}
                ).get("value"),
                "mappings": slot.get("exact_mappings") or [],
                "studies": annotation(slot, "source_study"),
                "variable_count": len(annotation(slot, "variable_accession")),
            }
        )
    return sorted(concepts, key=lambda c: (c["category"], c["name"]))


def enrich(curies):
    """Look each ontology term up in Monarch, with its immediate hierarchy."""
    terms = {}
    resolvable = sorted(c for c in curies if c.startswith(RESOLVABLE))
    print(f"  resolving {len(resolvable)} terms against Monarch")

    for i, curie in enumerate(resolvable, 1):
        entity = fetch(f"entity/{urllib.parse.quote(curie)}")
        if not entity:
            continue
        hierarchy = entity.get("node_hierarchy") or {}
        terms[curie] = {
            "id": curie,
            "label": entity.get("name"),
            "description": entity.get("description"),
            "synonyms": (entity.get("exact_synonym") or [])[:6],
            "parents": [n["id"] for n in (hierarchy.get("super_classes") or [])],
            "children": [n["id"] for n in (hierarchy.get("sub_classes") or [])],
            "child_labels": {
                n["id"]: n.get("name") for n in (hierarchy.get("sub_classes") or [])
            },
        }
        if i % 20 == 0:
            print(f"    {i}/{len(resolvable)}")
        time.sleep(0.05)
    return terms


def load_corpus(output_dir):
    """Count corpus participants per condition concept, per study."""
    counts = {}
    for study, prefix in (("study_one", "SYNTH1"), ("study_two", "SYNTH2")):
        path = output_dir / study / "mapped-data" / f"{prefix}-Condition--data.jsonl"
        if not path.exists():
            print(f"  ! no corpus at {path}, skipping")
            continue
        label = "Example Study One" if study == "study_one" else "Example Study Two"
        with open(path) as fh:
            for line in fh:
                record = json.loads(line)
                if record.get("condition_status") != "PRESENT":
                    continue
                concept = record.get("condition_concept")
                counts.setdefault(concept, {}).setdefault(label, 0)
                counts[concept][label] += 1
    return counts


DEMOGRAPHY_LABELS = {
    "OMOP:8507": "Male",
    "OMOP:8532": "Female",
    "OMOP:8527": "White",
    "OMOP:8516": "Black or African American",
    "OMOP:8515": "Asian",
    "OMOP:8657": "American Indian or Alaska Native",
    "OMOP:38003615": "Middle Eastern or North African",
    "OMOP:8557": "Native Hawaiian or Pacific Islander",
    "OMOP:38003563": "Hispanic or Latino",
    "OMOP:38003564": "Not Hispanic or Latino",
}

# Measurements worth charting for a cohort, by observation_type.
MEASURES = {
    "OMOP:3038553": "BMI",
    "OMOP:4152194": "Systolic BP",
    "OMOP:3007070": "HDL",
}


def load_participants(output_dir):
    """Join demography, conditions and a few measures into one row per participant.

    This is what makes a cohort chartable: pick a concept, keep the participants
    who have it, and the demographic and clinical breakdowns follow.
    """
    people = {}

    for study, prefix in (("study_one", "SYNTH1"), ("study_two", "SYNTH2")):
        base = output_dir / study / "mapped-data"
        label = "Example Study One" if study == "study_one" else "Example Study Two"
        if not (base / f"{prefix}-Demography--data.jsonl").exists():
            print(f"  ! no corpus for {study}, skipping")
            continue

        def read(kind):
            path = base / f"{prefix}-{kind}--data.jsonl"
            with open(path) as fh:
                for line in fh:
                    yield json.loads(line)

        for row in read("Demography"):
            pid = row["associated_participant"]
            races = row.get("race") or []
            people[pid] = {
                "id": pid[:8],
                "study": label,
                "sex": DEMOGRAPHY_LABELS.get(row.get("sex"), "Unknown"),
                "race": DEMOGRAPHY_LABELS.get(
                    races[0] if races else None, "Unknown"
                ),
                "ethnicity": DEMOGRAPHY_LABELS.get(row.get("ethnicity"), "Unknown"),
                "concepts": [],
                "measures": {},
            }

        for row in read("Condition"):
            pid = row.get("associated_participant")
            if row.get("condition_status") == "PRESENT" and pid in people:
                people[pid]["concepts"].append(row["condition_concept"])

        # One value per measure per participant is enough to chart a distribution.
        for row in read("MeasurementObservation"):
            pid = row.get("associated_participant")
            measure = MEASURES.get(row.get("observation_type"))
            if not measure or pid not in people:
                continue
            value = (row.get("value_quantity") or {}).get("value_decimal")
            if value is not None and measure not in people[pid]["measures"]:
                people[pid]["measures"][measure] = round(value, 1)

    for person in people.values():
        person["concepts"] = sorted(set(person["concepts"]))
    return list(people.values())


def fill_gaps(concepts, terms, corpus):
    """Fill what the real sources cannot supply, deterministically.

    Two gaps. Monarch carries MONDO, HP and OBA but not OMOP, ATC or RxCUI, so
    roughly half the mappings have no label — those borrow the title of the
    VarLib concept that maps to them, which is real text rather than invention.

    The larger gap is participants: the synthetic corpus covers ten concepts and
    VarLib describes 182, so almost every concept would read as zero. Counts are
    synthesized for the rest, scaled by how many studies contribute the concept.
    They are marked `illustrative` so the UI can say so — they describe nothing
    real and should never be quoted.
    """
    rng = random.Random(20260816)

    labelled_by = {}
    for concept in concepts:
        for curie in concept["mappings"]:
            if curie in terms or curie in labelled_by:
                continue
            labelled_by[curie] = {
                "id": curie,
                "label": concept["title"],
                "description": concept["description"],
                "synonyms": [],
                "parents": [],
                "children": [],
                "child_labels": {},
                "label_source": "varlib",
            }
    for term in terms.values():
        term["label_source"] = "monarch"
    terms.update(labelled_by)

    illustrative = set()
    for concept in concepts:
        present = [c for c in concept["mappings"] if c in corpus]
        if present:
            continue
        if not concept["studies"]:
            continue
        # Concepts collected by more studies plausibly reach more participants.
        counts = {}
        for study in concept["studies"]:
            counts[study] = rng.randint(40, 460)
        key = concept["mappings"][0] if concept["mappings"] else concept["name"]
        corpus[key] = counts
        illustrative.add(key)

    return sorted(illustrative)


def main():
    """Build demo/data.json."""
    here = Path(__file__).parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--varlib",
        type=Path,
        default=Path("/home/corey/Code/study-palette/.tmp/BDC-VarLib/docs/schema/bdc_varlib.yaml"),
    )
    parser.add_argument(
        "--corpus",
        type=Path,
        default=Path(
            "/home/corey/Code/study-palette/.wt/synthetic-corpus/synthetic/output"
        ),
    )
    parser.add_argument("--out", type=Path, default=here / "data.json")
    args = parser.parse_args()

    print("VarLib:")
    concepts = load_varlib(args.varlib)
    print(f"  {len(concepts)} concepts across "
          f"{len({c['category'] for c in concepts})} categories")

    curies = {m for c in concepts for m in c["mappings"]}
    print("Monarch:")
    terms = enrich(curies)
    print(f"  {len(terms)} resolved of {len(curies)} mapped terms")

    print("Corpus:")
    corpus = load_corpus(args.corpus)
    print(f"  {len(corpus)} concepts present in participant data")
    participants = load_participants(args.corpus)
    print(f"  {len(participants)} participants with demographics and measures")

    illustrative = fill_gaps(concepts, terms, corpus)
    print(f"  {len(illustrative)} concepts given illustrative counts")
    print(f"  {sum(1 for t in terms.values() if t['label_source'] == 'varlib')}"
          f" terms labelled from VarLib (not in the KG)")

    payload = {
        "concepts": concepts,
        "terms": terms,
        "corpus": corpus,
        "participants": participants,
        "illustrative": illustrative,
        "studies": sorted({s for c in concepts for s in c["studies"]}),
    }
    args.out.write_text(json.dumps(payload, separators=(",", ":")))
    print(f"\n{args.out} — {args.out.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
