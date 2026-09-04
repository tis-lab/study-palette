"""
Emit BDCHM-targeted transformation specs for the synthetic cohorts.

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
    """Build a uuid5 derivation expression. Nested objects need explicit ids."""
    return f"'uuid5(\"{namespace}\", {key})'"


def row_key(study, table, suffix):
    """Build a key unique per source row, for identifying nested objects."""
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
    """Build the uuid5 expressions that tie records back to participant and visit."""
    subject = phv(study, table, "SUBJECT_ID")
    return subject, f"'uuid5(\"{PARTICIPANT_NS}\", str({{{subject}}}) + \":{study.name}\")'"


def visit_ref(study, table, column="VISIT_NUM"):
    """
    Build the uuid5 reference to a row's visit.

    The measurement tables carry one VISIT_NUM for the row. The conditions
    table is one row per participant, so each condition names the visit that
    recorded it in its own column.
    """
    subject = phv(study, table, "SUBJECT_ID")
    num = phv(study, table, column)
    return f"'uuid5(\"{VISIT_NS}\", str({{{subject}}}) + \":{study.name} VISIT \" + str({{{num}}}))'"


def observed_at(study, table):
    """
    Build the two temporal anchors every MeasurementObservation should carry.

    RTI derives age_at_observation as '{age_in_years} * 365' because their raw
    columns hold years; ours hold days already, so this is a plain
    populated_from and nulls propagate rather than needing a case() guard.
    """
    return (
        f"        associated_visit:\n          expr: {visit_ref(study, table)}\n"
        f"        age_at_observation:\n"
        f"          populated_from: {phv(study, table, 'AGE_DAYS')}\n"
    )


def person_and_participant(study):
    """Build the Person and Participant derivations."""
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
                  expr: {uid(v.CAUSE_OF_DEATH_NS, 'str({dbGaP_Subject_ID})')}
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
    """Build the Demography derivation."""
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
    """Build the Visit derivation."""
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
        # The set carries associated_visit too, but an observation is also
        # queryable on its own, and a consumer filtering MeasurementObservation
        # by time should not have to join back through the set to do it.
        return f"""          - MeasurementObservation:
              populated_from: {t}
              slot_derivations:
                id:
                  expr: {uid(OBSERVATION_NS, row_key(study, "clinical", label))}
                associated_participant:
                  expr: {participant}
                associated_visit:
                  expr: {visit}
                age_at_observation:
                  populated_from: {phv(study, "clinical", "AGE_DAYS")}
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
                          value: "mm[Hg]"
"""

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
{observation("OMOP:4152194", sbp, "systolic")}{observation("OMOP:4154790", dbp, "diastolic")}"""


def simple_measure(study, table, column, concept, unit, extra="", categorical=False):
    """
    Build a single MeasurementObservation with a Quantity value.

    Categorical measurements go to value_concept rather than value_decimal —
    value_decimal is typed decimal, and the real specs (see fam_income) put
    label strings in value_concept for this case.
    """
    t = study.tables[table]
    _, participant = ident(study, table)
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
{observed_at(study, table)}        observation_type:
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
    return f"""- class_derivations:
    MeasurementObservation:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(OBSERVATION_NS, row_key(study, "labs", "HDL"))}
        associated_participant:
          expr: {participant}
{observed_at(study, "labs")}        observation_type:
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
    return f"""- class_derivations:
    MeasurementObservation:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(OBSERVATION_NS, row_key(study, "labs", "WBC"))}
        associated_participant:
          expr: {participant}
{observed_at(study, "labs")}        observation_type:
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


def condition(
    study,
    label,
    status_col,
    concept_col,
    provenance,
    relationship=None,
    visit_col=None,
    age_start_col=None,
    age_end_col=None,
    evidence=None,
):
    """
    One Condition. relationship defaults to ONESELF for self-reported history.

    The temporal slots are optional because not every condition has a meaningful
    one: family history is about a relative, so the participant's age at its
    start is undefined, and an infarction is an event rather than a state that
    resolves, so it has no end. Where a column is given, it is populated
    straight through — the raw columns hold days and are already null when the
    condition is absent, so no case() guard is needed to suppress them.
    """
    t = study.tables["conditions"]
    _, participant = ident(study, "conditions")
    relationship_line = (
        f"          populated_from: {relationship}"
        if relationship
        else f"          value: {v.ONESELF}"
    )

    temporal = ""
    if visit_col:
        temporal += f"        associated_visit:\n          expr: {visit_ref(study, 'conditions', visit_col)}\n"
    if age_start_col:
        temporal += (
            f"        age_at_condition_start:\n"
            f"          populated_from: {phv(study, 'conditions', age_start_col)}\n"
        )
    if age_end_col:
        temporal += (
            f"        age_at_condition_end:\n"
            f"          populated_from: {phv(study, 'conditions', age_end_col)}\n"
        )

    return f"""- class_derivations:
    Condition:
      populated_from: {t}
      slot_derivations:
        id:
          expr: {uid(v.CONDITION_NS, row_key(study, "conditions", label))}
        associated_participant:
          expr: {participant}
{temporal}        condition_concept:
          populated_from: {phv(study, 'conditions', concept_col)}
        condition_status:
          populated_from: {phv(study, "conditions", status_col)}
        condition_provenance:
          value: {provenance}
        relationship_to_participant:
{relationship_line}
{evidence or ""}"""


