# Pipeline config for the synthetic Example Study One cohort.
# Target schema is BDCHM itself, so the harmonized output is structurally
# identical to real harmonized data rather than a simplified stand-in.

DM_RAW_SOURCE        := $(SYNTH_DIR)/data/raw/study_one
DM_SCHEMA_NAME       := ExampleStudyOne
DM_OUTPUT_DIR        := $(or $(SYNTH_OUTPUT_DIR),output/ExampleStudyOne)
DM_INPUT_DIR         := $(DM_OUTPUT_DIR)/prepared
DM_TRANS_SPEC_DIR    := $(SYNTH_DIR)/specs/example_study_one
DM_MAPPING_SPEC      := $(DM_TRANS_SPEC_DIR)
DM_MAP_TARGET_SCHEMA := $(SYNTH_DIR)/bdchm.yaml
DM_MAPPING_PREFIX    := SYNTH1
DM_MAPPING_POSTFIX   := -data
DM_MAP_STRICT        := false

# YAML stays primary because it is what makes the published corpus readable.
# JSONL is emitted alongside it as the machine-facing form: it preserves the
# same nesting and is what the Parquet build reads.
DM_MAP_OUTPUT_TYPE   := yaml jsonl
