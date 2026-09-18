# LinkML in BDC

BDC uses the LinkML ecosystem in three distinct ways. This document says what they are
and where each applies. It is an orientation, not an exhaustive catalog.

---

## Background

[LinkML](https://linkml.io/) is a modeling language for structured data. A schema written
in LinkML is a YAML file that declares classes, slots, types, and enums. From a single
schema the LinkML toolchain can generate Python dataclasses, JSON Schema, TypeScript types,
OWL ontologies, documentation, and more.

The ecosystem ships as two Python packages with different roles:

| Package | Role |
|---------|------|
| **`linkml`** | The full authoring toolkit: code generators (`gen-*`), linters (`linkml-lint`), validators (`linkml-validate`), and converters (`linkml-convert`). A dev-time dependency. |
| **`linkml-runtime`** | The runtime library used by code generated from a schema, and by tools that need to load or introspect a schema without invoking the full generators. Ships as a runtime (non-dev) dependency wherever generated dataclasses or schema introspection are needed. |

A third package, **`linkml-map`**, is a separate project within the LinkML ecosystem. It
defines a YAML format for data transformation — mapping source tables to target classes —
and an engine that executes those mappings.

---

## 1. BDCHM — the data model (NHLBI-BDC-DMC-HM)

**Repository**: `RTIInternational/NHLBI-BDC-DMC-HM`

This is the canonical home for BDCHM (BioData Catalyst Harmonized Model). The schema is
at `src/bdchm/schema/bdchm.yaml` and is a standard LinkML schema:

```yaml
id: https://w3id.org/bdchm
name: bdchm
prefixes:
  bdchm: https://w3id.org/bdchm/
  linkml: https://w3id.org/linkml/
```

It defines the classes that harmonized participant data conforms to — `Participant`,
`Person`, `Condition`, `MeasurementObservation`, `DrugExposure`, `Demography`, `Visit`, and
others.

### Packages

- **`linkml>=1.11.0`** — dev dependency, used to run all code generation and linting
- **`linkml-runtime>=1.11.0`** — runtime dependency, used by the generated Python datamodel
  (`src/bdchm/`) and by any consumer that loads a BDCHM instance at runtime

### Tools used

The repo's `Makefile` drives the standard LinkML project workflow. The key targets and
the commands they call:

| Makefile target | Tool invoked | Output |
|-----------------|-------------|--------|
| `gen-project` | `gen-project` (calls all generators) | Python datamodel (`src/bdchm/`), plus `project/jsonschema/`, `project/jsonld/`, `project/graphql/` |
| `gendoc` | `gen-doc` | Markdown documentation in `docs/` |
| `genjsonschema` | `gen-json-schema` | `generated/bdchm.schema.json` |
| `gentypescriptschema` | `gen-typescript` | `generated/bdchm.schema.ts` |
| `lint` | `linkml-lint` | Schema style and consistency checks, configured by `.linkmllint.yaml` |
| `test-examples` | `linkml-run-examples` | Validates YAML example instances against the schema |
| `convert-examples-to-*` | `linkml-convert` | Converts example YAML to JSON or Turtle |

### Validation

The test suite (`tests/test_schema.py`) calls `linkml.validator.validate` from Python to
check every file under `examples/` against the schema, and also calls
`linkml.validator.cli` (the `linkml-validate` CLI entry point) to check that the schema
itself is valid against the LinkML metamodel.

CI runs `make test` on pushes and PRs. A second workflow (`deploy_bdchm_docs.yml`) runs
`gendoc`, `genjsonschema`, and `gentypescriptschema` and opens a PR for the resulting
artifacts.

---

## 2. Transformation specs — linkml-map (NHLBI-BDC-DMC-HV)

**Repository**: `RTIInternational/NHLBI-BDC-DMC-HV`

This repo holds the transformation specs that describe how raw dbGaP study tables are
mapped to BDCHM. Each spec is a `linkml-map` `ClassDerivation` document — a YAML file
that names source tables (`populated_from`) and declares how each BDCHM slot is derived:

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

### Packages

- **`linkml-map`** (from GitHub main) — provides the `ClassDerivation` YAML vocabulary and
  `linkml_map.validator.validate_spec`, which checks that a spec document is structurally
  valid
- **`linkml-runtime`** — provides `SchemaView` (in `hv-lint/phase-2/`) for loading BDCHM
  and checking that spec class and slot names exist in the model

### CI validation

`validate_ingest_yamls.py` calls `linkml_map.validator.validate_spec` on every spec file.
It also gates on the deprecated `object_derivations` construct, forcing migration to the
current `class_derivations` list form.

The `hv_lint.yml` workflow runs a multi-phase linting pipeline on PRs:

| Phase | What it checks |
|-------|----------------|
| Phase 1 | YAML structure, quoting rules, cross-block consistency |
| Phase 2 | BDCHM model conformance — class and slot names resolved via `linkml_runtime.utils.schemaview.SchemaView` |
| Phase 3 | dbGaP cross-reference and value-semantic checks |
| Phase 5 | Visit structure |

Phases 2.8 (PHV deduplication) and 3.1–3.5 (dbGaP cross-reference) are enforced gates
that fail the PR. The others are advisory.

---

## 3. Harmonization pipeline — dm-bip

dm-bip is the pipeline that executes the transformation specs from NHLBI-BDC-DMC-HV
against raw dbGaP study tables, producing BDCHM-conformant JSONL. It consumes:

- **`linkml-map`** — to run `ClassDerivation` specs
- **`linkml-runtime`** — to work with BDCHM instances during transformation

dm-bip is not directly owned by this project; it runs upstream and offline. Its output —
harmonized JSONL — is what enters the study-palette build pipeline.

---

## 4. study-palette

**Repository**: `tis-lab/study-palette`

study-palette does not depend on `linkml`, `linkml-runtime`, or `linkml-map` directly.
It works with the artifacts that the three layers above produce.

### Synthetic corpus (`synthetic/`)

`synthetic/fetch-bdchm.sh` downloads a pinned release of `bdchm.yaml` by commit SHA,
verifying the checksum before saving it. `synthetic/schema.py` reads that file with plain
`pyyaml` and uses it to build DuckDB column schemas: it walks BDCHM class definitions,
resolves slot inheritance, and maps LinkML builtin type ranges to DuckDB types using an
explicit `TYPE_MAP`:

```python
TYPE_MAP = {
    "string": "VARCHAR",
    "integer": "BIGINT",
    "decimal": "DOUBLE",
    "boolean": "BOOLEAN",
    "datetime": "TIMESTAMP",
    ...
}
```

`synthetic/specs/` mirrors the `ClassDerivation` format from NHLBI-BDC-DMC-HV but uses
entirely fictional `phs`/`pht`/`phv` accessions. These specs exist so the synthetic corpus
can be run through dm-bip exactly as real studies are, exercising the full pipeline.

### Build layer (`ontology/`)

`ontology/build.py` reads transformation specs from NHLBI-BDC-DMC-HV
(`priority_variables_transform/`) to assemble the metadata index. At this layer the specs
are treated as structured YAML data — no `linkml-map` API is called directly.

### Architectural role

ARCHITECTURE.md describes the metadata index as a "LinkML source of truth": a Parquet
artifact assembled from BDCHM, the BDC Variable Library (a LinkML schema), provenance
records, and the BDC knowledge graph. The build layer follows "LinkML and Monarch tooling"
conventions because its primary inputs — BDCHM and the transformation specs — are LinkML
artifacts.

---

## Dependency summary

```
NHLBI-BDC-DMC-HM          linkml, linkml-runtime
  bdchm.yaml               ← schema source of truth
       │ fetched by commit ref
       ▼
NHLBI-BDC-DMC-HV           linkml-map, linkml-runtime
  priority_variables_transform/**  ← ClassDerivation specs
       │
       ▼
dm-bip                     linkml-map, linkml-runtime
  runs specs against dbGaP tables → BDCHM JSONL
       │
       ▼
study-palette               pyyaml (reads bdchm.yaml directly)
  synthetic/schema.py       maps LinkML type ranges to DuckDB types
  ontology/build.py         reads specs as structured YAML
```
