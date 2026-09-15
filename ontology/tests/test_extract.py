"""
Tests for concept extraction.

The cases are the ones that made the first attempt at this wrong: CURIEs hidden
inside `case(...)` expressions, several concepts in one spec, and accessions
that look enough like CURIEs to be swept up by a careless pattern.
"""

import textwrap

import yaml

from ontology.extract import from_specs, walk


def parse(text):
    return yaml.safe_load(textwrap.dedent(text))


def test_literal_value_in_a_concept_slot():
    spec = parse("""
        - class_derivations:
            Condition:
              slot_derivations:
                condition_concept:
                  value: MONDO:0005015
    """)
    assert list(walk(spec)) == [("Condition", "condition_concept", "MONDO:0005015")]


def test_curie_inside_a_case_expression():
    """`drug_concept` maps source codes to concepts through expressions."""
    spec = parse("""
        - class_derivations:
            DrugExposure:
              slot_derivations:
                drug_concept:
                  expr: case(({phv00206919} == 1, "ATC:C09A"))
    """)
    assert list(walk(spec)) == [("DrugExposure", "drug_concept", "ATC:C09A")]


def test_one_spec_yields_several_concepts():
    """`hist_cvd` is ten conditions, which is why a filename cannot be a term."""
    spec = parse("""
        - class_derivations:
            Condition:
              slot_derivations:
                condition_concept:
                  value: MONDO:0005010
        - class_derivations:
            Condition:
              slot_derivations:
                condition_concept:
                  value: MONDO:0005068
    """)
    found = {curie for _, _, curie in walk(spec)}
    assert found == {"MONDO:0005010", "MONDO:0005068"}


def test_accessions_are_not_concepts():
    """pht/phv accessions and enum members must not be read as CURIEs."""
    spec = parse("""
        - class_derivations:
            Condition:
              populated_from: pht004063
              slot_derivations:
                condition_concept:
                  value: MONDO:0005015
                condition_status:
                  value: PRESENT
                associated_participant:
                  expr: 'uuid5("https://w3id.org/bdchm/Participant", str({phv00204812}))'
    """)
    assert [c for _, _, c in walk(spec)] == ["MONDO:0005015"]


def test_nested_class_derivations_are_followed():
    """A MeasurementObservation nests a Quantity under value_quantity."""
    spec = parse("""
        - class_derivations:
            MeasurementObservation:
              slot_derivations:
                observation_type:
                  value: OBA:2045455
                value_quantity:
                  class_derivations:
                  - Quantity:
                      slot_derivations:
                        unit:
                          value: kg/m2
    """)
    assert list(walk(spec)) == [
        ("MeasurementObservation", "observation_type", "OBA:2045455")
    ]


def test_provenance_records_variable_and_study(tmp_path):
    study = tmp_path / "ARIC-ingest"
    study.mkdir()
    (study / "emphysema.yaml").write_text(textwrap.dedent("""
        - class_derivations:
            Condition:
              slot_derivations:
                condition_concept:
                  value: MONDO:0004849
    """))

    terms = from_specs(tmp_path)
    record = terms["MONDO:0004849"]
    assert record["studies"] == ["ARIC"]
    assert record["variables"] == ["emphysema"]
    assert record["concept"] is True


def test_scope_filters_files_not_output(tmp_path):
    study = tmp_path / "ARIC-ingest"
    study.mkdir()
    for name, curie in (("copd", "MONDO:0005002"), ("afib", "MONDO:0004981")):
        (study / f"{name}.yaml").write_text(textwrap.dedent(f"""
            - class_derivations:
                Condition:
                  slot_derivations:
                    condition_concept:
                      value: {curie}
        """))

    terms = from_specs(tmp_path, variables={"copd"})
    assert set(terms) == {"MONDO:0005002"}
