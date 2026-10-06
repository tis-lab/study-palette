"""
Tests for the summary schema and its examples.

The schema imports BDCHM from synthetic/bdchm.yaml, which is fetched rather
than committed; run synthetic/fetch-bdchm.sh first.
"""

import json
from pathlib import Path

import pytest
import yaml
from linkml.validator import validate
from linkml_runtime import SchemaView

SCHEMA_DIR = Path(__file__).resolve().parent.parent
EXAMPLES_DIR = SCHEMA_DIR / "examples"
EXAMPLES = sorted(EXAMPLES_DIR.glob("*.yaml"))
BASE = EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d-cohort.yaml"
FOLLOW_UP = EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d-cohort-female.yaml"

SUMMARY_SLOTS = ("participants", "demographics", "conditions", "procedures", "drug_exposures", "measurements")
COUNT_SLOTS = ("participant_count", "record_count", "values")
CONCEPT_SLOTS = ("condition_concept", "procedure_concept", "drug_concept", "observation_type", "summarized_slot")

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


def summaries(study):
    """Every summary in a study block, values included, with its parent."""
    stack = [(s, None) for slot in SUMMARY_SLOTS for s in study.get(slot) or []]
    while stack:
        summary, parent = stack.pop()
        yield summary, parent
        stack.extend((v, summary) for v in summary.get("values") or [])


def by_id(study):
    return {s["id"]: s for s, _ in summaries(study)}


def identity(summary):
    """What a summary asks, without what it answers."""
    return json.dumps({k: v for k, v in summary.items() if k not in COUNT_SLOTS}, sort_keys=True)


def counts(response):
    """Every count in the response, keyed by (cohort, study, summary ids)."""
    cohort = frozenset(response.get("cohort") or [])
    for study in response["studies"]:
        where = study["research_study"]
        yield (cohort, where, frozenset()), study["participant_count"]
        for summary, _ in summaries(study):
            yield (cohort, where, frozenset([summary["id"]])), summary["participant_count"]
        for cell in study.get("cells") or []:
            yield (cohort, where, frozenset(cell["criteria"])), cell["participant_count"]


def merge_key(key):
    """A count's identity across responses: the cohort and its criteria are one set."""
    cohort, study, criteria = key
    return study, cohort | criteria


def misplaced(response):
    """
    Summaries in record slots, and records among summaries.

    The validator rejects a record among summaries, which lacks a count, but
    not a summary in a record slot: a ConditionSummary is a Condition.
    """
    records = [r for rs in (response.get("records") or {}).values() for r in rs]
    every_summary = [s for study in response["studies"] for s, _ in summaries(study)]
    return [r["id"] for r in records if "associated_participant" not in r] + [
        s["id"] for s in every_summary if "associated_participant" in s
    ]


@pytest.fixture(params=EXAMPLES, ids=lambda p: p.name)
def example(request):
    return load(request.param)


def test_there_are_examples():
    assert EXAMPLES


def test_example_validates(example, errors):
    assert errors(example) == []


def test_example_keeps_records_and_summaries_apart(example):
    assert misplaced(example) == []


def test_example_studies_resolve(example):
    defined = {s["id"] for s in example["research_studies"]}
    assert {s["research_study"] for s in example["studies"]} - defined == set()


def test_example_counts_each_study_once(example):
    studies = [s["research_study"] for s in example["studies"]]
    assert len(studies) == len(set(studies))


def test_example_cohort_is_defined_in_every_study(example):
    cohort = set(example.get("cohort") or [])
    assert {s["research_study"]: cohort - by_id(s).keys() for s in example["studies"]} == {
        s["research_study"]: set() for s in example["studies"]
    }


def test_example_cells_cross_summaries_in_their_own_study(example):
    for study in example["studies"]:
        defined = by_id(study).keys()
        referenced = {c for cell in study.get("cells") or [] for c in cell["criteria"]}
        assert referenced - defined == set(), study["research_study"]


