"""The disclosure policy is well formed and names only things the summary schemas define."""

import copy
import re
from pathlib import Path

import pytest
import yaml

SCHEMA_DIR = Path(__file__).resolve().parent.parent
POLICY_PATH = SCHEMA_DIR.parent / "policy" / "disclosure-policy.yaml"
BDCHM = SCHEMA_DIR.parent / "synthetic" / "bdchm.yaml"

TIERS = ("public", "authenticated", "authorized")
STAGES = ("0_sign_in_and_scope", "1_search_and_add_terms", "2_live_summary_per_term", "3_and_or_not",
          "4_refine_criteria", "5_cohort_and_visuals", "6_provisioning")
STAGE_KEYS = ("available", "pool", "profile")
# Which profiles each database role may serve. A role that counts must pass a profile;
# api_search returns no counts, so it serves none.
POOL_PROFILES = {
    "api_search": {None},
    "api_public": {"TotalsSummaryResponse"},
    "api_counting": {"TotalsSummaryResponse", "BreakdownSummaryResponse", "ExactSummaryResponse"},
    None: {None},
}
# Upper-case words in the policy's text that are not schema enum values.
NOT_ENUM_VALUES = {"BDC", "HMAC", "NIH", "RAS"}
ENUM_VALUE = re.compile(r"\b[A-Z][A-Z_]{2,}\b")
SNAKE_CASE = re.compile(r"\b[a-z]+(?:_[a-z]+)+\b")


def read(path):
    return yaml.safe_load(path.read_text(encoding="utf-8"))


@pytest.fixture(scope="module")
def policy():
    return read(POLICY_PATH)


@pytest.fixture(scope="module")
def summary():
    return read(SCHEMA_DIR / "summary.yaml")


@pytest.fixture(scope="module")
def profiles():
    return read(SCHEMA_DIR / "summary-profiles.yaml")


def positive_int(value):
    return isinstance(value, int) and not isinstance(value, bool) and value >= 1


def stages(policy):
    """Every (tier, stage, settings) in the policy."""
    for tier, settings in policy["tiers"].items():
        for stage, config in settings["stages"].items():
            yield tier, stage, config


def walk(node, key=None):
    """Every (key, value) leaf in the policy, at any depth."""
    if isinstance(node, dict):
        for k, v in node.items():
            yield from walk(v, k)
    elif isinstance(node, list):
        for v in node:
            yield from walk(v, key)
    else:
        yield key, node


def ancestors(name, classes):
    while name in classes:
        name = classes[name].get("is_a")
        if name:
            yield name


# Rule 1: shape.
def problems(policy):
    """What makes a policy unusable, if anything."""
    if not isinstance(policy, dict):
        return ["expected a mapping at the top level"]
    found = []
    if not positive_int(policy.get("policy_version")):
        found.append("policy_version must be a positive integer")
    counting = policy.get("counting")
    if not isinstance(counting, dict) or not positive_int(counting.get("min_count")):
        found.append("counting.min_count must be a positive integer")
    tiers = policy.get("tiers") if isinstance(policy.get("tiers"), dict) else {}
    found += [f"tiers is missing {t}" for t in TIERS if t not in tiers]
    for tier, settings in tiers.items():
        listed = (settings or {}).get("stages") or {}
        found += [f"{tier} is missing stage {s}" for s in STAGES if s not in listed]
        found += [f"{tier} {s} is missing {k}" for s, c in listed.items() for k in STAGE_KEYS if k not in (c or {})]
    return found


# Rule 2: an unavailable stage does nothing.
def inert_violations(policy):
    return [(t, s) for t, s, c in stages(policy) if c["available"] is not True and (
        c["available"] is not False or c["pool"] is not None or c["profile"] is not None or set(c) - set(STAGE_KEYS))]


# Rules 3 and 4: no counting role without a profile, and each role serves only its profiles.
def pool_violations(policy):
    return [(t, s, c["pool"], c["profile"]) for t, s, c in stages(policy)
            if c["profile"] not in POOL_PROFILES.get(c["pool"], set())]


def test_policy_is_well_formed(policy):
    assert problems(policy) == []


