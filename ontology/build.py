"""
Build the harmonized term list.

Every concept CURIE, with the label its own vocabulary publishes.

The unit is the CURIE. A CURIE is what the trans-specs emit into BDCHM's
concept slots, what lands in harmonized data, and what a query filters on, so
it is what the interface shows and what the wireframes are built against.

Variable names are not terms. `hist_cvd` is a spec filename covering ten
different conditions; it appears nowhere in BDCHM and nowhere in the data.
It is carried here as provenance — which variable and study a term is reached
through — and is used at build time to scope which specs are read. Nothing
downstream should key on it or display it.

    python -m ontology.build --specs path/to/NHLBI-BDC-DMC-HV/priority_variables_transform

Resolved terms are cached in ontology/.cache.json; delete it to refresh.
"""

import argparse
import json
from pathlib import Path

from ontology.extract import from_specs, scan_tree
from ontology.focus import FOCUS_AREAS, area_of
from ontology.resolve import resolve_all

HERE = Path(__file__).parent

# OMOP mixes units and metadata in with clinical concepts. A unit appearing in
# a concept slot is a defect in the source mapping, not something to resolve
# around, so these are surfaced rather than filtered out.
NON_CLINICAL_DOMAINS = {"Unit", "Metadata", "Type Concept"}

# Order the BDCHM classes are presented in.
CLASS_ORDER = ["Condition", "MeasurementObservation", "Procedure", "DrugExposure"]


def sort_key(record):
    """Order rows by label, with anything unresolved last."""
    return (record["label"] or "~").lower()


def via(record, limit=3):
    """Format the variables a term is reached through, for the Via column."""
    names = ", ".join(f"`{v}`" for v in record["variables"][:limit])
    if len(record["variables"]) > limit:
        names += f" +{len(record['variables']) - limit}"
    if names:
        return names
    return "synthetic corpus" if record.get("from_corpus") else "—"


def markdown(records, unresolved, suspect):
    """Render the term list as the human-readable handoff."""
    out = ["# Harmonized concept terms", ""]
    out.append(
        "Every row is a CURIE emitted by the BDC harmonized-variable "
        "trans-specs, with the label published by the vocabulary that owns it. "
        "The sections below cover the concepts a record is about; value-set "
        "members that qualify a record are listed separately at the end. "
        "Labels are fetched, never written by hand: Monarch for MONDO/HP/OBA, "
        "OLS4 for other OBO ontologies, the OHDSI WebAPI for OMOP, RxNav "
        "RxClass for ATC and NDFRT, RxNav for RxCUI."
    )
    out.append("")
    out.append(
        "**The CURIE is the identity and the Label is what to display.** The "
        "`Via` column lists the harmonized variables a term is reached "
        "through; it is provenance only. Those names are spec filenames — they "
        "are not concepts, they do not appear in harmonized data, and nothing "
        "should key on them or show them to a user."
    )
    out.append("")

    concepts = [r for r in records if r["concept"]]
    by_class = {}
    for record in concepts:
        fallback = (
            "Synthetic corpus only" if record.get("from_corpus") else "Uncategorized"
        )
        for cls in record["bdchm_classes"] or [fallback]:
            by_class.setdefault(cls, []).append(record)

    ordered = [c for c in CLASS_ORDER if c in by_class]
    ordered += sorted(c for c in by_class if c not in CLASS_ORDER)

    for cls in ordered:
        rows = sorted(by_class[cls], key=sort_key)
        out.append(f"## {cls}")
        out.append("")
        out.append(f"{len(rows)} terms.")
        out.append("")
        out.append("| CURIE | Label | Vocabulary | Studies | Via |")
        out.append("|---|---|---|---|---|")
        for row in rows:
            label = row["label"] or "_unresolved_"
            out.append(
                f"| `{row['curie']}` | {label} | {row.get('vocabulary') or '—'} "
                f"| {len(row['studies'])} | {via(row)} |"
            )
        out.append("")

    # Terms in qualifier slots describe a record rather than name the thing it
    # is about, so they are kept out of the tables above. They still need
    # labels — race, sex and ethnicity are what drive the interface's filters —
    # and listing them only under their BDCHM class would blur the distinction,
    # so they are grouped by the slot they populate.
    qualifiers = [r for r in records if not r["concept"]]
    if qualifiers:
        by_slot = {}
        for record in qualifiers:
            for slot in record["slots"] or ["(none)"]:
                by_slot.setdefault(slot, []).append(record)

        out.append("## Value sets and qualifiers")
        out.append("")
        out.append(
            f"{len(qualifiers)} terms. These populate slots that qualify a "
            "record rather than name the concept it is about, so they are not "
            "browsable concepts — but they are real coded values and the "
            "interface needs their labels."
        )
        out.append("")
        for slot in sorted(by_slot):
            out.append(f"### `{slot}`")
            out.append("")
            out.append("| CURIE | Label | Vocabulary | Via |")
            out.append("|---|---|---|---|")
            for row in sorted(by_slot[slot], key=sort_key):
                label = row["label"] or "_unresolved_"
                out.append(
                    f"| `{row['curie']}` | {label} "
                    f"| {row.get('vocabulary') or '—'} | {via(row)} |"
                )
            out.append("")

    if suspect:
        out.append("## Mappings to report upstream")
        out.append("")
        out.append(
            "These CURIEs sit in a concept slot but do not name a clinical "
            "concept — a unit or a metadata code where a condition or "
            "measurement belongs. They come through the trans-specs, so the "
            "fix is upstream at RTI."
        )
        out.append("")
        out.append("| CURIE | Label | Domain | Slot | Via |")
        out.append("|---|---|---|---|---|")
        for row in sorted(suspect, key=sort_key):
            out.append(
                f"| `{row['curie']}` | {row['label']} | {row.get('domain')} "
                f"| {', '.join(row['slots'])} "
                f"| {', '.join(f'`{v}`' for v in row['variables'])} |"
            )
        out.append("")

    if unresolved:
        out.append("## Unresolved CURIEs")
        out.append("")
        out.append(
            "No public service resolves these. ICD10CM entries are chapter "
            "ranges rather than concepts, so they are expected here. The rest "
            "are OMOP IDs that do not exist in the vocabulary and want fixing "
            "upstream — the slot and variable are given so they can be traced."
        )
        out.append("")
        out.append("| CURIE | Slot | Via |")
        out.append("|---|---|---|")
        # Keyed by CURIE because a term with no label has nothing else to sort
        # on, and several of these appear in no table above.
        found = {r["curie"]: r for r in records}
        for curie in sorted(unresolved):
            record = found.get(curie)
            slots = ", ".join(f"`{s}`" for s in (record or {}).get("slots") or [])
            out.append(
                f"| `{curie}` | {slots or '—'} "
                f"| {via(record) if record else '—'} |"
            )
        out.append("")

    return "\n".join(out)


