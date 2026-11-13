"""Class-first contract and semantic checks for synthetic summary examples."""
import copy
import json
from pathlib import Path

import pytest
import yaml
from jsonschema import Draft202012Validator
from linkml.generators.jsonschemagen import JsonSchemaGenerator

SCHEMA_DIR = Path(__file__).resolve().parent.parent
EXAMPLES_DIR = SCHEMA_DIR / "examples" / "class-first"
EXAMPLES = sorted(EXAMPLES_DIR.glob("SYNTHETIC.SummaryResponse-*.yaml"))
SUMMARY_SLOTS = ("participants", "demographics", "conditions", "procedures", "drug_exposures", "measurements")
CONCEPT_SLOTS = ("condition_concept", "procedure_concept", "drug_concept", "observation_type", "summarized_slot")
pytestmark = pytest.mark.skipif(
    not (SCHEMA_DIR.parent / "synthetic" / "bdchm.yaml").exists(),
    reason="BDCHM not fetched; run synthetic/fetch-bdchm.sh",
)


def load(name):
    return yaml.safe_load((EXAMPLES_DIR / f"SYNTHETIC.SummaryResponse-{name}.yaml").read_text())


@pytest.fixture(scope="module")
def validator():
    schema = json.loads(JsonSchemaGenerator(str(SCHEMA_DIR / "summary-class-first.yaml"),
                       top_class="SummaryResponse", not_closed=False).serialize())
    Draft202012Validator.check_schema(schema)
    return Draft202012Validator(schema)


@pytest.fixture(params=EXAMPLES, ids=lambda p: p.name)
def example(request):
    return yaml.safe_load(request.param.read_text())


def summaries(response):
    """Yield each facet/value and its parent, once across all studies."""
    stack = [(s, None) for slot in SUMMARY_SLOTS for s in response["summary"].get(slot, [])]
    while stack:
        summary, parent = stack.pop()
        yield summary, parent
        stack.extend((v, summary) for v in summary.get("values", []))


def contributions(summary):
    return {s["research_study"]: s["participant_count"] for s in summary.get("studies", [])}


def test_examples_exist():
    assert len(EXAMPLES) >= 3


def test_example_validates(example, validator):
    assert list(validator.iter_errors(example)) == []


def test_studies_and_contributions_resolve(example):
    studies = {s["id"]: s["participant_count"] for s in example["studies"]}
    assert len(studies) == len(example["studies"])
    for node, parent in summaries(example):
        local = contributions(node)
        assert len(local) == len(node.get("studies", []))
        assert local.keys() <= studies.keys()
        for study, count in local.items():
            assert count <= studies[study]
            if parent is not None and study in contributions(parent):
                assert count <= contributions(parent)[study]
            if "participant_count" in node:
                assert count <= node["participant_count"]
        if "participant_count" in node and "participant_count" in example:
            assert node["participant_count"] <= example["participant_count"]


def test_ids_unique_and_values_repeat_concept(example):
    nodes = list(summaries(example))
    assert len({s["id"] for s, _ in nodes}) == len(nodes)
    for node, parent in nodes:
        if parent is not None:
            for key in CONCEPT_SLOTS:
                if key in parent:
                    assert node.get(key) == parent[key]


def test_counts_and_bins(example):
    for node, _ in summaries(example):
        counts = [node["participant_count"]] if "participant_count" in node else []
        counts += list(contributions(node).values())
        assert all(n >= example["min_count"] for n in counts)
        if "bin_low" in node and "bin_high" in node:
            assert node["bin_low"] < node["bin_high"]
        # These fixtures model one value per concept except multivalued race.
        if node.get("summarized_slot") != "race" and "participant_count" in node:
            assert sum(v["participant_count"] for v in node.get("values", [])) <= node["participant_count"]
    assert all(s["participant_count"] >= example["min_count"] for s in example["studies"])


def test_terms_are_a_resolving_dictionary(example):
    terms = example.get("terms", {})
    assert isinstance(terms, dict)
    referenced = {p for t in terms.values() for p in t.get("parents", [])}
    referenced |= {r[end] for r in example.get("relations", []) for end in ("subject", "object")}
    for node, _ in summaries(example):
        for key in ("condition_concept", "procedure_concept", "drug_concept"):
            if key in node:
                referenced.add(node[key])
    assert referenced <= terms.keys()
    for curie, term in terms.items():
        assert term.get("curie", curie) == curie


def test_overlap_total_is_not_sum_of_studies():
    data = load("overview")
    assert data["participant_count"] == 3
    assert sum(s["participant_count"] for s in data["studies"]) == 4
    facet = data["summary"]["conditions"][0]
    assert facet["participant_count"] == 3
    assert sum(contributions(facet).values()) == 4


