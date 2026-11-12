"""Checks for genuine upstream inheritance and the proposed portal graph."""
import copy
import importlib.util
import json
from pathlib import Path

import pytest
from linkml_runtime import SchemaView

ROOT = Path(__file__).resolve().parents[1] / 'proposals' / 'portal-varlib'
spec = importlib.util.spec_from_file_location('integrated_portal_validator', ROOT / 'validate_catalog.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


@pytest.fixture
def catalog():
    return json.loads((ROOT / 'examples/portal-catalog.json').read_text())


def test_genuine_upstream_inheritance():
    view = SchemaView(str(ROOT / 'portal-varlib.yaml'))
    assert view.get_class('PortalIntegratedVariable').is_a == 'IntegratedVariable'
    assert 'Variable' in view.class_ancestors('PortalIntegratedVariable')
    assert view.get_class('IntegratedVariable').from_schema == 'https://w3id.org/linkml/bdc-variable-library'
    assert view.get_class('PortalCompoundVariable').is_a == 'CompoundVariable'
    assert view.induced_slot('unit', 'PortalIntegratedVariable') is not None
    assert view.induced_slot('integrates', 'PortalIntegratedVariable').range == 'PortalCompoundVariable'


def test_pinned_vendor_closure():
    module.verify_vendor()
    view = SchemaView(str(ROOT / 'portal-varlib.yaml'))
    view.all_classes()  # all imports resolve locally
    for schema in view.schema_map.values():
        assert all(not str(i).startswith('https:') for i in schema.imports)


def test_valid_fixture(catalog):
    assert module.validate_catalog(catalog, allow_synthetic=True) == []


def test_synthetic_not_publishable_by_default(catalog):
    assert module.validate_catalog(catalog)


@pytest.mark.parametrize('change', ['missing_id', 'duplicate', 'empty_integrates',
    'dangling_compound', 'wrong_reference_type', 'duplicate_ref', 'missing_study',
    'missing_concept', 'missing_source', 'participant', 'unexpected_version_field', 'variable_alias', 'bad_enum'])
def test_rejects_invalid(catalog, change):
    iv = catalog['integrated_variables'][0]
    if change == 'missing_id':
        del iv['id']
    elif change == 'duplicate':
        catalog['integrated_variables'].append(copy.deepcopy(iv))
    elif change == 'empty_integrates':
        iv['integrates'] = []
    elif change == 'dangling_compound':
        iv['integrates'] = ['example:missing']
    elif change == 'wrong_reference_type':
        iv['integrates'] = [catalog['studies'][0]['id']]
    elif change == 'duplicate_ref':
        iv['integrates'].append(iv['integrates'][0])
    elif change == 'missing_study':
        catalog['compound_variables'][0]['associated_study'] = 'example:missing'
    elif change == 'missing_concept':
        iv['concept_type'] = 'HP:9999999'
    elif change == 'missing_source':
        iv['metadata_sources'] = ['example:missing']
    elif change == 'participant':
        iv['participant_id'] = 'person-1'
    elif change == 'unexpected_version_field':
        catalog['schemaVersion'] = 2
    elif change == 'variable_alias':
        iv['id'] = 'hypert_trt'
    elif change == 'bad_enum':
        iv['bdchm_type'] = 'made-up-type'
    assert module.validate_catalog(catalog, allow_synthetic=True)


def test_inherited_metadata_is_accepted(catalog):
    row = catalog['integrated_variables'][0]
    row['cde_id'] = 'example:cde-1'
    row['unit'] = '1'
    assert module.validate_catalog(catalog, allow_synthetic=True) == []


def test_only_unreachable_generated_definitions_are_excluded():
    defs = module.validator().schema['$defs']
    assert 'PortalIntegratedVariable' in defs
    assert 'PortalCompoundVariable' in defs
    assert 'DocumentationVariable' in defs
    assert 'StrokeStatusRecord' not in defs


def test_dangling_generated_definition_fails_closed():
    with pytest.raises(KeyError):
        module.reachable_schema({'$ref': '#/$defs/Missing', '$defs': {}})
