"""
Emit synthetic dbGaP-format tables for exactly the variables ARIC-ingest's specs name.

The transformation specs are the fixed input — this corpus exists to give them data to run
against. Nothing here is authored by hand: the tables and columns come from the specs, and
each column's type, unit, bounds and code set come from the ``data_dict``/``var_report`` pair
dbGaP publishes for that table. Only the cell values are invented.

That makes the whole chain runnable with no participant data: schema-create over this corpus
produces a real schema-automator product typing the real accessions, and extraction with
--cohort aric enriches from the same dictionaries the columns were modelled on.

    ARIC_SYNTH=/path/to/study-palette/aric
    cd /path/to/dm-bip
    uv run python $ARIC_SYNTH/generate.py [--specs DIR] [--out DIR] [--n 500]
"""

import argparse
import gzip
import random
import sys
from pathlib import Path

try:
    from dm_bip.mapping_prov.extract import collect_spec_paths
    from dm_bip.prepare_study.fetch_digests import (
        cached_digests, fetch_digests, load_cohorts, pair_digests,
    )
    from dm_bip.variable_lib.dbgap import load_tables
    from dm_bip.variable_lib.extract import collect_variables
except ModuleNotFoundError as exc:  # pragma: no cover - an invocation error, not a code path
    sys.exit(
        f"{exc}\n\n"
        "This generator reads the specs and dbGaP digests through dm-bip, so it runs from\n"
        "the dm-bip checkout — uv resolves the project from the working directory:\n\n"
        f"    ARIC_SYNTH={Path(__file__).resolve().parent}\n"
        "\n"
        "    cd /path/to/dm-bip\n"
        "    uv run python $ARIC_SYNTH/generate.py\n"
    )

SEED = 20260910
NULL_RATE = 0.005
COHORT = "aric"
CITATION = (
    "Synthetic records under real ARIC variable accessions. Not derived from participant "
    "data. Values are generated; the accessions, types and units are dbGaP's own."
)
NUMERIC = {"integer", "decimal", "float", "double", "numeric", "continuous", "real"}


def bounds(var, fallback):
    """Prefer what was observed over what was declared, and fall back to a sane range."""
    for lo, hi in ((var.stat_min, var.stat_max), (var.logical_min, var.logical_max)):
        try:
            if lo is not None and hi is not None and float(lo) < float(hi):
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
    ap.add_argument("--specs", type=Path,
                    default=Path.home() / "Developer/NHLBI-BDC-DMC-HV/priority_variables_transform/ARIC-ingest")
    ap.add_argument("--out", type=Path, default=here / "data" / "raw")
    ap.add_argument("--cache", type=Path, default=here / ".dbgap-cache")
    ap.add_argument("--n", type=int, default=500)
    ap.add_argument("--no-fetch", action="store_true", help="use only what is already cached")
    args = ap.parse_args()

    # Read the specs
    records = collect_variables(collect_spec_paths([args.specs]))
    wanted: dict[str, list[str]] = {}
    for acc, rec in records.items():
        wanted.setdefault(rec.sole_dataset(), []).append(acc)
    print(f"specs name {len(records)} variables across {len(wanted)} datasets")

    # Load the cohort, then fetch or read the cached dbGaP digests
    cohort = load_cohorts(cache_dir=args.cache)[COHORT]
    if args.no_fetch:
        digests = cached_digests(cohort, args.cache, datasets=set(wanted))
    else:
        digests = fetch_digests(cohort, cache_root=args.cache, datasets=set(wanted))
    tables = load_tables(pair_digests(digests))
    print(f"{len(tables)} of {len(wanted)} datasets have a dbGaP dictionary")

    # Seed the RNG, and number the subjects — fixed ids, the same in every table
    rng = random.Random(SEED)
    args.out.mkdir(parents=True, exist_ok=True)
    subjects = [(900000 + i, f"A{100000 + i}") for i in range(args.n)]
    undescribed = 0

    # Write each pht table
    for pht, accs in sorted(wanted.items()):
        table = tables.get(pht)
        name = (table.source_file.split(".")[4] if table else "UNKNOWN")
        # Subject-identifier columns repeat the study's own id rather than a drawn value.
        ids = {a for a in accs
               if table and (v := table.variables.get(a)) and "subject" in (v.name or "").lower()}
        undescribed += sum(1 for a in accs if not (table and a in table.variables))

        path = args.out / f"phs000280.v8.{pht}.v1.p2.c1.{name}.txt.gz"
        with gzip.open(path, "wt", newline="") as fh:
            fh.write(f"# Study accession: phs000280.{cohort.data_version}\n")
            fh.write(f"# Table accession: {pht}\n")
            fh.write(f"# Table name: {name}\n")
            fh.write(f"# Citation: {CITATION}\n")
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

    print(f"\n{len(wanted)} tables into {args.out}")
    if undescribed:
        print(f"{undescribed} spec variables have no dbGaP dictionary entry; "
              f"emitted as plain integers")


if __name__ == "__main__":
    main()
