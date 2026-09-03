# Study Palette

## Project Overview

Study Palette is the Meta-Analysis Study Builder & Query Tool for the NHLBI BioData Catalyst® (BDC) ecosystem — a unified tool for cross-study data discovery and study building.

The system replaces fragmented interfaces with a semantic, modular, and user-friendly application that increases adoption, reduces user burden, and accelerates research.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full system architecture. Treat it as authoritative for all component boundaries, design principles, and tech stack decisions.

## Development Practices
- Agile sprints (3-4 weeks)
- All work tracked via GitHub Issues with labels matching project areas
- See DEVELOPMENT.md for the project roadmap and milestone tracking
- Branch protection on `main`
- PR reviews required before merge

## Synthetic Data

All generated data must be unmistakably labelled as synthetic. Files carry `SYNTHETIC` in
the filename and a header stating they are not derived from participant data — a stray
`.txt.gz` should be identifiable without opening it or knowing where it came from.

**Synthetic data generated against real transformation specs is never published.** Such data
carries real dbGaP accessions — `phs`, `pht`, and `phv` identifiers belonging to actual
studies — so a file that escapes looks exactly like an export of controlled-access data.
It stays a transient local artifact: gitignored, not committed, not attached to releases,
not shared outside the team.

Synthetic data built on **fictional** accessions is publishable, and is how reference
corpora are distributed. The distinction is the accessions, not the data.

## Commit Conventions
- Short or one-line commit messages that summarize the work
- No co-author lines
- No "Closes #N" in commit messages (link issues in the PR instead)
