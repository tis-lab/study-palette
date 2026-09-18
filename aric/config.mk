# dm-bip pipeline config: real ARIC transformation specs, synthetic data.
#
#   make schema-create    CONFIG=/path/to/study-palette-aric/config.mk
#   make variable-library CONFIG=/path/to/study-palette-aric/config.mk
#
# Self-locating, so CONFIG is the only path you pass.
ARIC_SYNTH_DIR := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))

# The specs are the fixed input this corpus exists to serve — the real ARIC-ingest
# directory, unmodified. Override ARIC_SPECS if your checkout lives elsewhere.
ARIC_SPECS ?= $(HOME)/Developer/NHLBI-BDC-DMC-HV/priority_variables_transform/ARIC-ingest

DM_RAW_SOURCE        := $(ARIC_SYNTH_DIR)/data/raw
DM_SCHEMA_NAME       := AricSynthetic
DM_OUTPUT_DIR        := $(or $(ARIC_SYNTH_OUTPUT_DIR),$(ARIC_SYNTH_DIR)/output)
DM_INPUT_DIR         := $(DM_OUTPUT_DIR)/prepared
DM_TRANS_SPEC_DIR    := $(ARIC_SPECS)
DM_MAPPING_SPEC      := $(DM_TRANS_SPEC_DIR)

# The accessions are ARIC's own, so dbGaP's published digests describe these columns.
DM_COHORT            := aric
DM_DBGAP_CACHE_DIR   := $(ARIC_SYNTH_DIR)/.dbgap-cache

DM_MAPPING_PREFIX    := ARICSYN
DM_MAPPING_POSTFIX   := -data
DM_MAP_STRICT        := false
