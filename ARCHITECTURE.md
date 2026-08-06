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

This is a thin middleware tier serving the front end. Logic belongs in the metadata index
and the query layer wherever it can go there — but three responsibilities can only be
enforced here, and must not be pushed outward into precomputation or the client:

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

The LinkML "source of truth" is a build artifact, not a live database. It is generated from
BDCHM during ingestion, published to object storage, and served read-only.

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

### Ingestion and serving are separate

Harmonization and index generation run offline and upstream of the portal. The runtime only
reads the resulting artifacts. This keeps the ingestion toolchain out of the serving tier
and allows the two to be written in different languages.

### Adding a second store

The semantic layer may eventually need a store the index cannot serve. Any such store
follows Monarch's framework — its supported serving forms, gated on a first-class client
for the service tier's language.

A second store is added when a specific query demonstrably cannot be served, not
speculatively. Concept expansion via precomputed transitive closure, and free-text
resolution via full-text or vector search, are served from the index; multi-hop reasoning
over the knowledge graph is not.

Polyglot persistence carries less risk here than usual, because every store is a build
artifact regenerated at ingestion and read-only at runtime. There are no dual writes and no
consistency window — the costs are operational, not correctness.

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
- **Metadata index**: Parquet on object storage, queried with embedded DuckDB
- **Data model**: LinkML (BDCHM — BDC Harmonized Data Model)
- **Semantic search**: Monarch ontologies and knowledge graph
- **Security**: NIST 800-53, FedRAMP Mod/High, HIPAA
