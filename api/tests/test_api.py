from fastapi.testclient import TestClient

from api.main import app

client = TestClient(app)


def test_health():
    resp = client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_list_studies():
    resp = client.get("/api/studies")
    data = resp.json()
    assert "studies" in data
    assert data["total"] == 4
    assert all("id" in s for s in data["studies"])


def test_get_study():
    resp = client.get("/api/studies/phs000209")
    data = resp.json()
    assert data["id"] == "phs000209"
    assert "name" in data


def test_get_study_not_found():
    resp = client.get("/api/studies/nonexistent")
    assert resp.status_code == 404


def test_overview():
    resp = client.get("/api/overview")
    data = resp.json()
    assert "conditions" in data
    assert "procedures" in data
    assert len(data["conditions"]) == 4
    assert all("children" in c for c in data["conditions"])
