"""Structural disclosure guarantees for the draft access profiles."""
import copy
import json
import subprocess
import sys
from pathlib import Path

import pytest
import yaml
from jsonschema import Draft202012Validator
from linkml.generators.jsonschemagen import JsonSchemaGenerator

SCHEMA_DIR = Path(__file__).resolve().parent.parent
# The policy's threshold, so these fixtures follow it rather than a copy that can drift.
POLICY = yaml.safe_load((SCHEMA_DIR.parent / 'policy' / 'disclosure-policy.yaml').read_text())
MIN_COUNT = POLICY['counting']['min_count']
TOTALS = {
    'release': 'synthetic', 'min_count': MIN_COUNT, 'count_mode': 'OBFUSCATED',
    'participant_count': 1200, 'suppressed_study_count': 2,
    'studies': [{'research_study': 'palette:study_one', 'name': 'Example Study One', 'count_status': 'LISTED'}],
    'summary': {'conditions': [{
        'id': 'palette:condition/t2d', 'condition_concept': 'MONDO:0005148',
        'participant_count': 300, 'count_mode': 'OBFUSCATED',
    }]},
}
FACETS = {
    'conditions': {'condition_concept': 'MONDO:0005148'},
    'demographics': {'summarized_slot': 'sex'},
    'participants': {'summarized_slot': 'age_at_index'},
    'procedures': {'procedure_concept': 'palette:procedure'},
    'drug_exposures': {'drug_concept': 'palette:drug', 'exposure_status': 'PRESENT'},
    'measurements': {'observation_type': 'FAST_GLUC_BLD'},
}


@pytest.fixture(scope='module')
def validators():
    return {name: Draft202012Validator(json.loads(JsonSchemaGenerator(
        str(SCHEMA_DIR / 'summary-profiles.yaml'), top_class=name, not_closed=False,
    ).serialize())) for name in ['TotalsSummaryResponse', 'BreakdownSummaryResponse', 'ExactTotalsSummaryResponse',
                                   'ExactBreakdownSummaryResponse']}


def test_totals_validates(validators):
    assert list(validators['TotalsSummaryResponse'].iter_errors(TOTALS)) == []


@pytest.mark.parametrize('missing', ['root-mode', 'facet-mode', 'study-status'])
def test_required_disclosure_metadata(validators, missing):
    data = copy.deepcopy(TOTALS)
    if missing == 'root-mode':
        del data['count_mode']
    elif missing == 'facet-mode':
        del data['summary']['conditions'][0]['count_mode']
    else:
        del data['studies'][0]['count_status']
    assert not validators['TotalsSummaryResponse'].is_valid(data)


@pytest.mark.parametrize('slot', FACETS)
@pytest.mark.parametrize('violation', ['exact', 'missing', 'record-count', 'contribution', 'nested-exact'])
def test_every_totals_facet_restricts_disclosure(validators, slot, violation):
    data = copy.deepcopy(TOTALS)
    node = dict(id='palette:facet', count_mode='OBFUSCATED', **FACETS[slot])
    data['summary'] = {slot: [node]}
    assert validators['TotalsSummaryResponse'].is_valid(data)
    if violation == 'exact':
        node['count_mode'] = 'EXACT'
    elif violation == 'missing':
        del node['count_mode']
    elif violation == 'record-count':
        node['record_count'] = 1
    elif violation == 'contribution':
        node['studies'] = [{'research_study': 'palette:study_one', 'participant_count': 12}]
    else:
        node['values'] = [dict(id='palette:value', count_mode='EXACT', **FACETS[slot])]
    assert not validators['TotalsSummaryResponse'].is_valid(data)


@pytest.mark.parametrize('violation', ['root-exact', 'study-count', 'records'])
def test_totals_rejects_forbidden_fields(validators, violation):
    data = copy.deepcopy(TOTALS)
    if violation == 'root-exact':
        data['count_mode'] = 'EXACT'
    elif violation == 'study-count':
        data['studies'][0]['participant_count'] = 40
    else:
        data['records'] = {}
    assert not validators['TotalsSummaryResponse'].is_valid(data)


