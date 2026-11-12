# Estimating facet combinations from summary tables

**Spike — every number here comes from synthetic populations; none is derived from participant data.**

The question: can the count for a combination of facets — women, 45–64, with type 2 diabetes,
on a statin — come from tables of how facets co-occur, built once, instead of aggregating
row-level data for every query? If so, a query never touches participant rows; only the
tables do, and they are built at release time inside the data boundary.

Short answer: yes, to within roughly 5–15% for three to five facets, **if** the tables go up
to three-way and stay exact. Pairwise tables alone plateau at 10–20% however large the study.
The deeper limit is not the estimator but the data: by five to seven facets most combinations
within one study are already below the reporting threshold.

## The estimate

The starting intuition was study size times the correlation of each applicable pair of facets.
Correlation coefficients cannot be used that way — they are zero for independent facets and
can be negative, so the product collapses toward zero — but the quantity that intuition
reaches for exists. It is *lift*, how much more often two facets co-occur than chance:

```
lift(A,B) = P(A and B) / (P(A) P(B))
N(A and B and C) ≈ N · P(A) P(B) P(C) · lift(A,B) · lift(A,C) · lift(B,C)
```

Multiplying lifts works but has bad outliers, because it double-counts when facets chain
(diabetes → metformin → statin). `estimate.py` instead finds the maximum-entropy joint that
agrees with every table inside the query, by iterative proportional fitting: each table is
collapsed to "has the selected value or not" on its facets, and the fit runs over the 2^k
cells of a k-facet query. Tables of order *r* make every query of up to *r* facets exact,
because the query's own table is among them; beyond that, the fit fills in the
interactions the tables do not record by assuming there are none.

## What we learned about modeling

Median relative error by true count, with the share of estimates within 20% in parentheses.
Rows without noise are pure modeling error.

**A clinical toy** (`evaluate.py toy`): 20,000 people, 11 facets, with two built-in
three-way effects — hypertension is more common in young men than young women but in old
women than old men, and asthma flips from boys to adult women. Four-facet queries:

| tables | 11–49 | 50–199 | 200–999 |
|---|---|---|---|
| up to 2-way | 20% (50%) | 9% (81%) | 6% (93%) |
| up to 3-way | 5% (94%) | 3% (100%) | 1% (100%) |

**The synthetic corpus** (`evaluate.py corpus --size 10000`): the corpus's own population model
at 10,000 per study, 20 facets. Four-facet queries, Study One:

| tables | 11–49 | 50–199 | 200–999 |
|---|---|---|---|
| up to 2-way | 14% (63%) | 5% (92%) | 2% (100%) |
| up to 3-way | 7% (93%) | 2% (100%) | 0% (100%) |

**Shaped like the HV transformation specs** (`evaluate.py hv`): each study's harmonized
variables and their BDCHM classes, read from its specs, at the study's dbGaP consented size.
Everything else — every prevalence and association — is invented, from a latent model in which
age, sex and social position drive cardiometabolic, lung, inflammatory, renal and blood
domains, and a general-health factor couples them all. Queries are "large segments": every
value covers at least 10% of the study.

Share of sampled combinations with at least 11 participants:

| study (participants, facets) | 3 facets | 4 facets | 5 facets | 7 facets |
|---|---|---|---|---|
| JHS (3,889, 82) | 62% | 25% | 7% | 0.5% |
| MESA (8,296, 116) | 76% | 37% | 11% | 3% |
| ARIC (15,687, 97) | 92% | 50% | 23% | 4% |
| WHI (143,213, 68) | 100% | 88% | 49% | 8% |

Error on those combinations, 11–49 / 50–199 participants (and 1,000+ for WHI):

| study | 4 facets, up to 2-way | 4 facets, up to 3-way | 5 facets, up to 2-way | 5 facets, up to 3-way |
|---|---|---|---|---|
| JHS | 11% / 10% | 6% / 3% | 21% / — | 8% / — |
| MESA | 12% / 9% | 9% / 2% | 17% / 10% | 11% / 3% |
| ARIC | 17% / 8% | 8% / 3% | 18% / 11% | 10% / 4% |
| WHI | 17% / 10% (8%) | 8% / 6% (1%) | 19% / 11% (18%) | 15% / 5% (5%) |

At seven facets in WHI, pairwise estimates for combinations of over 1,000 people are off by
31%, against 15% with three-way tables.

What these say:

1. **Pairs plateau, and study size does not help.** The pairwise error for large counts in
   the biggest study is the same as for small counts in a small one: it is the model's error,
   not sampling noise. It comes from interactions that only exist among three or more facets —
   effect modification by age and sex, and a shared unmeasured factor like general health.
2. **Three-way tables close most of the gap**: single digits for 50 or more participants and
   around 10% below that, at four and five facets.
3. **When dependence comes from a shared latent factor, almost every pair matters.** An
   earlier iteration of this spike selected a sparse "well-fitting" set of pairs from the data,
   in the HV-shaped population: with no noise at all, 164 selected pairs gave 75% median error
   and 656 gave 39%. A small set of selected three-way tables (40, anchored on demographics) did
   not help either; the higher-order signal is spread across many triples rather than
   concentrated in a few. Whether real harmonized data is that densely connected is the open
   question only the real data can answer.
4. **Five to seven facets mostly fall below the reporting threshold within a single study.**
   Even with large segments, the share of combinations reaching 11 participants drops fast
   with depth: in JHS, 25% at four facets and 7% at five. Deep combinations are a cross-study
   question — which is what a meta-analysis study builder is for — and the point where a user
   has moved from exploring to building, and exact counts belong.

