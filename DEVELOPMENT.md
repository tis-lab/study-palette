# Development Overview

Study Palette is one of several repositories building the BDC Data Portal. The deliverable
roadmap, milestones, and reporting structure live in
[`tis-lab/BDC-Portal`](https://github.com/tis-lab/BDC-Portal/blob/main/DEVELOPMENT.md).
This document covers how work in *this* repository connects to that, and the labels used here.

# How issues here roll up

An issue in this repository counts toward a funding deliverable if and only if it is linked
to an issue in `tis-lab/BDC-Portal` — as a sub-issue where GitHub allows it, or by reference
from a `Tracking`-labelled issue where it doesn't.

Link to the lowest tier that already exists over there (Story if there is one, otherwise the
Epic). Don't create a Story just to have somewhere to hang an issue.

Closing an issue here advances its parent, which advances the deliverable. Nothing else needs
updating for a report to be correct — in particular, contributors close issues and do not set
status on the [project board](https://github.com/orgs/tis-lab/projects/7).

Work that genuinely isn't deliverable work gets the `Future` label and is excluded. That's a
valid answer, not a gap.

# GitHub Labels

## Project Area Labels

These mirror the Aim 1 deliverables and are for engineering triage within this repo. They are
not what drives reporting — the link to BDC-Portal is.

| Label | Deliverable | Description |
|-------|-------------|-------------|
| `Metadata Source of Truth` | M1.1 | LinkML metadata, semantic bindings, query engine |
| `UI Components` | M1.2.1 | ReactJS interface components |
| `APIs` | M1.2.2 | Modular API services |
| `Visualizations` | M1.2.3 | Visualization widgets |
| `Security & Compliance` | M1.2.4 | NIST/FedRAMP/HIPAA compliance |
| `Query Outputs` | M1.3.1 | Transportable query results and workflows |
| `Requirements & Evaluation` | M1.3.2 | Requirements analysis and usability |
| `User Metrics` | M1.3.3 | Interface hooks and interaction tracking |

## Workflow Labels

| Label | Description |
|-------|-------------|
| `Tracking` | Depends on work in a repository we don't control; the reference is in the body |
| `Infrastructure` | CI/CD, repo tooling, dev environment |
| `Documentation` | Docs, architecture decisions, onboarding |
| `Future` | Future work — not on current roadmap |

`Infrastructure` and `Documentation` are cross-cutting and can appear alongside an area label.
An issue carrying only those still needs a BDC-Portal link if it serves a deliverable.