def breakdown():
    data = copy.deepcopy(TOTALS)
    entry = {'research_study': 'palette:study_one', 'count_status': 'REPORTED',
             'count_mode': 'OBFUSCATED', 'participant_count': 300, 'consent_group': 'palette:study_one/c1'}
    data['studies'] = [entry]
    data['summary']['conditions'][0]['studies'] = [copy.deepcopy(entry)]
    return data


@pytest.mark.parametrize('location', ['root-study', 'contribution'])
@pytest.mark.parametrize('change', ['missing-mode', 'missing-status', 'missing-count', 'exact', 'withheld-count'])
def test_breakdown_entry_rules(validators, location, change):
    data = breakdown()
    validator = validators['BreakdownSummaryResponse']
    assert list(validator.iter_errors(data)) == []
    entry = data['studies'][0] if location == 'root-study' else data['summary']['conditions'][0]['studies'][0]
    if change.startswith('missing-'):
        entry.pop({'missing-mode': 'count_mode', 'missing-status': 'count_status',
                   'missing-count': 'participant_count'}[change])
    elif change == 'exact':
        entry['count_mode'] = 'EXACT'
    else:
        entry['count_status'] = 'WITHHELD'
    assert not validator.is_valid(data)


def test_withheld_entry_has_no_count(validators):
    data = breakdown()
    entry = data['summary']['conditions'][0]['studies'][0]
    entry['count_status'] = 'WITHHELD'
    del entry['participant_count']
    assert validators['BreakdownSummaryResponse'].is_valid(data)


def test_exact_breakdown_profile_is_structural_only(validators):
    data = breakdown()
    data['count_mode'] = 'EXACT'
    assert validators['ExactBreakdownSummaryResponse'].is_valid(data)
    data['records'] = {}
    assert not validators['ExactBreakdownSummaryResponse'].is_valid(data)


def exact_totals():
    """Study one in exact scope; study two outside it, listed, with one obfuscated figure apart."""
    outside = {'count_status': 'REPORTED', 'count_mode': 'OBFUSCATED', 'participant_count': 460,
               'consent_group_count': 1}
    inside = {'research_study': 'palette:study_one', 'consent_group': 'palette:study_one/c1',
              'count_status': 'REPORTED', 'count_mode': 'EXACT', 'participant_count': 300}
    return {
        'release': 'synthetic', 'min_count': MIN_COUNT, 'participant_count': 300, 'count_mode': 'EXACT',
        'outside_scope': dict(outside),
        'studies': [dict(inside), {'research_study': 'palette:study_two', 'count_status': 'LISTED'}],
        'summary': {'conditions': [{
            'id': 'palette:condition/t2d', 'condition_concept': 'MONDO:0005148',
            'participant_count': 90, 'count_mode': 'EXACT', 'outside_scope': dict(outside, participant_count=80),
            'studies': [dict(inside, participant_count=90)],
        }]},
    }


def test_exact_totals_validates(validators):
    assert list(validators['ExactTotalsSummaryResponse'].iter_errors(exact_totals())) == []


@pytest.mark.parametrize('violation', [
    'study-count-outside', 'contribution-outside', 'outside-exact', 'root-obfuscated', 'records', 'outside-no-status',
])
def test_exact_totals_gives_nothing_per_study_outside_scope(validators, violation):
    data = exact_totals()
    if violation == 'study-count-outside':
        data['studies'][1].update(count_status='REPORTED', count_mode='OBFUSCATED', participant_count=460)
    elif violation == 'contribution-outside':
        data['summary']['conditions'][0]['studies'].append({
            'research_study': 'palette:study_two', 'count_status': 'REPORTED', 'count_mode': 'OBFUSCATED',
            'participant_count': 80})
    elif violation == 'outside-exact':
        data['outside_scope']['count_mode'] = 'EXACT'
    elif violation == 'root-obfuscated':
        data['count_mode'] = 'OBFUSCATED'
    elif violation == 'records':
        data['records'] = {}
    else:
        del data['summary']['conditions'][0]['outside_scope']['count_status']
    assert not validators['ExactTotalsSummaryResponse'].is_valid(data)


def test_generator_is_reproducible():
    path = SCHEMA_DIR / 'summary-profiles.yaml'
    before = path.read_text()
    subprocess.run([sys.executable, str(SCHEMA_DIR / 'generate_summary_profiles.py')], check=True)  # noqa: S603
    assert path.read_text() == before
