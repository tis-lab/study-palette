# ruff: noqa: S311
"""
Coded values used by the synthetic corpus.

Every CURIE here is attested in one of three places, so the corpus resolves
against the same vocabulary as real harmonized data. Nothing in this file is
invented:

  1. RTI's priority_variables_transform specs
  2. BDCHM itself
  3. The BDC cohort-readiness code-set reference, for the hypertension and
     Type 2 diabetes subtypes (see CODE_SET_REFERENCE below)
"""

from dataclasses import dataclass

# Demography — BDCHM RaceEnum / EthnicityEnum / SexEnum meanings
MALE = "OMOP:8507"
FEMALE = "OMOP:8532"

WHITE = "OMOP:8527"
BLACK = "OMOP:8516"
ASIAN = "OMOP:8515"
AMERICAN_INDIAN = "OMOP:8657"
MIDDLE_EASTERN = "OMOP:38003615"
NATIVE_HAWAIIAN = "OMOP:8557"

HISPANIC = "OMOP:38003563"
NOT_HISPANIC = "OMOP:38003564"

# Vital status, as coded in MESA-ingest/person.yaml
ALIVE = "OMOP:4230556"
DECEASED = "OMOP:434489"

SPECIES_HUMAN = "NCBITaxon:9606"

# The three most frequent ICD10CM causes of death across the real specs.
TOP_DEATH_CAUSES = [
    "ICD10CM:I20-I25",  # ischaemic heart disease
    "ICD10CM:R99",  # ill-defined / unknown cause
    "ICD10CM:I00-I99",  # circulatory system, unspecified
]

# Conditions — from hist_heart_failure, fam_stroke, hypertension, hist_mi
HEART_FAILURE = ["MONDO:0005009", "MONDO:0005252"]
STROKE = [
    "MONDO:0005099",
    "MONDO:0005264",
    "MONDO:0006809",
    "MONDO:0011057",
    "MONDO:0013792",
]
HEART_ATTACK = ["MONDO:0005068", "MONDO:0006803"]

# Observation types — from blood_pressure.yaml and the lab specs
SYSTOLIC = "OMOP:4152194"
DIASTOLIC = "OMOP:4154790"

# Drug concepts — all four attested in tak_calchanblk specs
CALCIUM_CHANNEL_BLOCKERS = [
    "ATC:C08",
    "NDFRT:N0000175421",
    "RxCUI:7417",
    "RxCUI:17767",
]

# Family relationship — BDCHM FamilyRelationshipEnum meanings.
# The brief said "FATHER or MOTHER"; the model spells these NATURAL_*.
NATURAL_FATHER = "OMOP:4321888"
NATURAL_MOTHER = "OMOP:4277283"

# Provenance. Note the hyphen in the condition value — it is in the enum.
SELF_REPORTED_CONDITION = "PATIENT_SELF-REPORTED_CONDITION"
SELF_REPORTED_MEDICATION = "PATIENT_SELF_REPORTED_MEDICATION"
STUDY_RECORD = "STUDY_RECORD"

# Status values — BDCHM HistoricalStatusEnum
PRESENT = "PRESENT"
ABSENT = "ABSENT"
UNKNOWN = "UNKNOWN"
HISTORICAL = "HISTORICAL"

# Visit categories — BDCHM VisitTypeEnum
STUDY_SITE_VISIT = "STUDY_SITE_VISIT"
TELEHEALTH = "TELEHEALTH"

# Visit provenance — BDCHM VisitProvenanceEnum. The real specs leave this unset
# even though it is required; a reference corpus should populate it.
VISIT_PROVENANCE = "CASE_REPORT_FORM"

# Glycemic measures. Unlike HDL, BUN and WBC — whose OMOP codes come from RTI's
# specs and are not in the model — these two are permissible values of BDCHM's
# MeasurementObservationTypeEnum (FAST_GLUC_BLD, HEMO_A1C) *and* are what
# MESA-ingest/fast_gluc_bld.yaml and hemo_a1c.yaml emit. Units and method_type
# are taken from those same specs.
FASTING_GLUCOSE = "OMOP:4156660"
HBA1C = "OMOP:4184637"
GLUCOSE_METHOD = "CALIBRATED"
HBA1C_METHOD = "blood assay"

