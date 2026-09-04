# ruff: noqa: S311
"""
Emit the synthetic corpus as dbGaP-style raw tables.

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
    # AGE_DAYS repeats the visit's age on every measurement table. It is
    # derivable by joining to the visit table, but real dbGaP measurement tables
    # carry the age alongside the result, and it is what age_at_observation is
    # populated from without requiring the transformation to join.
    "clinical": (
        ["dbGaP_Subject_ID", "SUBJECT_ID", "VISIT_NUM", "AGE_DAYS",
         "HEIGHT_CM", "WEIGHT_KG", "BMI", "SBP", "DBP"],
        8,
    ),
    "labs": (
        ["dbGaP_Subject_ID", "SUBJECT_ID", "VISIT_NUM", "AGE_DAYS",
         "HDL", "HDL_OPERATOR", "BUN", "WBC", "GLUCOSE", "HBA1C"],
        9,
    ),
    # One row per participant, so the visit that recorded each condition is a
    # per-condition column rather than the table-level VISIT_NUM the measurement
    # tables carry. SNOMED and ICD-10-CM appear only here: BDCHM has no slot for
    # source terminology, so they stay in the raw layer, which is where they sit
    # in real dbGaP tables too.
    "conditions": (
        [
            "dbGaP_Subject_ID",
            "SUBJECT_ID",
            "HEART_FAILURE",
            "HF_CONCEPT",
            "HF_AGE_START",
            "HF_VISIT",
            "FAM_STROKE",
            "FS_CONCEPT",
            "FS_RELATIVE",
            "FS_VISIT",
            "HYPERTENSION",
            "HTN_CONCEPT",
            "HTN_SNOMED",
            "HTN_ICD10",
            "HTN_AGE_START",
            "HTN_AGE_END",
            "HTN_VISIT",
            "DIABETES",
            "DM_CONCEPT",
            "DM_SNOMED",
            "DM_ICD10",
            "DM_AGE_START",
            "DM_AGE_END",
            "DM_VISIT",
            "HEART_ATTACK",
            "HA_CONCEPT",
            "HA_SOURCE",
            "HA_AGE_START",
            "HA_VISIT",
        ],
        28,
    ),
    "meds": (["dbGaP_Subject_ID", "SUBJECT_ID", "CCB_STATUS", "CCB_CONCEPT"], 3),
}


def phv_ids(study, table, count):
    """Fictional but well-formed phv accessions, unique per study and table."""
    base = int(study.phs[-3:]) * 100000 + int(study.tables[table][-3:]) * 100
    return [f"phv{base + i:08d}.v1" for i in range(count)]


def write_table(out_dir, study, table, rows):
    """Write one table in dbGaP raw format, returning its path."""
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
                gid, sid, visit.number, visit.age_days,
                visit.height_cm, visit.weight_kg,
                visit.bmi_category if study.bmi_categorical else visit.bmi,
                visit.systolic, visit.diastolic,
            ])
            rows["labs"].append([
                gid, sid, visit.number, visit.age_days,
                visit.hdl, visit.hdl_operator, visit.bun, visit.wbc,
                visit.glucose, visit.hba1c,
            ])

        c = p.conditions
        hf, fs, htn, dm, ha = (
            c["heart_failure"], c["family_stroke"], c["hypertension"],
            c["diabetes"], c["heart_attack"],
        )
        rows["conditions"].append([
            gid, sid,
            hf["status"], hf["concept"], hf["age_start"], hf["visit"],
            fs["status"], fs["concept"], fs["relationship"], fs["visit"],
            htn["status"], htn["concept"], htn["snomed"], htn["icd10"],
            htn["age_start"], htn["age_end"], htn["visit"],
            dm["status"], dm["concept"], dm["snomed"], dm["icd10"],
            dm["age_start"], dm["age_end"], dm["visit"],
            ha["status"], ha["concept"],
            "STUDY_RECORD" if ha["from_study_record"] else "SELF_REPORT",
            ha["age_start"], ha["visit"],
        ])

        rows["meds"].append([
            gid, sid,
            "PRESENT" if p.ccb else "ABSENT",
            p.ccb,
        ])

    return rows


def main():
    """Generate the raw tables for both studies."""
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