def test_example_has_one_count_per_key(example):
    keys = [key for key, _ in counts(example)]
    assert len(keys) == len(set(keys))


def test_example_cells_do_not_repeat_the_cohort(example):
    cohort = set(example.get("cohort") or [])
    cells = [cell for study in example["studies"] for cell in study.get("cells") or []]
    assert [cell for cell in cells if cohort & set(cell["criteria"])] == []


def test_example_ids_are_determined_by_what_is_asked(example):
    asked = {}
    for study in example["studies"]:
        for summary, _ in summaries(study):
            asked.setdefault(summary["id"], set()).add(identity(summary))
    assert {i: q for i, q in asked.items() if len(q) > 1} == {}


def test_example_values_repeat_their_concept(example):
    for study in example["studies"]:
        for summary, parent in summaries(study):
            if parent is not None:
                concept = {k: parent[k] for k in CONCEPT_SLOTS if k in parent}
                assert concept and {k: summary.get(k) for k in concept} == concept, summary["id"]


def test_example_omits_counts_below_its_minimum(example):
    small = [key for key, n in counts(example) if n < example["min_cell_count"]]
    assert small == []


def test_example_respects_its_criteria_bound(example):
    sizes = [len(cell["criteria"]) for study in example["studies"] for cell in study.get("cells") or []]
    assert max(sizes) <= example["max_cell_criteria"]


def test_example_concepts_resolve_in_its_terms(example):
    terms = {t["curie"]: t for t in example.get("terms") or []}
    referenced = {example["seed"]}
    referenced |= {p for t in terms.values() for p in t.get("parents") or []}
    referenced |= {r[end] for r in example.get("relations") or [] for end in ("subject", "object")}
    referenced |= {
        s["condition_concept"] for study in example["studies"] for s, _ in summaries(study) if "condition_concept" in s
    }
    assert referenced - terms.keys() == set()


def test_a_follow_up_merges_without_conflict():
    base, follow_up = load(BASE), load(FOLLOW_UP)
    assert base["release"] == follow_up["release"]

    merged = {}
    for response in (base, follow_up):
        for key, n in counts(response):
            merged.setdefault(merge_key(key), set()).add(n)

    assert {k: v for k, v in merged.items() if len(v) > 1} == {}
    shared = {merge_key(k) for k, _ in counts(base)} & {merge_key(k) for k, _ in counts(follow_up)}
    assert len(shared) > 5, "the examples should overlap, or this test proves nothing"


def test_the_same_id_asks_the_same_question_across_responses():
    asked = {}
    for response in (load(BASE), load(FOLLOW_UP)):
        for study in response["studies"]:
            for summary, _ in summaries(study):
                asked.setdefault(summary["id"], set()).add(identity(summary))
    assert {i: q for i, q in asked.items() if len(q) > 1} == {}


def test_a_summary_in_a_record_slot_is_caught_by_the_guard_not_the_validator(errors):
    response = load(BASE)
    summary = response["studies"][0]["conditions"][0]["values"][0]
    response["records"]["record_conditions"].append(summary)
    assert errors(response) == []
    assert summary["id"] in misplaced(response)


def test_a_record_among_summaries_is_rejected(errors):
    response = load(BASE)
    response["studies"][0]["conditions"].append(response["records"]["record_conditions"][0])
    assert any("participant_count" in e for e in errors(response))


def test_a_cell_needs_two_criteria(errors):
    response = load(BASE)
    response["studies"][0]["cells"].append(
        {"criteria": ["palette:condition/MONDO_0005148/PRESENT"], "participant_count": 90}
    )
    assert any("too short" in e for e in errors(response))


def test_a_summary_requires_a_count(errors):
    response = load(BASE)
    del response["studies"][0]["conditions"][0]["participant_count"]
    assert any("participant_count" in e for e in errors(response))
