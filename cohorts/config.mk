# dm-bip pipeline config: a cohort's real transformation specs, synthetic data.
#
#   make schema-create    CONFIG=/path/to/study-palette/cohorts/config.mk COHORT=aric
#   make variable-library CONFIG=/path/to/study-palette/cohorts/config.mk COHORT=aric
#
# Self-locating, so CONFIG and COHORT are the only things you pass. Every other setting
# derives from COHORT, so one config serves every cohort generate.py can produce.
SYNTH_DIR := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))

# The cohort key from the dbGaP manifest, the same value given to generate.py --cohort.
COHORT ?= aric
COHORT_UPPER := $(shell echo $(COHORT) | tr a-z A-Z)

# The specs are the fixed input this corpus exists to serve — the real *-ingest directory,
# unmodified. Every cohort's directory is named for its upper-cased key; override SPECS if
# yours is elsewhere.
SPECS ?= $(HOME)/Developer/NHLBI-BDC-DMC-HV/priority_variables_transform/$(COHORT_UPPER)-ingest

# Per-cohort trees match generate.py: <SYNTH_DIR>/<cohort>/data/raw in, <cohort>/output out.
DM_RAW_SOURCE        := $(SYNTH_DIR)/$(COHORT)/data/raw
DM_SCHEMA_NAME       := $(COHORT_UPPER)Synthetic
DM_OUTPUT_DIR        := $(or $(SYNTH_OUTPUT_DIR),$(SYNTH_DIR)/$(COHORT)/output)
DM_INPUT_DIR         := $(DM_OUTPUT_DIR)/prepared
DM_TRANS_SPEC_DIR    := $(SPECS)
DM_MAPPING_SPEC      := $(DM_TRANS_SPEC_DIR)

# The accessions are the cohort's own, so dbGaP's published digests describe these columns.
# The cache is shared across cohorts; dm-bip keys it by cohort internally.
DM_COHORT            := $(COHORT)
DM_DBGAP_CACHE_DIR   := $(SYNTH_DIR)/.dbgap-cache

DM_MAPPING_PREFIX    := $(COHORT_UPPER)SYN
DM_MAPPING_POSTFIX   := -data
DM_MAP_STRICT        := false
