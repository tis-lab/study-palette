# Synthetic corpus

Two fictional cohorts, structurally faithful to harmonized BDC data, for teams
building against the portal without touching participant data.

Nothing here derives from real participants. Every coded value — CURIEs, enum
members, units — is taken from RTI's `priority_variables_transform` specs or
from BDCHM itself, so the corpus resolves against the same vocabulary as real
harmonized data.

## Why it goes through dm-bip

The generator emits **dbGaP-style raw tables**, not harmonized output, and those
are transformed by dm-bip against BDCHM. Emitting BDCHM directly would be a
second implementation of the transformation, free to drift from the real one in
ways nobody would notice until a portal built on it met real data.

```
generate.py  ->  data/raw/*.txt.gz  ->  dm-bip map-data  ->  harmonized BDCHM
specs.py     ->  specs/*/*.yaml     ->  ^
```

## Running it

```bash
python generate.py          # raw tables, per study
python specs.py             # BDCHM-targeted transformation specs
python validate.py          # distributions and invariants
```

After the pipeline has run:

```bash
python schema.py --study study_one   # JSONL -> Parquet, typed from BDCHM
```

The pipeline emits YAML and JSONL side by side — YAML is what makes the
published corpus readable, JSONL is the machine-facing form with the same
nesting. `schema.py` reads BDCHM for leaf types and the transformation specs for
which slots nest, because the model alone does not decide that: BDCHM gives
`associated_participant` a range of `Participant`, but the spec materialises it
as a uuid5 string while `value_quantity` is nested inline.

It also reports where the model and the data disagree on cardinality. That is
not hypothetical — BDCHM declares `identity` and `Condition.associated_evidence`
multivalued, and every transformation spec, RTI's included, emits a scalar for
both.

The `associated_evidence` case has a sharp edge worth knowing about: in
linkml-map a `value:` derivation emits a scalar, while `populated_from` with
`value_mappings` honours the multivalued declaration and emits a list. Using
both for one slot leaves it carrying two shapes, and `schema.py` types a column
from the first record it sees — so it would get the rest wrong. The specs here
branch with `case()` instead, which stays scalar and matches what RTI emits.

Then, from a dm-bip checkout:

```bash
SYNTH=/path/to/synthetic
make pipeline CONFIG=$SYNTH/pipeline/example_study_one.mk \
              SYNTH_DIR=$SYNTH SYNTH_OUTPUT_DIR=$SYNTH/output/study_one
```

BDCHM is fetched rather than vendored, pinned to a release so an upstream change
is a deliberate bump here rather than a silent change in what the pipeline
produces:

```bash
./fetch-bdchm.sh          # currently v1.3.0
```

## What is and isn't committed

The generator is committed. The corpus is not: it is 14MB of YAML, deterministic
given `SEED`, and would produce a 14MB diff every time the seed or the model
changed. Built corpora are distributed as release assets — 3MB compressed, with
a stable URL and a version, which is what a consuming team needs anyway.

`sample/` **is** committed — 40KB of hand-selected records covering every
structural feature the corpus claims. It exists so a reviewer, or a team
deciding whether this is the reference data they want, can see the output shape
without running the pipeline. Regenerate it with `python sample.py` after a run.

## The cohorts

|  | Example Study One | Example Study Two |
|---|---|---|
| Participants | 500 | 500 |
| Visits | 3 | 5 |
| Sex skew | slightly male | slightly female |
| Race | 50/30/10/10 white, black, Asian, American Indian | 60/20/10/10 white, black, Middle Eastern, Native Hawaiian |
| BMI | continuous | categorical |

Both carry the same five conditions — heart failure, family history of stroke,
hypertension, Type 2 diabetes, and myocardial infarction — and the same
measurements, including fasting glucose and HbA1c.

5% of Study Two's participants are the same individuals as in Study One. They
share a `dbGaP_Subject_ID`, so harmonization resolves them to one `Person` with
two `Participant` records — the same way real cross-study participation appears.

One visit per participant is `TELEHEALTH`; the rest are `STUDY_SITE_VISIT`.
Deceased participants stop attending, so nobody is measured after they die.

## Time

Conditions carry `age_at_condition_start`, `age_at_condition_end` where they
resolved, and the `associated_visit` that recorded them. Measurements carry
`age_at_observation` and their own `associated_visit` — including the systolic
and diastolic observations nested inside a blood pressure set, which are
queryable on their own and should not need a join back through the set to be
placed in time.

