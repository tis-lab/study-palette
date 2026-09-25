# ruff: noqa: S311
"""
Emit synthetic dbGaP-format tables for exactly the variables a cohort's specs name.

The transformation specs are the fixed input — this corpus exists to give them data to run
against. Nothing here is authored by hand: the tables and columns come from the specs, and
each column's type, unit, bounds and code set come from the ``data_dict``/``var_report`` pair
dbGaP publishes for that table. Only the cell values are invented.

That makes the whole chain runnable with no participant data: schema-create over this corpus
produces a real schema-automator product typing the real accessions, and extraction with
--cohort enriches from the same dictionaries the columns were modelled on.

    SYNTH=/path/to/this/directory
    cd /path/to/dm-bip
    uv run python $SYNTH/generate.py --cohort KEY --specs DIR [--out DIR] [--n 500]
"""

import argparse
import gzip
import random
import sys
from pathlib import Path

try:
    from dm_bip.mapping_prov.extract import collect_spec_paths
    from dm_bip.prepare_study.fetch_digests import cached_digests, fetch_digests, load_cohorts, pair_digests
    from dm_bip.variable_lib.dbgap import load_tables
    from dm_bip.variable_lib.extract import collect_variables
except ModuleNotFoundError as exc:  # pragma: no cover - an invocation error, not a code path
    sys.exit(
        f"{exc}\n\n"
        "This generator reads the specs and dbGaP digests through dm-bip, so it runs from\n"
        "the dm-bip checkout — uv resolves the project from the working directory:\n\n"
        f"    SYNTH={Path(__file__).resolve().parent}\n"
        "\n"
        "    cd /path/to/dm-bip\n"
        "    uv run python $SYNTH/generate.py --cohort KEY --specs DIR\n"
    )

SEED = 20260910
NULL_RATE = 0.005
# Required by the labelling policy in CLAUDE.md, and doubly so here: these tables carry real
# dbGaP accessions, so an unlabelled file that escapes its directory looks exactly like an
# export of controlled-access data. Same marker and placement as synthetic/generate.py, whose
# comment covers why a prefix beats a suffix. dm-bip locates the table with an unanchored
# search for `pht[0-9]+`, so this does not disturb the pipeline.
SYNTHETIC_MARKER = "SYNTHETIC"
CITATION = (
    "Synthetic records under real {cohort} variable accessions. Not derived from participant "
    "data. Values are generated; the accessions, types and units are dbGaP's own."
)
NUMERIC = {"integer", "decimal", "float", "double", "numeric", "continuous", "real"}


def bounds(var, fallback):
    """
    Prefer what was observed over what was declared, and fall back to a sane range.

    An equal pair is a constant-valued variable, not a missing range: every draw must land
    on that one value, so it is kept rather than widened to the fallback.
    """
    for lo, hi in ((var.stat_min, var.stat_max), (var.logical_min, var.logical_max)):
        try:
            if lo is not None and hi is not None and float(lo) <= float(hi):
                return float(lo), float(hi)
        except (TypeError, ValueError):
            pass
    return fallback


def draw(rng, var):
    """Draw one plausible cell for this variable, respecting what dbGaP declares about it."""
    if var is None:
        return str(rng.randint(1, 999))
    if var.values:
        return rng.choice([v.code for v in var.values if v.code not in (None, "")] or ["1"])
    kind = (var.calculated_type or var.reported_type or "").strip().lower()
    if kind.startswith("enum"):
        return str(rng.randint(0, 3))
    if any(w in kind for w in NUMERIC):
        lo, hi = bounds(var, (0.0, 100.0))
        mid, spread = (lo + hi) / 2, max((hi - lo) / 6, 1e-6)
        value = min(max(rng.gauss(mid, spread), lo), hi)
        return str(int(round(value))) if "int" in kind else f"{value:.2f}"
    lo, hi = bounds(var, (0.0, 100.0))
    return f"{min(max(rng.gauss((lo + hi) / 2, max((hi - lo) / 6, 1e-6)), lo), hi):.1f}"


