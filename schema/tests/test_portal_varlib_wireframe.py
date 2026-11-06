"""Wireframe metadata checks without fabricated counts or hierarchy."""
import importlib.util
import json
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1] / 'proposals' / 'portal-varlib'
# The CLI imports its sibling helper; isolate this import for test collection.
spec = importlib.util.spec_from_file_location('validate_catalog', ROOT / 'validate_catalog.py')
helper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helper)
previous = sys.modules.get('validate_catalog')
sys.modules['validate_catalog'] = helper
spec = importlib.util.spec_from_file_location('wireframe_preview', ROOT / 'preview_terms.py')
preview = importlib.util.module_from_spec(spec)
spec.loader.exec_module(preview)
if previous is None:
    del sys.modules['validate_catalog']
else:
    sys.modules['validate_catalog'] = previous


@pytest.fixture
def catalog():
    return json.loads((ROOT / 'examples/portal-catalog.json').read_text())


def test_name_search(catalog):
    result = preview.search_catalog(catalog, 'Hypertension', allow_synthetic=True)
    assert result['total'] == 1
    card = result['items'][0]
    assert len(card['integrated_variables']) == 2
    assert card['study_count'] == 2
    assert card['display_label'] == 'Hypertension'
    assert 'participant_count' not in card
    assert 'dataset_count' not in card
    assert 'child_count' not in card


def test_actual_source_name_search(catalog):
    result = preview.search_catalog(catalog, 'synthetic_htn_dx', allow_synthetic=True)
    source = result['items'][0]['integrated_variables'][0]['compound_variables'][0]['source_variables'][0]
    assert source['id'] == 'example:source-htn-a'
    assert source['microschema_slots'] == ['condition_status']


def test_missing_sources_are_not_fabricated(catalog):
    del catalog['single_categorical_variables']
    del catalog['compound_variables'][0]['row_metadata']
    result = preview.search_catalog(catalog, 'HP:0000822', allow_synthetic=True)
    assert 'source_variables' not in result['items'][0]['integrated_variables'][0]['compound_variables'][0]


def test_label_fallback_and_unknown_query(catalog):
    del catalog['concepts'][0]['label']
    result = preview.search_catalog(catalog, 'HP:0000822', allow_synthetic=True)
    assert result['items'][0]['display_label'] == 'HP:0000822'
    assert preview.search_catalog(catalog, 'HP:9999999', allow_synthetic=True)['total'] == 0


def test_unknown_metric_rejected(catalog):
    result = preview.search_catalog(catalog, 'hypertension', allow_synthetic=True)
    result['items'][0]['participant_count'] = 412500
    assert list(preview.response_validator().iter_errors(result))


def test_source_reference_and_study_checked(catalog):
    catalog['single_categorical_variables'][0]['associated_study'] = 'example:study-b'
    assert helper.validate_catalog(catalog, allow_synthetic=True)


def test_pagination(catalog):
    result = preview.search_catalog(catalog, 'hypertension', offset=1, allow_synthetic=True)
    assert result['items'] == [] and result['total'] == 1 and not result['has_more']


def test_multiple_variables_retain_their_identity(catalog):
    card = preview.search_catalog(catalog, 'HP:0000822', allow_synthetic=True)['items'][0]
    rows = card['integrated_variables']
    assert len(rows) == 2 and rows[0]['id'] != rows[1]['id']
    assert rows[0]['concept_type'] == rows[1]['concept_type']
    assert len(rows[0]['compound_variables']) == 2


def test_study_union_across_variable_definitions(catalog):
    card = preview.search_catalog(catalog, 'HP:0000822', allow_synthetic=True)['items'][0]
    studies = {c['study_id'] for row in card['integrated_variables'] for c in row['compound_variables']}
    assert len(studies) == card['study_count'] == 2