def test_filtered_study_counts_and_ids_stay_consistent():
    base, follow = load("t2d"), load("t2d-female")
    base_nodes = {n["id"]: n for n, _ in summaries(base)}
    female = base_nodes["palette:demography/sex/FEMALE"]
    assert female["participant_count"] == follow["participant_count"]
    assert contributions(female) == {s["id"]: s["participant_count"] for s in follow["studies"]}
    for node, _ in summaries(follow):
        if node["id"] in base_nodes:
            original = base_nodes[node["id"]]
            assert node["participant_count"] <= original["participant_count"]
            identity_fields = ("sex", "race", "ethnicity", "condition_status", "bin_low", "bin_high", "bin_unit")
            for key in CONCEPT_SLOTS + identity_fields:
                assert node.get(key) == original.get(key)


@pytest.mark.parametrize("field", ["seed", "study_totals", "research_studies"])
def test_removed_root_fields_rejected(validator, field):
    data = load("overview")
    data[field] = "obsolete" if field == "seed" else []
    assert not validator.is_valid(data)


def test_old_study_first_shape_rejected(validator):
    data = load("overview")
    data["studies"][0]["conditions"] = data.pop("summary")["conditions"]
    assert not validator.is_valid(data)


def test_optional_union_counts_do_not_require_fabrication(validator):
    data = load("overview")
    del data["participant_count"]
    for node, _ in summaries(data):
        del node["participant_count"]
    assert validator.is_valid(data)


def test_reported_study_count_remains_required(validator):
    # The amendment made participant_count optional; it stays required when count_status is REPORTED.
    data = load("overview")
    data["studies"][0]["count_status"] = "REPORTED"
    del data["studies"][0]["participant_count"]
    assert not validator.is_valid(data)
    data = load("overview")
    contribution = data["summary"]["conditions"][0]["studies"][0]
    contribution["count_status"] = "REPORTED"
    del contribution["participant_count"]
    assert not validator.is_valid(data)


def test_negative_count_rejected(validator):
    data = load("overview")
    data["participant_count"] = -1
    assert not validator.is_valid(data)


def test_empty_cohort_and_unavailable_counts_are_distinct(validator):
    empty = {"release": "test", "min_count": 1, "participant_count": 0,
             "studies": [], "summary": {}, "terms": {}}
    assert validator.is_valid(empty)
    unavailable = copy.deepcopy(empty)
    del unavailable["participant_count"]
    assert validator.is_valid(unavailable)
    assert empty != unavailable


def test_filter_ids_resolve_in_class_arrays(example):
    nodes = {n["id"]: n for n, _ in summaries(example)}
    assert set(example.get("filter", [])) <= nodes.keys()


def test_study_granularity_is_preserved(example):
    terms = example.get("terms", {})
    def ancestors(curie):
        found, pending = set(), list(terms.get(curie, {}).get("parents", []))
        while pending:
            term = pending.pop()
            if term not in found:
                found.add(term)
                pending.extend(terms.get(term, {}).get("parents", []))
        return found
    for study in example["studies"]:
        concepts = {n["condition_concept"] for n, _ in summaries(example)
                    if "condition_concept" in n and study["id"] in contributions(n)}
        assert all(not (ancestors(c) & concepts) for c in concepts)


def misplaced(response):
    """Semantic guard: LinkML inheritance alone does not separate records from summaries."""
    records = [record for rows in response.get("records", {}).values() for record in rows]
    invalid_records = [r["id"] for r in records if "associated_participant" not in r]
    invalid_summaries = [n["id"] for n, _ in summaries(response) if "associated_participant" in n]
    return invalid_records + invalid_summaries


def test_records_and_summaries_stay_apart(example):
    assert misplaced(example) == []


def test_record_summary_misplacement_guard():
    data = load("t2d")
    node = copy.deepcopy(data["summary"]["conditions"][0]["values"][0])
    data["records"]["record_conditions"].append(node)
    assert node["id"] in misplaced(data)
    data = load("t2d")
    record = copy.deepcopy(data["records"]["record_conditions"][0])
    data["summary"]["conditions"].append(record)
    assert record["id"] in misplaced(data)


def test_proposal_examples_are_isolated_from_canonical_examples():
    assert EXAMPLES_DIR != SCHEMA_DIR / "examples"
    assert not set(EXAMPLES) & set((SCHEMA_DIR / "examples").glob("*.yaml"))


def test_proposal_has_distinct_schema_identity():
    canonical = yaml.safe_load((SCHEMA_DIR / "summary.yaml").read_text())
    proposed = yaml.safe_load((SCHEMA_DIR / "summary-class-first.yaml").read_text())
    assert proposed["id"] != canonical["id"]
    assert proposed["name"] != canonical["name"]
    