# Assay methods — BDCHM AssayMethodEnum resolves through MMO. No MMO term is
# attested in the real specs, so these were looked up in MMO directly rather
# than invented.
ASSAY_METHOD_HDL = "MMO:0000133"  # serum high-density lipoprotein-cholesterol measurement test
ASSAY_METHOD_WBC = "MMO:0000533"  # white blood cell counting method

# Evidence supporting a condition assertion. BDCHM ranges associated_evidence on
# Entity, but MESA-ingest puts a bare descriptive string there, so this is what
# real harmonized data actually carries.
SELF_REPORT_EVIDENCE = "self-report questionnaire"
ECG_EVIDENCE = "electrocardiogram"

# Relationship of a condition to the participant. ONESELF has no OMOP meaning
# in BDCHM — it is a bare permissible value.
ONESELF = "ONESELF"
CONDITION_NS = "https://w3id.org/bdchm/Condition"
DEMOGRAPHY_NS = "https://w3id.org/bdchm/Demography"
DRUG_EXPOSURE_NS = "https://w3id.org/bdchm/DrugExposure"
OBSERVATION_SET_NS = "https://w3id.org/bdchm/MeasurementObservationSet"
CAUSE_OF_DEATH_NS = "https://w3id.org/bdchm/CauseOfDeath"


# --- Hypertension and Type 2 diabetes subtypes ------------------------------
#
# Source: the BDC cohort-readiness code-set reference, which lists MONDO, HPO,
# SNOMED CT and ICD-10-CM for each subtype.
CODE_SET_REFERENCE = (
    "https://docs.google.com/spreadsheets/d/1AciqkeEaQfA9IptDpUI9yQYYzN7PWnt7"
)


@dataclass(frozen=True)
class Subtype:
    """
    One row of the code-set reference.

    `concept` is what BDCHM's condition_concept takes — MONDO where the
    reference gives one, HPO otherwise, since ConditionConceptEnum is the union
    of the two. `snomed` and `icd10` have no slot anywhere in BDCHM, so they
    live only in the raw dbGaP-style tables, which is where source terminology
    sits in real data too.

    Several reference cells name a hierarchy rather than a term ("MONDO:0005148
    hierarchy", "44054006 hierarchy + renal complication descendants") or a
    wildcard rather than a code ("E11.3*"). Those are recorded as None or as an
    empty tuple rather than guessed at: a subtype with no concrete source code
    simply emits none, which is a shape real data has as well.
    """

    label: str
    concept: str
    hpo: str | None
    snomed: str | None
    icd10: tuple[str, ...]
    weight: float


# Weights are illustrative. The ordering is real — essential hypertension
# dominates any hypertensive population — but the numbers are not drawn from any
# prevalence study and must not be read as a finding.
#
# Pregnancy-related hypertension (MONDO:0005081) is in the reference but is left
# out here: both cohorts enrol at 45-78, so no participant is plausibly
# pregnancy-hypertensive during follow-up.
HYPERTENSION_SUBTYPES = (
    Subtype("essential (primary) hypertension",
            "MONDO:0001134", "HP:0000822", "59621000", ("I10",), 0.56),
    Subtype("systemic hypertensive disorder, unspecified",
            "MONDO:0005044", "HP:0000822", "38341003", ("I10",), 0.15),
    Subtype("hypertensive heart disease",
            "MONDO:0001302", "HP:0000822", "64715009", ("I11.0", "I11.9"), 0.07),
    Subtype("secondary hypertension",
            "MONDO:0001200", "HP:0000822", "31992008",
            ("I15.0", "I15.1", "I15.2", "I15.8", "I15.9"), 0.05),
    Subtype("resistant hypertension",
            "MONDO:0100078", None, "461301000124109", ("I1A.0",), 0.04),
    Subtype("renovascular hypertension",
            "MONDO:0006947", "HP:0100817", "123799005", ("I15.0",), 0.03),
    Subtype("renal hypertension",
            "MONDO:0001105", "HP:0000822", "28119000", ("I15.0", "I15.1"), 0.03),
    Subtype("pulmonary arterial hypertension",
            "MONDO:0015924", "HP:0002092", "11399002", (), 0.02),
    Subtype("hypertensive urgency",
            "MONDO:1030007", "HP:0100735", "443482000", ("I16.0",), 0.015),
    Subtype("malignant hypertension",
            "MONDO:0006846", "HP:0100735", "70272006", (), 0.01),
    # The reference gives no single MONDO term for hypertensive crisis, only a
    # pointer into the hierarchy — so this one is HPO-coded, which BDCHM allows.
    Subtype("hypertensive crisis",
            "HP:0100735", "HP:0100735", "706882009", ("I16.0", "I16.1", "I16.9"), 0.01),
    Subtype("portal hypertension",
            "MONDO:0005080", "HP:0001409", "34742003", ("K76.6",), 0.01),
    Subtype("hypertensive encephalopathy",
            "MONDO:0006796", None, "50490005", (), 0.005),
)

