# Class-first SummaryResponse revision

## Decision and review status

Discussed the attached class-first object model with Robert.

## Why change

The existing middleware groups conditions and demographics under every study. The UI renders concepts and demographic distributions across the selected cohort, so it must
currently traverse and reconcile repeated study blocks. More importantly, summing study counts cannot produce a unique participant total if study membership overlaps.

Class-first organization makes each concept/value a single response entry with explicit study contributions. A separate root participant_count provides space for an actual
cohort union, and the root study directory preserves per-study counts. Reordering objects alone does not compute that union or guarantee better Elasticsearch performance.

## Object model

```json
{
  "release": "illustration-only",
  "min_count": 1,
  "participant_count": 3,
  "filter": [],
  "studies": [
    {"id": "palette:study_a", "name": "Study A", "participant_count": 2},
    {"id": "palette:study_b", "name": "Study B", "participant_count": 2}
  ],
  "terms": {
    "HP:0000822": {"label": "Hypertension", "vocabulary": "HP"}
  },
  "summary": {
    "conditions": [{
      "id": "palette:condition/HP_0000822",
      "condition_concept": "HP:0000822",
      "participant_count": 3,
      "studies": [
        {"research_study": "palette:study_a", "participant_count": 2},
        {"research_study": "palette:study_b", "participant_count": 2}
      ]
    }]
  }
}
```

Illustration: Study A has p1,p2; Study B has p2,p3. There are **3** participants, not 4. This overlap is also covered in an executable schema example and test.
The parent condition count means participants with any value recorded, not automatically PRESENT. Its values distinguish PRESENT, ABSENT, UNKNOWN and other supported values.

## Requirements and implementation choices

| Requirement                            | Implementation                                                                                                           |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Class-first response                   | One typed summary object with participants, demographics, conditions, procedures, drug_exposures and measurements arrays |
| Remove seed                            | Removed from SummaryResponse and from the local slot definitions                                                         |
| Keep study identity and initial totals | Root studies entries use StudySummary: id, optional name, required participant_count                                     |
| Remove misplaced study fields          | Facet arrays removed from StudySummary                                                                                   |
| Link facets back to studies            | StudyContribution has research_study reference and required participant_count                                            |
| Terms lookup/dictionary                | terms is an inline map keyed by CURIE, using existing Term metadata                                                      |
| Page-load global count                 | Optional root participant_count, only when the backend can produce a valid union                                         |


## Count semantics and page load

| Location                                 | Meaning                                                     |
|------------------------------------------|-------------------------------------------------------------|
| participant_count                        | Union of matching participants in the entire response scope |
| studies[].participant_count              | Matching participants belonging to that study               |
| summary.conditions[].participant_count   | Union with that condition concept recorded                  |
| summary.demographics[].participant_count | Union with the demographic slot recorded                    |
| values[].participant_count               | Union with that value; UNKNOWN is still a recorded value    |
| facet.studies[].participant_count        | That facet/value's participants within the referenced study |

The same object shape is used with and without a filter. On page load, root study counts are the study baselines. After filtering, they are matching counts. For an X-of-total UI,
retain the unfiltered counts from the same release/access scope/min_count; do not expect the filtered count to remain the unfiltered denominator. This avoids adding a second
baseline count slot in this PR. If both must appear in one response, that is a separate review decision rather than silently changing participant_count's meaning.

Root/facet global counts may be omitted if the producer cannot establish the identity rule or if the count is suppressed. Study counts and study contributions remain required.
An omitted count is unavailable/suppressed, not zero. Explicit root 0 can represent an empty cohort. No sentinel study such as ALL is used for global totals.

Counts refer to canonical participants under an agreed release identity rule, not an unsupported promise to identify unique real-world people across unrelated studies.
A single participant document per canonical ID permits root document counts and nested reverse_nested counts. Duplicate parent documents require upstream identity/deduplication
work. Do not transpose study buckets and add counts as a substitute.
