# Ontology labels

Harmonized BDC data codes everything as a CURIE, and a CURIE is not readable.
Every interface has to show a label beside it, and the only defensible label is
the one the source vocabulary publishes.

So nothing here writes a label by hand. A CURIE either resolves against the
service that owns its vocabulary, or it is reported as unresolved and the
interface shows a gap.

## The CURIE is the unit, not the variable name

The trans-specs emit BDCHM records whose concept slots carry a CURIE —
`condition_concept` on a Condition, `observation_type` on a
MeasurementObservation, `drug_concept` on a DrugExposure. That CURIE is what
lands in harmonized data and what a query filters on.

The spec *filename* is not a concept. `hist_cvd.yaml` produces records coded to
eleven different MONDO and HP terms; the string "hist_cvd" appears nowhere
inside the file, nowhere in BDCHM, and nowhere in the data. Treating it as a
term forces a false choice — one label for eleven conditions — and that is what
produced labels like "History of cardiac arrest" for a general cardiovascular
history variable.

Variable names are carried as provenance, and used at build time to scope which
specs are read. Nothing downstream keys on them or displays them.

## Where labels come from

| Vocabulary | Service | Why |
|---|---|---|
| MONDO, HP, OBA | Monarch KG | Types its synonyms — `exact_synonym` is separate from `narrow_synonym` — and carries the is-a hierarchy |
| MMO, NCBITaxon, other OBO | OLS4 | Broader OBO coverage, for terms Monarch does not hold |
| OMOP | OHDSI WebAPI | Athena is the usual route but its API refuses unauthenticated callers. The WebAPI serves the same vocabulary tables, no key needed |
| ATC, NDFRT | RxNav RxClass | The medication variables emit a drug *class*, which is what ATC names |
| RxCUI | RxNav | Ingredient names |

ICD10CM has no free resolver, and the codes the corpus uses are chapter ranges
(`I20-I25`) rather than concepts, so they stay unresolved by design.

Specs under `_archive/` are skipped. They carry stale and occasionally
malformed codes — `RxCUI:C02` is an ATC class written under the wrong prefix —
that no current harmonization emits.

## Building

```
python -m ontology.build --specs path/to/NHLBI-BDC-DMC-HV/priority_variables_transform
```

Run from the repository root — `ontology` is a package, so `build` imports its
siblings by name rather than relying on the working directory.

Writes `terms.json` (full records, for the UI) and `TERMS.md` (the human
handoff). `--all` reads every spec rather than the proof-of-concept focus
areas. Resolved terms are cached in `.cache.json`; delete it to refresh.

```
pytest ontology/tests/
```

Extraction is tested offline, on the cases that made the first attempt wrong:
CURIEs hidden inside `case(...)` expressions, several concepts in one spec, and
accessions that look enough like CURIEs to be swept up.
