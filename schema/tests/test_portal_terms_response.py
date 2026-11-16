"""Validate the response fixture without depending on a search implementation."""
import copy
import json
from pathlib import Path

import pytest
from linkml.validator import validate
from linkml_runtime import SchemaView

ROOT = Path(__file__).resolve().parents[1] / 'proposals' / 'portal-varlib'


@pytest.fixture(scope='module')
def schema():
    view = SchemaView(str(ROOT / 'terms-response.yaml'))
    view.merge_imports()
    return view.schema


@pytest.fixture
def response():
    return json.loads((ROOT / 'examples/SYNTHETIC.terms-response.json').read_text())


def test_response_validates(schema, response):
    assert not validate(response, schema, 'PortalHarmonizedSearchResponse').results


def test_unsupported_count_is_rejected(schema, response):
    response['items'][0]['participant_count'] = 100
    assert validate(response, schema, 'PortalHarmonizedSearchResponse').results


def test_response_imports_are_small():
    view = SchemaView(str(ROOT / 'terms-response.yaml'))
    assert len(view.all_classes()) == 8
    assert 'IntegratedHeight001' not in view.all_classes()
    assert 'StrokeStatusRecord' not in view.all_classes()
    assert view.induced_slot('concept', 'PortalHarmonizedConceptCard').range == 'Term'


def test_temporary_enums_match_pinned_upstream():
    response = SchemaView(str(ROOT / 'terms-response.yaml'))
    upstream = SchemaView(str(ROOT / 'vendor/bdc_variable_library.yaml'))
    for name in ['BdchmTypeEnum', 'ClinicalMicroschemaEnum']:
        actual = response.get_enum(name)
        expected = copy.deepcopy(upstream.get_enum(name))
        assert actual.permissible_values == expected.permissible_values


def test_source_and_study_metadata_remain_explicit(response):
    for card in response['items']:
        study_ids = {study['id'] for study in card['studies']}
        assert card['study_count'] == len(study_ids)
        assert len({row['id'] for row in card['integrated_variables']}) == len(card['integrated_variables'])
        for row in card['integrated_variables']:
            assert row['concept_type'] == card['concept']['curie']
            for compound in row['compound_variables']:
                assert compound['study_id'] in study_ids
                for source in compound.get('source_variables', []):
                    assert source['study_id'] == compound['study_id']
