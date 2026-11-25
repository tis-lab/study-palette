"""
The per-tier examples in schema/examples/profiles follow the disclosure policy.

They are generated from exact example counts (the overview, and the filtered T2D example) by
schema/generate_profile_examples.py. These tests check the output, not the generator's code paths:
each file passes its profile, and the released numbers satisfy the policy's counting rules when
recomputed from the exact counts.
"""

import json
from itertools import combinations
from pathlib import Path

import pytest
import yaml
from jsonschema import Draft202012Validator
from linkml.generators.jsonschemagen import JsonSchemaGenerator

from schema import generate_profile_examples as gen

SCHEMA_DIR = Path(__file__).resolve().parent.parent
BDCHM = SCHEMA_DIR.parent / "synthetic" / "bdchm.yaml"
PROFILES = {"totals": "TotalsSummaryResponse", "breakdown": "BreakdownSummaryResponse", "exact": "ExactSummaryResponse"}


def read(path):
    return yaml.safe_load(path.read_text(encoding="utf-8"))


POLICY = read(gen.POLICY)
VIEWS = gen.views()
OVERVIEW = VIEWS["overview"]
DISCLOSURES = {label: gen.Disclosure(view, POLICY) for label, view in VIEWS.items()}
MIN_COUNT = POLICY["counting"]["min_count"]
NOISE = POLICY["counting"]["noise"]
EXAMPLES = sorted(gen.OUTPUT.glob("*.yaml"))


def parts(path):
    """Split an example's name into (source label, tier, profile)."""
    label, tier, suffix = path.stem.removeprefix("SYNTHETIC.SummaryResponse-").rsplit("-", 2)
    return label, tier, PROFILES[suffix]


def profile_of(path):
    return parts(path)[2]


def view_of(path):
    return VIEWS[parts(path)[0]]


def disclosure_of(path):
    return DISCLOSURES[parts(path)[0]]


def cells(response):
    """Every count-bearing entry, keyed by (node, column) as the generator keys them."""
    found = {}
    if "participant_count" in response or "count_mode" in response:
        found[(gen.ROOT, gen.TOTAL)] = response
    for study in response["studies"]:
        found[(gen.ROOT, study["research_study"])] = study

    def walk(node):
        found[(node["id"], gen.TOTAL)] = node
        for contribution in node.get("studies") or []:
            found[(node["id"], contribution["research_study"])] = contribution
        for value in node.get("values") or []:
            walk(value)

    for nodes in response["summary"].values():
        for node in nodes:
            walk(node)
    return found


def released(response):
    """Cells that carry a count, with how it was produced."""
    return {cell: (entry["count_mode"], entry["participant_count"])
            for cell, entry in cells(response).items() if "participant_count" in entry}


@pytest.fixture(params=EXAMPLES, ids=lambda p: p.name)
def example(request):
    return request.param, read(request.param)


def test_examples_are_current():
    """Rerunning the generator reproduces the committed files exactly, and nothing else is there."""
    generated = gen.generate()
    assert sorted(generated) == [p.name for p in EXAMPLES]
    for path in EXAMPLES:
        assert path.read_text(encoding="utf-8").replace("\r\n", "\n") == generated[path.name], path.name


def test_every_source_has_an_example_per_tier_profile():
    expected = {gen.filename(label, t, p) for label in gen.SOURCES for t, p in gen.tier_profiles(POLICY)}
    assert {p.name for p in EXAMPLES} == expected
    assert {t for t, _ in gen.tier_profiles(POLICY)} == {"public", "authenticated", "authorized"}


def test_examples_are_labelled_synthetic():
    for path in EXAMPLES:
        assert path.name.startswith("SYNTHETIC.")
        assert path.read_text(encoding="utf-8").startswith("# SYNTHETIC:")


@pytest.mark.parametrize("label", gen.SOURCES)
def test_roster_reproduces_every_source(label):
    view = VIEWS[label]
    for study in view.studies:
        for node_id in (gen.ROOT, *view.nodes):
            assert len(view.members(node_id, study)) == view.count(node_id, study), (label, node_id, study)


def test_enrollments_belong_to_one_study():
    ids = [OVERVIEW.members(gen.ROOT, s) for s in OVERVIEW.studies]
    assert all(a.isdisjoint(b) for a, b in combinations(ids, 2))


def test_filtered_cohorts_are_drawn_from_the_overview():
    for label, view in VIEWS.items():
        for study in view.studies:
            assert view.cohort(study) <= OVERVIEW.cohort(study), (label, study)
            for node_id in set(view.nodes) & set(OVERVIEW.nodes):
                assert view.members(node_id, study) <= OVERVIEW.members(node_id, study), (label, node_id, study)


def test_only_omitted_values_are_inferred():
    """The T2D example leaves out values below its min_count; the roster infers them, and nothing else."""
    t2d = VIEWS["t2d"]
    assert t2d.roster.hidden, "nothing was inferred, so this test proves nothing"
    for (node_id, study), n in t2d.roster.hidden.items():
        assert t2d.count(node_id, study) == 0, (node_id, study)
        assert 0 < n < t2d.source["min_count"], (node_id, study, n)


