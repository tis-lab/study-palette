"""
Pull the concept CURIEs out of the harmonized-variable trans-specs.

The trans-specs are the authority on what harmonized data contains. Each spec
emits BDCHM records, and the concept-bearing slots on those records carry a
CURIE — `condition_concept` on a Condition, `observation_type` on a
MeasurementObservation, `drug_concept` on a DrugExposure. That CURIE is what
lands in the data and what a query filters on.

The spec *filename* does not. `hist_cvd.yaml` produces records coded to ten
different MONDO and HP terms, and the string "hist_cvd" appears nowhere inside
the file, nowhere in BDCHM, and nowhere in the emitted data. It is an artifact
of how RTI organises its authoring, so it is carried here only as provenance —
which variable and which study a term is reached through — and never as the
identity of a concept or as anything a user is shown.

CURIEs turn up two ways: as a literal `value:`, and inside a `case(...)`
expression that maps a source code to a concept. Both are read.
"""

import re
from collections import defaultdict
from pathlib import Path

import yaml

# Digits are allowed in the prefix: ICD10CM carries them, and a letter-only
# pattern drops it silently rather than reporting it unresolved. `VOCABULARIES`
# below is what actually gates a match, so a permissive prefix costs nothing.
CURIE = re.compile(r"\b([A-Z][A-Za-z0-9]*):([A-Za-z0-9][A-Za-z0-9._-]*)\b")

# Slots whose value is a concept a user would browse or filter on.
CONCEPT_SLOTS = {
    "condition_concept",
    "observation_type",
    "procedure_concept",
    "drug_concept",
}

# Slots that carry a CURIE but describe the record rather than the concept.
# Demography needs labels too, so these are kept and marked, not discarded.
QUALIFIER_SLOTS = {
    "race",
    "sex",
    "ethnicity",
    "species",
    "relationship_to_participant",
    "route_concept",
    "condition_provenance",
}

# Prefixes that name a concept. Bare accessions (pht/phv) and BDCHM enum
# members are not CURIEs in this sense and must not be swept up.
VOCABULARIES = (
    "MONDO", "HP", "OBA", "OMOP", "ATC", "RxCUI", "NDFRT", "MMO",
    "NCBITaxon", "ICD10CM", "LOINC", "SNOMED", "UBERON", "CHEBI",
)


def curies_in(node):
    """Every CURIE under a node, whether written as a value or inside an expr."""
    found = set()
    if isinstance(node, dict):
        for value in node.values():
            found |= curies_in(value)
    elif isinstance(node, list):
        for item in node:
            found |= curies_in(item)
    elif isinstance(node, str):
        for prefix, local in CURIE.findall(node):
            if prefix in VOCABULARIES:
                found.add(f"{prefix}:{local}")
    return found


def walk(node, bdchm_class=None):
    """Yield (bdchm_class, slot, curie) for every concept slot in a spec."""
    if isinstance(node, list):
        for item in node:
            yield from walk(item, bdchm_class)
        return
    if not isinstance(node, dict):
        return

    for key, value in node.items():
        if key == "class_derivations" and isinstance(value, dict):
            for cls_name, cls_body in value.items():
                yield from walk(cls_body, cls_name)
        elif key == "slot_derivations" and isinstance(value, dict):
            for slot, slot_body in value.items():
                if slot in CONCEPT_SLOTS or slot in QUALIFIER_SLOTS:
                    for curie in curies_in(slot_body):
                        yield bdchm_class, slot, curie
                # A slot can nest further class_derivations, as value_quantity
                # does on a MeasurementObservation.
                yield from walk(slot_body, bdchm_class)
        else:
            yield from walk(value, bdchm_class)


def scan_tree(root):
    """
    Every CURIE written literally anywhere under a source tree.

    The synthetic corpus codes participants with concepts that no trans-spec
    emits — the hypertension and Type 2 diabetes subtypes come from the BDC
    cohort-readiness code-set reference and are written as constants in
    `synthetic/vocab.py`. Its own specs reach them through `populated_from`,
    so they appear in the generated data but never as a literal in a spec, and
    walking spec structure alone misses them entirely.

    This is a blunt text scan rather than a structural one, because the whole
    point is to catch concepts the structure does not carry.
    """
    root = Path(root)
    if not root.exists():
        return set()
    found = set()
    for path in sorted(root.rglob("*")):
        if path.suffix in (".py", ".yaml", ".yml") and path.is_file():
            found |= curies_in(path.read_text())
    return found


def from_specs(root, variables=None):
    """
    Read every trans-spec under `root`, which holds one directory per study.

    `variables` optionally restricts which spec files are read — a way to scope
    a build to part of the corpus. It selects which files to open and nothing
    else; the output is keyed on CURIEs either way.

    Returns {curie: record}, each recording the BDCHM classes and slots the
    term appears in and the studies and specs it is reached through.
    """
    root = Path(root)
    terms = defaultdict(
        lambda: {
            "bdchm_classes": set(),
            "slots": set(),
            "studies": set(),
            "variables": set(),
            "occurrences": 0,
        }
    )

    for spec in sorted(root.glob("*/*.yaml")):
        # _archive holds superseded specs. They carry stale and occasionally
        # malformed codes — "RxCUI:C02" is an ATC class written under the wrong
        # prefix — and reading them puts terms in the list that no current
        # harmonization emits.
        if "_archive" in spec.parts:
            continue
        variable = spec.stem
        if variables is not None and variable not in variables:
            continue
        # Directories are named "<STUDY>-ingest".
        study = spec.parent.name.replace("-ingest", "")
        try:
            document = yaml.safe_load(spec.read_text())
        except yaml.YAMLError:
            continue

        for bdchm_class, slot, curie in walk(document):
            record = terms[curie]
            record["bdchm_classes"].add(bdchm_class)
            record["slots"].add(slot)
            record["studies"].add(study)
            record["variables"].add(variable)
            record["occurrences"] += 1

    return {
        curie: {
            "curie": curie,
            "bdchm_classes": sorted(r["bdchm_classes"]),
            "slots": sorted(r["slots"]),
            "studies": sorted(r["studies"]),
            "variables": sorted(r["variables"]),
            "occurrences": r["occurrences"],
            "concept": bool(r["slots"] & CONCEPT_SLOTS),
        }
        for curie, r in sorted(terms.items())
    }