# The screening concept for participants who answered no: a questionnaire asks
# about hypertension in general, and a subtype is only recorded once diagnosed.
HYPERTENSION_ROOT = HYPERTENSION_SUBTYPES[1]

# Type 2 diabetes. The reference gives MONDO:0005148 for nearly every row and
# puts the complication-level detail in ICD-10-CM, so that is where the
# granularity in this corpus lives too.
#
# T2D with ophthalmic complications is in the reference but omitted here: its
# ICD-10-CM cell is the bare wildcard "E11.3*" and its MONDO is the shared
# root, so it would be indistinguishable from every other T2D record.
DIABETES_SUBTYPES = (
    Subtype("Type 2 diabetes without complications",
            "MONDO:0005148", "HP:0005978", "44054006", ("E11.9",), 0.37),
    Subtype("Type 2 diabetes with kidney complications",
            "MONDO:0005148", "HP:0005978", None,
            ("E11.21", "E11.22", "E11.29"), 0.11),
    Subtype("Type 2 diabetes with neurologic complications",
            "MONDO:0005148", "HP:0005978", "421326000",
            ("E11.40", "E11.41", "E11.42", "E11.43", "E11.44", "E11.49"), 0.11),
    Subtype("Type 2 diabetes with other specified complications",
            "MONDO:0005148", "HP:0005978", None,
            ("E11.610", "E11.618", "E11.620", "E11.621", "E11.622", "E11.628",
             "E11.630", "E11.638", "E11.641", "E11.649", "E11.65", "E11.69"), 0.09),
    # In remission is the one subtype that resolves, and is what gives the
    # corpus its Conditions with an age_at_condition_end.
    Subtype("Type 2 diabetes in remission",
            "MONDO:0005148", "HP:0005978", None, ("E11.A",), 0.08),
    Subtype("Type 2 diabetes with unspecified complications",
            "MONDO:0005148", "HP:0005978", None, ("E11.8",), 0.07),
    Subtype("Type 2 diabetes with circulatory complications",
            "MONDO:0005148", "HP:0005978", None,
            ("E11.51", "E11.52", "E11.59"), 0.07),
    # MONDO:0005015 is what MESA-ingest/diabetes.yaml actually emits, so a
    # portal built on this corpus meets the same broad code real data carries.
    Subtype("diabetes mellitus, type unspecified",
            "MONDO:0005015", "HP:0000819", "73211009", (), 0.05),
    Subtype("Type 2 diabetes with hyperosmolarity",
            "MONDO:0005148", "HP:0005978", None, ("E11.00", "E11.01"), 0.02),
    Subtype("Type 2 diabetes with ketoacidosis",
            "MONDO:0005148", "HP:0005978", None, ("E11.10", "E11.11"), 0.02),
    Subtype("lipoatrophic diabetes",
            "MONDO:0005827", "HP:0005978", "127012008", (), 0.01),
)

DIABETES_ROOT = DIABETES_SUBTYPES[0]
DIABETES_REMISSION = DIABETES_SUBTYPES[4]
