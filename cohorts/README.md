# Cohort corpora

Synthetic data for the **real** transformation specs of any BDC cohort, so the dm-bip variable
library chain runs end to end — `make schema-create` through `make variable-library` with live
dbGaP enrichment — without any participant data.

The specs are the fixed input, pulled from the [NHLBI-BDC-DMC-HV repository](https://github.com/RTIInternational/NHLBI-BDC-DMC-HV). A corpus exists to give them something to run against.

Distinct from [`../synthetic`](../synthetic), which invents its own accessions and models a
population, these declare a cohort's real accessions so dbGaP's own dictionaries describe their
columns, and they depend on dm-bip to read the specs and fetch those dictionaries.

The `generate.py` script lives within `study-palette/cohorts`, it depends upon `dm-bip` and should
be run from inside a `dm-bip`checkout, as outlined in the [Running It](#running-it) section below.

## Nothing here is authored by hand

`generate.py` derives a whole corpus from two inputs, the cohort key and its specs directory:

- **which tables and columns** — from the specs. `collect_variables` over the cohort's
  `*-ingest` directory names the variables; each table gets exactly the `phv` columns its specs
  name.
- **each column's type, unit, bounds and code set** — from schema-automator's canonical
  data dictionary rendering of the `data_dict`/`var_report` pair dbGaP publishes for that
  table, the same adapter the pipeline's `adapt-digests` target runs. Coded variables draw
  from their real codes; numeric ones draw inside the `var_report`'s observed min/max, and
  inside 0–100 when it reports none (the adapter does not yet carry dbGaP's declared
  logical bounds).
- **the cell values** — the only invented part. Deterministic given `SEED`, the specs and the
  cached digests.

Because the columns are modelled on the same dictionaries that later enrich them, the round
trip is meaningful: `schema-create` produces a genuine schema-automator product over real
accessions, and `--cohort` annotates them from the source they were shaped by.

## Layout

One generator and one config serve every cohort. Each cohort gets its own tree, so two
cohorts never mix tables in one directory:

```
cohorts/
  generate.py  config.mk  README.md  .gitignore    committed
  .dbgap-cache/                                    shared digest cache, gitignored
  aric/
    data/raw/     generate.py --cohort aric writes here
    output/       make ... COHORT=aric writes here
  jhs/
    data/raw/
    output/
```

The cache is shared because dm-bip keys it by cohort internally and the cohort manifests it
downloads are common to all of them.

## Running it

The generator reads the specs and the digests through dm-bip, so every step runs from the
dm-bip checkout — `uv run` resolves the project from the working directory, and standing
anywhere else picks up the wrong environment. Until [linkml/dm-bip#376][dm-bip-376] merges,
that checkout has to be on its `variable-mapping-rb` branch: `main` has the digest fetcher
but not the spec reader the generator imports.

[dm-bip-376]: https://github.com/linkml/dm-bip/pull/376

```sh
SYNTH=/path/to/study-palette/cohorts
SPECS=/path/to/NHLBI-BDC-DMC-HV/priority_variables_transform/

cd /path/to/dm-bip
# ~4 min cold for ARIC: fetches 326 digests, writes 163 tables
uv run python $SYNTH/generate.py --cohort aric --specs $SPECS

make schema-create    CONFIG=$SYNTH/config.mk COHORT=aric
make variable-library CONFIG=$SYNTH/config.mk COHORT=aric
```

`--cohort` is the key from the dbGaP cohort manifest (`aric`, `jhs`, ...), and `--specs` the
matching `*-ingest` directory. Both are required; the generator does not infer the cohort from
the specs because not every cohort's `researchstudy.yaml` carries an accession. Pass
`--no-fetch` to work from an already-populated cache.

`config.mk` is self-locating and derives every dm-bip setting from `COHORT`, which defaults
to `aric`. The specs directory it hands dm-bip defaults to
`~/Developer/NHLBI-BDC-DMC-HV/priority_variables_transform/<COHORT>-ingest` with the key
upper-cased; override `SPECS` if your checkout lives elsewhere or the directory is named
differently:

```sh
make schema-create CONFIG=$SYNTH/config.mk COHORT=jhs SPECS=/path/to/JHS-ingest
```

Observed 2026-09-25, both cohorts run through `make variable-library`:

| Cohort | Tables | Entries | Continuous | Categorical | Datasets with a dbGaP dictionary |
|---|---|---|---|---|---|
| `aric` | 164 | 1312 | 677 | 635 | 163 of 164 |
| `jhs` | 45 | 456 | 365 | 91 | 45 of 45 |

Nothing unclassified in either. For ARIC, 1298 of the 1312 entries carry dbGaP metadata;
for JHS all 456 do.

Regenerated 2026-10-06 against HV `53f03e3`: the ARIC specs now name 1287 variables across
163 datasets, every one with a dbGaP dictionary, and JHS is unchanged at 456 across 45. The
variable-library columns above are from the September run.

## Labelling and publication

These corpora are the case `CLAUDE.md` singles out: **synthetic data generated against real
transformation specs, which is never published.** Their tables carry real `phs`, `pht` and
`phv` accessions, so a file that escaped would look exactly like an export of
controlled-access data.

Each stays a transient local artifact. `data/`, `output/` and `.dbgap-cache/` are gitignored
at any depth, nothing is committed, and nothing is attached to a release. Every raw table is
named `SYNTHETIC.phs…` and carries a header naming the cohort and stating the records are not
derived from participant data, so a stray `.txt.gz` is identifiable without opening it.

Contrast [`../synthetic`](../synthetic), which is built on fictional accessions and *is*
publishable. The distinction is the accessions, not the data.

## The two gaps, both real

- **A variable the specs file under two datasets** collapses to one — `sole_dataset` takes
  the lower accession — and when that dataset's dictionary does not declare it, the column
  comes out as plain integers under its bare `phv` name. In ARIC that is `phv00516587`,
  PFTB's subject id (`pht012835`), which two PULM21 (`pht004148`) blocks in
  `spirometry.yaml` reference in place of PULM21's own `phv00209123`. The spec error is
  reported as [NHLBI-BDC-DMC-HV#880][hv-880]; [#59][sp-59] proposes that the generator stop
  collapsing and emit the column into every dataset that names it, which is what the specs
  will read anyway. A table dbGaP never described would come out the same way, carrying
  identity only; ARIC's `pht015212`, which earlier spec revisions named, is no longer in the
  specs as of HV `53f03e3`. JHS has neither case.

[hv-880]: https://github.com/RTIInternational/NHLBI-BDC-DMC-HV/issues/880
[sp-59]: https://github.com/tis-lab/study-palette/issues/59
- Values are drawn independently per column, so nothing is internally consistent: BMI does
  not follow from height and weight, and a participant's exam-2 measures bear no relation to
  their exam-1 ones. The corpora exercise the *metadata* path, not analysis.
