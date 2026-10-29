"""
The toy middleware serves documents that validate against the generated contract.

The summary schema imports BDCHM from synthetic/bdchm.yaml; run synthetic/fetch-bdchm.sh first.
"""

import shutil

import pytest
import yaml
from fastapi.testclient import TestClient
from linkml.generators.jsonschemagen import JsonSchemaGenerator
from server import EXAMPLES, PREFIX, ROOT, create_app

SCHEMA_DIR = ROOT / "schema"
CONTRACTS = {"summary": "SummaryResponse", "terms": "Term"}

pytestmark = pytest.mark.skipif(
    not (ROOT / "synthetic" / "bdchm.yaml").exists(),
    reason="BDCHM not fetched; run synthetic/fetch-bdchm.sh",
)


@pytest.fixture(scope="module")
def generated(tmp_path_factory):
    """The JSON Schemas `make -C contracts` would generate."""
    out = tmp_path_factory.mktemp("generated")
    for contract, top_class in CONTRACTS.items():
        schema = JsonSchemaGenerator(str(SCHEMA_DIR / f"{contract}.yaml"), top_class=top_class).serialize()
        (out / f"{contract}.schema.json").write_text(schema)
    return out


@pytest.fixture
def client(generated):
    return TestClient(create_app(generated))


def test_a_summary_is_served_as_a_valid_document(client):
    response = client.get("/summary/t2d")
    assert response.status_code == 200
    assert response.json()["seed"] == "MONDO:0005148"


def test_every_example_is_a_valid_document(client):
    for path in EXAMPLES.glob(f"{PREFIX}*.yaml"):
        assert client.get(f"/summary/{path.stem.removeprefix(PREFIX)}").status_code == 200, path.name


def test_a_term_resolves_by_curie(client):
    response = client.get("/terms/MONDO:0005148")
    assert response.status_code == 200
    assert response.json()["label"] == "type 2 diabetes mellitus"


def test_unknown_names_are_not_found(client):
    assert client.get("/summary/nope").status_code == 404
    assert client.get("/terms/NOPE:1").status_code == 404


def test_a_document_that_breaks_the_contract_is_refused(generated, tmp_path):
    broken = yaml.safe_load((EXAMPLES / f"{PREFIX}t2d.yaml").read_text())
    del broken["studies"][0]["participant_count"]
    (tmp_path / f"{PREFIX}broken.yaml").write_text(yaml.safe_dump(broken))
    shutil.copy(EXAMPLES / f"{PREFIX}t2d.yaml", tmp_path)

    client = TestClient(create_app(generated, tmp_path))
    assert client.get("/summary/t2d").status_code == 200
    response = client.get("/summary/broken")
    assert response.status_code == 500
    assert "participant_count" in str(response.json())
