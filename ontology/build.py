"""
Build the harmonized term list: CURIE, ontology label, and where the label came from.

This is the list the wireframes are built against. Every label is fetched from
the service that owns the vocabulary — nothing here is written by hand, and a
term that does not resolve is reported as unresolved rather than filled in.

    python ontology/build.py --varlib path/to/BDC-VarLib/docs/schema/bdc_varlib.yaml

Resolved terms are cached in ontology/.cache.json so a rebuild does not
re-request the whole list. Delete it to force a refresh.
"""

import argparse
import json
import re
from pathlib import Path

import yaml

from focus import FOCUS_AREAS, area_of
from labels import choose
from resolve import resolve_all

HERE = Path(__file__).parent

CURIE = re.compile(r"\b(MONDO|HP|OBA|OMOP|ATC|RxCUI|NDFRT|MMO|NCBITaxon):[A-Za-z0-9._-]+")


def load_varlib(path):
    """Flatten the VarLib schema into concepts carrying their ontology mappings."""
    with open(path) as fh:
        schema = yaml.safe_load(fh)

    category_of = {}
    for cls_name, cls in (schema.get("classes") or {}).items():
        for slot_name in cls.get("slots") or []:
            category_of[slot_name] = cls_name

    concepts = []
    for name, slot in (schema.get("slots") or {}).items():
        concepts.append({
            "name": name,
            "title": slot.get("title") or name,
            "description": slot.get("description") or "",
            "category": category_of.get(name, "Uncategorized"),
            "mappings": slot.get("exact_mappings") or [],
        })
    return concepts


def synthetic_curies(root):
    """
    Every CURIE the synthetic corpus codes with.

    The corpus is generated from these, so they have to resolve for the demo
    data to be describable at all.
    """
    if not root.exists():
        return set()
    found = set()
    for path in sorted(root.rglob("*")):
        if path.suffix in (".py", ".yaml", ".yml") and path.is_file():
            found.update(m.group(0) for m in CURIE.finditer(path.read_text()))
    return found


def markdown(rows, unresolved_terms):
    """The human-readable handoff, grouped by focus area."""
    out = ["# Harmonized terms — cardiac, lung, hypertension, diabetes", ""]
    out.append(
        "CURIEs come from the BDC harmonized-variable trans-specs by way of "
        "BDC-VarLib. Labels are fetched from the vocabulary that owns each "
        "term (OLS for OBO ontologies, the OHDSI WebAPI for OMOP, RxClass for "
        "ATC). Nothing in the Label column was written by hand."
    )
    out.append("")
    out.append(
        "**Use the Label column for display.** Where a row has no label, the "
        "CURIE did not resolve and the wireframe should show the gap rather "
        "than a placeholder."
    )
    out.append("")

    for area in FOCUS_AREAS:
        in_area = [r for r in rows if r["area"] == area]
        if not in_area:
            continue
        resolved = [r for r in in_area if r["label"]]
        out.append(f"## {area}")
        out.append("")
        out.append(f"{len(resolved)} of {len(in_area)} resolved.")
        out.append("")
        out.append("| Variable | CURIE | Label | Source | Matched on |")
        out.append("|---|---|---|---|---|")
        for row in sorted(in_area, key=lambda r: r["name"]):
            label = row["label"] or "_unresolved_"
            curie = row["curie"] or ", ".join(row["mappings"]) or "_none_"
            out.append(
                f"| `{row['name']}` | `{curie}` | {label} "
                f"| {row['label_source'] or '—'} | {row.get('matched_on') or '—'} |"
            )
        out.append("")

    contested = [r for r in rows if r["competing"]]
    if contested:
        out.append("## Mappings needing review")
        out.append("")
        out.append(
            "These concepts resolve to more than one term in the same "
            "vocabulary. The chosen label is a best guess and the alternative "
            "is shown beside it; a curator should decide which is correct."
        )
        out.append("")
        out.append("| Variable | Chosen | Also maps to |")
        out.append("|---|---|---|")
        for row in sorted(contested, key=lambda r: r["name"]):
            others = "; ".join(
                f"`{c['id']}` {c['label']}" for c in row["competing"]
            )
            out.append(
                f"| `{row['name']}` | `{row['curie']}` {row['ontology_label']} | {others} |"
            )
        out.append("")

    if unresolved_terms:
        out.append("## Unresolved CURIEs")
        out.append("")
        out.append(
            "No public service resolves these. ICD10CM entries are chapter "
            "ranges rather than concepts, so they are expected here."
        )
        out.append("")
        for curie in sorted(unresolved_terms):
            out.append(f"- `{curie}`")
        out.append("")

    return "\n".join(out)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--varlib", type=Path, required=True,
        help="BDC-VarLib LinkML schema, docs/schema/bdc_varlib.yaml in that repo",
    )
    parser.add_argument(
        "--synthetic", type=Path, default=HERE.parent / "synthetic",
        help="synthetic corpus source tree, scanned for the CURIEs it codes with",
    )
    parser.add_argument("--cache", type=Path, default=HERE / ".cache.json")
    parser.add_argument("--json-out", type=Path, default=HERE / "terms.json")
    parser.add_argument("--md-out", type=Path, default=HERE / "TERMS.md")
    parser.add_argument(
        "--all", action="store_true",
        help="resolve every VarLib concept, not just the focus areas",
    )
    args = parser.parse_args()

    concepts = load_varlib(args.varlib)
    print(f"VarLib: {len(concepts)} concepts")

    wanted = [c for c in concepts if args.all or area_of(c["name"])]
    print(f"  {len(wanted)} in scope")

    corpus_curies = synthetic_curies(args.synthetic)
    print(f"Synthetic corpus: {len(corpus_curies)} CURIEs coded")

    curies = {m for c in wanted for m in c["mappings"]} | corpus_curies
    print(f"Resolving {len(curies)} distinct CURIEs")

    cache = json.loads(args.cache.read_text()) if args.cache.exists() else {}
    terms, unresolved = resolve_all(curies, cache=cache, progress=print)
    args.cache.write_text(json.dumps(cache, indent=1, sort_keys=True))
    print(f"  {len(terms)} resolved, {len(unresolved)} unresolved")

    rows = []
    for concept in wanted:
        picked = choose(concept, terms)
        rows.append({
            "name": concept["name"],
            "area": area_of(concept["name"]),
            "category": concept["category"],
            "description": concept["description"],
            "mappings": concept["mappings"],
            **picked,
        })

    resolved_rows = [r for r in rows if r["label"]]
    print(f"  {len(resolved_rows)}/{len(rows)} concepts labelled")

    args.json_out.write_text(json.dumps(
        {"concepts": rows, "terms": terms, "unresolved": sorted(unresolved)},
        indent=1,
    ))
    args.md_out.write_text(markdown(rows, unresolved))
    print(f"\n{args.json_out}\n{args.md_out}")


if __name__ == "__main__":
    main()