@pytest.mark.skipif(not BDCHM.exists(), reason="BDCHM not fetched; run synthetic/fetch-bdchm.sh")
def test_example_passes_its_profile(example):
    path, response = example
    schema = JsonSchemaGenerator(str(SCHEMA_DIR / "summary-profiles.yaml"), top_class=profile_of(path),
                                 not_closed=False).serialize()
    errors = [e.message for e in Draft202012Validator(json.loads(schema)).iter_errors(response)]
    assert errors == []


def test_examples_keep_their_query(example):
    path, response = example
    source = view_of(path).source
    for key in ("release", "focus", "filter", "min_count"):
        assert response.get(key) == source.get(key), key
    assert "records" not in response


def test_obfuscated_counts_respect_min_count_and_noise(example):
    path, response = example
    disclosure = disclosure_of(path)
    for cell, (mode, count) in released(response).items():
        if mode != "OBFUSCATED":
            continue
        exact = disclosure.exact(cell)
        assert exact >= MIN_COUNT, f"{cell}: released a count below min_count"
        assert count >= MIN_COUNT, cell
        noisy = range(exact + NOISE["min"], exact + NOISE["max"] + 1)
        assert count in noisy or (NOISE["clamp_to_min_count"] and count == MIN_COUNT), cell


def test_a_participant_set_gets_the_same_noise_everywhere():
    seen, released_counts = {}, 0
    for path in EXAMPLES:
        for cell, (mode, count) in released(read(path)).items():
            if mode == "OBFUSCATED":
                seen.setdefault(view_of(path).members(*cell), set()).add(count)
                released_counts += 1
    assert {len(m): c for m, c in seen.items() if len(c) > 1} == {}
    assert len(seen) < released_counts, "no participant set appears twice, so this test proves nothing"


def test_a_filtered_cohort_and_its_overview_share_noise():
    """The T2D filter's participants are the T2D cohort, so both files report one set the same way."""
    t2d = VIEWS["t2d"]
    filter_set = frozenset().union(*(t2d.cohort(s) for s in t2d.studies))
    assert t2d.members(gen.ROOT, gen.TOTAL) == filter_set
    assert t2d.members(t2d.filter[0], gen.TOTAL) == filter_set


def test_suppressed_counts_say_why(example):
    path, response = example
    for cell, entry in cells(response).items():
        status = entry.get("count_status")
        if status == "BELOW_MIN_COUNT":
            assert disclosure_of(path).exact(cell) < MIN_COUNT, cell
        if status in ("BELOW_MIN_COUNT", "WITHHELD"):
            assert "participant_count" not in entry, cell


def test_nothing_hidden_can_be_derived(example):
    """Wherever a parent and some parts are released, the hidden remainder is zero or at least min_count."""
    path, response = example
    view, disclosure = view_of(path), disclosure_of(path)
    shown = released(response)
    present = cells(response)
    columns = {c for _, c in present}
    groups = [((p, c), [(k, c) for k in kids]) for c in columns for p, kids in view.walk()]
    groups += [((n, gen.TOTAL), [(n, s) for s in view.studies]) for n in (gen.ROOT, *view.nodes)]
    for parent, children in groups:
        if parent not in shown or shown[parent][0] == "EXACT":
            continue
        if not any(p in present for p in children):
            continue
        reported = [p for p in children if p in shown]
        remainder = disclosure.exact(parent) - sum(disclosure.exact(p) for p in reported)
        if len(reported) < len(children) or remainder > 0:
            assert remainder < 0 or remainder >= MIN_COUNT, (parent, remainder)


def test_exact_counts_stay_in_exact_scope(example):
    path, response = example
    exact = {cell for cell, (mode, _) in released(response).items() if mode == "EXACT"}
    if profile_of(path) != "ExactSummaryResponse":
        assert exact == set()
        return
    scope = {s for s in view_of(path).studies if gen.CONSENT_GROUP.format(study=s) in gen.EXAMPLE_EXACT_SCOPE}
    assert exact and {c for _, c in exact} <= scope
    for cell, (mode, count) in released(response).items():
        if mode == "EXACT":
            assert count == disclosure_of(path).exact(cell), cell


def test_exact_and_obfuscated_figures_are_never_combined(example):
    path, response = example
    if profile_of(path) == "ExactSummaryResponse":
        assert {c for _, c in released(response)} <= set(view_of(path).studies), "a total spans both scopes"


def test_totals_list_only_studies_at_or_above_min_count(example):
    path, response = example
    if profile_of(path) != "TotalsSummaryResponse":
        return
    view = view_of(path)
    listed = {s["research_study"] for s in response["studies"]}
    assert listed == {s for s in view.studies if disclosure_of(path).exact((gen.ROOT, s)) >= MIN_COUNT}
    assert response["suppressed_study_count"] == len(view.studies) - len(listed)


def test_breakdown_lists_every_consent_group(example):
    path, response = example
    if profile_of(path) != "BreakdownSummaryResponse":
        return
    for (node_id, column), entry in cells(response).items():
        if node_id != gen.ROOT and column == gen.TOTAL:
            assert [c["research_study"] for c in entry["studies"]] == view_of(path).studies, node_id
