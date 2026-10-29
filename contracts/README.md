# Contracts

The LinkML schemas in [`schema/`](../schema) are the interface between the middleware and the
UI. Every response is a LinkML document, serialized as JSON. Each side generates its types
from the schema, and neither writes the shape of a response by hand.

```
             schema/summary.yaml, schema/terms.yaml        (the contract)
                │                 │                  │
           gen-java        gen-json-schema     gen-typescript
                │                 │                  │
   middleware: Java records   validate a document   UI: TS types
   build the document   ───►  before it leaves ───► read the document
```

Change a schema, regenerate, and both compilers show what broke. Today each side keeps its
own copy of the shape: the middleware's `schema.graphqls` / `summary.graphqls`, and the UI's
interfaces in `ui/src/api/graphql/queries/`. They have already drifted from the schema and
from each other.

## Why not GraphQL

- **Field selection works against self-contained documents.** A response carries every term
  it mentions, so no CURIE needs a second call. A GraphQL client can leave `terms` out.
- **It's a second type system.** We'd keep GraphQL types in step with LinkML by hand:
  `gen-graphql` emits invalid SDL for `summary.yaml` (`implements A, B`, and enums it never
  defines), drops every description, and names fields differently from `gen-typescript`.
- **What GraphQL is good at doesn't apply.** It earns its keep joining many resources in one
  round trip. Ours are a handful of fixed operations whose responses are cacheable documents
  keyed by release and request.

This matches [ARCHITECTURE.md](../ARCHITECTURE.md): Spring Boot with `springdoc-openapi`
generating the API schema from types. With the types generated from LinkML, that becomes
LinkML → Java records → OpenAPI. Routes are an open question on BDC-Portal#135.

## Try it

```sh
synthetic/fetch-bdchm.sh                              # summary.yaml imports BDCHM
make -C contracts                                     # generate into contracts/generated/
uvicorn --app-dir contracts/toy server:app --port 8001
node --experimental-transform-types contracts/toy/client.ts   # Node 22, in another shell
make -C contracts client                              # type-check the client
```

```
Searched for type 2 diabetes mellitus in example-release
  palette:study_one: 480 participants
  palette:study_two: 460 participants
Resolved MONDO:0005148 -> type 2 diabetes mellitus
```

[`toy/server.py`](toy/server.py) stands in for the middleware: it serves the SYNTHETIC
examples and refuses any document that fails the generated JSON Schema.
[`toy/client.ts`](toy/client.ts) stands in for the UI and uses only generated types; misspell
a field (`participantCount`) and `tsc` rejects it.

## Middleware

Generate the records into the middleware build instead of writing `SummaryModels.java` and the
`.graphqls` types by hand. Serialize them as snake_case, the document's own field names, and
validate against the generated JSON Schema before responding. Not compiled here (there's no
JDK in this repo's toolchain), so treat it as a sketch:

```java
// make -C contracts → generated/java/*.java, package org.biodatacatalyst.contract
ObjectMapper mapper = JsonMapper.builder()
    .propertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
    .serializationInclusion(JsonInclude.Include.NON_NULL)
    .build();

JsonSchema contract = JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V202012)
    .getSchema(Files.readString(Path.of("generated/summary.schema.json")));  // networknt

SummaryResponse response = summaries.summarize(request);
Set<ValidationMessage> errors = contract.validate(mapper.valueToTree(response));
if (!errors.isEmpty()) throw new ContractViolation(errors);
return response;
```

## UI

Generate the types into the UI and delete the hand-written interfaces. Responses are plain
JSON, so `fetch` and a type parameter are all a query needs:

```ts
import type { SummaryResponse } from "./generated/summary";

const summary = (await (await fetch(url)).json()) as SummaryResponse;
summary.studies?.map((study) => study.participant_count);
```

## Generator gaps

Found while building this; none block the pattern, and each is a fix in LinkML:

- **gen-java types references as objects.** `parents` and `research_study` hold ids in the
  document but `Term` and `ResearchStudy` in the record, so they don't round-trip. gen-typescript
  gets this right (`TermCurie[]`).
- **gen-java fails on a path import.** `KeyError: 'bdchm'` on `summary.yaml`; the Makefile merges
  imports first.
- **gen-java writes camelCase fields** with no `@JsonProperty`, hence the `SNAKE_CASE` mapper.
- **gen-typescript types enum slots as `string`** (`relation_source`) and doesn't know
  `uriorcurie`.
