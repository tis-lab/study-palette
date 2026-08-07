# Architecture

The system architecture defines four layers with clear component boundaries:

## Front End (ReactJS)
- **Semantic Search**: Field entry of search terms, entity resolution, concept curation
- **Query Builder**: Filters, inclusion/exclusion criteria, longitudinal/temporal constraints
- **Visualizations**: Results rendering, standard plots, consortium-defined advanced visualizations
- **Actions**: Data access requests, analysis environment launch, export, API code generation

## Modular APIs
- **Search API**: Entity resolution over any BDC concept
- **Query API**: Query over all BDC content including row-level participant data
- **Analyze API**: Structured, standardized outputs for visualization and logging
- **Workflows API**: Transitions between Data Portal and other BDC components

This is the serving half of the middleware — the build layer below is the other half. It is
thin by design: logic belongs in the metadata index and the query layer wherever it can go
there. But three responsibilities can only be enforced here, and must not be pushed outward
into precomputation or the client:

- **Authorization**: row-level access depends on the requesting user's authorizations, so
  it varies per user per request and cannot be precomputed
- **Disclosure control**: small-cell suppression on cohort counts, so that low-count
  results cannot be used to re-identify participants
- **Query budgets**: caps on fan-out, so that a client-expressible query cannot trigger a
  scan of the entire index

### Framework

The tier is deliberately thin so that the framework choice does not cascade. Ingestion,
storage, and query are all language-independent, which keeps this a contained decision.

The current implementation is FastAPI. Should the tier move to Java, the target is Spring
Boot on Java 21 — Web MVC rather than WebFlux, since the query path is blocking JDBC and
virtual threads cover the concurrency that would otherwise justify a reactive stack — with
`springdoc-openapi` generating the schema from types and Jakarta Bean Validation on request
models. Quarkus and Micronaut were considered for their startup and memory profile, but
that advantage comes from GraalVM native-image, and DuckDB's JDBC driver bundles a JNI
native library, which is where native-image compilation gets difficult.

## Metadata Index

The LinkML "source of truth" is a build artifact, not a live database. It is assembled
during ingestion, published to object storage, and served read-only. Four upstream sources
feed it:

- **BDCHM** — the harmonized data model that participant- and variable-level data conform to
- **BDC Variable Library** — one slot per harmonized clinical concept, grouped into category
  modules spanning the contributing studies
- **Provenance records** — PROV-O derivations linking each harmonized concept to the specific
  study variables, datasets, and accessions it came from, which is what lets query results
  carry the variable mappings and provenance the design principles below call for
- **BDC knowledge graph** — a BDC extension of the Monarch KG, denormalized into the search
  index at build time rather than served as a live graph

Provenance references the Variable Library, not the reverse. The library is a small, stable
catalog — one slot per concept — while provenance is large and grows with every study added,
since a single concept can derive from dozens of study variables across several datasets.
Having the catalog import the graph would couple a stable artifact to a volatile one and mix
a browsing surface with a derivation record. PROV-O's own direction agrees: `wasDerivedFrom`
runs from the derived entity to its sources, so a provenance record names the library slot by
IRI and the library needs no knowledge of provenance at all.

The provenance schema follows the same approach as BDCHM: generic structural classes with the
structure carried by vocabulary rather than by minted classes, so that a new source with
different granularity is a vocabulary addition instead of a schema change. DCAT is the natural
pairing, since it is routinely used alongside PROV-O for lineage, with containment coming from
outside PROV because PROV deliberately does not model mereology.

- **Format**: Parquet. Chosen over DuckDB's native file format because native storage
  guarantees backward but only best-effort forward compatibility, and the producer (Python
  ingestion tooling) and the consumer (service tier) upgrade on independent cadences — a
  producer newer than its consumer can write an artifact the consumer cannot open, and it
  fails at deploy rather than at build. Parquet also keeps the index readable by the wider
  ecosystem rather than by one engine.
- **Query engine**: DuckDB, embedded in the service process. There is no separate database
  tier to operate, and columnar scan and aggregation over Parquet matches the dominant
  workload — cohort counts, cross-study filtering, and temporal constraints.
- **Release manifest**: each release publishes its artifacts under new paths together with
  a manifest naming them. Services resolve the manifest at startup; every path below it is
  immutable. Staleness detection is therefore unnecessary — a file never changes under a
  given name, caches never need invalidation, and rollback is repointing at the previous
  manifest.
- **Concurrency**: nothing writes at runtime. DuckDB's read-only mode allows many processes
  to read the same artifact, so service instances scale horizontally without coordination.

### The search index

Semantic search runs on Solr, following Monarch, whose tooling uses Solr as its default and
more feature-rich backend and which publishes a Solr image. Reusing their index schema and
closure fields is worth more than any marginal advantage another engine might offer,
particularly with Monarch developers on the team. SolrJ covers the Java client requirement,
and Solr is Apache-2.0, so there is no licensing question.

Knowledge graph closures are denormalized into search documents at build time rather than
traversed at query time. That keeps the graph a build-time input instead of a runtime store,
and makes concept expansion a field lookup. Multi-hop reasoning is the thing that would
genuinely require a live graph, and it is not currently required.

Index releases follow the same pattern as the rest: build a versioned collection at
ingestion, swap the alias on release, roll back by repointing. The index must not become the
one mutable thing that breaks the model everything else depends on.

This is the first component that requires running infrastructure, and it is an accepted cost
rather than an oversight. It gives back the "no separate database tier to operate" property
that the embedded query engine provides, and no managed Solr is available on the current
deployment platform, so it needs a deliberate home.

