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

## Tech Stack
- **Front end**: ReactJS — modular, reusable component library
- **APIs**: FastAPI — Search, Query, Analyze, and Workflows services
- **Data model**: LinkML (BDCHM — BDC Harmonized Data Model)
- **Semantic search**: Monarch ontologies and knowledge graph
- **Security**: NIST 800-53, FedRAMP Mod/High, HIPAA
