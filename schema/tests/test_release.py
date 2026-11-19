"""
Tests for the release manifest schema and its example payload.

Each top-level directory of the payload stands in for the bucket it is named after.
"""

import hashlib
from pathlib import Path
from urllib.parse import urlparse

import pytest
import yaml
from linkml.validator import validate
from linkml_runtime import SchemaView

SCHEMA_DIR = Path(__file__).resolve().parent.parent
PAYLOAD = SCHEMA_DIR / "examples" / "release" / "SYNTHETIC.example-2027.1"
MANIFEST = PAYLOAD / "example-bdc-release-2027-1" / "SYNTHETIC.manifest.yaml"


@pytest.fixture(scope="module")
def schema():
    view = SchemaView(str(SCHEMA_DIR / "release.yaml"))
    view.merge_imports()
    return view.schema


@pytest.fixture
def errors(schema):
    return lambda instance: [r.message for r in validate(instance, schema, "Release").results]


@pytest.fixture
def manifest():
    return yaml.safe_load(MANIFEST.read_text())


def packages(manifest):
    """Every package with its files, the studies' harmonized data and provenance included."""
    for key in ("data_model", "variable_library", "knowledge_graph"):
        yield manifest[key], manifest[key]["files"]
    for study in manifest["studies"]:
        yield study, study["harmonized_data"] + study["provenance"]


def located(package, file):
    """Where a listed file is in the payload: its bucket, then any prefix, then its path."""
    url = urlparse(package["download_url"])
    return PAYLOAD / url.netloc / url.path.lstrip("/") / file["path"]


def test_the_manifest_validates(manifest, errors):
    assert errors(manifest) == []


def test_listed_files_match_the_payload(manifest):
    for package, files in packages(manifest):
        for file in files:
            data = located(package, file).read_bytes()
            assert (len(data), hashlib.sha256(data).hexdigest()) == (file["bytes"], file["sha256"]), file["path"]
            if file["format"] == "JSONL":
                assert len(data.splitlines()) == file["record_count"], file["path"]


def test_every_delivered_file_is_listed(manifest):
    listed = {located(p, f) for p, files in packages(manifest) for f in files} | {MANIFEST}
    assert {p for p in PAYLOAD.rglob("*") if p.is_file()} == listed


def test_each_study_revision_has_its_own_bucket(manifest):
    urls = [s["download_url"] for s in manifest["studies"]]
    assert len(urls) == len(set(urls))
    assert not set(urls) & {manifest[k]["download_url"] for k in ("data_model", "variable_library", "knowledge_graph")}


def test_example_accessions_are_fictional(manifest):
    """Real accessions would make the example look like controlled-access data."""
    assert all(s["accession"].startswith("phs999") for s in manifest["studies"])


def test_a_study_without_provenance_is_rejected(manifest, errors):
    del manifest["studies"][0]["provenance"]
    assert any("provenance" in e for e in errors(manifest))


def test_a_versioned_accession_is_rejected(manifest, errors):
    manifest["studies"][0]["accession"] = "phs999001.v2"
    assert any("phs999001.v2" in e for e in errors(manifest))
