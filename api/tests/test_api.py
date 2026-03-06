import tempfile
from pathlib import Path

import pytest
from fastapi.testclient import TestClient


@pytest.fixture(autouse=True)
def seed_db(monkeypatch):
    """Create a temporary DuckDB from seed data for each test."""
    from api.load_seed_data import load

    seed_dir = Path(__file__).resolve().parent.parent / "seed_data"
    with tempfile.TemporaryDirectory() as tmp:
        load(seed_dir, Path(tmp))
        monkeypatch.setenv("STUDY_PALETTE_DATA_DIR", tmp)
        import api.db

        monkeypatch.setattr(api.db, "DATA_DIR", Path(tmp))
        api.db.list_study_ids.cache_clear()
        yield


@pytest.fixture
def client():
    from api.main import app

    return TestClient(app)


def test_health(client):
    resp = client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_list_studies(client):
    resp = client.get("/api/studies")
    data = resp.json()
    assert data["total"] == 1
    study = data["studies"][0]
    assert study["id"] == "phs000000"
    assert study["participant_count"] == 110


def test_get_study(client):
    resp = client.get("/api/studies/phs000000")
    data = resp.json()
    assert data["id"] == "phs000000"
    assert data["participant_count"] == 110
    assert "condition_count" in data


def test_get_study_not_found(client):
    resp = client.get("/api/studies/nonexistent")
    assert resp.status_code == 404


def test_list_participants(client):
    resp = client.get("/api/studies/phs000000/participants")
    data = resp.json()
    assert data["total"] == 110
    p = data["participants"][0]
    assert "sex" in p
    assert "race" in p
    assert "age_at_observation" in p


def test_list_conditions(client):
    resp = client.get("/api/studies/phs000000/conditions")
    data = resp.json()
    assert len(data["conditions"]) > 0
    c = data["conditions"][0]
    assert "condition_concept" in c
    assert "condition_status" in c
    assert "count" in c


def test_list_participants_not_found(client):
    resp = client.get("/api/studies/nonexistent/participants")
    assert resp.status_code == 404


def test_list_conditions_not_found(client):
    resp = client.get("/api/studies/nonexistent/conditions")
    assert resp.status_code == 404
