# Development Overview

This document contains the project development roadmap and milestone tracking for Study Palette (BDC Meta-Analysis Study Builder & Query Tool).

# Project Roadmap

**Note:** Quarter boundaries are approximate and will be adjusted when the project period is confirmed. Date ranges represent planned timeline slots for visual layout.

```mermaid
---
config:
  theme: dark
  themeVariables:
    taskBkgColor: '#8a8a8a'
    taskBorderColor: '#9a9a9a'
    activeTaskBkgColor: '#8b5cf6'
    activeTaskBorderColor: '#7c3aed'
    doneTaskBkgColor: '#238636'
    doneTaskBorderColor: '#2ea043'
    critBkgColor: '#0891b2'
    critBorderColor: '#06b6d4'
  gantt:
    displayMode: compact
    useWidth: 1200
---
gantt
    title Study Palette Roadmap
    dateFormat  YYYY-MM-DD

    section Quarters
    Q1 Start             :milestone, q1, 2026-03-01, 0d
    Q2 Start             :milestone, q2, 2026-06-01, 0d
    Q3 Start             :milestone, q3, 2026-09-01, 0d
    Q4 Start             :milestone, q4, 2026-12-01, 0d
    Q4 End               :milestone, q4end, 2027-02-28, 0d

    section Metadata Source of Truth 
    Tracking Issue                                       :crit, t_sot, 2026-04-10, 6w

    section 1 
    Define LinkML metadata for Data Portal               :m11a, 2026-03-01, 2026-05-31
    Generate harmonized LinkML metadata (DMC)            :m11b, 2026-03-01, 2026-08-31
    Identify mechanism of access to BDC metadata         :m11c, 2026-03-01, 2026-08-31

    section UI Components 
    Tracking Issue                                       :crit, t_ui, 2026-04-10, 6w

    section 2 
    ReactJS components for query interactions            :m121a, 2026-03-01, 2026-11-30
    API endpoint for metadata + row-level data          :m121b, 2026-06-01, 2026-11-30
    API for front-end query execution                    :m121c, 2026-06-01, 2026-11-30

    section APIs 
    Tracking Issue                                       :crit, t_api, 2026-04-10, 6w

    section 3 
    Define standard query results data object            :m122a, 2026-06-01, 2026-08-31
    API returning data objects                           :m122b, 2026-06-01, 2026-11-30
    Document data object structure + viz methods         :m122c, 2026-09-01, 2026-11-30

    section Visualizations 
    Tracking Issue                                       :crit, t_viz, 2026-04-10, 6w

    section 4 
    Standard visualizations for query results            :m123a, 2026-09-01, 2027-02-28
    Framework for user-driven visualizations             :m123b, 2026-09-01, 2027-02-28

    section Security & Compliance 
    Tracking Issue                                       :crit, t_sec, 2026-04-10, 6w

    section 5 
    Document security features per component             :m124a, 2026-03-01, 2026-08-31
    SSP collaboration + security review/testing          :m124b, 2026-09-01, 2027-02-28

    section Query Outputs & Workflows 
    Tracking Issue                                       :crit, t_qo, 2026-04-10, 6w

    section 6 
    Establish data handoff requirements                  :m131a, 2026-03-01, 2026-08-31
    Design logging framework for metrics                 :m131b, 2026-06-01, 2026-11-30
    Incorporate data handoffs with BDC                   :m131c, 2026-09-01, 2027-02-28

    section Requirements & Evaluation 
    Tracking Issue                                       :crit, t_req, 2026-04-10, 6w

    section 7 
    Requirements analysis for system + metrics           :m132a, 2026-03-01, 2026-05-31
    Metrics list provided to leadership                  :m132b, 2026-03-01, 2026-08-31
    Workflow docs for user feedback collection            :m132c, 2026-06-01, 2026-11-30

    section User Metrics 
    Tracking Issue                                       :crit, t_um, 2026-04-10, 6w

    section 8 
    Identify components for interaction tracking         :m133a, 2026-06-01, 2026-08-31
    Implement system interaction hooks                   :m133b, 2026-06-01, 2027-02-28
    Docs for adding new metrics hooks                    :m133c, 2026-09-01, 2027-02-28

    axisFormat %B
    tickInterval 1month
```

# GitHub Labels

## Project Area Labels

| Label | Description |
|-------|-------------|
| `Tracking` | Tracking issues for development and reporting |
| `Metadata Source of Truth` | LinkML metadata, semantic bindings, query engine |
| `UI Components` | ReactJS interface components |
| `APIs` | Modular API services |
| `Visualizations` | Visualization widgets |
| `Security & Compliance` | NIST/FedRAMP/HIPAA compliance |
| `Query Outputs` | Transportable query results and workflows |
| `Requirements & Evaluation` | Requirements analysis and usability |
| `User Metrics` | Interface hooks and interaction tracking |

## Workflow Labels

| Label | Description |
|-------|-------------|
| `Infrastructure` | CI/CD, repo tooling, dev environment |
| `Documentation` | Docs, architecture decisions, onboarding |
| `Future` | Future work — not on current roadmap |

# Project Outline

Each section corresponds to a Gantt chart section and will have an associated GitHub tracking issue.

## 1. Metadata Source of Truth

Comprehensive, machine-readable metadata and scalable query services for BDCHM-compliant data.

- [ ] Define structured LinkML metadata required for Data Portal (Q1)
- [ ] Generate harmonized LinkML metadata files via DMC Data Ingestion (Q1–Q2)
- [ ] Identify mechanism of access to BDC computational metadata (Q1–Q2)

## 2. UI Components

Open-source library of reusable interface components.

- [ ] ReactJS components for user interactions with query components (Q1–Q3)
- [ ] API endpoint for metadata files and row-level BDC data (Q2–Q3)
- [ ] API for processing front-end interactions to execute queries against BDC (Q2–Q3)

## 3. APIs

Open-source library of reusable APIs.

- [ ] Define standard data object for query results (Q2)
- [ ] API capable of returning data objects (Q2–Q3)
- [ ] Document data object structure and methods for data visualizations (Q3)

## 4. Visualizations

Open-source library of visualization widgets.

- [ ] Standard visualizations for all query results (Q3–Q4)
- [ ] Framework for adding user-driven visualizations (Q3–Q4)

## 5. Security & Compliance

Security and compliance features for each component.

- [ ] Document security and compliance features per component and BDC integration (Q1–Q2)
- [ ] Collaborate with NIH on SSP and security review/testing (Q3–Q4)

## 6. Query Outputs & Workflows

Standardized, logged, transportable query results for use in the BDC ecosystem.

- [ ] Establish requirements of data handoffs to other BDC components (Q1–Q2)
- [ ] Design logging framework based on metrics requirements (Q2–Q3)
- [ ] Incorporate data handoffs with BDC components into Data Portal (Q3–Q4)

## 7. Requirements & Evaluation

Formal requirements analysis for interfaces and workflows.

- [ ] Requirements analysis to define desired system functionality and metrics (Q1)
- [ ] Metrics list with descriptions provided to leadership (Q1–Q2)
- [ ] Workflow documentation for user feedback collection (Q2–Q3)

## 8. User Metrics

Interface hooks to collect system interactions and generate user metrics.

- [ ] Identify relevant interface components for interaction tracking (Q2)
- [ ] Implement system interaction hooks for prioritized metrics (Q2–Q4)
- [ ] Supporting documentation for adding new hooks (Q3–Q4)
