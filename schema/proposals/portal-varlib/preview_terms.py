"""Executable metadata-only search prototype; not the running Java terms endpoint."""
import argparse
import json
from functools import lru_cache
from pathlib import Path

from jsonschema import Draft202012Validator
from linkml.generators.jsonschemagen import JsonSchemaGenerator
from validate_catalog import HERE, reachable_schema, validate_catalog


@lru_cache(maxsize=1)
def response_validator():
    """Compile all reachable definitions of the proposed metadata response."""
    schema = json.loads(JsonSchemaGenerator(str(HERE / 'terms-response.yaml'),
        top_class='PortalHarmonizedSearchResponse', not_closed=False).serialize())
    schema = reachable_schema(schema)
    Draft202012Validator.check_schema(schema)
    return Draft202012Validator(schema)


VARIABLE_FIELDS = ('id', 'variable_label', 'variable_description', 'concept_type',
                   'bdchm_type', 'unit', 'cde_id')
SOURCE_FIELDS = ('id', 'variable_name', 'variable_label', 'source_id', 'file_id', 'file_name')


def _source_card(source, metadata):
    card = {key: source[key] for key in SOURCE_FIELDS if key in source}
    card.update(study_id=source['associated_study'],
                microschema_slots=metadata.get('microschema_slot', []))
    return card


def _compound_card(compound, studies, sources):
    study = studies[compound['associated_study']]
    card = {'id': compound['id'], 'variable_label': compound['variable_label'],
            'study_id': study['id'], 'study_name': study['study_name']}
    if compound.get('row_metadata'):
        card['source_variables'] = [
            _source_card(sources[metadata['id']], metadata)
            for metadata in compound['row_metadata']
        ]
    return card


def _matches(query, concept, variables, compounds, sources):
    if ':' in query:
        return concept['curie'].lower() == query.lower()
    text = [concept.get('label', ''), concept['curie']]
    for variable in variables:
        text.extend((variable['variable_label'], variable.get('variable_description', '')))
        for key in variable['integrates']:
            compound = compounds[key]
            text.append(compound['variable_label'])
            text.extend(sources[m['id']]['variable_name'] for m in compound.get('row_metadata', []))
    searchable = ' '.join(text).lower()
    return all(token in searchable for token in query.lower().split())


def _concept_card(concept, variables, compounds, studies, sources):
    variable_cards = []
    study_ids = set()
    for variable in variables:
        card = {key: variable[key] for key in VARIABLE_FIELDS if key in variable}
        card['compound_variables'] = [
            _compound_card(compounds[key], studies, sources) for key in variable['integrates']
        ]
        study_ids.update(c['study_id'] for c in card['compound_variables'])
        variable_cards.append(card)
    return {'concept': concept, 'display_label': concept.get('label') or concept['curie'],
            'study_count': len(study_ids), 'studies': [studies[key] for key in sorted(study_ids)],
            'integrated_variables': variable_cards}


def search_catalog(data, query, limit=20, offset=0, allow_synthetic=False):
    """Return a validated page of matching concept cards with resolved variable metadata."""
    errors = validate_catalog(data, allow_synthetic=allow_synthetic)
    if errors:
        raise ValueError('; '.join(errors))
    query = query.strip()
    if not query or not 1 <= limit <= 100 or offset < 0:
        raise ValueError('Nonempty query, limit 1-100 and nonnegative offset required')
    studies = {r['id']: r for r in data['studies']}
    compounds = {r['id']: r for r in data['compound_variables']}
    sources = {r['id']: r for key in ('single_continuous_variables', 'single_categorical_variables')
               for r in data.get(key, [])}
    concepts = {r['curie']: r for r in data['concepts']}
    grouped = {}
    for variable in data['integrated_variables']:
        grouped.setdefault(variable['concept_type'], []).append(variable)
    cards = [
        _concept_card(concepts[curie], variables, compounds, studies, sources)
        for curie, variables in sorted(grouped.items())
        if _matches(query, concepts[curie], variables, compounds, sources)
    ]
    result = {'query': query, 'catalog_release': data['release'], 'total': len(cards),
              'offset': offset, 'limit': limit, 'has_more': offset + limit < len(cards),
              'items': cards[offset:offset + limit]}
    response_validator().validate(result)
    return result


def main():
    """Print the proposed metadata response for a validated catalog."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('catalog', type=Path)
    parser.add_argument('--query', required=True)
    parser.add_argument('--allow-synthetic', action='store_true')
    args = parser.parse_args()
    data = json.loads(args.catalog.read_text(encoding='utf-8'))
    print(json.dumps(search_catalog(data, args.query, allow_synthetic=args.allow_synthetic), indent=2))


if __name__ == '__main__':
    main()