def main():
    """Read the specs, model every named column on its dbGaP digest, and write the corpus."""
    here = Path(__file__).parent
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--cohort", required=True, help="cohort key from the manifest, e.g. aric or jhs")
    ap.add_argument("--specs", type=Path, required=True,
                    help="path to cohort specs, e.g. NHLBI-BDC-DMC-HV/priority_variables_transform/ARIC-ingest")
    ap.add_argument("--out", type=Path, help="defaults to <this directory>/<cohort>/data/raw")
    ap.add_argument("--cache", type=Path, default=here / ".dbgap-cache")
    ap.add_argument("--n", type=int, default=500)
    ap.add_argument("--no-fetch", action="store_true", help="use only what is already cached")
    args = ap.parse_args()
    # Each cohort gets its own tree, so two cohorts never mix tables in one directory.
    out = args.out or here / args.cohort / "data" / "raw"

    # Read the specs
    records = collect_variables(collect_spec_paths([args.specs]))
    wanted: dict[str, list[str]] = {}
    for acc, rec in records.items():
        wanted.setdefault(rec.sole_dataset(), []).append(acc)
    print(f"specs name {len(records)} variables across {len(wanted)} datasets")

    # Load the cohort, then fetch or read the cached dbGaP digests
    cohort = load_cohorts(cache_dir=args.cache)[args.cohort]
    citation = CITATION.format(cohort=cohort.display_name)
    if args.no_fetch:
        digests = cached_digests(cohort, args.cache, datasets=set(wanted))
    else:
        digests = fetch_digests(cohort, cache_root=args.cache, datasets=set(wanted))
    tables = load_tables(pair_digests(digests))
    print(f"{len(tables)} of {len(wanted)} datasets have a dbGaP dictionary")

    # Seed the RNG, and number the subjects — fixed ids, the same in every table
    rng = random.Random(SEED)
    out.mkdir(parents=True, exist_ok=True)
    subjects = [(900000 + i, f"A{100000 + i}") for i in range(args.n)]
    undescribed = 0

    # The study version and participant set come from the cohort manifest ("v8.p2")
    study_version, participant_set = cohort.data_version.split(".", 1)

    # Write each pht table
    for pht, accs in sorted(wanted.items()):
        table = tables.get(pht)
        # The data_dict is named `phs000280.v8.pht001440.v6.ARIC_Subject.data_dict.xml`:
        # the study, its version, the table and *its* version, then the table's name.
        # Take those from the digest so the file is named for the dictionary that shaped it;
        # a table dbGaP never described falls back to the cohort and a nominal version.
        if table:
            phs, phs_version, _, pht_version, name = table.source_file.split(".")[:5]
        else:
            phs, phs_version, pht_version, name = cohort.study_id, study_version, "v1", "UNKNOWN"
        # Subject-identifier columns repeat the study's own id rather than a drawn value.
        ids = {a for a in accs
               if table and (v := table.variables.get(a)) and "subject" in (v.name or "").lower()}
        undescribed += sum(1 for a in accs if not (table and a in table.variables))

        path = out / (f"{SYNTHETIC_MARKER}.{phs}.{phs_version}.{pht}.{pht_version}"
                           f".{participant_set}.c1.{name}.txt.gz")
        with gzip.open(path, "wt", newline="") as fh:
            fh.write(f"# Study accession: {phs}.{phs_version}.{participant_set}\n")
            fh.write(f"# Table accession: {pht}\n")
            fh.write(f"# Table name: {name}\n")
            fh.write(f"# Citation: {citation}\n")
            fh.write("#\n")
            fh.write("##\t" + "\t".join(accs) + "\n")
            fh.write("dbGaP_Subject_ID\t" + "\t".join(
                (table.variables[a].name if table and a in table.variables else a) for a in accs) + "\n")
            fh.write("\n")
            for dbgap_id, subject_id in subjects:
                cells = [str(dbgap_id)]
                for a in accs:
                    var = table.variables.get(a) if table else None
                    if a in ids:
                        cells.append(subject_id)
                    elif rng.random() < NULL_RATE:
                        cells.append("")
                    else:
                        cells.append(draw(rng, var))
                fh.write("\t".join(cells) + "\n")

    print(f"\n{len(wanted)} tables into {out}")
    if undescribed:
        print(f"{undescribed} spec variables have no dbGaP dictionary entry; "
              f"emitted as plain integers")


if __name__ == "__main__":
    main()
