# Term graph delivered to the Data Portal UI

**Scope and availability assessment**

**As of:** October 30, 2026

## 1. Purpose

The first version needs to do two things:

1. **Help users find concepts using familiar words.** Search should match names and synonyms, including BDC variable labels and curated names when they are included in the search index.
2. **Show readable labels.** Users should see a useful name for a concept. A curated label should be able to replace a poor source label for display, while keeping the original name and its source.

Exploring parent and child concepts, building filters from variable types, and inspecting source variables are later steps. We describe those needs here so they are not lost, but they do not all need to be implemented for the first version.

This document supports [BDC-Portal #108](https://github.com/tis-lab/BDC-Portal/issues/108). “Current” means the implementation in [middleware PR #3](https://github.com/tis-lab/bdc-dp-middleware/pull/3). Proposed requirements come from [study-palette #31](https://github.com/tis-lab/study-palette/issues/31) and the review of this document. A field in an upstream schema is not necessarily available through middleware.

| Requirement                                                  | Where it is covered                                                                                                                 |
|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Document the information currently returned on terms         | Sections 3-5 describe the endpoint, concept mappings, and related schemas. Section 9 includes example queries.                      |
| Describe the intended scope and what is available or missing | Section 6 compares current support with the target scope. Sections 7-8 describe the proposed response requirements and UI behavior. |


## 2. Implementation and sources

| Source                                                                  | Used for                                                               |
|-------------------------------------------------------------------------|------------------------------------------------------------------------|
| [Middleware PR #3](https://github.com/tis-lab/bdc-dp-middleware/pull/3) | Current endpoint fields, behavior, and query examples                  |
| [Study Palette](https://github.com/tis-lab/study-palette)               | Shared LinkML definitions and term-graph requirements                  |
| [BDC variable library](https://github.com/linkml/bdc-variable-library)  | Variable identities, value types, units, and integration relationships |

## 3. Current middleware term API

### 3.1 Operations and behavior

The middleware exposes `terms(query, limit, offset)` and `autocomplete(query)` through `POST /graphql`.

| Operation      | Current behavior                                                                                                                                             |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `terms`        | Combines local harmonization-specification matches with Monarch concepts. Local matches appear first; Monarch response order is retained within its portion. |
| `autocomplete` | Returns Monarch suggestions only. It does not consult the local harmonization index or attach BDC coverage.                                                  |

Both operations trim the query and require 1–200 Unicode code points. `terms` accepts a limit of 1–100 (default 20) and an offset of 0–10000 (default 0). `autocomplete` does not accept limit or offset parameters.

`TermResults` contains `items`, `total`, `limit`, `offset`, `hasMore`, and `bdcConceptCount`. Each item is either a `BdcConcept` or a `Term`, represented by the `SearchItem` union.

The same CURIE can appear in both the local and Monarch results because the middleware does not combine matching entries across these sources. `total` therefore counts search entries, not unique concepts or participants. The middleware still calls Monarch for pagination information when local matches fill the page. If Monarch fails, the operation fails rather than returning only the local matches.

### 3.2 Fields returned by the PR #3 contract

| Object             | Fields                                                                                                                             | Meaning and limits                                                                                               |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `Term`             | `id`, `label`, `category`, `description`, `synonyms`, `displayLabel`, `bdc`                                                        | Monarch concept identity and display metadata plus locally joined mapping coverage                               |
| `Suggestion`       | `id`, `label`, `category`, `description`, `synonyms`, `displayLabel`                                                               | Monarch-only type-ahead entity; no `bdc` field                                                                   |
| `BdcCoverage`      | `studyCount`, `studies`, `variableNames`                                                                                           | Studies/specifications mapped to the exact concept; variable names are specification aliases, not phv identities |
| `BdcConcept`       | `conceptType`, `conceptLabel`, `displayLabel`, `bdchmType`, `bdchmClasses`, `sourceMappings`, `studyCount`, `studies`, `variables` | Concept identity and specification coverage; see Section 4                                                       |
| `BdcCarrier`       | `variableName`, `variableLabel`, `studies`                                                                                         | Specification-alias grouping, not a source-variable identity                                                     |
| `BdcSourceMapping` | `study`, `bdchmClass`, `conceptSlot`, `sourceFile`                                                                                 | Explicit specification assignment linking study, class, concept slot and file                                    |

The mapper converts Monarch’s `name` to `label` and `synonym` to `synonyms`. It builds `displayLabel` as `label (id)`. ID, name, and category must be nonblank; description and synonyms can be null. A provider may use the CURIE when a label is unavailable, so a populated label field does not always mean an ontology label was found.

The current `terms` response does **not** return parent/child arrays, relation edges, a bounded graph response, variable value types, units, permissible values, source-variable accessions, or a per-response release identifier.

### 3.3 Coverage is not participant availability

`studyCount` counts studies whose transformation specifications assign the exact concept. It does not tell us how many participants have the concept, whether study data is accessible, or whether harmonization is complete.

Coverage is also zero when the local index is disabled. The response currently does not distinguish that case from an active index with no matching mappings.

## 4. Concept identity and provenance in PR #3

`BdcConcept` represents a concept found in the local harmonization index. `bdcConceptCount` gives the number of local matches in the search results. Monarch results use `Term`, with local coverage attached through `BdcCoverage`. These two result types may refer to the same CURIE.

| PR #3 field             | Meaning                                                                                       |
|-------------------------|-----------------------------------------------------------------------------------------------|
| `conceptType`           | Concept CURIE; the local entry's key                                                          |
| `conceptLabel`          | Verified concept label when supplied; null when absent                                        |
| `displayLabel`          | Concept label if available, otherwise the CURIE                                               |
| `bdchmType`             | Nullable enum: `observation`, `condition`, `procedure`, `exposure`, `drugexposure`            |
| `bdchmClasses`          | Exact classes that assign the concept; retains multiple classes                               |
| `sourceMappings`        | Explicit `study`, `bdchmClass`, `conceptSlot`, `sourceFile` tuples                            |
| `studyCount`, `studies` | Studies/specifications mapped to the exact concept                                            |
| `variables`             | Legacy carrier groups with `variableName`, optional `variableLabel`, and contributing studies |

Concept labels and variable labels have different meanings and should remain separate. The filename helps trace a mapping back to its specification; it is not a source-variable identifier.

`BdcConcept` groups specification coverage by concept. It does not represent an `IntegratedVariable`: two integrated variables can share a concept but use different units or value representations.

`sourceMappings` records the study, class, slot, and file behind each concept assignment. This provides specification-level provenance, but it does not identify the original dataset or source variable (`phv`). Those associations cannot be reconstructed by pairing entries from separate comma-separated lists. The index also contains build metadata, but the term response does not currently include a graph release identifier.

## 5. Related LinkML models

Study Palette’s `schema/terms.yaml` defines the following shared objects:

| Model                | Defined fields                                      |
|----------------------|-----------------------------------------------------|
| `Term`               | `curie`, `label`, `vocabulary`, `parents`           |
| `TermRelation`       | `subject`, `predicate`, `object`, `relation_source` |
| `RelationSourceEnum` | `KG`, `CURATED`                                     |

`parents` lists direct parents in the owning ontology. Child relationships can be derived by reversing those links, but only for terms included in the response.

`vocabulary` identifies the owning vocabulary. It may differ from the identifier prefix - for example, an OMOP identifier may represent a concept from another vocabulary. Vocabulary, Biolink category, and BDCHM class describe different aspects of a concept.

`summary.yaml` imports this model and includes `terms` and `relations` in `SummaryResponse`. These fields provide context for summary results. They do not provide a separate API for requesting a term’s graph neighborhood, and the bundled examples do not demonstrate live hierarchy retrieval from Monarch.

To cover #31, we still need a shared graph response, information about response limits and completeness, variable typing, readable explanations for relationships, and a way to identify unreviewed assertions. The current `KG` and `CURATED` values cover only part of the proposed provenance requirements.

### 5.1 Variable-library definitions

The `linkml/bdc-variable-library` schema defines several details that PR #3 does not yet return. We should use these definitions when extending the response, while confirming which fields are actually populated upstream.

| Upstream class                               | Relevant modeled information                                                                      | How this applies to the portal                                                                                                                                                |
|----------------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Entity` / `Variable`                        | Independent `id`; study association, description, concept association and variable label          | Preserve variable identity separately from its associated concept CURIE                                                                                                       |
| `SingleContinuousVariable`                   | Source/file identifiers, name, data type, unit, minimum/maximum, resolution, missing/alert values | Preserve semantics: upstream minimum/maximum describe values present in source data, not necessarily allowed filter bounds; do not reinterpret them as validation constraints |
| `SingleCategoricalVariable`                  | Source/file identifiers, type, missing values and `coded_values`                                  | Preserve code, meaning and missingness; do not treat all codes as clinical categories                                                                                         |
| `CompoundVariable`                           | BDCHM type, unit, row metadata and documentation metadata                                         | Capture the semantic role of contributing fields and their representation                                                                                                     |
| `IntegratedVariable`                         | BDCHM type, unit and `integrates`, whose range is `CompoundVariable`                              | An integrated variable is more than a concept grouping; trace integration through the actual model rather than assuming a direct list of phvs                                 |
| `MetadataVariable` / `DocumentationVariable` | Microschema slot assignments and documentation-derived values                                     | Distinguish measured/source fields from constants or context supplied by documentation                                                                                        |

Variables inherit their IDs from `Entity`; `concept_type` describes the related concept, not the variable's own identity. Source and integrated variables can use different units. We need to preserve those differences and confirm which modeled fields are populated upstream.

Ontology/KG sources provide term meanings and relationships. The variable library and transformation specifications provide variable details and mapping evidence. The shared LinkML model defines the response. Middleware retrieves and checks available information; the UI uses it for search, display and later exploration. The current local index and Monarch connection do not provide a live variable-library graph.

### 5.2 Information flow and responsibility

| Layer                                              | Responsibility for this scope                                                                                        |
|----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Ontology / Monarch / BDC KG                        | Supply term semantics, hierarchy, semantic assertions and available mapping evidence                                 |
| Variable library and transformation specifications | Supply variable identity, representation, study/dataset relationships and transformation evidence                    |
| Shared LinkML contract                             | Define meanings, relationships, cardinalities and completeness rules; generate consumer types                        |
| Middleware                                         | Retrieve and validate available metadata, project it into the accepted contract, preserve provenance and report gaps |
| UI                                                 | Request the needed neighborhood, display source distinctions and construct controls from declared typing             |

The middleware combines results from the configured Monarch provider with a bundled harmonization-specification index. Term results therefore come from both sources. The static summary examples are separate from this flow and do not provide a live term-graph or variable-library connection.

## 6. Current support and remaining gaps

In this table, “not exposed” means the middleware term API does not return the information. It may still exist in an upstream schema or source.

| Area                         | Available now                                                                                                                 | Still needed                                                                                                                                 |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Concept identity             | Provider `id`, local `conceptType`, schema `curie`.                                                                           | Agree consistent identifier fields without merging concept and variable identities.                                                          |
| Labels and synonyms          | Provider metadata and local concept labels.                                                                                   | A set of labels with sources, one chosen display label, and curated overrides for poor labels.                                               |
| Searchable names             | Existing provider search and local matching.                                                                                  | Confirm BDC variable labels and curated names reach the term-search index. Displaying a name alone does not make it searchable.              |
| Vocabulary/category          | Provider category; vocabulary modeled in LinkML.                                                                              | Return both where available and preserve their meanings.                                                                                     |
| Hierarchy                    | Direct parents modeled in LinkML.                                                                                             | Parent/child retrieval with limits and a clear indication of missing or incomplete results.                                                  |
| Relations and mappings       | Basic relation fields in LinkML.                                                                                              | Requested links, readable reasons, evidence, review status and mapping routes. A cross-vocabulary mapping is not automatically equivalence.  |
| Study coverage               | Specification study names and counts.                                                                                         | Distinguish a disabled/unavailable index from valid zero coverage.                                                                           |
| BDCHM binding                | Class, concept slot and source-file tuples.                                                                                   | Verified value slots, types and constraints.                                                                                                 |
| Variable identity and typing | Concept-based carrier groups; richer upstream models.                                                                         | Independent variable IDs, units, coded values and missing-value meanings.                                                                    |
| Source-variable provenance   | Specification mappings.                                                                                                       | Source-variable accessions, study/dataset links and versioned transformation history.                                                        |
| Response limits and versions | Search paging and index build metadata.                                                                                       | Graph release, response-format version, retrieval limits and continuation.                                                                   |
| Measurement identity         | Summaries use `FAST_GLUC_BLD`; the term catalog uses `OMOP:4156660`. Corey notes that middleware PR #9 maps these internally. | Expose the link in the shared response so the UI can resolve it without its own mapping. Neither response currently explains the connection. |
| Shared response structure    | Search, autocomplete and summary context use different shapes.                                                                | Agree a term-graph structure that supports both small search results and later detailed requests.                                            |

## 7. Proposed response requirements

These are requirements for the intended response, not claims that they are implemented today. Field names and details still need team agreement.

### 7.1 Readable and searchable names

A term should carry its CURIE, its available names with their sources, and a chosen display label. A curated label should take priority for display while keeping the original ontology/KG names. Curated labels should ship with the release. The team still needs to agree the remaining fallback order, storage and update process. If no usable label is available, show the CURIE as an identifier fallback.

For example, a term may have a long vocabulary name and a shorter curated name for the UI. Keep both, record where each came from, and make eligible names searchable. A variable's own label stays attached to that variable; using it to find a related concept must preserve that association.

In [Corey's review](https://github.com/tis-lab/study-palette/pull/64#discussion_r4413532189), Monarch search is described as Solr eDisMax over `id`, `name` and `synonym`, with extra weight for exact synonym matches. In simple terms, it matches indexed names and synonyms. “Search by meaning” therefore depends on good synonym coverage, not an assumed embedding-based search. BDC variable labels and curated names must reach the index, not just the display response. This is about term search; it does not change the separate Elasticsearch metadata-query work.

**Checks:** A curated name replaces a poor display label without removing the original. Each name retains its source. Searching a distinct BDC variable label or curated alias finds the expected concept after indexing. Label data and the index use compatible releases. An identifier fallback is not presented as a verified label.

### 7.2 Resolve references within the response

Every concept CURIE mentioned should have a term entry in the response. This includes units, relation predicates and coded values when they are represented as CURIEs. A term at the edge of a requested result can include its display information without expanding all its relationships.

**Checks:** Both ends of each relation can be resolved. For a summary using `observation_type: FAST_GLUC_BLD`, the response explains its connection to `OMOP:4156660` and includes that term's display information. The UI does not need a hard-coded mapping or another vocabulary call. Preserve the original measurement key; agree how the connection is represented and sourced rather than simply replacing the key with a CURIE.

### 7.3 Keep identities and relationship meanings separate

Concepts, integrated variables and source variables need their own identities. A parent relationship, a cross-vocabulary mapping and a variable-integration link mean different things.

**Checks:** Variables sharing a concept remain distinguishable. Direct parents, inferred ancestors and mapping anchors remain separate. Preserve the predicate and mapping route, including any intermediate mapping steps. Apply the coverage definition in section 2; do not treat mapping counts as participants or access permissions. Distinguish unavailable coverage from zero matches.

### 7.4 Limit graph requests and explain incomplete results

Later graph requests should specify starting concepts, how far to follow links, and the kinds of nodes and relations needed. Results need limits and a way to continue. Report completeness for each starting term, direction and requested relation category.

| Result state | What it tells the UI |
| --- | --- |
| Complete within scope | The requested search finished. An empty list means none found in that scope and source, not none anywhere. |
| Not requested | This part was not requested; do not assume the term has no children or relations. |
| Truncated | A limit was reached; show that more results may exist and how to continue. |
| Unavailable | The source or information is unavailable; treat it as unknown. |
| Failed | Retrieval failed; do not present it as an empty successful result. |

**Checks:** Retrieval handles multiple parents and cycles without exceeding its limits. A partial parent list does not prove a complete child list. Different parts of a response can have different states. The team must decide whether one source's failure allows partial results; the current operation's failure behavior is described in section 3.

### 7.5 Explain relationships and their sources

Relations should include a predicate, readable reason, source and review status. These should distinguish ontology hierarchy, harvested KG links, curated links and unreviewed assertions.

**Checks:** Curated or unreviewed assertions do not appear as published ontology facts. Keep conflicting assertions and their evidence until combination rules are agreed. Include available source files, revisions/commits and mapping context so a result can be traced back to its source. The existing KG/CURATED distinction needs further detail for this scope.

### 7.6 Provide variable details before building filters

Later filter controls need value types, units, allowed codes, missing-value meanings, BDCHM bindings and contributing source variables.

**Checks:** Use declared typing, or another agreed configuration, before enabling controls. Do not infer types from names or sample values. Preserve source and integrated units separately, and do not assume a conversion from a shared concept. Do not treat observed data ranges as validation limits.

### 7.7 Keep related requests on the same release

The graph release identifies the data snapshot; the response version identifies its format. Search, detail and suggested-relation responses should use the same overall term-graph structure, with different amounts of information.

**Checks:** Related requests and cached results stay on the same release. Paging has stable ordering and continuation. A release change rebuilds the UI session. Type-ahead does not require loading every variable field. Agree how the new structure will be introduced alongside the current operations.

### Information the proposed response would carry

| Part                 | Information                                                                                                          |
|----------------------|----------------------------------------------------------------------------------------------------------------------|
| Response details     | Version, release, starting terms, requested scope, completeness and continuation.                                    |
| Terms                | Identifiers, names with sources, chosen display labels, vocabulary, category and hierarchy links.                    |
| Relations            | Subject, predicate, object, explanation, provenance, review status and mapping route.                                |
| Integrated variables | Independent identity, concept association, value format, BDCHM binding and links to contributing compound variables. |
| Source variables     | Source identity such as phv where available, study/dataset links, types, units, codes and transformation history.    |

### 7.8 Work to carry forward

The first-version priorities are concept search and readable labels. Hierarchy exploration, variable-based filters, source-variable inspection and suggested relations come later. Implementation of label indexing, graph retrieval, variable-library provenance and measurement mappings remains follow-up work under #31. This documentation task records the needs and gaps; it does not implement them.

## 8. UI-specific behavior

- Keep the selected concept's CURIE even when its display label changes. A selected integrated variable retains its own identity.
- Keep concept discovery separate from clinical status. Finding a concept does not mean PRESENT applies to a participant; status is a separate filter choice.
- Offer a clear retry path for source failures and distinguish them from bad input or valid empty results.

The display, coverage, completeness, provenance and filter rules are specified with their checks in section 7.

## 9. PR #3 query examples

### A. Concept search with specification coverage and provenance

```graphql
query {
  terms(query: "hypertension", limit: 10, offset: 0) {
    total
    hasMore
    bdcConceptCount
    items {
      __typename
      ... on Term {
        id label category description synonyms displayLabel
        bdc { studyCount studies variableNames }
      }
      ... on BdcConcept {
        conceptType conceptLabel displayLabel bdchmType bdchmClasses
        studyCount studies
        sourceMappings { study bdchmClass conceptSlot sourceFile }
        variables { variableName variableLabel studies }
      }
    }
  }
}
```

### B. Provider-only autocomplete

```graphql
query {
  autocomplete(query: "hyper") {
    total
    items {
      id
      label
      category
      description
      synonyms
      displayLabel
    }
  }
}
```

These queries follow the PR #3 schema. The search example requests both local concept mappings and Monarch term details. Autocomplete returns Monarch suggestions without BDC coverage. These are request examples, not recorded live responses.

## 10. Sources

1. [Study-palette #31: intended term graph](https://github.com/tis-lab/study-palette/issues/31).
2. [Middleware PR #3](https://github.com/tis-lab/bdc-dp-middleware/pull/3).
3. [Study-palette PR #54](https://github.com/tis-lab/study-palette/pull/54); [terms.yaml](https://github.com/tis-lab/study-palette/blob/b3d29eb7d221713bbfd314d0b1e268927cfd77a2/schema/terms.yaml); [summary.yaml](https://github.com/tis-lab/study-palette/blob/b3d29eb7d221713bbfd314d0b1e268927cfd77a2/schema/summary.yaml).
4. [Study-palette PR #29: Explore demo](https://github.com/tis-lab/study-palette/pull/29).
5. [Variable-library LinkML schema](https://github.com/linkml/bdc-variable-library/blob/main/src/bdc_variable_library/schema/bdc_variable_library.yaml).
6. [Middleware PR #9](https://github.com/tis-lab/bdc-dp-middleware/pull/9), referenced in Corey's measurement-identity comment.