def main():
    """Extract, resolve and write terms.json and TERMS.md."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--specs", type=Path, required=True,
        help="priority_variables_transform/ in the NHLBI-BDC-DMC-HV repo",
    )
    parser.add_argument(
        "--synthetic", type=Path, default=HERE.parent / "synthetic",
        help="synthetic corpus source tree, scanned for concepts it codes with",
    )
    parser.add_argument("--cache", type=Path, default=HERE / ".cache.json")
    parser.add_argument("--json-out", type=Path, default=HERE / "terms.json")
    parser.add_argument("--md-out", type=Path, default=HERE / "TERMS.md")
    parser.add_argument(
        "--all", action="store_true",
        help="read every spec, not just the proof-of-concept focus areas",
    )
    args = parser.parse_args()

    scope = None if args.all else set()
    if not args.all:
        for names in FOCUS_AREAS.values():
            scope.update(names)

    extracted = from_specs(args.specs, variables=scope)
    concepts = {c: r for c, r in extracted.items() if r["concept"]}
    print(f"Trans-specs: {len(extracted)} CURIEs, {len(concepts)} in concept slots")

    # The corpus codes participants with subtypes the trans-specs never emit,
    # and those are the proof-of-concept conditions, so they belong in the list
    # whether or not RTI harmonizes to them yet.
    corpus = scan_tree(args.synthetic)
    added = sorted(corpus - set(extracted))
    for curie in added:
        extracted[curie] = {
            "curie": curie,
            "bdchm_classes": [],
            "slots": [],
            "studies": [],
            "variables": [],
            "occurrences": 0,
            "concept": True,
            "from_corpus": True,
        }
    for curie in corpus & set(extracted):
        extracted[curie]["from_corpus"] = True
    print(f"Synthetic corpus: {len(corpus)} CURIEs, {len(added)} not in any spec")

    cache = json.loads(args.cache.read_text()) if args.cache.exists() else {}
    terms, unresolved = resolve_all(extracted.keys(), cache=cache, progress=print)
    args.cache.write_text(json.dumps(cache, indent=1, sort_keys=True))
    print(f"  {len(terms)} resolved, {len(unresolved)} unresolved")

    # Sorted by CURIE rather than left in insertion order: terms.json is a
    # committed artifact, and insertion order shifts whenever the corpus
    # contributes a different set, which would churn the diff for no reason.
    records = []
    for curie in sorted(extracted):
        record = extracted[curie]
        term = terms.get(curie) or {}
        records.append({
            **record,
            "label": term.get("label"),
            "definition": term.get("description"),
            "synonyms": term.get("synonyms") or [],
            "label_source": term.get("source"),
            "vocabulary": term.get("vocabulary"),
            "domain": term.get("domain"),
            "areas": sorted({
                a for a in (area_of(v) for v in record["variables"]) if a
            }),
        })

    suspect = [
        r for r in records
        if r["concept"] and r.get("domain") in NON_CLINICAL_DOMAINS
    ]
    in_concept_slots = [r for r in records if r["concept"]]
    labelled = sum(1 for r in in_concept_slots if r["label"])
    print(f"  {labelled}/{len(in_concept_slots)} concept terms labelled")
    if suspect:
        print(f"  {len(suspect)} non-clinical CURIEs in concept slots")

    args.json_out.write_text(json.dumps(
        {"terms": records, "unresolved": sorted(unresolved)}, indent=1
    ))
    args.md_out.write_text(markdown(records, unresolved, suspect))
    print(f"\n{args.json_out}\n{args.md_out}")


if __name__ == "__main__":
    main()
