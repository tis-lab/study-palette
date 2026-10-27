# Term graph delivered to the Data Portal UI

**Scope and availability assessment**

**As of:** October 27, 2026

## 1. Purpose

This document describes what the middleware currently returns for terms, what the UI will need from the term graph, and what is still missing. It covers concepts, hierarchy, relationships, variable typing, and provenance - the source and history of the information returned.

The middleware implementation described here is [PR #3](https://github.com/tis-lab/bdc-dp-middleware/pull/3). The proposed scope follows [study-palette #31](https://github.com/tis-lab/study-palette/issues/31) and supports the documentation requirements for [BDC-Portal #108](https://github.com/tis-lab/BDC-Portal/issues/108).

| Requirement                                                  | Where it is covered                                                                                                                 |
|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Document the information currently returned on terms         | Sections 3-5 describe the endpoint, concept mappings, and related schemas. Section 9 includes example queries.                      |
| Describe the intended scope and what is available or missing | Section 6 compares current support with the target scope. Sections 7-8 describe the proposed response requirements and UI behavior. |


### Current position

PR #3 returns term metadata from Monarch, concept matches from the local harmonization index, and the specification mappings behind those matches. The broader term graph described in #31 still needs a shared response structure for hierarchy, relationships, variable details, and provenance.

We can define that structure before the UI is fully implemented. The next step is to agree on what information the UI needs and compare it with what the middleware and upstream sources can provide. The recommendations below are for that discussion; they are not yet an approved schema.

## 2. Implementation and sources

All descriptions of current middleware behavior refer to PR #3. The Study Palette and variable-library schemas provide context for the intended response and the remaining gaps.

| Source                                                                  | Used for                                                               |
|-------------------------------------------------------------------------|------------------------------------------------------------------------|
| [Middleware PR #3](https://github.com/tis-lab/bdc-dp-middleware/pull/3) | Current endpoint fields, behavior, and query examples                  |
| [Study Palette](https://github.com/tis-lab/study-palette)               | Shared LinkML definitions and term-graph requirements                  |
| [BDC variable library](https://github.com/linkml/bdc-variable-library)  | Variable identities, value types, units, and integration relationships |

“Current” means supported by the PR #3 implementation. Deployment may differ by environment. A field defined in an upstream schema is also not necessarily populated or available through the middleware.

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

Variables inherit their `id` from `Entity`. `concept_type` describes the associated concept; it is not the variable’s identifier. The PR #3 schema makes this distinction explicit for `BdcConcept`, even though the PR description compares it with `IntegratedVariable`.

The variable-library schema also includes examples of compound variables with different units being integrated into a normalized representation. The response needs to preserve those differences between the concept, the source variable, and the integrated variable.

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

| Capability                             | Current availability                                                    | What is still needed                                                                                           |
|----------------------------------------|-------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Concept identity                       | Provider `id`; PR #3 local `conceptType`; LinkML `curie`                | Agree on identifier fields while keeping concepts and integrated variables separate                            |
| Labels, descriptions, synonyms         | Provider metadata exposed; local verified labels may be absent          | Preserve label source/status and show an explicit unresolved fallback                                          |
| Vocabulary and semantic category       | Provider category exposed; vocabulary defined in LinkML                 | Return both with their different meanings; do not infer ownership solely from prefix                           |
| Parent/child hierarchy                 | Direct parents modeled in LinkML; absent from term-search API           | Bounded parent/child exploration with direction, predicate and completeness                                    |
| Cross-concept relations                | Subject/predicate/object/source modeled in LinkML                       | Serve requested edges with readable reason, source evidence and review status                                  |
| KG anchors / cross-vocabulary mappings | Not exposed by middleware term API                                      | Preserve mapping predicate and route; direct versus SSSOM-hop mapping is not automatically equivalence         |
| Contributing studies                   | Specification study names/counts exposed                                | Distinguish mapping coverage from observed/accessible data; add availability state                             |
| Exact BDCHM binding                    | PR #3 supplies class and concept-slot/source tuples                     | Extend binding to the actual value slot, type and relevant constraints where verified                          |
| Integrated-variable identity           | Not implemented by local concept grouping                               | Agree independent identifiers and concept associations; do not use CURIE as every variable's ID                |
| Source variables                       | Specification-alias grouping in PR #3, not phv records                  | Paged source variables (phvs) linked to concepts, studies, datasets, and provenance                            |
| Type, units, permissible values        | Not exposed by current term API                                         | Source-backed metadata for constructing valid filters, including explicit unknowns                             |
| Mapping provenance                     | Specification tuples in PR #3; richer upstream development exists       | Trace studies, datasets, and source variables through transformations to concepts, including commit references |
| Release and version                    | Index build metadata exists in PR #3; no term-response release field    | Include the graph release and source versions so results from different releases are not mixed                 |
| Bounded graph and continuation         | Search pagination exists; graph-boundary contract does not              | Seeds, hop/node/edge limits, requested categories and declared incomplete boundaries                           |
| Self-contained references              | Search hits include labels; the summary model includes referenced terms | Include an entry for every referenced concept, even when only its identifier and label are returned            |
| One envelope across use cases          | Search, autocomplete and summary context use different shapes           | Agree on a shared response structure with different levels of detail and a migration plan                      |

## 7. Proposed response requirements

The following recommendations are based on study-palette #31 and need to be agreed with the UI and KG teams.

1. **Keep concepts and variables separate.** Ontology terms, integrated variables, and source variables need their own identities. Ontology hierarchy, concept mappings, and variable-integration relationships also need distinct meanings. A mapping to a KG concept does not automatically mean equivalence or an is-a relationship.
2. **Limit each graph request.** Let the caller specify starting terms, hop depth, and the types of nodes and relationships it needs. Set response limits and provide a way to continue when more results exist.
3. **Explain what was returned.** The UI needs to know whether a relationship category is complete, was not requested, was truncated, is unavailable, or failed to load. An empty list alone cannot explain that.
4. **Include referenced terms.** Every returned term identifier should have an entry in the response. A term at the edge of the requested neighborhood can include its label or unresolved-label status without loading all of its own relationships.
5. **Keep the source of each relationship.** Include the predicate, source, readable explanation, and review status. We need to extend or refine the current `KG`/`CURATED` model to cover ontology hierarchy and unreviewed assertions.
6. **Provide typing before filter selection.** Return known value types, units, permissible values, BDCHM class/slot bindings, and contributing source variables. The UI should not have to guess a variable’s type from its label or a sample of values.
7. **Keep requests within a graph release.** Responses and cached results should identify their release. If that release changes, the UI should rebuild its graph session rather than combine results from different releases.

### Proposed response objects

| Object                         | Information it should carry                                                                                                    |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| Response envelope              | Schema version, graph release, starting terms, requested scope, terms, variables, relationships, completeness and continuation |
| Term                           | Identifier, display metadata, owning vocabulary, category, label provenance/status and hierarchy references                    |
| Relation                       | Subject, predicate, object, provenance, explanation, review state and mapping route where applicable                           |
| Integrated/harmonized variable | Independent identity, concept association, value representation, BDCHM binding and integrated source variables                 |
| Source variable                | phv identity, study/dataset links, name/description, type/unit/coded values and transformation provenance                      |

This outlines the information each object would carry. Object names, required fields, and whether each field holds one or multiple values still need to be agreed through #31 and the related KG result-object discussion.

### 7.1 Minimum information by use case

The table below describes the information each use case would need in the proposed response.

| Use case                                 | Minimum response information                                                                                                                  | Additional information                                                                                         |
|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Search / type-ahead                      | Contract and release identity; matching identifiers; display labels or explicit unresolved status; result ordering/pagination; scope metadata | Descriptions, synonyms, vocabulary/category and mapping coverage when requested and available                  |
| Concept detail / hierarchy exploration   | Seed identifier; requested direction/depth/categories; labeled nodes; typed edges; boundary state for each requested expansion                | Related concepts, variable associations and evidence                                                           |
| Variable selection / filter construction | Independent variable identity; concept association; declared value representation; availability of required typing                            | Units, permissible values, missing-value meanings and BDCHM class/slot bindings appropriate to that variable   |
| Source-variable inspection               | Variable identity; study/dataset identifiers when supplied; metadata and transformation provenance with availability states                   | Names, descriptions, source type/unit/codes and versioned source links                                         |
| Suggested relation                       | Same node/relation semantics and provenance as detail responses                                                                               | Explanation, review state and supporting evidence; suggestions must not appear as accepted ontology assertions |

Search, detail, and suggested-relation responses should use the same overall structure, with different levels of detail. Type-ahead does not need to load every variable field. A later request can fetch more information for the selected concept, using the same graph release. We still need to agree on how to introduce this structure alongside the PR #3 operations.

### 7.2 Incomplete or unavailable information

A single `complete` flag would not tell the UI enough. For example, hierarchy retrieval could succeed while variable provenance is unavailable. The response should report completeness for each starting term, direction, and requested relationship category, and explain how to request more results when a limit is reached.

| State                 | Meaning                                                      | UI interpretation                                                                                     |
|-----------------------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Complete within scope | Retrieval finished for the declared scope and source/release | An empty collection means none found within that scope; it is not a claim about every possible source |
| Not requested         | The request omitted the category or expansion                | Offer expansion; do not infer a leaf or absence                                                       |
| Truncated             | A limit stopped otherwise supported retrieval                | Show that more may exist and supply continuation or a supported follow-up request                     |
| Unavailable           | The source/capability or required metadata is not available  | Mark the information unknown; distinguish from an empty result                                        |
| Failed                | Requested retrieval encountered an error                     | Expose a stable error state and retry behavior; do not substitute an empty success                    |

The graph release identifies the data snapshot; the schema version identifies the response format. Both would help the UI interpret and combine results correctly. We also need to decide whether a graph response can return partial results when one source fails. The current GraphQL error handling does not define that behavior.

### 7.3 Checks for the proposed response

The following checks should guide the schema review and later testing:

1. Every concept CURIE referenced in the response should resolve to an included entry. This also applies to units, predicates, or permissible values represented as CURIEs. If a label is unavailable, mark it as unresolved rather than treating the identifier as a verified label.
2. Each relationship should retain its predicate and resolve both endpoints. Record where the assertion came from separately from whether it has been reviewed.
3. Preserve conflicting assertions and their evidence. Agree on deduplication and precedence rules before combining relationships from different sources.
4. Keep direct parents, inferred ancestors, and mapping anchors distinct. Traversal should handle multiple parents and cycles. A partial list of parents cannot be used to claim a complete list of children.
5. Keep source units and integrated units separate. A shared concept or label is not enough to merge variables or infer a unit conversion.
6. Include the source file, version or commit, and mapping context where available. A file path helps locate a specification, but its revision is needed to reproduce the mapping.
7. Keep related requests within the same release and declared scope. Source-variable pagination needs stable ordering and a way to continue without silently changing releases.
8. Keep mapping coverage and search totals separate from participant counts, observed distributions, and access permissions.

### 7.4 Work to carry forward

| Scope category                       | Disposition                                                                                                                     |
|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Current implementation               | PR #3 search, autocomplete, concept metadata and specification coverage/provenance                                              |
| Response structure to agree          | Bounded graph response, hierarchy, relation evidence, variable typing, self-contained labels and release/completeness semantics |
| Details that depend on upstream work | Paged phv details, study/dataset containment, reproducible transformation lineage and broader cohort coverage                   |

## 8. Proposed UI behavior

- Display verified concept labels when available; otherwise show the CURIE and an unresolved/identifier-only indication. Never substitute a specification alias label as a concept label.
- Keep a variable's own label with that variable. Selecting a concept retains its CURIE; selecting an integrated variable must retain its independent identity when that model is introduced.
- Display specification coverage as mapping coverage, not as participant availability or an access guarantee.
- Do not show zero coverage as “BDC has no data” when the local index may be disabled or unavailable. The proposed availability status should make that distinction clear.
- Only treat a term as having no children or relationships when the response confirms that the requested category is complete. Reversing parent links only identifies children within the returned set.
- Keep concept availability separate from clinical status. For example, PRESENT is a value constraint; finding the concept does not mean that status applies to any participant.
- Display curated or unreviewed links distinctly from published KG assertions. Preserve mappings as mappings; do not silently use them as equivalence or hierarchy edges.
- Enable filter controls only when the necessary typing and units are supplied or explicitly configured through another agreed contract.
- Keep transport/source errors separate from a valid empty result. The middleware already distinguishes bad input, unavailable upstreams, timeouts and invalid responses.

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

Sections 7-8 contain proposals based on these sources. Current middleware behavior is described separately in Sections 3-4.

1. [Study-palette #31: intended term graph](https://github.com/tis-lab/study-palette/issues/31).
2. [Middleware PR #3](https://github.com/tis-lab/bdc-dp-middleware/pull/3).
3. [Study-palette PR #54](https://github.com/tis-lab/study-palette/pull/54); [terms.yaml](https://github.com/tis-lab/study-palette/blob/b3d29eb7d221713bbfd314d0b1e268927cfd77a2/schema/terms.yaml); [summary.yaml](https://github.com/tis-lab/study-palette/blob/b3d29eb7d221713bbfd314d0b1e268927cfd77a2/schema/summary.yaml).
4. [Study-palette PR #29: Explore demo](https://github.com/tis-lab/study-palette/pull/29).
5. [Variable-library LinkML schema](https://github.com/linkml/bdc-variable-library/blob/main/src/bdc_variable_library/schema/bdc_variable_library.yaml).