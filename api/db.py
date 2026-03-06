"""DuckDB connection management."""

import os
from pathlib import Path

import duckdb

DATA_DIR = Path(os.environ.get("STUDY_PALETTE_DATA_DIR", "data"))


def _execute(sql: str, params: list | None = None) -> list[dict]:  # noqa: S608
    """Execute SQL against all attached study databases, return rows as dicts."""
    con = _connect()
    try:
        result = con.execute(sql, params or [])
        columns = [desc[0] for desc in result.description]
        return [dict(zip(columns, row, strict=True)) for row in result.fetchall()]
    finally:
        con.close()


def _connect() -> duckdb.DuckDBPyConnection:
    con = duckdb.connect(":memory:", read_only=False)
    for db_file in sorted(DATA_DIR.glob("*.duckdb")):
        schema = db_file.stem
        con.execute(f"ATTACH '{db_file}' AS \"{schema}\" (READ_ONLY)")  # noqa: S608
    return con


def list_study_ids() -> list[str]:
    """Return available study IDs (one per .duckdb file)."""
    return [f.stem for f in sorted(DATA_DIR.glob("*.duckdb"))]


def get_all_studies() -> list[dict]:
    """Return study metadata with participant counts for all studies."""
    studies = []
    for study_id in list_study_ids():
        rows = _execute(f'SELECT * FROM "{study_id}".research_study')  # noqa: S608
        if not rows:
            continue
        study = rows[0]
        counts = _execute(f'SELECT count(*) AS n FROM "{study_id}".participant')  # noqa: S608
        study["participant_count"] = counts[0]["n"]
        studies.append(study)
    return studies


def get_study(study_id: str) -> dict | None:
    """Return a single study with summary statistics."""
    rows = _execute(f'SELECT * FROM "{study_id}".research_study')  # noqa: S608
    if not rows:
        return None
    study = rows[0]
    study["participant_count"] = _execute(
        f'SELECT count(*) AS n FROM "{study_id}".participant'  # noqa: S608
    )[0]["n"]
    study["condition_count"] = _execute(
        f"SELECT count(*) AS n FROM \"{study_id}\".condition "  # noqa: S608
        "WHERE condition_status = 'PRESENT'"
    )[0]["n"]
    return study


def get_participants(study_id: str) -> list[dict]:
    """Return participants joined with demographics for a study."""
    return _execute(
        f'SELECT p.id, p.member_of_research_study, '  # noqa: S608
        f'd.sex, d.race, d.ethnicity, d.age_at_observation, d.smoking_status '
        f'FROM "{study_id}".participant p '
        f'LEFT JOIN "{study_id}".demography d '
        f'ON p.id = d.associated_participant'
    )


def get_condition_summary(study_id: str) -> list[dict]:
    """Return condition counts grouped by concept and status."""
    return _execute(
        f'SELECT condition_concept, condition_status, count(*) AS count '  # noqa: S608
        f'FROM "{study_id}".condition '
        f'GROUP BY condition_concept, condition_status '
        f'ORDER BY count DESC'
    )