def self_report_evidence():
    """
    Evidence for a condition taken from a questionnaire.

    BDCHM ranges associated_evidence on Entity and marks it multivalued, but
    MESA-ingest puts a bare descriptive string there. The corpus follows the
    real spec rather than the model, so schema.py reports the cardinality
    disagreement instead of the corpus hiding it.
    """
    return f'        associated_evidence:\n          value: "{v.SELF_REPORT_EVIDENCE}"\n'


def mi_evidence(study):
    """
    Evidence for an infarction, which differs by where the record came from.

    Half of the MIs are in the study record with an ECG behind them; the rest
    are self-reported.

    This branches with case() rather than the value_mappings the real specs use
    for coded columns, because the two disagree on cardinality: value_mappings
    honours BDCHM's multivalued declaration and emits a list, while a plain
    `value:` emits a scalar. Mixing them would leave one slot carrying both
    shapes, which schema.py types from the first record it sees and would
    therefore get wrong for the rest. RTI emits the scalar, so the corpus does.
    """
    source = phv(study, "conditions", "HA_SOURCE")
    return (
        f"        associated_evidence:\n"
        f"          expr: 'case(({{{source}}} == \"STUDY_RECORD\", \"{v.ECG_EVIDENCE}\"),"
        f" ({{{source}}} == \"SELF_REPORT\", \"{v.SELF_REPORT_EVIDENCE}\"))'\n"
    )


def drug_exposure(study):
    """Build the DrugExposure derivation."""
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
        # Fasting glucose and HbA1c follow MESA-ingest's specs: the same OMOP
        # observation types, units, and method_type strings.
        "glucose": simple_measure(
            study, "labs", "GLUCOSE", v.FASTING_GLUCOSE, "mg/dL",
            extra=f'        method_type:\n          value: {v.GLUCOSE_METHOD}\n',
        ),
        "hba1c": simple_measure(
            study, "labs", "HBA1C", v.HBA1C, "%",
            extra=f'        method_type:\n          value: "{v.HBA1C_METHOD}"\n',
        ),
        "cond_heart_failure": condition(
            study, "heart_failure", "HEART_FAILURE", "HF_CONCEPT", v.SELF_REPORTED_CONDITION,
            visit_col="HF_VISIT", age_start_col="HF_AGE_START",
            evidence=self_report_evidence(),
        ),
        "cond_family_stroke": condition(
            study, "family_stroke", "FAM_STROKE", "FS_CONCEPT", v.SELF_REPORTED_CONDITION,
            relationship=phv(study, "conditions", "FS_RELATIVE"),
            visit_col="FS_VISIT",
            evidence=self_report_evidence(),
        ),
        "cond_hypertension": condition(
            study, "hypertension", "HYPERTENSION", "HTN_CONCEPT", v.SELF_REPORTED_CONDITION,
            visit_col="HTN_VISIT", age_start_col="HTN_AGE_START", age_end_col="HTN_AGE_END",
            evidence=self_report_evidence(),
        ),
        "cond_diabetes": condition(
            study, "diabetes", "DIABETES", "DM_CONCEPT", v.SELF_REPORTED_CONDITION,
            visit_col="DM_VISIT", age_start_col="DM_AGE_START", age_end_col="DM_AGE_END",
            evidence=self_report_evidence(),
        ),
        "cond_heart_attack": condition(
            study, "heart_attack", "HEART_ATTACK", "HA_CONCEPT", v.SELF_REPORTED_CONDITION,
            visit_col="HA_VISIT", age_start_col="HA_AGE_START",
            evidence=mi_evidence(study),
        ),
        "drug_exposure": drug_exposure(study),
    }
    return specs


def main():
    """Write specs for both studies."""
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
