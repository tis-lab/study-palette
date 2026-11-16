"""Shared request structure and runtime-policy checks for issue #74."""
import importlib.util
import json
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator
from linkml.generators.jsonschemagen import JsonSchemaGenerator

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("request_validation", ROOT / "validate_summary_request.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


@pytest.fixture(scope="module")
def checker():
    return module.request_validator()


@pytest.mark.parametrize("value", [
    {}, {"focus": []}, {"focus": ["UPHENO:7000207", "ATC:C03"]},
    {"filter": {"summaryId": "palette:demography/sex/FEMALE"}},
    *[{"filter": {"condition": c}} for c in [
        {"concept": "HP:0000822", "selection": "INCLUDE"},
        {"concept": "HP:0000822", "selection": "EXCLUDE"},
        {"concept": "HP:0000822", "status": "ABSENT"},
        {"concept": "HP:0000822", "status": "PRESENT", "selection": "INCLUDE"},
    ]],
])
def test_valid_requests(value, checker):
    assert module.validate_request(value, checker) == value


@pytest.mark.parametrize("value", [
    {"filter": {}}, {"filter": {"and": []}}, {"filter": {"or": []}},
    {"filter": {"and": [{"summaryId": "A"}], "summaryId": "B"}},
    {"filter": {"not": {"summaryId": "A"}}},
    {"filter": {"condition": {"concept": "HP:0000822"}}},
    {"filter": {"condition": {"concept": "HP:0000822", "selection": "INCLUDE", "status": "ABSENT"}}},
    {"filter": {"condition": {"concept": "HP:0000822", "status": "UNKNOWN"}}},
    {"filter": {"condition": {"concept": "HP:0000822", "selection": "INCLUDE", "relationship": "SELF"}}},
    {"focus": "HP:0000822"}, {"focus": ["HP:*"]}, {"focus": ["no-prefix"]},
    {"focus": ["HP:0000822"] * 101}, {"filter": {"summaryId": ""}},
    {"filter": None}, {"focus": None}, {"filter": {"condition": None}},
    {"unexpected": 1},
])
def test_invalid_requests(value, checker):
    with pytest.raises(ValueError):
        module.validate_request(value, checker)


def test_generated_schema_checks_structure(checker):
    for value in [{"filter": {}}, {"filter": {"and": []}},
                  {"filter": {"summaryId": "A", "or": [{"summaryId": "B"}]}},
                  {"filter": {"condition": {"concept": "HP:1", "selection": "INCLUDE", "status": "ABSENT"}}}]:
        assert not checker.is_valid(value)


def test_nesting_and_node_limits(checker):
    node = {"summaryId": "A"}
    for _ in range(7):
        node = {"and": [node]}
    module.validate_request({"filter": node}, checker)
    with pytest.raises(ValueError):
        module.validate_request({"filter": {"and": [node]}}, checker)
    module.validate_request({"filter": {"or": [{"summaryId": "A"}] * 99}}, checker)
    with pytest.raises(ValueError):
        module.validate_request({"filter": {"or": [{"summaryId": "A"}] * 100}}, checker)


def test_examples_and_response_echo(checker):
    folder = ROOT / "request-examples"
    for path in folder.glob("*.json"):
        if path.name != "nested-response.json":
            module.validate_request(json.loads(path.read_text()), checker)
    response = json.loads((folder / "nested-response.json").read_text())
    request = json.loads((folder / "nested-and-or.json").read_text())
    assert response["request"] == request
    assert "or" in response["request"]["filter"]
    if not (ROOT.parent / "synthetic/bdchm.yaml").exists():
        pytest.skip("Fetch BDCHM to validate full responses")
    generated = json.loads(JsonSchemaGenerator(str(ROOT / "summary.yaml"),
                                               top_class="SummaryResponse", not_closed=False).serialize())
    validator = Draft202012Validator(generated)
    validator.validate(response)
    for extra in [{"filter": []}, {"focus": []}]:
        assert not validator.is_valid(dict(response, **extra))
    missing = dict(response)
    del missing["request"]
    assert not validator.is_valid(missing)