The reason to populate those slots is that a quarter of diagnoses are **incident**:
made between two visits rather than before enrolment. A condition only makes
the measurements it explains abnormal from its diagnosis onwards, and stops
once it resolves, so the same participant's results fall into two distinct
distributions:

```
glucose at or above 126 mg/dL, participants diagnosed with T2D mid-study
  before the diagnosis   10.3%     (the corpus-wide rate)
  after  the diagnosis   52.2%     (the diabetic rate)
```

A corpus where every diagnosis predates every visit answers "measurements after
diagnosis" with the whole cohort, and the temporal slots are decoration.
`validate.py` checks the separation rather than merely checking the slots are
non-null.

Family history is the exception: `age_at_condition_start` is defined as the
*participant's* age, which means nothing for a condition a parent had, so
family-history records carry the recording visit and no ages.

## Concepts and source terminology

Hypertension and Type 2 diabetes are coded from the BDC cohort-readiness
code-set reference — 13 hypertension subtypes and 11 for T2D, against the
single `HP:0000822` and no diabetes at all that the corpus started with. A
participant screened and found negative is coded to the hierarchy root, since a
questionnaire asks about hypertension in general; a subtype is recorded once
there is a diagnosis.

SNOMED CT and ICD-10-CM appear **only in the raw dbGaP-style tables**. BDCHM has
no slot for source terminology anywhere — `condition_concept` is single-valued
over `ConditionConceptEnum`, which is MONDO ∪ HPO — so mapping source codes into
harmonized output would mean inventing a place to put them. Leaving them in the
raw layer is also what real data looks like, and it means the transformation
exercises the code-mapping path rather than assuming it away.

That matters most for T2D, where the reference gives `MONDO:0005148` for nearly
every row and puts the complication-level detail in ICD-10-CM. The granularity
this corpus offers for diabetes complications lives in the source codes.

Two reference rows are deliberately not used, and one class of cell is not
guessed at:

- **Pregnancy-related hypertension** — both cohorts enrol at 45-78.
- **T2D with ophthalmic complications** — its ICD-10-CM cell is the bare
  wildcard `E11.3*` and its MONDO is the shared root, so it would be
  indistinguishable from every other T2D record.
- Cells naming a hierarchy rather than a term (`"44054006 hierarchy + renal
  complication descendants"`) or a wildcard rather than a code become `None`
  rather than a guess. A subtype with no concrete source code emits none, which
  is a shape real data has too.

## Known shapes that surprise people

**`cause_of_death` is present for living participants**, multivalued, with a null
cause:

```yaml
cause_of_death:
- cause: null
  order: null
  id: 73e3cc59-...
vital_status: OMOP:4230556
```

Test `vital_status`, not the presence of `cause_of_death`.

This is not an artifact of the synthetic corpus — it is how the real
transformation behaves. RTI's MESA spec derives `cause_of_death` the same way,
with `cause` set to `None` for the living and no mechanism to suppress the
object, because `ClassDerivation` in linkml-map has no conditional emission
(see linkml/linkml-map#187). Real harmonized BDC data therefore carries the same
shape, and the corpus reproduces it deliberately. A portal built against a
tidied-up version would break on real data.

## Structural features exercised

Beyond the clinical values, the corpus is meant to exercise the shapes a portal
has to render:

- `MeasurementObservationSet` with nested systolic and diastolic observations
- `Quantity.operator` for results censored below an assay's detection limit
- `Assay` with `lower_limit_of_detection` / `upper_limit_of_detection` (HDL)
- `associated_assay` referencing a CBC instance (WBC)
- `qualifier` marking a value as an average (BUN)
- `Condition.relationship_to_participant` for family history
- `associated_evidence` distinguishing an ECG-backed infarction from self-report
- `age_at_condition_start` / `_end` and `associated_visit` on conditions
- `age_at_observation` on every measurement, nested ones included
- `exposure_status` distinguishing absent from present drug exposures
- Continuous and categorical presentations of the same concept across cohorts

Coverage against BDCHM's full slot inventory — the percentage of slots appearing
at least once — is intended as the acceptance number for broadening the corpus
beyond this first pass. **That measurement is not built yet.** This pass covers
the brief only.