@pytest.mark.parametrize(
    ("change", "problem"),
    [
        (lambda p: p.pop("policy_version"), "policy_version"),
        (lambda p: p.update(policy_version="2"), "policy_version"),
        (lambda p: p["counting"].pop("min_count"), "min_count"),
        (lambda p: p["counting"].update(min_count=0), "min_count"),
        (lambda p: p["counting"].update(min_count=True), "min_count"),
        (lambda p: p["tiers"].pop("authorized"), "missing authorized"),
        (lambda p: p["tiers"]["public"]["stages"].pop("5_cohort_and_visuals"), "missing stage 5"),
        (lambda p: p["tiers"]["authenticated"]["stages"]["6_provisioning"].pop("pool"), "missing pool"),
    ],
    ids=["no-version", "string-version", "no-min-count", "zero-min-count", "bool-min-count", "no-tier",
         "no-stage", "no-stage-key"],
)
def test_malformed_policy_is_caught(policy, change, problem):
    broken = copy.deepcopy(policy)
    change(broken)
    assert any(problem in p for p in problems(broken))


def test_non_mapping_is_caught():
    assert problems(["just", "a list"]) == ["expected a mapping at the top level"]


def test_unavailable_stages_are_inert(policy):
    assert inert_violations(policy) == []


@pytest.mark.parametrize(
    ("change"),
    [
        lambda s: s.update(pool="api_public"),
        lambda s: s.update(profile="TotalsSummaryResponse"),
        lambda s: s.update(shows="something"),
        lambda s: s.update(available="no"),
    ],
    ids=["pool", "profile", "extra-key", "not-boolean"],
)
def test_active_unavailable_stage_is_caught(policy, change):
    broken = copy.deepcopy(policy)
    change(broken["tiers"]["public"]["stages"]["5_cohort_and_visuals"])
    assert inert_violations(broken) == [("public", "5_cohort_and_visuals")]


def test_pools_serve_only_their_profiles(policy):
    assert pool_violations(policy) == []


@pytest.mark.parametrize(
    ("pool", "profile"),
    [
        ("api_counting", None),
        ("api_public", None),
        ("api_public", "BreakdownSummaryResponse"),
        ("api_search", "TotalsSummaryResponse"),
        (None, "TotalsSummaryResponse"),
        ("api_unknown", None),
    ],
    ids=["counting-without-profile", "public-without-profile", "public-breakdown", "search-counts",
         "profile-without-pool", "unknown-pool"],
)
def test_unchecked_counting_is_caught(policy, pool, profile):
    broken = copy.deepcopy(policy)
    broken["tiers"]["authenticated"]["stages"]["3_and_or_not"].update(pool=pool, profile=profile)
    assert [v[:2] for v in pool_violations(broken)] == [("authenticated", "3_and_or_not")]


# Rule 5, and the policy's other references into schema/.
def test_every_profile_is_a_summary_profile(policy, summary, profiles):
    classes = {**summary["classes"], **profiles["classes"]}
    named = {c["profile"] for _, _, c in stages(policy)} - {None}
    assert named == set().union(*POOL_PROFILES.values()) - {None}
    for name in named:
        assert name in profiles["classes"], name
        assert "SummaryResponse" in ancestors(name, classes), name


def test_enum_values_named_in_policy_exist(policy, summary):
    enums = summary["enums"]
    known = set(enums["CountModeEnum"]["permissible_values"]) | set(enums["CountStatusEnum"]["permissible_values"])
    named = {m for _, v in walk(policy) if isinstance(v, str) for m in ENUM_VALUE.findall(v)} - NOT_ENUM_VALUES
    assert {"OBFUSCATED", "EXACT", "LISTED", "BELOW_MIN_COUNT", "WITHHELD"} <= named
    assert named <= known


def test_slots_named_in_policy_exist(policy, summary):
    """Snake-case words in the counting rules and tiers are summary slots; pool names are roles, not slots."""
    text = [v for k, v in walk({"counting": policy["counting"], "tiers": policy["tiers"]})
            if isinstance(v, str) and k != "pool"]
    named = {m for v in text for m in SNAKE_CASE.findall(v)}
    assert {"count_status", "min_count", "suppressed_study_count"} <= named
    assert named <= set(summary["slots"])
    assert {"min_count", "record_count"} <= set(summary["slots"])


@pytest.mark.skipif(not BDCHM.exists(), reason="BDCHM not fetched; run synthetic/fetch-bdchm.sh")
def test_identity_rule_is_a_bdchm_class(policy):
    from linkml_runtime import SchemaView

    view = SchemaView(str(SCHEMA_DIR / "summary.yaml"))
    rule = policy["counting"]["identity_rule"]
    assert view.get_class(rule) is not None, rule
