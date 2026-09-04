"""
Extract a small, feature-demonstrating sample of harmonized output.

The corpus itself is a build product and stays out of git, but a reviewer — or
a team deciding whether this is the reference data they want — should be able to
see what the pipeline produces without running it. This picks records that
between them exercise every structural feature the corpus claims to cover,
rather than the first few of each class.

Run after the pipeline:

    python synthetic/sample.py
"""

import argparse
from pathlib import Path

import yaml

# Each entry: output class, how many to take, and what makes a record interesting.
SELECTORS = {
    # cause_of_death is multivalued, and is emitted even for the living — with
    # a null cause — so presence of the entry does not mean deceased.
    "Person": [
        ("deceased, with cause of death",
         lambda d: any(c.get("cause") for c in d.get("cause_of_death") or [])),
        ("living, note the empty cause_of_death entry",
         lambda d: not any(c.get("cause") for c in d.get("cause_of_death") or [])),
    ],
    "Participant": [
        ("enrolment, linked to a Person", lambda d: d.get("associated_person")),
    ],
    "Demography": [
        ("Hispanic ethnicity", lambda d: d.get("ethnicity") == "OMOP:38003563"),
        ("non-Hispanic", lambda d: d.get("ethnicity") == "OMOP:38003564"),
    ],
    "Visit": [
        ("telehealth", lambda d: d.get("visit_category") == "TELEHEALTH"),
        ("study site visit", lambda d: d.get("visit_category") == "STUDY_SITE_VISIT"),
    ],
    "MeasurementObservationSet": [
        ("blood pressure, systolic and diastolic in one set",
         lambda d: len(d.get("observations", [])) == 2),
    ],
    "MeasurementObservation": [
        ("HDL below the assay's lower limit, carrying the operator",
         lambda d: d.get("value_quantity", {}).get("operator")),
        ("HDL with assay detection limits",
         lambda d: d.get("associated_assay", {}).get("lower_limit_of_detection")),
        ("WBC referencing the CBC assay",
         lambda d: d.get("associated_assay", {}).get("method") == "MMO:0000533"),
        ("BUN qualified as an average", lambda d: d.get("qualifier")),
        ("BMI as a continuous value",
         lambda d: d.get("observation_type") == "OMOP:3038553"
         and d.get("value_quantity", {}).get("value_decimal") is not None),
        ("BMI as a category",
         lambda d: d.get("observation_type") == "OMOP:3038553"
         and d.get("value_quantity", {}).get("value_concept") is not None),
        ("fasting glucose, anchored to an age and a visit",
         lambda d: d.get("observation_type") == "OMOP:4156660"
         and d.get("age_at_observation") is not None),
        ("HbA1c, reported as a percentage",
         lambda d: d.get("observation_type") == "OMOP:4184637"
         and d.get("value_quantity", {}).get("unit") == "%"),
    ],
    "Condition": [
        ("family history, with the relative recorded",
         lambda d: d.get("relationship_to_participant", "").startswith("OMOP:")),
        ("about oneself", lambda d: d.get("relationship_to_participant") == "ONESELF"),
        # The temporal slots, which are what make a condition queryable against
        # the measurements taken around it.
        ("ongoing, dated to the age at diagnosis",
         lambda d: d.get("age_at_condition_start") and not d.get("age_at_condition_end")),
        ("resolved, with both a start and an end age",
         lambda d: d.get("age_at_condition_start") and d.get("age_at_condition_end")),
        ("undiagnosed: screened for, so no dates and no source code",
         lambda d: d.get("condition_status") == "ABSENT"),
        # Concept breadth: T2D and a hypertension subtype more specific than the
        # hierarchy root everyone else is coded to.
        ("Type 2 diabetes", lambda d: d.get("condition_concept") == "MONDO:0005148"),
        ("hypertensive heart disease, not just 'hypertension'",
         lambda d: d.get("condition_concept") == "MONDO:0001302"),
        ("an infarction with an ECG in evidence rather than self-report",
         lambda d: d.get("associated_evidence") == "electrocardiogram"),
    ],
    "DrugExposure": [
        ("taking a calcium channel blocker", lambda d: d.get("drug_concept")),
        ("not taking one", lambda d: not d.get("drug_concept")),
    ],
}


def load(path):
    """Read a multi-document YAML file, skipping empties."""
    with open(path) as fh:
        return [d for d in yaml.safe_load_all(fh) if d]


def pick(records, selectors):
    """Take the first record matching each selector, keeping the labels."""
    chosen = []
    for label, predicate in selectors:
        for record in records:
            try:
                if predicate(record):
                    chosen.append((label, record))
                    break
            except (AttributeError, TypeError):
                continue
    return chosen


def main():
    """Write the sample, drawing from both studies."""
    parser = argparse.ArgumentParser(description=__doc__)
    here = Path(__file__).parent
    parser.add_argument("--output", type=Path, default=here / "output")
    parser.add_argument("--out", type=Path, default=here / "sample")
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)

    studies = [("study_one", "SYNTH1"), ("study_two", "SYNTH2")]
    written = 0

    for cls, selectors in SELECTORS.items():
        blocks = []
        for study, prefix in studies:
            path = args.output / study / "mapped-data" / f"{prefix}-{cls}--data.yaml"
            if not path.exists():
                continue
            for label, record in pick(load(path), selectors):
                blocks.append(f"# {study}: {label}\n" + yaml.safe_dump(record, sort_keys=True))

        if blocks:
            target = args.out / f"{cls}.yaml"
            target.write_text("---\n".join(blocks))
            written += 1
            print(f"{cls:26} {len(blocks):2} records  {target.stat().st_size / 1024:5.1f} KB")

    print(f"\n{written} files written to {args.out}")


if __name__ == "__main__":
    main()
