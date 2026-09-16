"""
Tests for CURIE resolution.

Every case runs offline: `_get` is replaced with a stub that answers from a
fixture keyed on the request URL, so resolver routing, the defining-ontology
check and the cache can be exercised without touching the network.
"""

import pytest

from ontology import resolve as R


@pytest.fixture(autouse=True)
def no_throttle(monkeypatch):
    """The inter-request delay is real time; tests do not need to spend it."""
    monkeypatch.setattr(R.time, "sleep", lambda _: None)


def stub(monkeypatch, responses, calls=None):
    """Answer _get from `responses`, matching on a substring of the URL."""
    def fake_get(url, timeout=20):
        if calls is not None:
            calls.append(url)
        for fragment, payload in responses.items():
            if fragment in url:
                return payload
        return None

    monkeypatch.setattr(R, "_get", fake_get)


def ols_doc(curie, label, defining=True):
    return {
        "response": {
            "docs": [{
                "obo_id": curie,
                "label": label,
                "description": ["a description"],
                "synonym": ["a synonym"],
                "is_defining_ontology": defining,
            }]
        }
    }


def test_monarch_is_preferred_over_ols_for_obo_terms(monkeypatch):
    """Monarch types its synonyms, so it must win for MONDO, HP and OBA."""
    stub(monkeypatch, {
        "monarchinitiative": {"name": "asthma", "exact_synonym": ["AS"]},
        "ols4": ols_doc("MONDO:0004979", "should not be used"),
    })
    term = R.resolve("MONDO:0004979")
    assert term["source"] == "monarch"
    assert term["synonyms_exact"] is True


def test_ols_picks_up_terms_monarch_does_not_hold(monkeypatch):
    """MMO has no Monarch entity, so the OLS fallback supplies it."""
    stub(monkeypatch, {"ols4": ols_doc("MMO:0000533", "white blood cell count")})
    term = R.resolve("MMO:0000533")
    assert term["source"] == "ols"
    assert term["label"] == "white blood cell count"
    # OLS cannot distinguish synonym types, so these must not be match-eligible.
    assert term["synonyms_exact"] is False


def test_ols_rejects_a_term_from_a_non_defining_ontology(monkeypatch):
    """An imported copy of a term must not supply its label."""
    stub(monkeypatch, {"ols4": ols_doc("MMO:0000533", "imported copy", defining=False)})
    assert R.resolve("MMO:0000533") is None


def test_rxclass_label_is_verbatim(monkeypatch):
    """ATC publishes upper-case, and the acronyms inside it carry meaning."""
    published = "ANGIOTENSIN II RECEPTOR BLOCKERS (ARBs), PLAIN"
    stub(monkeypatch, {
        "rxclass": {
            "rxclassMinConceptList": {
                "rxclassMinConcept": [
                    {"className": published, "classType": "ATC1-4"}
                ]
            }
        }
    })
    assert R.resolve("ATC:C09C")["label"] == published


def test_ndfrt_routes_to_rxclass_not_rxnav(monkeypatch):
    stub(monkeypatch, {
        "rxclass": {
            "rxclassMinConceptList": {
                "rxclassMinConcept": [
                    {"className": "Aldosterone Antagonist", "classType": "EPC"}
                ]
            }
        }
    })
    term = R.resolve("NDFRT:N0000175557")
    assert term["source"] == "rxclass"
    assert term["label"] == "Aldosterone Antagonist"


def test_rxcui_resolves_through_rxnav(monkeypatch):
    stub(monkeypatch, {"rxcui": {"idGroup": {"name": "metformin"}}})
    term = R.resolve("RxCUI:6809")
    assert term["source"] == "rxnav"
    assert term["label"] == "metformin"


def test_omop_carries_its_source_vocabulary_and_domain(monkeypatch):
    """OMOP is a mapping layer; which vocabulary a concept came from matters."""
    stub(monkeypatch, {"WebAPI": {
        "CONCEPT_NAME": "Hemoglobin A1c measurement",
        "VOCABULARY_ID": "SNOMED",
        "DOMAIN_ID": "Measurement",
        "STANDARD_CONCEPT": "S",
    }})
    term = R.resolve("OMOP:4184637")
    assert term["vocabulary"] == "SNOMED"
    assert term["domain"] == "Measurement"


def test_unknown_vocabulary_resolves_to_nothing(monkeypatch):
    """ICD10CM has no resolver, and a gap must stay a gap."""
    stub(monkeypatch, {})
    assert R.resolve("ICD10CM:I20-I25") is None


def test_cache_records_misses_so_they_are_not_refetched(monkeypatch):
    """
    A CURIE that reached a service and came back empty must not be re-requested.

    This uses RxCUI rather than ICD10CM deliberately: ICD10CM routes to no
    resolver, so no request is ever made and the assertion below would hold
    trivially without proving anything.
    """
    calls = []
    stub(monkeypatch, {}, calls=calls)
    cache = {}

    assert R.resolve("RxCUI:99999999", cache=cache) is None
    assert len(calls) == 1, "the first attempt should reach the service"
    assert "RxCUI:99999999" in cache

    assert R.resolve("RxCUI:99999999", cache=cache) is None
    assert len(calls) == 1, "a cached miss should not be requested again"


def test_an_unroutable_vocabulary_is_never_requested(monkeypatch):
    """ICD10CM reaches no service, so it should cost neither a call nor a wait."""
    calls = []
    stub(monkeypatch, {}, calls=calls)
    slept = []
    monkeypatch.setattr(R.time, "sleep", lambda d: slept.append(d))

    assert R.resolve("ICD10CM:I20-I25") is None
    assert calls == []
    assert slept == [], "nothing was requested, so there is nothing to throttle"


def test_cache_hit_skips_the_network(monkeypatch):
    calls = []
    stub(monkeypatch, {"rxcui": {"idGroup": {"name": "aspirin"}}}, calls=calls)
    cache = {}

    first = R.resolve("RxCUI:1191", cache=cache)
    second = R.resolve("RxCUI:1191", cache=cache)
    assert first == second
    assert len(calls) == 1


def test_resolve_all_separates_resolved_from_unresolved(monkeypatch):
    stub(monkeypatch, {"rxcui": {"idGroup": {"name": "aspirin"}}})
    terms, unresolved = R.resolve_all(["RxCUI:1191", "ICD10CM:R99"])
    assert set(terms) == {"RxCUI:1191"}
    assert unresolved == ["ICD10CM:R99"]


def test_resolve_all_is_deduplicated_and_ordered(monkeypatch):
    stub(monkeypatch, {"rxcui": {"idGroup": {"name": "aspirin"}}})
    terms, unresolved = R.resolve_all(["RxCUI:1191", "RxCUI:1191"])
    assert len(terms) == 1
    assert unresolved == []


def test_a_failed_request_leaves_a_gap_rather_than_raising(monkeypatch):
    """A dead service should cost one label, not the whole build."""
    def boom(*args, **kwargs):
        raise OSError("connection reset")

    # Patched at the socket layer so the real error handling in _get runs.
    monkeypatch.setattr(R.urllib.request, "urlopen", boom)
    assert R.resolve("RxCUI:1191") is None


def test_malformed_json_is_treated_as_a_miss(monkeypatch):
    """A service answering with something that is not JSON must not crash."""
    class NotJSON:
        def __enter__(self):
            return self

        def __exit__(self, *exc):
            return False

        def read(self):
            return b"<html>503</html>"

    monkeypatch.setattr(R.urllib.request, "urlopen", lambda *a, **k: NotJSON())
    assert R.resolve("RxCUI:1191") is None
