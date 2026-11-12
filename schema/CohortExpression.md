# Cohort Expression Model (`bdchm_cohort_expression`)

**Schema:** `bdchm_cohort_expression.yaml` · **Version:** 0.1.0 · **Imports:** `linkml:types`, `bdchm`
**Examples:** `examples/cohort-expression/CohortExpression-SimpleBool.yaml`, `examples/cohort-expression/CohortExpression-Temporal.yaml`

## Purpose

A cohort expression describes which participants a researcher wants, in terms of the BDC-HM records those participants have. It is the single language used across the cohort builder: live counts, criteria refinement, saved cohorts and provisioning all read the same expression.

The model has two goals:

- **Keep BDC-HM's meaning.** Every criterion names a BDC-HM class and constrains that class's own slots and enum values. Nothing is recoded or converted to OMOP, so a cohort can always be traced back to the harmonized records.
- **Be validated like everything else.** The structure is a LinkML schema, so the API, the UI and saved cohorts share one definition of what a valid expression is.

## Design at a glance

The structure borrows the concepts of OHDSI's Circe cohort definitions (an index event, inclusion rules, time windows and occurrence counts) and adds a boolean tree that nests to any depth. One model covers two shapes:

| Shape | Uses | Accepted by |
| --- | --- | --- |
| Boolean | `criteria` only | Live counts (stages 1–3) and refinement |
| Temporal | `criteria`, plus `index_event` and `inclusion_rules` | Refinement (stage 4) and later |

A researcher who starts with a boolean expression and adds a time window keeps the same expression; nothing is translated between stages.

## Structure

| Class | Role |
| --- | --- |
| `CohortExpression` | Root. Holds `release`, `missing_time`, `criteria`, and optionally `index_event` and `inclusion_rules`. |
| `CriteriaNode` | Exactly one of `criterion` or `group`. |
| `CriteriaGroup` | `all` (and), `any` (or, at least two members), `none` (not recorded). Groups contain nodes, so they nest. |
| `Criterion` | Abstract. Subclasses are chosen by `criterion_type`. |
| `EventCriterion` | Abstract. Adds `concept`, `include_descendants`, `status` and `time_anchor` for dated record types. |
| `IndexEvent` | The record windows are measured from: a criterion plus `FIRST` or `LAST`. |
| `InclusionRule` | A named rule: `criteria`, an optional `window`, and a required `occurrence`. |
| `Window` | `start_days_after_index` and `end_days_after_index`, signed; an absent bound is open. |
| `Occurrence` | Exactly one of `at_least`, `at_most` or `exactly`. |
| `ValueRange` | `gte`, `gt`, `lte`, `lt` and a required `unit`. |
| `AgeRange` | `gte_days` and `lt_days`, matching how BDC-HM records ages. |

## Criteria and their BDC-HM sources

Each criterion class constrains one BDC-HM class. Its fields declare the BDC-HM slot they correspond to through `exact_mappings`.

| Criterion | BDC-HM class | Constrains | Time anchors |
| --- | --- | --- | --- |
| `ConditionCriterion` | `Condition` | `condition_concept`, `condition_status`, `relationship_to_participant` | `age_at_condition_start` (default), `age_at_condition_end`, `age_at_condition_report` |
| `ProcedureCriterion` | `Procedure` | `procedure_concept`, `procedure_status` | `age_at_procedure` |
| `DrugExposureCriterion` | `DrugExposure` | `drug_concept`, `exposure_status` | `age_at_exposure_start` (default), `age_at_exposure_end` |
| `MeasurementObservationCriterion` | `MeasurementObservation` | `observation_type`, `value_quantity` | `age_at_observation` |
| `ParticipantCriterion` | `Participant` | `age_at_index` | Not usable as an index event |
| `DemographyCriterion` | `Demography` | `sex`, `race`, `ethnicity` | Not usable as an index event |

Enum values are BDC-HM's own. For example, Self is `OMOP:45884467` and female is `OMOP:8532`.

## Semantics

These rules apply everywhere in an expression:

- **Descendants are included.** A concept matches itself and every descendant in the release's term closure, unless `include_descendants` is false.
- **Two kinds of "not".** `none` means *not recorded*: no qualifying record exists. *Recorded absent* is a positive criterion whose `status` includes `ABSENT`. They count different people and are never interchangeable.
- **HISTORICAL is explicit.** A condition or drug exposure recorded as HISTORICAL counts only if `status` lists it.
- **The participant's own records.** `relationship_to_participant` defaults to Self, so a relative's condition never counts by accident.
- **Time is age in days.** Windows compare the anchor ages of the index record and the criterion record, so no calendar dates are needed.
- **Missing time.** With `missing_time: EXCLUDE`, a record without the anchor slot cannot satisfy a window, and the response reports per study how many participants were excluded for missing time. An undated record in an exclusion rule (`exactly: 0`) disqualifies the participant, since it cannot be shown to fall outside the window.
- **Uncertain values.** A value whose BDC-HM operator makes it uncertain, such as `LESS_THAN 5`, satisfies a bound only if the bound holds for every value the operator allows.

## Examples

