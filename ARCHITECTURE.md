# Architecture

The system architecture defines four layers with clear component boundaries:

## Front End (ReactJS)
- **Semantic Search**: Field entry of search terms, entity resolution, concept curation
- **Query Builder**: Filters, inclusion/exclusion criteria, longitudinal/temporal constraints
- **Visualizations**: Results rendering, standard plots, consortium-defined advanced visualizations
- **Actions**: Data access requests, analysis environment launch, export, API code generation

## Modular APIs (FastAPI)
- **Search API**: Entity resolution over any BDC concept
- **Query API**: Query over all BDC content including row-level participant data
- **Analyze API**: Structured, standardized outputs for visualization and logging
- **Workflows API**: Transitions between Data Portal and other BDC components

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
- **APIs**: FastAPI — Search, Query, Analyze, and Workflows services
- **Data model**: LinkML (BDCHM — BDC Harmonized Data Model)
- **Semantic search**: Monarch ontologies and knowledge graph
- **Security**: NIST 800-53, FedRAMP Mod/High, HIPAA
