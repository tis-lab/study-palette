"""
The disclosure policy conforms to schema/policy.yaml and names only things the summary schemas define.

The schema carries the rules. Tests here confirm the policy passes, that each rule rejects what it
should, and check the two constraints LinkML rules cannot express: tier names and stage numbers are
unique, and an unavailable stage is inert.
"""

import copy
from pathlib import Path

import pytest
import yaml
from linkml.validator import Validator
from linkml.validator.plugins import JsonschemaValidationPlugin
from linkml_runtime import SchemaView

SCHEMA_DIR = Path(__file__).resolve().parent.parent
POLICY_PATH = SCHEMA_DIR.parent / "policy" / "disclosure-policy.yaml"
POLICY_SCHEMA = SCHEMA_DIR / "policy.yaml"
BDCHM = SCHEMA_DIR.parent / "synthetic" / "bdchm.yaml"
TIERS = ("public", "authenticated", "authorized")
CORE_STAGE_KEYS = {"number", "available", "pool", "profile"}


def read(path):
    return yaml.safe_load(path.read_text(encoding="utf-8"))


@pytest.fixture(scope="module")
def policy():
    return read(POLICY_PATH)


@pytest.fixture(scope="module")
def errors():
    validator = Validator(str(POLICY_SCHEMA), validation_plugins=[JsonschemaValidationPlugin(closed=True)])
    return lambda instance: [r.message for r in validator.validate(instance, "DisclosurePolicy").results]


def stage(policy, tier, number):
    found = next(t for t in policy["tiers"] if t["name"] == tier)
    return next(s for s in found["stages"] if s["number"] == number)


def broken(policy, change):
    copied = copy.deepcopy(policy)
    change(copied)
    return copied


def uniqueness_problems(policy):
    names = [t["name"] for t in policy["tiers"]]
    found = [] if sorted(names) == sorted(TIERS) else [f"tiers are {names}"]
    for tier in policy["tiers"]:
        numbers = [s["number"] for s in tier["stages"]]
        if sorted(numbers) != list(range(7)):
            found.append(f"{tier['name']} stages are {numbers}")
    return found


def active_unavailable_stages(policy):
    return [(t["name"], s["number"]) for t in policy["tiers"] for s in t["stages"]
            if s["available"] is False and (s["pool"], s["profile"]) != ("none", "none") or
            s["available"] is False and set(s) - CORE_STAGE_KEYS]


def test_policy_conforms_to_schema(policy, errors):
    assert errors(policy) == []


def test_tiers_and_stages_are_unique(policy):
    assert uniqueness_problems(policy) == []


@pytest.mark.parametrize(
    "change",
    [
        lambda p: p["tiers"][1].update(name="public"),
        lambda p: stage(p, "authenticated", 6).update(number=5),
    ],
    ids=["duplicate-tier", "duplicate-stage"],
)
def test_duplicates_are_caught(policy, change):
    assert uniqueness_problems(broken(policy, change))


def test_unavailable_stages_are_inert(policy):
    assert active_unavailable_stages(policy) == []


@pytest.mark.parametrize(
    "change",
    [
        lambda s: s.update(pool="api_public", profile="TotalsSummaryResponse"),
        lambda s: s.update(provisioning="ACCESS_INFORMATION"),
    ],
    ids=["queries", "extra-field"],
)
def test_active_unavailable_stage_is_caught(policy, change):
    copied = copy.deepcopy(policy)
    change(stage(copied, "public", 5))
    assert active_unavailable_stages(copied) == [("public", 5)]


# Each case breaks one rule in schema/policy.yaml; the schema must reject it.
REJECTED = {
    "public-counting-pool": lambda p: stage(p, "public", 2).update(pool="api_counting"),
    "public-breakdown": lambda p: stage(p, "public", 2).update(
        pool="api_counting", profile="BreakdownSummaryResponse"),
    "authenticated-exact": lambda p: stage(p, "authenticated", 5).update(profile="ExactSummaryResponse"),
    "counting-without-profile": lambda p: stage(p, "authenticated", 5).update(profile="none"),
    "public-pool-without-profile": lambda p: stage(p, "authenticated", 3).update(profile="none"),
    "search-returns-counts": lambda p: stage(p, "authorized", 1).update(profile="TotalsSummaryResponse"),
    "public-pool-breakdown": lambda p: stage(p, "authorized", 3).update(
        pool="api_public", profile="BreakdownSummaryResponse"),
    "profile-without-pool": lambda p: stage(p, "authorized", 3).update(pool="none"),
    "sign-in-queries": lambda p: stage(p, "authorized", 0).update(pool="api_search"),
    "provisioning-queries": lambda p: stage(p, "authorized", 6).update(pool="api_search"),
    "six-stages": lambda p: p["tiers"][0]["stages"].pop(),
    "stage-seven": lambda p: stage(p, "public", 6).update(number=7),
    "missing-stage-key": lambda p: stage(p, "public", 0).pop("profile"),
    "two-tiers": lambda p: p["tiers"].pop(),
    "unknown-tier": lambda p: p["tiers"][0].update(name="guest"),
    "public-exact-scope": lambda p: p["tiers"][0].update(exact_scope="ENTITLED_AND_ELIGIBLE"),
    "public-account": lambda p: p["tiers"][0].update(accountability="RAS_ACCOUNT"),
    "public-no-rate-limit": lambda p: p["tiers"][0].pop("rate_limit"),
    "authenticated-no-budget": lambda p: p["tiers"][1].pop("budget"),
    "authorized-no-exact-scope": lambda p: p["tiers"][2].pop("exact_scope"),
    "budget-both": lambda p: p["tiers"][2]["budget"].update(units_per_day=5),
    "budget-neither": lambda p: p["tiers"][2]["budget"].pop("draws_on"),
    "seeded-by-label": lambda p: p["counting"]["noise"]["seed_inputs"].append("LABEL"),
    "noise-min-above-zero": lambda p: p["counting"]["noise"].update(min=1),
    "zero-min-count": lambda p: p["counting"].update(min_count=0),
    "string-version": lambda p: p.update(policy_version="5"),
    "prose-field": lambda p: stage(p, "public", 2).update(returns="OBFUSCATED total"),
    "boolean-eligibility": lambda p: p["eligibility"][0].update(sharing=True),
}


@pytest.mark.parametrize("change", REJECTED.values(), ids=REJECTED.keys())
def test_schema_rejects(policy, errors, change):
    assert errors(broken(policy, change))


def test_profiles_match_the_generated_profiles():
    """ProfileEnum lists exactly the generated response profiles, and each extends SummaryResponse."""
    enum = set(SchemaView(str(POLICY_SCHEMA)).get_enum("ProfileEnum").permissible_values) - {"none"}
    profiles = read(SCHEMA_DIR / "summary-profiles.yaml")["classes"]
    responses = {name for name, c in profiles.items() if c.get("is_a") == "SummaryResponse"}
    assert enum == responses


@pytest.mark.skipif(not BDCHM.exists(), reason="BDCHM not fetched; run synthetic/fetch-bdchm.sh")
def test_identity_rule_is_a_bdchm_class(policy):
    view = SchemaView(str(SCHEMA_DIR / "summary.yaml"))
    rule = policy["counting"]["identity_rule"]
    assert view.get_class(rule) is not None, rule
