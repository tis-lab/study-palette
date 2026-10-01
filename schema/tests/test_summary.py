"""
Tests for the summary schema and its examples.

The schema imports BDCHM from synthetic/bdchm.yaml, which is fetched rather
than committed; run synthetic/fetch-bdchm.sh first.
"""

import copy
import json
from pathlib import Path

import pytest
import yaml
from linkml.validator import validate
from linkml_runtime import SchemaView

SCHEMA_DIR = Path(__file__).resolve().parent.parent
EXAMPLES_DIR = SCHEMA_DIR / "examples"
EXAMPLES = sorted(EXAMPLES_DIR.glob("*.yaml"))

CRITERION_SLOTS = ("participants", "demographics", "conditions", "procedures", "drug_exposures", "measurements")

pytestmark = pytest.mark.skipif(
    not (SCHEMA_DIR.parent / "synthetic" / "bdchm.yaml").exists(),
    reason="BDCHM not fetched; run synthetic/fetch-bdchm.sh",
)


@pytest.fixture(scope="module")
def schema():
    """
    The schema with its imports merged in.

    The validator resolves relative imports against the working directory
    rather than the schema's own, so they are resolved here once instead.
    """
    view = SchemaView(str(SCHEMA_DIR / "summary.yaml"))
    view.merge_imports()
    return view.schema


@pytest.fixture
def errors(schema):
    def run(instance):
        return [r.message for r in validate(instance, schema, "SummaryResponse").results]

    return run


def load(path):
    return yaml.safe_load(path.read_text())


def criteria(response):
    """Every criterion the response defines, by id."""
    return {c["id"]: c for slot in CRITERION_SLOTS for c in response.get(slot) or []}


def key(response, cell):
    """A cell's identity: its criteria together with the cohort's."""
    return frozenset(response.get("cohort") or []) | frozenset(cell["criteria"])


def misplaced(response):
    """
    Criteria in record slots, and records in criterion slots.

    The validator catches neither: a ConditionCriterion is a Condition, so each
    validates wherever the other is expected.
    """
    records = [r for rs in (response.get("records") or {}).values() for r in rs]
    return [r["id"] for r in records if "associated_participant" not in r] + [
        c["id"] for c in criteria(response).values() if "associated_participant" in c
    ]


@pytest.fixture(params=EXAMPLES, ids=lambda p: p.name)
def example(request):
    return load(request.param)


def test_there_are_examples():
    assert EXAMPLES


def test_example_validates(example, errors):
    assert errors(example) == []


def test_example_keeps_records_and_criteria_apart(example):
    assert misplaced(example) == []


def test_example_cells_refer_to_defined_criteria(example):
    defined = criteria(example).keys()
    referenced = {c for cell in example["cells"] for c in cell["criteria"]} | set(example.get("cohort") or [])
    assert referenced - defined == set()


def test_example_has_one_cell_per_key(example):
    keys = [key(example, cell) for cell in example["cells"]]
    assert len(keys) == len(set(keys))


def test_example_cells_do_not_repeat_the_cohort(example):
    cohort = set(example.get("cohort") or [])
    assert [cell for cell in example["cells"] if cohort & set(cell["criteria"])] == []


def test_example_criteria_ids_are_determined_by_their_values(example):
    def values(criterion):
        return json.dumps({k: v for k, v in criterion.items() if k != "id"}, sort_keys=True)

    by_values = {}
    for criterion in criteria(example).values():
        by_values.setdefault(values(criterion), set()).add(criterion["id"])
    assert [ids for ids in by_values.values() if len(ids) > 1] == []


def test_example_omits_cells_below_its_minimum(example):
    small = [cell["criteria"] for cell in example["cells"] if cell["participant_count"] < example["min_cell_count"]]
    assert small == []


def test_example_respects_its_criteria_bound(example):
    assert max(len(cell["criteria"]) for cell in example["cells"]) <= example["max_cell_criteria"]


def test_example_concepts_resolve_in_its_terms(example):
    terms = {t["curie"]: t for t in example.get("terms") or []}
    referenced = {example["seed"]}
    referenced |= {p for t in terms.values() for p in t.get("parents") or []}
    referenced |= {r[end] for r in example.get("relations") or [] for end in ("subject", "object")}
    referenced |= {c["condition_concept"] for c in criteria(example).values() if "condition_concept" in c}
    assert referenced - terms.keys() == set()


def test_a_follow_up_merges_without_conflict():
    base = load(EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d-cohort.yaml")
    follow_up = load(EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d-cohort-female.yaml")
    assert base["release"] == follow_up["release"]

    counts = {}
    for response in (base, follow_up):
        counts.setdefault(frozenset(response["cohort"]), set()).add(response["participant_count"])
        for cell in response["cells"]:
            counts.setdefault(key(response, cell), set()).add(cell["participant_count"])

    assert {k: v for k, v in counts.items() if len(v) > 1} == {}
    overlap = {key(base, c) for c in base["cells"]} & {key(follow_up, c) for c in follow_up["cells"]}
    assert overlap, "the examples should overlap, or this test proves nothing"


def test_a_follow_up_criterion_means_the_same_in_both():
    base = criteria(load(EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d-cohort.yaml"))
    follow_up = criteria(load(EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d-cohort-female.yaml"))
    assert [i for i in base.keys() & follow_up.keys() if base[i] != follow_up[i]] == []


def test_a_criterion_in_a_record_slot_is_caught_by_the_guard_not_the_validator(example, errors):
    response = copy.deepcopy(example)
    criterion = response["conditions"][0]
    response.setdefault("records", {}).setdefault("record_conditions", []).append(criterion)
    assert errors(response) == []
    assert criterion["id"] in misplaced(response)


def test_a_record_in_a_criterion_slot_is_caught_by_the_guard_not_the_validator(errors):
    response = load(EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d-cohort.yaml")
    record = response["records"]["record_conditions"][0]
    response["conditions"].append(record)
    assert errors(response) == []
    assert record["id"] in misplaced(response)


def test_unset_record_slots_are_allowed_on_a_criterion(errors):
    response = {
        "release": "test",
        "seed": "MONDO:0005148",
        "participant_count": 10,
        "min_cell_count": 1,
        "max_cell_criteria": 1,
        "conditions": [{"id": "palette:condition/MONDO_0005148", "condition_concept": "MONDO:0005148"}],
        "cells": [{"criteria": ["palette:condition/MONDO_0005148"], "participant_count": 4}],
    }
    assert errors(response) == []


def test_a_cell_requires_a_count(errors):
    response = {
        "release": "test",
        "seed": "MONDO:0005148",
        "participant_count": 10,
        "min_cell_count": 1,
        "max_cell_criteria": 1,
        "cells": [{"criteria": ["palette:condition/MONDO_0005148"]}],
    }
    assert any("participant_count" in e for e in errors(response))
