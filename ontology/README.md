# Ontology labels

Harmonized BDC data codes everything as a CURIE, and a CURIE is not readable.
Every interface has to show a label beside it, and the only defensible label is
the one the source vocabulary publishes.

So nothing here writes a label by hand. A CURIE either resolves against the
service that owns its vocabulary, or it is reported as unresolved and the
interface shows a gap.

## Where labels come from

| Vocabulary | Service | Why |
|---|---|---|
| MONDO, HP, OBA | Monarch KG | Types its synonyms — `exact_synonym` is separate from `narrow_synonym`, which is what makes synonym matching safe. Carries the is-a hierarchy too |
| MMO, NCBITaxon, other OBO | OLS4 | Broader OBO coverage than Monarch, for the terms Monarch does not hold |
| OMOP | OHDSI WebAPI | Athena is the usual route but its API refuses unauthenticated callers. The WebAPI serves the same vocabulary tables, no key needed |
| ATC, NDFRT | RxNav RxClass | The medication variables ask about a drug *class*, which is what ATC names |
| RxCUI | RxNav | Ingredient names |

ICD10CM has no free resolver, and the codes the corpus uses are chapter ranges
(`I20-I25`) rather than concepts, so they stay unresolved by design.

## Choosing between mappings

A concept usually carries several CURIEs and they are not interchangeable.
`emphysema` maps to both `MONDO:0004848` (ulcerative stomatitis) and
`MONDO:0004849` (pulmonary emphysema), so list order is a coin flip. Selection
runs in three passes, and which one won is recorded per concept as `matched_on`:

1. **`label`** — an ontology label that exactly matches the variable name. The
   strongest signal there is, and it beats vocabulary preference.
2. **`synonym`** — an exact synonym match. Catches the acronyms the variable
   library writes: `pad`, `mi`, `chf`, `copd`. Narrow synonyms never match.
3. **`priority`** — the vocabulary that suits the kind of variable: a disease
   named by a disease ontology, a measurement by an attribute ontology, a
   drug-class variable by a drug classification.

Anything that lands on `priority` with more than one candidate is a curation
problem, not a tie-break, so every rival is listed under "Mappings needing
review" in the generated `TERMS.md`.

## Building

```
python ontology/build.py --varlib path/to/BDC-VarLib/docs/schema/bdc_varlib.yaml
```

Writes `terms.json` (full records, for the UI) and `TERMS.md` (the human
handoff). Resolved terms are cached in `.cache.json`; delete it to refresh.

```
pytest ontology/tests/
```

Selection is tested offline against the mappings that were being labelled
wrongly before these rules existed.
