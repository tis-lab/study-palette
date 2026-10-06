"""
Tests for the summary schema and its examples.

The schema imports BDCHM from synthetic/bdchm.yaml; run synthetic/fetch-bdchm.sh first.
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
    """The schema with imports merged; the validator resolves them against the cwd otherwise."""
    view = SchemaView(str(SCHEMA_DIR / "summary.yaml"))
    view.merge_imports()
    return view.schema


@pytest.fixture
def errors(schema):
    return lambda instance: [r.message for r in validate(instance, schema, "SummaryResponse").results]


@pytest.fixture(params=EXAMPLES, ids=lambda p: p.name)
def example(request):
    return load(request.param)


def load(path):
    return yaml.safe_load(path.read_text())


def summaries(study):
    """Every summary in a study, values included, paired with its parent."""
    stack = [(s, None) for slot in SUMMARY_SLOTS for s in study.get(slot) or []]
    while stack:
        summary, parent = stack.pop()
        yield summary, parent
        stack.extend((v, summary) for v in summary.get("values") or [])


def by_id(study):
    return {s["id"]: s for s, _ in summaries(study)}


def question(summary):
    """What a summary counts, without the counts."""
    return json.dumps({k: v for k, v in summary.items() if k not in COUNT_SLOTS}, sort_keys=True)


def counts(response):
    """Every count, keyed by study and the full set of ids it matches, cohort included."""
    cohort = frozenset(response.get("cohort") or [])
    for study in response["studies"]:
        where = study["research_study"]
        yield (where, cohort), study["participant_count"]
        for summary, _ in summaries(study):
            yield (where, cohort | {summary["id"]}), summary["participant_count"]
        for cell in study.get("cells") or []:
            yield (where, cohort | set(cell["criteria"])), cell["participant_count"]


def misplaced(response):
    """Records without a participant, and summaries with one."""
    records = [r for rs in (response.get("records") or {}).values() for r in rs]
    every_summary = [s for study in response["studies"] for s, _ in summaries(study)]
    return [r["id"] for r in records if "associated_participant" not in r] + [
        s["id"] for s in every_summary if "associated_participant" in s
    ]


def test_there_are_examples():
    assert EXAMPLES


def test_example_validates(example, errors):
    assert errors(example) == []


def test_values_never_sum_past_their_concept(example):
    for study in example["studies"]:
        for summary, _ in summaries(study):
            values = summary.get("values") or []
            if values and summary.get("summarized_slot") != "race":
                assert sum(v["participant_count"] for v in values) <= summary["participant_count"], summary["id"]


def test_a_cell_never_exceeds_a_summary_it_crosses(example):
    for study in example["studies"]:
        defined = by_id(study)
        for cell in study.get("cells") or []:
            for criterion in cell["criteria"]:
                assert cell["participant_count"] <= defined[criterion]["participant_count"], cell["criteria"]


def test_a_study_counts_one_granularity(example):
    parents = {t["curie"]: t.get("parents") or [] for t in example.get("terms") or []}

    def ancestors(curie):
        found, stack = set(), list(parents.get(curie, []))
        while stack:
            found.add(term := stack.pop())
            stack.extend(parents.get(term, []))
        return found

    for study in example["studies"]:
        concepts = {s["condition_concept"] for s, _ in summaries(study) if "condition_concept" in s}
        assert {c: ancestors(c) & concepts for c in concepts if ancestors(c) & concepts} == {}, study["research_study"]


def test_values_repeat_their_concept(example):
    for study in example["studies"]:
        for summary, parent in summaries(study):
            if parent is not None:
                concept = {k: parent[k] for k in CONCEPT_SLOTS if k in parent}
                assert concept and {k: summary.get(k) for k in concept} == concept, summary["id"]


def test_cells_cross_summaries_in_their_own_study(example):
    for study in example["studies"]:
        referenced = {c for cell in study.get("cells") or [] for c in cell["criteria"]}
        assert referenced - by_id(study).keys() == set(), study["research_study"]


def test_cells_do_not_repeat_the_cohort(example):
    cohort = set(example.get("cohort") or [])
    cells = [cell for study in example["studies"] for cell in study.get("cells") or []]
    assert [cell for cell in cells if cohort & set(cell["criteria"])] == []


def test_the_cohort_is_defined_in_every_study(example):
    cohort = set(example.get("cohort") or [])
    assert all(cohort <= by_id(study).keys() for study in example["studies"])


def test_studies_resolve_and_appear_once(example):
    studies = [s["research_study"] for s in example["studies"]]
    assert len(studies) == len(set(studies))
    assert set(studies) <= {s["id"] for s in example["research_studies"]}


def test_counts_are_consistent(example):
    seen = {}
    for key, n in counts(example):
        seen.setdefault(key, set()).add(n)
    assert {k: v for k, v in seen.items() if len(v) > 1} == {}


def test_counts_respect_the_minimum_and_the_bound(example):
    assert [k for k, n in counts(example) if n < example["min_cell_count"]] == []
    cells = [cell for study in example["studies"] for cell in study.get("cells") or []]
    assert max(len(cell["criteria"]) for cell in cells) <= example["max_cell_criteria"]


def test_concepts_resolve_in_terms(example):
    terms = {t["curie"]: t for t in example.get("terms") or []}
    referenced = {example["seed"]}
    referenced |= {p for t in terms.values() for p in t.get("parents") or []}
    referenced |= {r[end] for r in example.get("relations") or [] for end in ("subject", "object")}
    referenced |= {
        s["condition_concept"] for study in example["studies"] for s, _ in summaries(study) if "condition_concept" in s
    }
    assert referenced - terms.keys() == set()


def test_records_and_summaries_stay_apart(example):
    assert misplaced(example) == []


def test_a_follow_up_merges_without_conflict():
    merged = {}
    for response in (load(BASE), load(FOLLOW_UP)):
        for key, n in counts(response):
            merged.setdefault(key, set()).add(n)
    assert {k: v for k, v in merged.items() if len(v) > 1} == {}

    shared = {k for k, _ in counts(load(BASE))} & {k for k, _ in counts(load(FOLLOW_UP))}
    assert len(shared) > 5, "the examples should overlap, or this test proves nothing"


def test_an_id_asks_one_question_everywhere():
    asked = {}
    for response in (load(BASE), load(FOLLOW_UP)):
        for study in response["studies"]:
            for summary, _ in summaries(study):
                asked.setdefault(summary["id"], set()).add(question(summary))
    assert {i: q for i, q in asked.items() if len(q) > 1} == {}


def test_a_summary_in_a_record_slot_passes_the_validator_but_not_the_guard(errors):
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
    response["studies"][0]["cells"].append({"criteria": ["palette:demography/sex/FEMALE"], "participant_count": 230})
    assert any("too short" in e for e in errors(response))
