"""
The disclosure policy conforms to schema/policy.yaml and names only things the summary schemas define.

The schema carries the rules. Tests here confirm the policy passes, that each rule rejects what it
should, and check the constraints LinkML rules cannot express: tier names and stage numbers are
unique, an unavailable stage is inert, an approved policy names its noise key, and every signed-in
tier's limits include a query budget.
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


def unkeyed_approval(policy):
    """An approved policy must name the Key Vault key its noise is seeded with."""
    key = policy["counting"]["noise"].get("key_reference")
    return policy["status"] == "approved" and not (isinstance(key, str) and key.strip())


def tiers_without_budget(policy):
    """Signed-in tiers whose limits include no QUERY_BUDGET; the schema cannot require an entry of one type."""
    return [t["name"] for t in policy["tiers"] if t["name"] != "public"
            and not any(limit["limit_type"] == "QUERY_BUDGET" for limit in t.get("limits") or [])]


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


def test_signed_in_tiers_have_a_query_budget(policy):
    assert tiers_without_budget(policy) == []


def test_signed_in_tier_without_budget_is_caught(policy, errors):
    rate_only = [dict(limit_type="RATE_LIMIT", amount=120, unit="REQUESTS", period="MINUTE", keyed_by="ACCOUNT")]
    changed = broken(policy, lambda p: p["tiers"][1].update(limits=rate_only))
    assert errors(changed) == [], "the schema allows it, so this check is the only guard"
    assert tiers_without_budget(changed) == ["authenticated"]


def test_approved_policy_names_its_noise_key(policy):
    assert not unkeyed_approval(policy)


@pytest.mark.parametrize(
    ("key", "caught"),
    [(None, True), ("", True), ("  ", True), ("disclosure-noise", False)],
    ids=["missing", "empty", "blank", "named"],
)
def test_approval_without_noise_key_is_caught(policy, errors, key, caught):
    approved = broken(policy, lambda p: p.update(status="approved"))
    if key is not None:
        approved["counting"]["noise"]["key_reference"] = key
    assert unkeyed_approval(approved) is caught
    if not caught:
        assert errors(approved) == []


# Each case breaks one rule in schema/policy.yaml; the schema must reject it.
REJECTED = {
    "public-counting-pool": lambda p: stage(p, "public", 2).update(pool="api_counting"),
    "public-breakdown": lambda p: stage(p, "public", 2).update(
        pool="api_counting", profile="BreakdownSummaryResponse"),
    "authenticated-exact": lambda p: stage(p, "authenticated", 5).update(profile="ExactBreakdownSummaryResponse"),
    "authenticated-exact-totals": lambda p: stage(p, "authenticated", 4).update(profile="ExactTotalsSummaryResponse"),
    # Per-group counts outside exact scope come only at stage 5, for every tier.
    "authorized-breakdown-at-stage-2": lambda p: stage(p, "authorized", 2).update(
        profile="ExactBreakdownSummaryResponse"),
    "authenticated-breakdown-at-stage-4": lambda p: stage(p, "authenticated", 4).update(
        profile="BreakdownSummaryResponse"),
    "old-exact-profile": lambda p: stage(p, "authorized", 2).update(profile="ExactSummaryResponse"),
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
    "public-no-limits": lambda p: p["tiers"][0].pop("limits"),
    "authenticated-no-limits": lambda p: p["tiers"][1].pop("limits"),
    "authorized-no-exact-scope": lambda p: p["tiers"][2].pop("exact_scope"),
    "budget-both": lambda p: p["tiers"][2]["limits"][0].update(amount=5),
    "budget-neither": lambda p: p["tiers"][2]["limits"][0].pop("draws_on"),
    "seeded-by-label": lambda p: p["counting"]["noise"]["seed_inputs"].append("LABEL"),
    "noise-min-above-zero": lambda p: p["counting"]["noise"].update(min=1),
    "zero-min-count": lambda p: p["counting"].update(min_count=0),
    "string-version": lambda p: p.update(policy_version="5"),
    "prose-field": lambda p: stage(p, "public", 2).update(returns="OBFUSCATED total"),
    "boolean-eligibility": lambda p: p["eligibility"][0].update(sharing=True),
    # Each tier's limits are locked, not just its pools and profiles.
    "public-time-windows": lambda p: stage(p, "public", 4).update(temporal_windows={"min_days": 30}),
    "public-or": lambda p: stage(p, "public", 3).update(operators=["all", "any"]),
    "public-not": lambda p: stage(p, "public", 3).update(operators=["all", "none"]),
    "public-filterable-stigmatizing": lambda p: stage(p, "public", 1).update(
        stigmatizing_terms="FILTERABLE_WITHIN_EXACT_SCOPE"),
    "public-unlimited-terms": lambda p: stage(p, "public", 3).pop("max_terms"),
    "public-combining-on-counting": lambda p: stage(p, "public", 3).update(pool="api_counting"),
    "authenticated-combining-on-fixed-table": lambda p: stage(p, "authenticated", 3).update(pool="api_public"),
    "authenticated-unlimited-terms": lambda p: stage(p, "authenticated", 3).pop("max_terms"),
    "public-narrow-ranges": lambda p: stage(p, "public", 4).update(numeric_ranges="MIN_ONE_BIN"),
    "public-charts": lambda p: stage(p, "public", 4).update(charts="OBFUSCATED"),
    "public-listing": lambda p: stage(p, "public", 4).update(below_min_count_listing="ALL_UNREPORTED_CONSENT_GROUPS"),
    "authenticated-exact-charts": lambda p: stage(p, "authenticated", 5).update(charts="EXACT_WITHIN_EXACT_SCOPE"),
    "authenticated-window-without-minimum": lambda p: stage(p, "authenticated", 4)["temporal_windows"].pop("min_days"),
    "authenticated-relaxed-ranges": lambda p: stage(p, "authenticated", 4).update(
        numeric_ranges="RELAXED_WITHIN_EXACT_SCOPE"),
    "authenticated-filterable-stigmatizing": lambda p: stage(p, "authenticated", 1).update(
        stigmatizing_terms="FILTERABLE_WITHIN_EXACT_SCOPE"),
    "authorized-unlimited-terms": lambda p: stage(p, "authorized", 3).pop("max_terms"),
    "windows-on-fixed-table": lambda p: stage(p, "authenticated", 2).update(temporal_windows={"min_days": 30}),
    "boolean-time-windows": lambda p: stage(p, "authenticated", 4).update(temporal_windows=True),
    "old-enum-windows": lambda p: stage(p, "authenticated", 4).update(temporal_windows="ALLOWED"),
    "zero-noise": lambda p: p["counting"]["noise"].update(min=0, max=0),
    "no-negative-noise": lambda p: p["counting"]["noise"].update(min=0),
    "no-positive-noise": lambda p: p["counting"]["noise"].update(max=0),
    # Limits: one block, typed; the public tier is limited by rate only.
    "public-query-budget": lambda p: p["tiers"][0]["limits"].append(dict(
        limit_type="QUERY_BUDGET", amount=100, unit="QUERY_UNITS", period="DAY", keyed_by="NETWORK_ADDRESS")),
    "public-limit-by-account": lambda p: p["tiers"][0]["limits"][0].update(keyed_by="ACCOUNT"),
    "rate-limit-counts-units": lambda p: p["tiers"][0]["limits"][0].update(unit="QUERY_UNITS"),
    "rate-limit-without-period": lambda p: p["tiers"][0]["limits"][0].pop("period"),
    "rate-limit-draws-on": lambda p: p["tiers"][0]["limits"][0].update(draws_on="authenticated"),
    "rate-limit-exempt": lambda p: p["tiers"][0]["limits"][0].update(exempt_within_exact_scope=True),
    "budget-counts-requests": lambda p: p["tiers"][1]["limits"][0].update(unit="REQUESTS"),
    "budget-without-period": lambda p: p["tiers"][1]["limits"][0].pop("period"),
    "unknown-limit-type": lambda p: p["tiers"][1]["limits"][0].update(limit_type="QUOTA"),
    "old-rate-limit-field": lambda p: p["tiers"][0].update(rate_limit={"requests_per_minute": 60}),
    # Overlap check: global for the public tier, and never answered by refusal across callers.
    "public-no-overlap-check": lambda p: p["tiers"][0].pop("overlap_check"),
    "public-overlap-per-account": lambda p: p["tiers"][0]["overlap_check"].update(scope="PER_ACCOUNT"),
    "global-check-refuses": lambda p: p["tiers"][0]["overlap_check"].update(on_match="REFUSE"),
    "authenticated-no-overlap-check": lambda p: p["tiers"][1].pop("overlap_check"),
    "boolean-overlap-check": lambda p: p["tiers"][1].update(overlap_check=True),
    "authorized-no-overlap-check": lambda p: p["tiers"][2].pop("overlap_check"),
    # Protections are fixed: switching one off is an unknown field, not a setting.
    "possibly-none-off": lambda p: p["counting"].update(below_min_count_includes_zero=False),
    "clamp-off": lambda p: p["counting"]["noise"].update(clamp_to_min_count=False),
    "partial-exact-totals": lambda p: p["counting"]["totals"].update(exact_requires_full_exact_scope=False),
    "facet-suppression-off": lambda p: p["counting"]["suppression"].update(parents=["CONTRIBUTIONS"]),
    "not-recorded-off": lambda p: p["counting"]["suppression"].update(count_implied_not_recorded=False),
    "retired-releases-for-anything": lambda p: p["counting"]["releases"].update(
        retired_release_own_cohorts_only=False),
    "overlap-within-release-only": lambda p: p["counting"]["releases"].update(overlap_checks_span_releases=False),
    "logging-off": lambda p: p["tiers"][1].update(log_every_request=False),
    # Floors: the policy may tighten, never loosen below them.
    "min-count-below-floor": lambda p: p["counting"].update(min_count=9),
    "noise-narrower-below": lambda p: p["counting"]["noise"].update(min=-2),
    "noise-narrower-above": lambda p: p["counting"]["noise"].update(max=2),
    "authenticated-window-below-floor": lambda p: stage(p, "authenticated", 4)["temporal_windows"].update(
        min_days=29),
    "authorized-window-below-floor": lambda p: stage(p, "authorized", 4)["temporal_windows"].update(min_days=7),
    # Relaxed queries: the policy says what they return outside exact scope, and only where there is one.
    "authorized-relaxed-undecided": lambda p: p["tiers"][2].pop("relaxed_queries_outside_scope"),
    "authorized-relaxed-estimated": lambda p: p["tiers"][2].update(relaxed_queries_outside_scope="ESTIMATED"),
    "authenticated-relaxed-setting": lambda p: p["tiers"][1].update(relaxed_queries_outside_scope="EXCLUDED"),
    "public-relaxed-setting": lambda p: p["tiers"][0].update(relaxed_queries_outside_scope="EXCLUDED"),
    # Window minimums: always one for queries reaching outside exact scope; an inside one needs an exact scope.
    "authorized-window-without-minimum": lambda p: stage(p, "authorized", 4)["temporal_windows"].pop("min_days"),
    "authenticated-inside-window": lambda p: stage(p, "authenticated", 4)["temporal_windows"].update(
        min_days_within_exact_scope=7),
}


# Settings the locks must still allow, so the rules are not simply rejecting everything nearby.
ACCEPTED = {
    "authorized-inside-window": lambda p: stage(p, "authorized", 4)["temporal_windows"].update(
        min_days_within_exact_scope=7),
    "authorized-exact-charts": lambda p: stage(p, "authorized", 5).update(charts="EXACT_WITHIN_EXACT_SCOPE"),
    "authenticated-bin-edges": lambda p: stage(p, "authenticated", 4).update(numeric_ranges="BIN_EDGES"),
    "wider-noise": lambda p: p["counting"]["noise"].update(min=-5, max=5),
    "higher-min-count": lambda p: p["counting"].update(min_count=20),
    "longer-window": lambda p: stage(p, "authenticated", 4)["temporal_windows"].update(min_days=60),
    "authenticated-rate-limit-too": lambda p: p["tiers"][1]["limits"].append(dict(
        limit_type="RATE_LIMIT", amount=120, unit="REQUESTS", period="MINUTE", keyed_by="ACCOUNT")),
    "authenticated-global-reuse": lambda p: p["tiers"][1]["overlap_check"].update(
        scope="GLOBAL", on_match="REUSE_EARLIER_ANSWER"),
}


@pytest.mark.parametrize("change", ACCEPTED.values(), ids=ACCEPTED.keys())
def test_schema_accepts(policy, errors, change):
    assert errors(broken(policy, change)) == []


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
