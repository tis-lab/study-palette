# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy>=1.26"]
# ///
"""
Compare estimated counts with true counts on a synthetic population.

    uv run evaluate.py toy
    uv run evaluate.py corpus --size 10000
    uv run evaluate.py hv --specs ~/Code/NHLBI-BDC-DMC-HV/priority_variables_transform --study ARIC,WHI
"""

import argparse

import numpy as np
import populations
from estimate import Tables, estimate

BASELINE = {"no", "normal"}
BANDS = [(11, 50), (50, 200), (200, 1000), (1000, None)]
MIN_COUNT = 11


def draw_queries(pop, k, count, min_share, rng):
    """Random combinations of k facet values, each value held by at least `min_share` of participants."""
    n = len(pop.X)
    values = [(f, v) for f in range(len(pop.names)) for v in range(pop.card[f])
              if pop.labels[f][v] not in BASELINE and (pop.X[:, f] == v).mean() >= min_share]
    queries = set()
    for _ in range(count * 20):
        if len(queries) == count:
            break
        picks = [values[i] for i in rng.choice(len(values), k, replace=False)]
        if len({f for f, _ in picks}) == k:
            queries.add(tuple(sorted(picks)))
    out = []
    for q in queries:
        mask = np.ones(n, bool)
        for f, v in q:
            mask &= pop.X[:, f] == v
        out.append((q, int(mask.sum())))
    return out


def band_of(t):
    """Return the count band a true count falls in."""
    return next(b for b in BANDS if t >= b[0] and (b[1] is None or t < b[1]))


def label_of(band):
    """Column heading for a count band."""
    return f"{band[0]}+" if band[1] is None else f"{band[0]}-{band[1] - 1}"


def report(pop, ks, rhos, count, min_share, seed):
    """Print the error table for one population."""
    rng = np.random.default_rng(seed)
    n, F = pop.X.shape
    print(f"\n### {pop.name}: {n} participants, {F} facets ({sum(pop.card)} values)\n")
    configs = [(order, rho) for order in (2, 3) for rho in [None, *rhos]]
    tables = {c: Tables(pop.X, pop.card, c[0], c[1], seed) for c in configs}
    for k in ks:
        qs = [(q, t) for q, t in draw_queries(pop, k, count, min_share, rng) if t >= MIN_COUNT]
        drawn = count if qs else 0
        print(f"{k} facets: {len(qs)} of {drawn} sampled combinations have at least {MIN_COUNT} participants\n")
        if not qs:
            continue
        bands = [b for b in BANDS if any(band_of(t) == b for _, t in qs)]
        print("| tables | noise sd | " + " | ".join(f"{label_of(b)} (n={sum(band_of(t) == b for _, t in qs)})"
                                              for b in bands) + " | hidden |")
        print("|---|---|" + "---|" * len(bands) + "---|")
        for (order, rho), tb in tables.items():
            errors = {b: [] for b in bands}
            hidden = 0
            for q, t in qs:
                e = estimate(q, tb)
                errors[band_of(t)].append(abs(e - t) / t)
                hidden += t >= 20 and e < MIN_COUNT
            name = f"up to {order}-way" + (f", rho={rho}" if rho else "")
            cells = " | ".join(f"{np.median(errors[b]):.0%} ({np.mean(np.array(errors[b]) <= 0.2):.0%})"
                               for b in bands)
            print(f"| {name} | {tb.sigma:.0f} | {cells} | {hidden} |")
        print()


def main():
    """Parse arguments and report each requested population."""
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("population", choices=["toy", "corpus", "hv"])
    p.add_argument("--size", type=int, help="corpus: participants per study (default 500)")
    p.add_argument("--specs", help="hv: path to NHLBI-BDC-DMC-HV priority_variables_transform")
    p.add_argument("--study", default="JHS,MESA,ARIC,WHI", help="hv: comma-separated studies")
    p.add_argument("--facets", default="4,5", help="query sizes, comma-separated")
    p.add_argument("--rho", default="0.5,2", help="zCDP budgets for the noisy rows, comma-separated")
    p.add_argument("--queries", type=int, default=400, help="combinations sampled per query size")
    p.add_argument("--min-share", type=float, default=0.05, help="smallest share of participants a value covers")
    p.add_argument("--seed", type=int, default=1)
    args = p.parse_args()

    if args.population == "toy":
        pops = [populations.toy()]
    elif args.population == "corpus":
        pops = populations.corpus(args.size)
    else:
        if not args.specs:
            p.error("hv needs --specs")
        pops = [populations.hv(s, args.specs) for s in args.study.split(",")]

    ks = [int(k) for k in args.facets.split(",")]
    rhos = [float(r) for r in args.rho.split(",") if r]
    print("Median relative error by true count, with the share within 20% in parentheses.")
    print(f"'hidden' counts combinations with 20 or more participants estimated below {MIN_COUNT}.")
    for pop in pops:
        report(pop, ks, rhos, args.queries, args.min_share, args.seed)


if __name__ == "__main__":
    main()