A boolean expression: diabetes of either type, with hypertension or obesity, in women, with no kidney disease recorded.

```yaml
release: "2026.10"
criteria:
  group:
    all:
      - group:
          any:
            - criterion: {criterion_type: ConditionCriterion, concept: "MONDO:0005147", status: [PRESENT]}
            - criterion: {criterion_type: ConditionCriterion, concept: "MONDO:0005148", status: [PRESENT]}
      - group:
          any:
            - criterion: {criterion_type: ConditionCriterion, concept: "MONDO:0005044", status: [PRESENT]}
            - criterion: {criterion_type: ConditionCriterion, concept: "MONDO:0011122", status: [PRESENT]}
      - criterion: {criterion_type: DemographyCriterion, sex: ["OMOP:8532"]}
    none:
      - criterion: {criterion_type: ConditionCriterion, concept: "MONDO:0005300", status: [PRESENT, HISTORICAL]}
```

A temporal expression adds an index event and inclusion rules:

```yaml
release: "2026.10"
index_event:
  occurrence: FIRST
  criterion: {criterion_type: ConditionCriterion, concept: "MONDO:0005148", status: [PRESENT]}
inclusion_rules:
  - name: Hypertension within 5 years after index
    criteria:
      criterion: {criterion_type: ConditionCriterion, concept: "MONDO:0005044", status: [PRESENT]}
    window: {start_days_after_index: 0, end_days_after_index: 1826}
    occurrence: {at_least: 1}
  - name: No chronic kidney disease before index
    criteria:
      criterion: {criterion_type: ConditionCriterion, concept: "MONDO:0005300", status: [PRESENT, HISTORICAL]}
    window: {end_days_after_index: -1}
    occurrence: {exactly: 0}
```

The full examples are in the `examples/` folder. MONDO and LOINC identifiers in them are illustrative; verify them against the release's BDC-KG version.

## Relationship to OHDSI Circe

| This model | Circe | Difference |
| --- | --- | --- |
| `index_event` with `FIRST` | Primary criteria with a qualifying limit | Same idea |
| `inclusion_rules` | Inclusion rules | Same idea |
| `criterion_type` and the criterion classes | Domain criteria such as `ConditionOccurrence` | BDC-HM classes instead of OMOP domains |
| `concept` as a CURIE | A concept set ID | The CURIE directly, expanded through the term closure |
| `window` with signed days | `StartWindow` with `Days` and `Coeff` | Same meaning, fewer fields |
| `occurrence` with named fields | `Occurrence` with a numeric type and count | Readable names |
| `group` with `all`, `any`, `none` | Criteria groups | Same idea |
| `time_anchor`, `status`, `relationship_to_participant`, `missing_time`, `release` | No counterpart | Needed for BDC-HM and for reproducibility |
| Not modeled | Observation periods, end strategies, era collapsing, censoring | BDC-HM does not record what they need |

A converter to or from Circe is possible but would also need to translate OMOP concept IDs to the CURIEs used in BDC-HM.

## How the rest of the system uses it

- **Query compiler.** The API validates an expression against this schema, canonicalizes it, and compiles it to SQL against the counting database. Groups become `INTERSECT`, `UNION` and `EXCEPT` over term posting lists; windows become joins on age differences.
- **Live counts.** Stages 1–3 accept only `criteria`, with presence criteria and value ranges that fall on summary bin edges.
- **Saved cohorts.** A materialized cohort stores its expression, so it can be re-run or audited against its release.
- **Summary responses.** Responses record the canonical expression's hash; the full expression is retained with the request, not reconstructed from the response.
- **GraphQL.** The API's input types mirror this schema one for one.

## Validation: what it catches and what it doesn't

Validation with `linkml-validate -s bdchm_cohort_expression.yaml -C CohortExpression` rejects, among others:

- an unknown status for a criterion's BDC-HM class;
- an occurrence with more than one of `at_least`, `at_most` and `exactly`;
- inclusion rules without an index event;
- a status on a measurement criterion, which BDC-HM records do not carry.

It does not catch:

- **Units.** BDC-HM's `UnitOfMeasurementEnum` draws on UCUM with no fixed list, so any unit passes. The API checks units against the release.
- **Rules that span objects.** "A value range needs at least one bound" and "live counts accept only `criteria`" are documented here and enforced by the API.

### A note on BDC-HM's historical status enum

BDC-HM builds `HistoricalStatusEnum` by inheriting `StatusEnum` and adding `HISTORICAL`. LinkML's JSON Schema output does not expand inherited enum values, so validation against it accepts any status. This schema therefore uses `HistoricalStatusValuesEnum`, an explicit copy of the four values linked to BDC-HM's enum. Keep it in step with BDC-HM; the counting database schema uses the same copy.

## Open items

- [ ] Verify the example MONDO and LOINC identifiers against the BDC-KG release.
- [ ] Decide whether interoperability with ATLAS and the OHDSI Phenotype Library is needed, which would favor field names closer to Circe.
- [ ] Set limits on nesting depth and number of operands, enforced by the API.
- [ ] Replace the separate `FilterExpression` and informal cohort format in the proposal with references to this schema.