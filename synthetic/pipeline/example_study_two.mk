# Pipeline config for the synthetic Example Study Two cohort.
# Target schema is BDCHM itself, so the harmonized output is structurally
# identical to real harmonized data rather than a simplified stand-in.

DM_RAW_SOURCE        := $(SYNTH_DIR)/data/raw/study_two
DM_SCHEMA_NAME       := ExampleStudyTwo
DM_OUTPUT_DIR        := $(or $(SYNTH_OUTPUT_DIR),output/ExampleStudyTwo)
DM_INPUT_DIR         := $(DM_OUTPUT_DIR)/prepared
DM_TRANS_SPEC_DIR    := $(SYNTH_DIR)/specs/example_study_two
DM_MAPPING_SPEC      := $(DM_TRANS_SPEC_DIR)
DM_MAP_TARGET_SCHEMA := $(SYNTH_DIR)/bdchm.yaml
DM_MAPPING_PREFIX    := SYNTH2
DM_MAPPING_POSTFIX   := -data
DM_MAP_STRICT        := false
