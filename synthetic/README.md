# Synthetic corpus

Two fictional cohorts, structurally faithful to harmonized BDC data, for teams
building against the portal without touching participant data. For more detail
on each study population's properties, see [Cohorts](#cohorts) below.

Nothing here derives from real participants. Every coded value — CURIEs, enum
members, units — is taken from RTI's `priority_variables_transform` specs or
from BDCHM itself, so the corpus resolves against the same vocabulary as real
harmonized data.

## Why the corpus goes through dm-bip

The generator emits **dbGaP-style raw tables**, not harmonized output, and those
are transformed by dm-bip against BDCHM. Emitting BDCHM directly would be a
second implementation of the transformation, free to drift from the real one in
ways nobody would notice until a portal built on it met real data.

dm-bip makes two things out of that one set of inputs, and the corpus exercises
both: the **harmonized BDCHM records** (`make pipeline`, step 3) and the **BDC
variable library** (`make variable-library`, step 4). The drift argument covers
both equally — a hand-written variable library would be a second implementation
of the same extraction.

So the corpus is built in two halves, and the seam between them is a manual
step: the scripts here only write files, and turning those files into harmonized
BDCHM and a variable library is done by separate commands run from a dm-bip
checkout.

```
this repo ───────────────────────────────────────────────────────
  generate.py     ->  data/raw/<study>/*.txt.gz  ─┐
  specs.py        ->  specs/<study>/*.yaml       ─┼─ inputs
  fetch-bdchm.sh  ->  bdchm.yaml                 ─┘  (map-data only)
                                                  │
════ manual boundary: nothing above invokes dm-bip ═══════════════
                                                  │
a dm-bip checkout ────────────────────────────────┴────────────
  both take CONFIG=pipeline/<study>.mk SYNTH_DIR=... SYNTH_OUTPUT_DIR=...
  make pipeline          ->  output/<study>/mapped-data/   (harmonized BDCHM)
  make variable-library  ->  output/<study>/variable-library.yaml
```

## Running it

### 1. Generate the corpus

```bash
python generate.py          # Uses the study and participant level details defined in populution.py
                            # Generates .gz files in data/raw/study_one; raw tables, per study
python specs.py             # BDCHM-targeted transformation specs
python validate.py          # distributions and invariants
```

### 2. Fetch BDCHM

BDCHM is fetched rather than vendored, pinned to a release so an upstream change
is a deliberate bump here rather than a silent change in what the pipeline
produces:

```bash
./fetch-bdchm.sh          # currently v1.3.0
```

### 3. Harmonize (from a dm-bip checkout)

Run this step from the root of a [dm-bip](https://github.com/linkml/dm-bip)
checkout, not from this repo — `make pipeline` is dm-bip's target, and the paths
below reach back here through `SYNTH`.

This is **one cohort's** invocation — `study_two` is run the same way, with its
own config and its own output directory:

```bash
SYNTH=/path/to/synthetic
make pipeline CONFIG=$SYNTH/pipeline/example_study_one.mk \
              SYNTH_DIR=$SYNTH SYNTH_OUTPUT_DIR=$SYNTH/output/study_one
```

`SYNTH_DIR` is the `synthetic/` directory itself (as shown above); it
resolves each cohort's raw data, specs, and `bdchm.yaml`. Both variables
are required: omitting `SYNTH_OUTPUT_DIR` does not fail — output lands in
`output/ExampleStudyOne` inside the **dm-bip** checkout you are standing in, not
here.

`CONFIG` and `SYNTH_OUTPUT_DIR` must name the same cohort.
[linkml/dm-bip#357](https://github.com/linkml/dm-bip/issues/357) proposes that
the dm-bip pipeline aborts when an output directory already holds a different
study's products; until that lands, the correct pairing must be maintained by
the developer.

For the second cohort, change both together:

```bash
make pipeline CONFIG=$SYNTH/pipeline/example_study_two.mk \
              SYNTH_DIR=$SYNTH SYNTH_OUTPUT_DIR=$SYNTH/output/study_two
```

### 4. Extract the variable library

Generation of the **variable library** continues in the [dm-bip](https://github.com/linkml/dm-bip)
checkout. One BDC variable library entry per source variable named in the specs
is generated as a separate dm-bip target, deliberately not part of `make
pipeline`:

```bash
make variable-library CONFIG=$SYNTH/pipeline/example_study_one.mk \
                      SYNTH_DIR=$SYNTH SYNTH_OUTPUT_DIR=$SYNTH/output/study_one
```

The same cohort-alignment rule applies, and one consequence is specific to
this target: its output path is `$(DM_OUTPUT_DIR)/variable-library.yaml`, so
a mismatched pair overwrites the other cohort's library in place rather than
producing a second file next to it.

Its only inputs are the specs and the inferred schema
`output/study_one/ExampleStudyOne.yaml` — built in step 3, or on demand by make
if you run this target alone; validated and mapped data are never involved.
Being a file target, it prints "Nothing to be done" when the library is newer
than its inputs, so force a rebuild by removing
`output/study_one/variable-library.yaml`, not the output directory, which holds
the schema it reads.

#### What a successful run looks like

On `example_study_one` this emits 35 entries from 35 source variables (19
continuous, 16 categorical), byte-identical across runs. It warns that
variables carry a placeholder study id, because `specs/example_study_one` has
no `researchstudy.yaml` with a `phs` accession. What the tool does and how
each argument maps to a pipeline variable is documented upstream, in [Variable
Library](https://linkml.io/dm-bip/variable-library/).

## What is and isn't committed

The generator is committed. The corpus is not: it is 14MB of YAML, deterministic
given `SEED`, and would produce a 14MB diff every time the seed or the model
changed. Built corpora are distributed as release assets — 3MB compressed, with
a stable URL and a version, which is what a consuming team needs anyway.

`sample/` **is** committed — 40KB of hand-selected records covering every
structural feature the corpus claims. It exists so a reviewer, or a team
deciding whether this is the reference data they want, can see the output shape
without running the pipeline. Regenerate it with `python sample.py` after a run.

## Cohorts

Both cohorts are defined by the `Study` instances at the top of `population.py`;
the values below are those fields, and changing them there changes the corpus.

|  | Example Study One | Example Study Two |
|---|---|---|
| Participants | 500 | 500 |
| Visits | 3 | 5 |
| Sex skew | slightly male | slightly female |
| Race | 50/30/10/10 white, black, Asian, American Indian | 60/20/10/10 white, black, Middle Eastern, Native Hawaiian |
| BMI | continuous | categorical |

5% of Study Two's participants are the same individuals as in Study One. They
share a `dbGaP_Subject_ID`, so harmonization resolves them to one `Person` with
two `Participant` records — the same way real cross-study participation appears.

One visit per participant is `TELEHEALTH`; the rest are `STUDY_SITE_VISIT`.
Deceased participants stop attending, so nobody is measured after they die.

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
- `associated_evidence` on study-record-sourced conditions
- `exposure_status` distinguishing absent from present drug exposures
- Continuous and categorical presentations of the same concept across cohorts

Coverage against BDCHM's full slot inventory — the percentage of slots appearing
at least once — is intended as the acceptance number for broadening the corpus
beyond this first pass. **That measurement is not built yet.** This pass covers
the brief only.
