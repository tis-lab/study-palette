# ruff: noqa: S311
"""Emit the synthetic corpus as dbGaP-style raw tables.

These are inputs to dm-bip, not harmonized output. Running them through the
pipeline with BDCHM as the target schema is what makes the result structurally
identical to real harmonized data, rather than a second implementation of the
transformation that can quietly drift.

    python synthetic/generate.py [--out DIR]
"""

import argparse
import gzip
from pathlib import Path

import population as pop

CITATION = "Synthetic corpus for portal development. Not derived from participant data."

# Column layouts. The phv accessions are fictional but well-formed, and are
# what the transformation specs reference.
LAYOUTS = {
    "subject": (
        ["dbGaP_Subject_ID", "SUBJECT_ID", "SEX", "RACE", "ETHNICITY", "AGE", "VITAL_STATUS", "DEATH_CAUSE"],
        7,
    ),
    "visit": (["dbGaP_Subject_ID", "SUBJECT_ID", "VISIT_NUM", "VISIT_TYPE", "AGE_DAYS"], 4),
    "clinical": (
        ["dbGaP_Subject_ID", "SUBJECT_ID", "VISIT_NUM", "HEIGHT_CM", "WEIGHT_KG", "BMI", "SBP", "DBP"],
        7,
    ),
    "labs": (
        ["dbGaP_Subject_ID", "SUBJECT_ID", "VISIT_NUM", "HDL", "HDL_OPERATOR", "BUN", "WBC"],
        6,
    ),
    "conditions": (
        [
            "dbGaP_Subject_ID",
            "SUBJECT_ID",
            "HEART_FAILURE",
            "HF_CONCEPT",
            "FAM_STROKE",
            "FS_CONCEPT",
            "FS_RELATIVE",
            "HYPERTENSION",
            "HEART_ATTACK",
            "HA_CONCEPT",
            "HA_SOURCE",
        ],
        10,
    ),
    "meds": (["dbGaP_Subject_ID", "SUBJECT_ID", "CCB_STATUS", "CCB_CONCEPT"], 3),
}


def phv_ids(study, table, count):
    """Fictional but well-formed phv accessions, unique per study and table."""
    base = int(study.phs[-3:]) * 100000 + int(study.tables[table][-3:]) * 100
    return [f"phv{base + i:08d}.v1" for i in range(count)]


def write_table(out_dir, study, table, rows):
    columns, phv_count = LAYOUTS[table]
    pht = study.tables[table]
    path = out_dir / f"{study.phs}.v1.{pht}.v1.p1.c1.ex0_1s.HMB.txt.gz"

    with gzip.open(path, "wt", newline="") as fh:
        fh.write(f"# Study accession: {study.phs}.v1.p1\n")
        fh.write(f"# Table accession: {pht}\n")
        fh.write("# Consent group: All subjects\n")
        fh.write(f"# Citation: {CITATION}\n")
        fh.write("#\n")
        fh.write("##\t" + "\t".join(phv_ids(study, table, phv_count)) + "\n")
        fh.write("\t".join(columns) + "\n")
        fh.write("\n")
        for row in rows:
            fh.write("\t".join("" if c is None else str(c) for c in row) + "\n")
    return path


def build_rows(participants, study):
    """Shape the population into the six per-study tables."""
    rows = {k: [] for k in LAYOUTS}

    for p in (x for x in participants if x.study is study):
        gid, sid = p.person.dbgap_id, p.subject_id
        person = p.person

        rows["subject"].append([
            gid, sid, person.sex, person.race, person.ethnicity,
            person.baseline_age,
            1 if person.deceased else 0,
            person.death_cause,
        ])

        for visit in p.visits:
            rows["visit"].append([gid, sid, visit.number, visit.category, visit.age_days])
            rows["clinical"].append([
                gid, sid, visit.number,
                visit.height_cm, visit.weight_kg,
                visit.bmi_category if study.bmi_categorical else visit.bmi,
                visit.systolic, visit.diastolic,
            ])
            rows["labs"].append([
                gid, sid, visit.number,
                visit.hdl, visit.hdl_operator, visit.bun, visit.wbc,
            ])

        c = p.conditions
        rows["conditions"].append([
            gid, sid,
            c["heart_failure"]["status"], c["heart_failure"]["concept"],
            c["family_stroke"]["status"], c["family_stroke"]["concept"],
            c["family_stroke"]["relationship"],
            c["hypertension"]["status"],
            c["heart_attack"]["status"], c["heart_attack"]["concept"],
            "STUDY_RECORD" if c["heart_attack"]["from_study_record"] else "SELF_REPORT",
        ])

        rows["meds"].append([
            gid, sid,
            "PRESENT" if p.ccb else "ABSENT",
            p.ccb,
        ])

    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--out",
        type=Path,
        default=Path(__file__).parent / "data" / "raw",
        help="directory to write the dbGaP-style tables into",
    )
    args = parser.parse_args()

    _, participants = pop.build()

    written = []
    for study, slug in ((pop.STUDY_ONE, "study_one"), (pop.STUDY_TWO, "study_two")):
        out_dir = args.out / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        rows = build_rows(participants, study)
        for table in LAYOUTS:
            written.append((study.name, table, write_table(out_dir, study, table, rows[table]), len(rows[table])))

    for name, table, path, count in written:
        print(f"{name:20} {table:12} {count:6} rows  {path.name}")


if __name__ == "__main__":
    main()
