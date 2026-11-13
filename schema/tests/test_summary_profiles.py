"""Each access-tier profile must accept a conforming response and reject the disclosures it forbids."""
import copy
import json
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator
from linkml.generators.jsonschemagen import JsonSchemaGenerator

SCHEMA_DIR = Path(__file__).resolve().parent.parent
pytestmark = pytest.mark.skipif(
    not (SCHEMA_DIR.parent / "synthetic" / "bdchm.yaml").exists(),
    reason="BDCHM not fetched; run synthetic/fetch-bdchm.sh",
)

PUBLIC = {
    "release": "synthetic",
    "min_count": 11,
    "count_mode": "OBFUSCATED",
    "participant_count": 1200,
    "suppressed_study_count": 2,
    "studies": [{"id": "phs000209", "name": "MESA", "count_status": "LISTED"}],
    "summary": {"conditions": [{
        "id": "palette:condition/t2d",
        "condition_concept": "MONDO:0005148",
        "participant_count": 300,
        "count_mode": "OBFUSCATED",
    }]},
}


def validator_for(top_class):
    schema = json.loads(JsonSchemaGenerator(str(SCHEMA_DIR / "summary-profiles.yaml"),
                                            top_class=top_class, not_closed=False).serialize())
    return Draft202012Validator(schema)


@pytest.fixture(scope="module")
def public():
    return validator_for("PublicSummaryResponse")


def test_public_conforming_response_validates(public):
    assert list(public.iter_errors(PUBLIC)) == []


@pytest.mark.parametrize("mutate", [
    pytest.param(lambda d: d["studies"][0].update(participant_count=40), id="study-count"),
    pytest.param(lambda d: d["studies"][0].update(count_status="REPORTED"), id="study-reported"),
    pytest.param(lambda d: d["summary"]["conditions"][0].update(record_count=1), id="record-count"),
    pytest.param(lambda d: d["summary"]["conditions"][0].update(
        studies=[{"research_study": "phs000209", "participant_count": 12}]), id="per-study-counts"),
    pytest.param(lambda d: d.update(count_mode="EXACT"), id="exact-root"),
])
def test_public_rejects_forbidden_disclosure(public, mutate):
    data = copy.deepcopy(PUBLIC)
    mutate(data)
    assert not public.is_valid(data)


def test_public_rejects_each_forbidden_slot_alone(public):
    # gen-json-schema renders several value_presence: ABSENT slots on one class as a single
    # not-required-all, which only rejects them together. Each slot must fail on its own.
    data = copy.deepcopy(PUBLIC)
    data["summary"]["conditions"][0]["record_count"] = 5
    assert not public.is_valid(data)