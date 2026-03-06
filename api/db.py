"""DuckDB connection management."""

import os
import re
from functools import lru_cache
from pathlib import Path

import duckdb

DATA_DIR = Path(os.environ.get("STUDY_PALETTE_DATA_DIR", "data"))

_SAFE_ID = re.compile(r"^[a-zA-Z0-9_-]+$")


def _result_dicts(result: duckdb.DuckDBPyConnection) -> list[dict]:
    columns = [desc[0] for desc in result.description]
    return [dict(zip(columns, row, strict=True)) for row in result.fetchall()]


def _connect() -> duckdb.DuckDBPyConnection:
    con = duckdb.connect(":memory:", read_only=False)
    for db_file in sorted(DATA_DIR.glob("*.duckdb")):
        schema = db_file.stem
        if not _SAFE_ID.match(schema):
            continue
        con.execute(f"ATTACH '{db_file}' AS \"{schema}\" (READ_ONLY)")  # noqa: S608
    return con


@lru_cache
def list_study_ids() -> tuple[str, ...]:
    """Return available study IDs (one per .duckdb file)."""
    return tuple(
        f.stem for f in sorted(DATA_DIR.glob("*.duckdb")) if _SAFE_ID.match(f.stem)
    )


def get_all_studies() -> list[dict]:
    """Return study metadata with participant counts for all studies."""
    con = _connect()
    try:
        studies = []
        for study_id in list_study_ids():
            rows = _result_dicts(
                con.execute(f'SELECT * FROM "{study_id}".research_study')  # noqa: S608
            )
            if not rows:
                continue
            study = rows[0]
            study["participant_count"] = con.execute(
                f'SELECT count(*) FROM "{study_id}".participant'  # noqa: S608
            ).fetchone()[0]
            studies.append(study)
        return studies
    finally:
        con.close()


def get_study(study_id: str) -> dict | None:
    """Return a single study with summary statistics."""
    con = _connect()
    try:
        rows = _result_dicts(
            con.execute(f'SELECT * FROM "{study_id}".research_study')  # noqa: S608
        )
        if not rows:
            return None
        study = rows[0]
        study["participant_count"] = con.execute(
            f'SELECT count(*) FROM "{study_id}".participant'  # noqa: S608
        ).fetchone()[0]
        study["condition_count"] = con.execute(
            f"SELECT count(*) FROM \"{study_id}\".condition "  # noqa: S608
            "WHERE condition_status = 'PRESENT'"
        ).fetchone()[0]
        return study
    finally:
        con.close()


def get_participants(study_id: str) -> list[dict]:
    """Return participants joined with demographics for a study."""
    con = _connect()
    try:
        return _result_dicts(con.execute(
            f'SELECT p.id, p.member_of_research_study, '  # noqa: S608
            f'd.sex, d.race, d.ethnicity, d.age_at_observation, d.smoking_status '
            f'FROM "{study_id}".participant p '
            f'LEFT JOIN "{study_id}".demography d '
            f'ON p.id = d.associated_participant'
        ))
    finally:
        con.close()


def get_condition_summary(study_id: str) -> list[dict]:
    """Return condition counts grouped by concept and status."""
    con = _connect()
    try:
        return _result_dicts(con.execute(
            f'SELECT condition_concept, condition_status, count(*) AS count '  # noqa: S608
            f'FROM "{study_id}".condition '
            f'GROUP BY condition_concept, condition_status '
            f'ORDER BY count DESC'
        ))
    finally:
        con.close()
