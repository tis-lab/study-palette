"""Emit BDCHM-targeted transformation specs for the synthetic cohorts.

The specs are generated rather than hand-written because both studies share a
structure and differ only in accessions — generating them from the same column
layout the raw tables use means the phv references cannot drift out of sync.

Patterned on RTI's priority_variables_transform specs: the same uuid5 identity
scheme, the same slot names, the same coded values.

    python synthetic/specs.py [--out DIR]
"""

import argparse
from pathlib import Path

import generate as g
import population as pop
import vocab as v

PERSON_NS = "https://w3id.org/bdchm/Person"
PARTICIPANT_NS = "https://w3id.org/bdchm/Participant"
VISIT_NS = "https://w3id.org/bdchm/Visit"
OBSERVATION_NS = "https://w3id.org/bdchm/MeasurementObservation"
QUANTITY_NS = "https://w3id.org/bdchm/Quantity"
ASSAY_NS = "https://w3id.org/bdchm/Assay"


def uid(namespace, key):
    """A uuid5 derivation expression. Nested objects need explicit ids."""
    return f"'uuid5(\"{namespace}\", {key})'"


def row_key(study, table, suffix):
    """A key unique per source row, for identifying nested objects."""
    subject = phv(study, table, "SUBJECT_ID")
    columns, _ = g.LAYOUTS[table]
    if "VISIT_NUM" in columns:
        num = phv(study, table, "VISIT_NUM")
        return f'str({{{subject}}}) + ":{study.name}:" + str({{{num}}}) + ":{suffix}"'
    return f'str({{{subject}}}) + ":{study.name}:{suffix}"' 


def phv(study, table, column):
    """Look up the phv accession for a column, by name."""
    columns, count = g.LAYOUTS[table]
    ids = g.phv_ids(study, table, count)
    return ids[columns.index(column) - 1].split(".")[0]


def ident(study, table):
    """The uuid5 expressions that tie records back to participant and visit."""
    subject = phv(study, table, "SUBJECT_ID")
    return subject, f"'uuid5(\"{PARTICIPANT_NS}\", str({{{subject}}}) + \":{study.name}\")'"


def visit_ref(study, table):
    subject = phv(study, table, "SUBJECT_ID")
    num = phv(study, table, "VISIT_NUM")
    return f"'uuid5(\"{VISIT_NS}\", str({{{subject}}}) + \":{study.name} VISIT \" + str({{{num}}}))'"


def person_and_participant(study):
    t = study.tables["subject"]
    subject = phv(study, "subject", "SUBJECT_ID")
    vital = phv(study, "subject", "VITAL_STATUS")
    cause = phv(study, "subject", "DEATH_CAUSE")
    return f"""- class_derivations:
    Person:
      populated_from: {t}
      slot_derivations:
        id:
          expr: 'uuid5("{PERSON_NS}", str({{dbGaP_Subject_ID}}))'
        identity:
          expr: 'str({{dbGaP_Subject_ID}})'
        species:
          value: NCBITaxon:9606
        vital_status:
          expr: 'case(({{{vital}}} == 0, "OMOP:4230556"), ({{{vital}}} == 1, "OMOP:434489"))'
        cause_of_death:
          class_derivations:
          - CauseOfDeath:
              populated_from: {t}
              slot_derivations:
                id:
                  expr: {uid(v.CAUSE_OF_DEATH_NS, f'str({{dbGaP_Subject_ID}})')}
                cause:
                  populated_from: {cause}
                order:
                  expr: 'case(({{{vital}}} == 1, 1))'
- class_derivations:
    Participant:
      populated_from: {t}
      slot_derivations:
        id:
          expr: 'uuid5("{PARTICIPANT_NS}", str({{{subject}}}) + ":{study.name}")'
        identity:
          expr: 'str({{{subject}}})'
        member_of_research_study:
          value: '{study.name}'
        associated_person:
          expr: 'uuid5("{PERSON_NS}", str({{dbGaP_Subject_ID}}))'
"""


def demography(study):
    t = study.tables["subject"]
    _, participant = ident(study, "subject")
    return f"""- class_derivations:
    Demography:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(v.DEMOGRAPHY_NS, row_key(study, "subject", "demography"))}
        associated_participant:
          expr: {participant}
        sex:
          populated_from: {phv(study, "subject", "SEX")}
        race:
          populated_from: {phv(study, "subject", "RACE")}
        ethnicity:
          populated_from: {phv(study, "subject", "ETHNICITY")}
"""


