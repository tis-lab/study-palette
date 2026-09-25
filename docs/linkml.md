# LinkML in BDC

BDC uses LinkML across several repositories, each for a different part of the harmonization
process. This document says which LinkML tools each one uses and what for. It is an
orientation, not an exhaustive catalog.

---

## Background

[LinkML](https://linkml.io/) is a modeling language for structured data. A schema written
in LinkML is a YAML file that declares classes, slots, types, and enums. From a single
schema the LinkML generators produce Python classes, JSON Schema, documentation, and more.

Three LinkML tools do most of the work in BDC:

| Tool | What it does |
|------|--------------|
| **`linkml-validate`** | Checks data against a schema, or a schema against the LinkML metamodel |
| **`linkml-map`** | Defines a YAML format for transformation specs and runs them to turn source data into a target schema |
| **`schema-automator`** (`schemauto`) | Infers a LinkML schema from existing data, such as a dbGaP data dictionary or TSV files |

---

## 1. BDCHM, the data model (NHLBI-BDC-DMC-HM)

**Repository**: `RTIInternational/NHLBI-BDC-DMC-HM`

This is the canonical home for BDCHM (BioData Catalyst Harmonized Model). The schema is
at `src/bdchm/schema/bdchm.yaml` and is a standard LinkML schema. It defines the classes
that harmonized participant data conforms to, such as `Participant`, `Condition`,
`MeasurementObservation`, `DrugExposure`, `Demography`, and `Visit`.

- **LinkML generators** produce the Python datamodel, JSON Schema, TypeScript types, and
  the documentation site from the schema, driven by the repo's `Makefile`.
- **`linkml-validate`** checks every example under `examples/` against the schema, and
  checks the schema itself against the LinkML metamodel (`tests/test_schema.py`). CI runs
  this on pushes and PRs.

---

## 2. Transformation specs (NHLBI-BDC-DMC-HV)

**Repository**: `RTIInternational/NHLBI-BDC-DMC-HV`

This repo holds the transformation specs that describe how raw dbGaP study tables map to
BDCHM. Each spec is a `linkml-map` document that names source tables (`populated_from`)
and says how each BDCHM slot is derived:

```yaml
- class_derivations:
    Condition:
      populated_from: pht000115
      slot_derivations:
        condition_concept:
          populated_from: phv10111510
        ...
```

Specs live under `priority_variables_transform/` in per-cohort directories (ARIC, CARDIA,
CHS, COPDGene, FHS, HCHS/SOL, JHS, LTRC, MESA, SPIROMICS, WHI).

- **`linkml-map`**'s spec validator (`validate_spec`) checks that every spec is
  structurally valid (`validate_ingest_yamls.py`, run in CI).
- **`SchemaView`** loads BDCHM so HV-Lint can check that every class and slot a spec names
  actually exists in the model (`hv-lint/phase-2/`).

---

## 3. AI-assisted spec authoring (NHLBI-BDC-DMC-AI)

**Repository**: `RTIInternational/NHLBI-BDC-DMC-AI`

An AI harmonization workbench that drafts transformation specs from study metadata (dbGaP
data dictionaries, protocols, CRFs, existing specs). Its output is `linkml-map` spec YAML
in the same form as the specs in NHLBI-BDC-DMC-HV (`src/bdc_ai/render_yaml.py`). Drafts
are checked with HV-Lint from an HV checkout, so they pass the same model-conformance
checks as hand-written specs.

---

## 4. Ingestion pipeline (dm-bip)

**Repository**: `linkml/dm-bip`

dm-bip takes a raw dbGaP study to BDCHM-conformant output, running upstream and offline.
Its output is what enters the study-palette build. Each stage is a LinkML tool:

1. **`schema-automator`** builds a LinkML schema for the raw study.
   `schemauto adapt-dbgap` converts the dbGaP data dictionary to a standard TSV form, and
   `schemauto generalize-tsvs` infers the source schema from the study's tables.
2. **`linkml-validate`** checks the generated schema and validates each raw data file
   against it before mapping.
3. **`linkml-map`** runs the NHLBI-BDC-DMC-HV transformation specs, using the generated
   schema as the source and BDCHM as the target.
4. **`linkml-validate`** checks the mapped output against BDCHM and writes an advisory
   report (`src/dm_bip/map_data/validate_output.py`).

dm-bip also uses the LinkML generators for its own mapping-provenance datamodel.
