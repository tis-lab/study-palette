# ARIC corpus

Synthetic data for the **real** ARIC transformation specs, so the dm-bip variable library
chain runs end to end — `make schema-create` through `make variable-library` with live dbGaP
enrichment — without any participant data.

The specs are the fixed input. This corpus exists to give them something to run against.

Distinct from [`../synthetic`](../synthetic), which invents its own accessions and models a
population. This one declares ARIC's real accessions so dbGaP's own dictionaries describe its
columns, and it depends on dm-bip to read the specs and fetch those dictionaries.

## Nothing here is authored by hand

`generate.py` derives the whole corpus:

- **which tables and columns** — from the specs. `collect_variables` over
  `ARIC-ingest` yields 1312 variables across 164 datasets; each table gets exactly the `phv`
  columns its specs name.
- **each column's type, unit, bounds and code set** — from the `data_dict`/`var_report` pair
  dbGaP publishes for that table. Coded variables draw from their real codes; numeric ones
  draw inside the observed `stat_min`/`stat_max`, falling back to declared logical bounds.
- **the cell values** — the only invented part. Deterministic given `SEED`.

Because the columns are modelled on the same dictionaries that later enrich them, the round
trip is meaningful: `schema-create` produces a genuine schema-automator product over real
accessions, and `--cohort aric` annotates them from the source they were shaped by.

## Running it

The generator reads the specs and the digests through dm-bip, so every step runs from the
dm-bip checkout — `uv run` resolves the project from the working directory, and standing
anywhere else picks up the wrong environment.

```sh
ARIC_SYNTH=/path/to/study-palette/aric

cd /path/to/dm-bip
# ~3 min cold: fetches 326 digests, writes 164 tables
uv run python $ARIC_SYNTH/generate.py

make schema-create    CONFIG=$ARIC_SYNTH/config.mk
make variable-library CONFIG=$ARIC_SYNTH/config.mk
```

`config.mk` is self-locating, so `CONFIG` is the only path you pass to `make`.

The specs directory defaults to
`~/Developer/NHLBI-BDC-DMC-HV/priority_variables_transform/ARIC-ingest` in two places, and
each is set separately if your checkout is elsewhere: `generate.py` takes `--specs DIR`, and
`config.mk` reads `ARIC_SPECS` (`make schema-create CONFIG=... ARIC_SPECS=DIR`). Pass
`--no-fetch` to `generate.py` to work from an already-populated cache.

Observed 2026-09-10:

```
1312 entries from 1312 source variables (677 continuous, 635 categorical)
```

Nothing unclassified. 1298 of the 1312 carry dbGaP metadata — 226 with units, 558 with
bounds, 472 with coded values.

## Labelling and publication

This corpus is the case `CLAUDE.md` singles out: **synthetic data generated against real
transformation specs, which is never published.** Its tables carry real `phs`, `pht` and
`phv` accessions, so a file that escaped would look exactly like an export of
controlled-access data.

It stays a transient local artifact. `data/`, `output/` and `.dbgap-cache/` are gitignored,
nothing is committed, and nothing is attached to a release. Every raw table is named
`SYNTHETIC.phs000280.…` and carries a header stating it is not derived from participant data,
so a stray `.txt.gz` is identifiable without opening it.

Contrast [`../synthetic`](../synthetic), which is built on fictional accessions and *is*
publishable. The distinction is the accessions, not the data.

## The two gaps, both real

- **`pht015212`** is named by the specs but dbGaP has never published a dictionary for it.
  Its 14 variables are emitted as plain integers and come out carrying identity only. This is
  the same table the chain documentation counts as "one of which dbGaP never published a
  dictionary for".
- Values are drawn independently per column, so nothing is internally consistent: BMI does
  not follow from height and weight, and a participant's exam-2 measures bear no relation to
  their exam-1 ones. The corpus exercises the *metadata* path, not analysis.