For the interface, that suggests estimates for the broad exploration where they are good, shown
at the precision they have (rounded, or as ranges that widen as facets are added), and a
hand-off to exact counts as the combination narrows. A production estimator should also fit one
model to all the tables rather than one per query, so that adding a facet can never increase a
count.

## Privacy budget: if the tables got out

The tables are not something we would publish. They stay inside the data boundary, behind an
API that suppresses small counts and limits how many queries a user without data access can
make; that is the primary protection, and it is enforced where the architecture puts it.

The question here is narrower: **what if the artifact itself escaped?** A complete set of
low-order tables for a study is the raw material for reconstruction — the Census Bureau
rebuilt much of the 2010 census microdata from its own published tables — and small cells are
exactly what identifies people. So the tables can carry their own protection, as risk
mitigation that travels with the file rather than depending on the API around it.

That protection is differential privacy: add Gaussian noise to every cell, zeros included.
A participant falls in exactly one cell of every table, so with *T* tables the noise needed
for a privacy budget ρ is

```
sigma = sqrt(T / (2 rho))
```

The noise is set by the number of tables, not by the study's size, and *T* grows with the
square of the facet count for pairs and the cube for triples:

| facets | tables up to 2-way | sigma at ρ=2 | tables up to 3-way | sigma at ρ=2 |
|---|---|---|---|---|
| 20 | 210 | 7 | 1,350 | 18 |
| 70 | 2,485 | 25 | 57,225 | 120 |
| 100 | 5,050 | 36 | 166,750 | 204 |

ρ=2 is roughly ε=12.5 at δ=10⁻⁶; ρ=0.5 is roughly ε=5.8. Both are loose by the standards of
the literature, though within the range of real deployments (the 2020 census used a larger
budget).

What that costs. Four-facet queries in the HV-shaped studies at ρ=2, error for 11–49 /
50–199 / 200–999 participants, with the noise-free figure for comparison:

| study (sigma: pairs, triples) | up to 2-way, noisy | up to 2-way, no noise | up to 3-way, noisy | up to 3-way, no noise |
|---|---|---|---|---|
| JHS (29, 152) | 30% / 16% / — | 11% / 10% / — | 100% / 100% / — | 6% / 3% / — |
| MESA (41, 255) | 27% / 11% / 10% | 12% / 9% / 11% | 100% / 100% / 37% | 9% / 2% / 2% |
| ARIC (34, 195) | 19% / 12% / 9% | 17% / 8% / 8% | 100% / 100% / 20% | 8% / 3% / 1% |
| WHI (24, 115) | 17% / 12% / 5% | 17% / 10% / 5% | 83% / 28% / 10% | 8% / 6% / 1% |

- **Noisy pairs are affordable only with few facets or a large study.** With the corpus's 20
  facets, or in WHI, noisy pairs are within a point or two of exact ones. With 80–116 facets
  in JHS and MESA, noise doubles or triples the error under 50 participants at ρ=2, and is
  worse at ρ=0.5.
- **Noisy three-way tables at realistic facet counts are unusable** below a few hundred
  participants, even in WHI. The noise needed to protect 50,000–170,000 tables swamps the
  cells it protects.
- **Small studies and small counts pay most**, since the noise is the same absolute size
  whatever the cell.

So leak resilience and accuracy pull against each other, and the three-way tables that make
the estimates good are exactly the ones that cannot carry meaningful noise. The compromises
worth weighing:

- Keep exact three-way tables strictly inside the boundary, as the working index the API
  estimates from, and accept that their protection is the boundary itself.
- If any artifact has to travel — a cache, a copy for another environment — make it noisy
  pairs at a deliberately loose budget. That would not satisfy anyone publishing the tables,
  but a leaked table would no longer pin down any one person's cell.
- Cut the number of tables rather than the budget: coarser concepts, or fewer facets in
  whatever travels, since the noise grows with the square root of the table count.

`evaluate.py --rho` measures the cost of any of these for a given study. Answering live queries
with noise instead would not compose — every answer spends budget — which is why noise, if
used, belongs on the tables, once.

## Running it

From this directory:

```bash
uv run --with numpy pytest .                    # the estimator's guarantees
uv run evaluate.py toy
uv run evaluate.py corpus --size 10000
uv run evaluate.py hv --specs <NHLBI-BDC-DMC-HV>/priority_variables_transform --study ARIC,WHI --min-share 0.10
```

`evaluate.py` declares numpy inline, so `uv run` needs nothing from the project.
`--facets`, `--rho`, `--queries` and `--min-share` set the query sizes, noise budgets, sample
size and how large a segment each value must be.

## Caveats

- Every association is invented. The HV-shaped population takes its structure from the real
  specs and dbGaP sizes, and its density of dependence from our assumptions — and that density
  is what finding 3 hinges on. Running `evaluate.py`'s comparison on real harmonized data,
  inside the data boundary, is the test that settles it.
- The HV-shaped population reads only each spec's name and target class. It writes nothing to
  disk and carries no accessions.
- Queries are random large segments, not a real workload. A user who starts broad and adds
  modifiers stays on common values, where counts are larger and estimates better, so how deep
  real use goes is worth measuring rather than assuming.
- The estimator fits each query on its own. That is fine for measuring error, but not what a
  production version should do (above).
