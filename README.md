# Study Palette

A unified platform for cross-study data discovery and meta-analysis study building within the [NHLBI BioData Catalyst](https://biodatacatalyst.nhlbi.nih.gov/) (BDC) ecosystem.

Study Palette replaces fragmented search interfaces with a semantic, modular platform that enables researchers to discover data, explore variables, build studies, and transition to analysis — all from a single portal.

## Architecture

The system is organized into four layers:

- **Front End** (ReactJS) — Semantic search, query builder, visualizations, and data actions
- **Modular APIs** — Search, Query, Analyze, and Workflows services
- **Metadata Index** — A LinkML-based "source of truth" generated during data ingestion, published as Parquet and queried with embedded DuckDB, enabling consistent cross-study search at the variable and participant levels
- **External Integrations** — Monarch ontologies for entity resolution, DMC data ingestion, BDC analytic widgets, and foundational BDC services

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full architecture reference and [DEVELOPMENT.md](DEVELOPMENT.md) for the project roadmap.

## Related Projects

| Repository | Description |
|------------|-------------|
| [NHLBI-BDC-DMC-HM](https://github.com/RTIInternational/NHLBI-BDC-DMC-HM) | BDC Harmonized Data Model (BDCHM) — the LinkML data model |
| [dm-bip](https://github.com/linkml/dm-bip) | Data Model-Based Ingestion Pipeline — harmonizes and transforms data upstream of Study Palette |
| [BDC-VarLib](https://github.com/tis-lab/BDC-VarLib) | BDC Variable Library — one LinkML slot per harmonized clinical concept, spanning the contributing studies |
| [prov-schema](https://github.com/diatomsRcool/prov-schema) | PROV-O based LinkML schema for file and data provenance in BDC |
| [monarch-bdc-kg](https://github.com/tis-lab/monarch-bdc-kg) | BDC knowledge graph, based on the Monarch KG |

## Project Structure

```
study-palette/
├── api/                  # FastAPI backend + DuckDB
├── ui/                   # React + TypeScript + Vite front end
├── docker/               # Dockerfiles
├── docs/                 # Architecture docs and decisions
└── .github/workflows/    # CI/CD pipelines
```

## License

[MIT](LICENSE)
