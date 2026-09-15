"""
Tests for label selection.

These run offline against fixture terms. The cases are the real mappings that
were being labelled wrongly before the selection rules existed, so a regression
here means the interface is back to showing a mouth condition for emphysema.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from labels import choose  # noqa: E402


def term(curie, label, synonyms=(), exact=True, domain=None):
    return {
        "id": curie,
        "label": label,
        "description": None,
        "synonyms": list(synonyms),
        "synonyms_exact": exact,
        "source": "monarch",
        "vocabulary": curie.split(":", 1)[0],
        "domain": domain,
    }


def concept(name, mappings, category="ConditionDisease", title=None):
    return {
        "name": name,
        "title": title or name,
        "description": "",
        "category": category,
        "mappings": list(mappings),
    }


def test_exact_label_match_beats_vocabulary_priority():
    """HP:0001297 is literally "Stroke"; MONDO ranks higher but is not the term."""
    terms = {
        "MONDO:0005099": term("MONDO:0005099", "subarachnoid hemorrhage"),
        "HP:0001297": term("HP:0001297", "Stroke"),
    }
    picked = choose(concept("stroke", ["MONDO:0005099", "HP:0001297"]), terms)
    assert picked["curie"] == "HP:0001297"
    assert picked["label"] == "Stroke"
    assert picked["matched_on"] == "label"


def test_exact_synonym_resolves_an_acronym():
    """The variable library writes `copd`; MONDO lists it as an exact synonym."""
    terms = {
        "MONDO:0000270": term("MONDO:0000270", "lower respiratory tract disorder"),
        "MONDO:0005002": term(
            "MONDO:0005002", "chronic obstructive pulmonary disease", ["COPD", "COLD"]
        ),
    }
    picked = choose(concept("copd", ["MONDO:0000270", "MONDO:0005002"]), terms)
    assert picked["curie"] == "MONDO:0005002"
    assert picked["matched_on"] == "synonym"


def test_narrow_synonyms_are_not_matched():
    """
    OLS cannot distinguish synonym types, so its lists must never match.

    Were this to regress, a general asthma variable would take the label of a
    specific asthma subtype.
    """
    terms = {
        "MONDO:0004784": term(
            "MONDO:0004784", "allergic asthma", ["asthma"], exact=False
        ),
    }
    picked = choose(concept("asthma", ["MONDO:0004784"]), terms)
    assert picked["matched_on"] == "priority"


def test_units_are_never_labels():
    """`troponin` maps to OMOP:8842, "nanogram per millilitre"."""
    terms = {
        "OMOP:4021291": term("OMOP:4021291", "Troponin measurement", domain="Measurement"),
        "OMOP:8842": term("OMOP:8842", "nanogram per milliliter", domain="Unit"),
    }
    picked = choose(
        concept("troponin", ["OMOP:8842", "OMOP:4021291"], category="LabMeasurement"),
        terms,
    )
    assert picked["curie"] == "OMOP:4021291"


def test_medication_prefers_the_drug_class():
    """`hypert_trt` asks what is being taken, not what the participant has."""
    terms = {
        "HP:0000822": term("HP:0000822", "Hypertension"),
        "ATC:C02": term("ATC:C02", "Antihypertensives"),
    }
    picked = choose(
        concept("hypert_trt", ["ATC:C02", "HP:0000822"], category="TreatmentMedication"),
        terms,
    )
    assert picked["curie"] == "ATC:C02"


def test_history_variables_keep_their_qualifier():
    """The ontology term alone would read as a current diagnosis."""
    terms = {"MONDO:0005068": term("MONDO:0005068", "myocardial infarction")}
    picked = choose(
        concept("hist_mi", ["MONDO:0005068"], category="DiseaseHistory"), terms
    )
    assert picked["label"] == "History of myocardial infarction"
    assert picked["ontology_label"] == "myocardial infarction"


def test_unresolved_concept_gets_no_invented_label():
    """The whole point: a gap stays a gap."""
    picked = choose(concept("tak_insulin", []), {})
    assert picked["label"] is None
    assert picked["curie"] is None


def test_competing_mappings_are_reported_across_vocabularies():
    """A rival in another vocabulary is exactly the case a curator needs to see."""
    terms = {
        "MONDO:0004848": term("MONDO:0004848", "ulcerative stomatitis"),
        "MONDO:0004849": term("MONDO:0004849", "pulmonary emphysema", ["emphysema"]),
    }
    picked = choose(concept("emphysema", ["MONDO:0004848", "MONDO:0004849"]), terms)
    assert picked["curie"] == "MONDO:0004849"
    assert [c["id"] for c in picked["competing"]] == ["MONDO:0004848"]