def visits(study):
    t = study.tables["visit"]
    subject = phv(study, "visit", "SUBJECT_ID")
    num = phv(study, "visit", "VISIT_NUM")
    return f"""- class_derivations:
    Visit:
      populated_from: {t}
      slot_derivations:
        id:
          expr: 'uuid5("{VISIT_NS}", str({{{subject}}}) + ":{study.name} VISIT " + str({{{num}}}))'
        associated_participant:
          expr: 'uuid5("{PARTICIPANT_NS}", str({{{subject}}}) + ":{study.name}")'
        visit_category:
          populated_from: {phv(study, "visit", "VISIT_TYPE")}
        age_at_visit_start:
          populated_from: {phv(study, "visit", "AGE_DAYS")}
        visit_provenance:
          value: {v.VISIT_PROVENANCE}
"""


def blood_pressure(study):
    """Systolic and diastolic as two observations inside one set, as in ARIC."""
    t = study.tables["clinical"]
    _, participant = ident(study, "clinical")
    visit = visit_ref(study, "clinical")
    sbp = phv(study, "clinical", "SBP")
    dbp = phv(study, "clinical", "DBP")

    def observation(concept, source, label):
        return f"""          - MeasurementObservation:
              populated_from: {t}
              slot_derivations:
                id:
                  expr: {uid(OBSERVATION_NS, row_key(study, "clinical", label))}
                associated_participant:
                  expr: {participant}
                observation_type:
                  value: {concept}
                body_position:
                  value: "SITTING_POSITION"
                body_site:
                  value: "Right arm"
                value_quantity:
                  class_derivations:
                  - Quantity:
                      populated_from: {t}
                      slot_derivations:
                        id:
                          expr: {uid(QUANTITY_NS, row_key(study, "clinical", label))}
                        value_decimal:
                          populated_from: {source}
                        unit:
                          value: "mm[Hg]\""""

    return f"""- class_derivations:
    MeasurementObservationSet:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(v.OBSERVATION_SET_NS, row_key(study, "clinical", "bp"))}
        associated_participant:
          expr: {participant}
        associated_visit:
          expr: {visit}
        observations:
          class_derivations:
{observation("OMOP:4152194", sbp, "systolic")}
{observation("OMOP:4154790", dbp, "diastolic")}
"""


def simple_measure(study, table, column, concept, unit, extra="", categorical=False):
    """A single MeasurementObservation with a Quantity value.

    Categorical measurements go to value_concept rather than value_decimal —
    value_decimal is typed decimal, and the real specs (see fam_income) put
    label strings in value_concept for this case.
    """
    t = study.tables[table]
    _, participant = ident(study, table)
    visit = visit_ref(study, table)
    key = row_key(study, table, column)
    if categorical:
        value_slot = "value_concept"
        unit_line = ""
    else:
        value_slot = "value_decimal"
        unit_line = f'                unit:\n                  value: "{unit}"\n'
    return f"""- class_derivations:
    MeasurementObservation:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(OBSERVATION_NS, key)}
        associated_participant:
          expr: {participant}
        associated_visit:
          expr: {visit}
        observation_type:
          value: {concept}
{extra}        value_quantity:
          class_derivations:
          - Quantity:
              populated_from: {t}
              slot_derivations:
                id:
                  expr: {uid(QUANTITY_NS, key)}
                {value_slot}:
                  populated_from: {phv(study, table, column)}
{unit_line}"""


def hdl(study):
    """HDL carries an operator for censored results and an assay with limits."""
    t = study.tables["labs"]
    operator = phv(study, "labs", "HDL_OPERATOR")
    _, participant = ident(study, "labs")
    visit = visit_ref(study, "labs")
    return f"""- class_derivations:
    MeasurementObservation:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(OBSERVATION_NS, row_key(study, "labs", "HDL"))}
        associated_participant:
          expr: {participant}
        associated_visit:
          expr: {visit}
        observation_type:
          value: OMOP:3007070
        associated_assay:
          class_derivations:
          - Assay:
              populated_from: {t}
              slot_derivations:
                id:
                  expr: {uid(ASSAY_NS, f'"{study.name}:HDL"')}
                method:
                  value: {v.ASSAY_METHOD_HDL}
                lower_limit_of_detection:
                  class_derivations:
                  - Quantity:
                      populated_from: {t}
                      slot_derivations:
                        id:
                          expr: {uid(QUANTITY_NS, f'"{study.name}:HDL:LLOD"')}
                        value_decimal:
                          value: {pop.HDL_LLOD}
                        unit:
                          value: "mg/dL"
                upper_limit_of_detection:
                  class_derivations:
                  - Quantity:
                      populated_from: {t}
                      slot_derivations:
                        id:
                          expr: {uid(QUANTITY_NS, f'"{study.name}:HDL:ULOD"')}
                        value_decimal:
                          value: {pop.HDL_ULOD}
                        unit:
                          value: "mg/dL"
        value_quantity:
          class_derivations:
          - Quantity:
              populated_from: {t}
              slot_derivations:
                id:
                  expr: {uid(QUANTITY_NS, row_key(study, "labs", "HDL"))}
                value_decimal:
                  populated_from: {phv(study, "labs", "HDL")}
                operator:
                  populated_from: {operator}
                unit:
                  value: "mg/dL"
"""