### Adding a further store

A store beyond these is added when a specific query demonstrably cannot be served, not
speculatively, and follows the same rule — Monarch's framework where it applies, gated on a
first-class client for the service tier's language.

Polyglot persistence carries less risk here than usual, because every store is a build
artifact regenerated at ingestion and read-only at runtime. There are no dual writes and no
consistency window — the costs are operational, not correctness.

## Build Layer

The other half of the middleware, and ours to own. It assembles the metadata index from the
four sources above and publishes the result as a versioned release.

Harmonization itself is not ours — it happens in dm-bip, upstream and offline, which is also
where provenance is emitted. Provenance belongs at the point of derivation rather than being
reconstructed downstream by re-parsing the transform specs, and it has two layers: mapping
provenance, which records that a harmonized concept came from particular source variables and
is derivable from the specs alone, and execution provenance, which records that an artifact
was produced by a given run from given inputs and exists only at run time. The second cannot
be reconstructed after the fact at all.

What remains here is index assembly rather than data transformation: fetching published
artifacts, building the Parquet index and the search index, and publishing the manifest that
names them. That is deliberately the part which depends on our serving design and nothing
else.

Its language is a separate question from the serving tier's. This layer builds and consumes
rather than deploys, so it can follow its inputs — much of the upstream tooling is LinkML and
Monarch, which is Python. Java is not excluded, and if the build has to run inside a BDC
architectural layer that mandates it, that settles the question. Nothing in the design
depends on the answer, because the two halves of the middleware meet only through published
artifacts and never through a shared runtime.

### Curation

Artifacts are immutable once published, but they are not fixed forever — curators and
researchers need a way to correct and extend the Variable Library and the provenance records.
That happens by suggestion rather than mutation: a curation tool proposes changes against the
upstream sources, those are reviewed, and the next release regenerates the artifacts.

The suggestion store is mutable; the served artifacts are not, and the two meet only at build
time. Nothing writes to a served artifact at runtime, which is what preserves the read path's
guarantees. Whether suggestions are captured as pull requests against the source repositories
or in a store of their own is open — the former needs no new mutable infrastructure and
inherits an existing review workflow, but asks more of the tool that hides git from
researchers.

## External Integrations
- **Integrated Search**: BDCBot + Monarch ontologies/knowledge graph for entity resolution
- **DMC Data Ingestion**: LinkML-based harmonization and transformation to BDCHM
- **User Feedback/Activity**: Captures user actions and feedback across components
- **BDC Analytic Widgets**: User-supplied tools shared through the knowledge library
- **BDC Components**: Foundational services for data provisioning and access control

## Core Design Principles
1. **LinkML "source of truth"**: A comprehensive metadata index created during ingestion, enabling consistent cross-study search independent of portal
2. **Modular, API-driven**: UIs decoupled from backends through modular APIs and widgets
3. **Longitudinal as first-class**: Time-aware queries are native, not embedded in variables
4. **Transportable query results**: Standardized JSON outputs (study definition, counts, variable mappings, provenance, access constraints) for downstream use
5. **Security by design**: NIST 800-53 framework, FedRAMP Mod/High, HIPAA compliance

## Deployment

The API runs as a Docker container, the UI is a static site. Both auto-deploy on push.

| Service | Platform | Branch | URL |
|---------|----------|--------|-----|
| API (prod) | Render (Web Service, Docker) | `main` | `study-palette-api.onrender.com` |
| API (dev) | Render (Web Service, Docker) | `api-dev-deploy` | `study-palette-dev.onrender.com` |
| UI (prod) | Netlify | `main` | `study-palette.netlify.app` |
| UI (preview) | Netlify | PR branches | auto-generated per PR |
| Docs | GitHub Pages | `main` (`/docs`) | `tis-lab.github.io/study-palette` |

### How it fits together

- Netlify proxies `/api/*` to Render. The target is set per deploy context in `netlify.toml`:
  - **Production** → `study-palette-api.onrender.com`
  - **PR previews** → `study-palette-dev.onrender.com`
- To test API changes on a PR preview, push them to `api-dev-deploy` before or alongside the PR.
- The API Dockerfile is at `docker/api.Dockerfile`. Both Render services use it.

### Render service setup (manual, not Blueprint)

Create each as **New → Web Service** (not Blueprint):
- Connect the `tis-lab/study-palette` repo
- Runtime: **Docker**
- Dockerfile Path: `docker/api.Dockerfile`
- Docker Context Directory: `.`
- Instance Type: **Free**
- Branch: `main` for prod, `api-dev-deploy` for dev

### Notes

- Render free tier spins down after 15 min inactivity (~30s cold start on first request)
- Do not use Render Blueprints — `render.yaml` creates naming conflicts with manually configured services

## Tech Stack
- **Front end**: ReactJS — modular, reusable component library
- **APIs**: FastAPI today; Spring Boot (Java 21) is the target should the tier move to Java
- **Build layer**: language follows its inputs (LinkML and Monarch tooling is Python), unless
  a BDC architectural layer mandates otherwise
- **Metadata index**: Parquet on object storage, queried with embedded DuckDB
- **Semantic search**: Solr, following Monarch, with KG closures denormalized at build time
- **Data model**: LinkML (BDCHM — BDC Harmonized Data Model), with the BDC Variable Library
  and a PROV-O provenance schema alongside it
- **Semantic search**: Monarch ontologies and knowledge graph
- **Security**: NIST 800-53, FedRAMP Mod/High, HIPAA
