# ruff: noqa: S311
"""
Coded values used by the synthetic corpus.

Every CURIE here is attested in RTI's priority_variables_transform specs or in
BDCHM itself, so the corpus resolves against the same vocabulary as real
harmonized data. Nothing in this file is invented.
"""

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
HYPERTENSION = "HP:0000822"
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

# Assay methods — BDCHM AssayMethodEnum resolves through MMO. No MMO term is
# attested in the real specs, so these were looked up in MMO directly rather
# than invented.
ASSAY_METHOD_HDL = "MMO:0000133"  # serum high-density lipoprotein-cholesterol measurement test
ASSAY_METHOD_WBC = "MMO:0000533"  # white blood cell counting method

# Relationship of a condition to the participant. ONESELF has no OMOP meaning
# in BDCHM — it is a bare permissible value.
ONESELF = "ONESELF"
CONDITION_NS = "https://w3id.org/bdchm/Condition"
DEMOGRAPHY_NS = "https://w3id.org/bdchm/Demography"
DRUG_EXPOSURE_NS = "https://w3id.org/bdchm/DrugExposure"
OBSERVATION_SET_NS = "https://w3id.org/bdchm/MeasurementObservationSet"
CAUSE_OF_DEATH_NS = "https://w3id.org/bdchm/CauseOfDeath"