def wbc(study):
    """WBC references a CBC assay instance through associated_assay."""
    t = study.tables["labs"]
    _, participant = ident(study, "labs")
    visit = visit_ref(study, "labs")
    return f"""- class_derivations:
    MeasurementObservation:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(OBSERVATION_NS, row_key(study, "labs", "WBC"))}
        associated_participant:
          expr: {participant}
        associated_visit:
          expr: {visit}
        observation_type:
          value: OMOP:3000905
        associated_assay:
          class_derivations:
          - Assay:
              populated_from: {t}
              slot_derivations:
                id:
                  expr: {uid(ASSAY_NS, f'"{study.name}:CBC"')}
                method:
                  value: {v.ASSAY_METHOD_WBC}
        value_quantity:
          class_derivations:
          - Quantity:
              populated_from: {t}
              slot_derivations:
                id:
                  expr: {uid(QUANTITY_NS, row_key(study, "labs", "WBC"))}
                value_decimal:
                  populated_from: {phv(study, "labs", "WBC")}
                unit:
                  value: "10*3/uL"
"""


def condition(study, label, status_col, concept_col, provenance, relationship=None):
    """One Condition. relationship defaults to ONESELF for self-reported history."""
    t = study.tables["conditions"]
    _, participant = ident(study, "conditions")
    relationship_line = (
        f"          populated_from: {relationship}"
        if relationship
        else f"          value: {v.ONESELF}"
    )
    concept = (
        f"          populated_from: {phv(study, 'conditions', concept_col)}"
        if concept_col
        else "          value: HP:0000822"
    )
    return f"""- class_derivations:
    Condition:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(v.CONDITION_NS, row_key(study, "conditions", label))}
        associated_participant:
          expr: {participant}
        condition_concept:
{concept}
        condition_status:
          populated_from: {phv(study, "conditions", status_col)}
        condition_provenance:
          value: {provenance}
        relationship_to_participant:
{relationship_line}
"""


def drug_exposure(study):
    t = study.tables["meds"]
    _, participant = ident(study, "meds")
    return f"""- class_derivations:
    DrugExposure:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(v.DRUG_EXPOSURE_NS, row_key(study, "meds", "ccb"))}
        associated_participant:
          expr: {participant}
        drug_concept:
          populated_from: {phv(study, "meds", "CCB_CONCEPT")}
        exposure_status:
          populated_from: {phv(study, "meds", "CCB_STATUS")}
        exposure_provenance:
          value: PATIENT_SELF_REPORTED_MEDICATION
"""


def build(study):
    """All specs for one study, keyed by filename."""
    bmi_unit = "" if study.bmi_categorical else "kg/m2"
    specs = {
        "person_participant": person_and_participant(study),
        "demography": demography(study),
        "visit": visits(study),
        "blood_pressure": blood_pressure(study),
        "height": simple_measure(study, "clinical", "HEIGHT_CM", "OMOP:3036277", "cm"),
        "weight": simple_measure(study, "clinical", "WEIGHT_KG", "OMOP:3025315", "kg"),
        "bmi": simple_measure(
            study, "clinical", "BMI", "OMOP:3038553", bmi_unit,
            categorical=study.bmi_categorical,
        ),
        "hdl": hdl(study),
        # BUN is reported as an average, which the qualifier slot records.
        "bun": simple_measure(
            study, "labs", "BUN", "OMOP:3013682", "mg/dL",
            extra='        qualifier:\n          value: "AVERAGE"\n',
        ),
        "wbc": wbc(study),
        "cond_heart_failure": condition(
            study, "heart_failure", "HEART_FAILURE", "HF_CONCEPT", v.SELF_REPORTED_CONDITION),
        "cond_family_stroke": condition(
            study, "family_stroke", "FAM_STROKE", "FS_CONCEPT", v.SELF_REPORTED_CONDITION,
            relationship=phv(study, "conditions", "FS_RELATIVE"),
        ),
        "cond_hypertension": condition(
            study, "hypertension", "HYPERTENSION", None, v.SELF_REPORTED_CONDITION),
        "cond_heart_attack": condition(
            study, "heart_attack", "HEART_ATTACK", "HA_CONCEPT", v.SELF_REPORTED_CONDITION),
        "drug_exposure": drug_exposure(study),
    }
    return specs


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, default=Path(__file__).parent / "specs")
    args = parser.parse_args()

    for study in (pop.STUDY_ONE, pop.STUDY_TWO):
        slug = study.name.lower().replace(" ", "_")
        out = args.out / slug
        out.mkdir(parents=True, exist_ok=True)
        for name, body in build(study).items():
            (out / f"{name}.yaml").write_text(body)
        print(f"{study.name}: {len(build(study))} specs -> {out}")


if __name__ == "__main__":
    main()
