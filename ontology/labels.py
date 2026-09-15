"""
Choose which of a concept's CURIEs supplies its display label.

A harmonized concept usually carries several mappings, and they are not
interchangeable. `emphysema` maps to both MONDO:0004848 and MONDO:0004849;
the first is ulcerative stomatitis and the second is pulmonary emphysema, so
taking whichever comes first in the list is a coin flip that has been landing
wrong. `hypert_trt` carries ATC classes and an HP phenotype, and the phenotype
wins on list order even though the variable asks what the participant is
*taking*.

Two rules fix that. Prefer the vocabulary that matches what the variable is
about, and when a concept still has more than one candidate in the winning
vocabulary, say so rather than pick silently — that is a mapping which needs a
curator, not a tie-break.
"""

# Which vocabulary should speak for a concept, by the kind of thing it is.
# A disease variable should be named by a disease ontology, a measurement by an
# attribute ontology, a drug-class variable by a drug classification.
PRIORITY = {
    "ConditionDisease": ("MONDO", "HP", "OBA", "OMOP"),
    "DiseaseHistory": ("MONDO", "HP", "OBA", "OMOP"),
    "FamilyHistory": ("MONDO", "HP", "OBA", "OMOP"),
    "LabMeasurement": ("OBA", "OMOP", "HP", "MONDO"),
    "VitalSignsAnthropometry": ("OBA", "OMOP", "HP", "MONDO"),
    "DiagnosticTestProcedure": ("OBA", "OMOP", "HP", "MONDO"),
    "TreatmentMedication": ("ATC", "NDFRT", "RxCUI", "OMOP"),
    "LifestyleBehavioral": ("OBA", "OMOP", "MONDO", "HP"),
    "MentalHealthPsychosocial": ("OBA", "OMOP", "HP", "MONDO"),
    "DemographicsSocioeconomic": ("OMOP", "OBA"),
}
DEFAULT_PRIORITY = ("MONDO", "HP", "OBA", "OMOP", "ATC", "RxCUI")

# A `hist_` or `fam_` variable is a disease term plus a status. The ontology
# label alone would read as a current diagnosis, so the qualifier the variable
# name carries is restored in front of it. This qualifies a resolved term; it
# never invents one.
QUALIFIERS = {
    "hist": "History of",
    "fam": "Family history of",
}


def _tokens(text):
    return {t for t in text.lower().replace("_", " ").split() if len(t) > 3}


def _normalise(text):
    return " ".join((text or "").lower().replace("_", " ").split())


# OMOP mixes units and metadata in with clinical concepts, and the variable
# library maps some of both. `troponin` carries OMOP:8842, "nanogram per
# millilitre" — a unit can never be the name of a measurement, so these are
# excluded from label candidacy rather than allowed to win a tie.
NON_CLINICAL_DOMAINS = {"Unit", "Metadata", "Type Concept"}


def _eligible(curie, terms):
    term = terms.get(curie)
    if not term or not term.get("label"):
        return False
    return term.get("domain") not in NON_CLINICAL_DOMAINS


def choose(concept, terms):
    """
    Pick the label for one concept.

    Returns a dict with the chosen CURIE, the label, where it came from, and
    any competing candidates. A concept whose mappings all failed to resolve
    gets `label: None` — the caller decides how to show a gap, and inventing
    text here is exactly what this module exists to prevent.
    """
    resolved = [c for c in concept.get("mappings", []) if _eligible(c, terms)]
    order = PRIORITY.get(concept.get("category"), DEFAULT_PRIORITY)

    # A term whose published label is exactly the variable's own name is the
    # strongest evidence there is of what the variable means, and it beats
    # vocabulary preference. Without this, `stroke` resolves through MONDO to
    # "subarachnoid haemorrhage" while HP:0001297, labelled "Stroke", is sat
    # in the same mapping list.
    wanted_names = {_normalise(concept.get("name")), _normalise(concept.get("title"))}
    chosen = next(
        (c for c in resolved if _normalise(terms[c]["label"]) in wanted_names), None
    )
    matched_on = "label" if chosen else None

    # Failing that, an *exact* ontology synonym. The variable library writes
    # acronyms where the ontologies write them out — `pad`, `mi`, `chf`,
    # `copd` — and the exact-synonym lists carry precisely those.
    #
    # Only typed-exact synonyms qualify. A narrow synonym would match a general
    # variable to a specific term: MONDO:0004979 "asthma" lists "exercise
    # induced asthma", and labelling every asthma variable that way would be
    # wrong in a way that is hard to notice.
    if not chosen:
        for curie in resolved:
            term = terms[curie]
            if not term.get("synonyms_exact"):
                continue
            synonyms = {_normalise(s) for s in term.get("synonyms") or []}
            if synonyms & wanted_names:
                chosen = curie
                matched_on = "synonym"
                break

    if not chosen:
        for prefix in order:
            candidates = [c for c in resolved if c.split(":", 1)[0] == prefix]
            if not candidates:
                continue
            # Prefer the candidate whose label shares wording with the variable.
            wanted = _tokens(concept.get("name", "")) | _tokens(concept.get("title", ""))
            candidates.sort(
                key=lambda c: (-len(_tokens(terms[c]["label"] or "") & wanted), c)
            )
            chosen = candidates[0]
            break

    if not chosen:
        return {
            "curie": None,
            "label": None,
            "label_source": None,
            "unresolved": concept.get("mappings", []),
            "competing": [],
        }

    # Everything else that resolved, in any vocabulary — not just the winning
    # one. The alternative that should have won is often in a different
    # vocabulary, so narrowing this to same-vocabulary rivals hides the cases
    # most in need of a curator.
    competing = [
        {"id": c, "label": terms[c]["label"]} for c in resolved if c != chosen
    ]

    term = terms[chosen]
    label = term["label"]
    qualifier = QUALIFIERS.get(concept.get("name", "").split("_")[0])
    if qualifier:
        label = f"{qualifier} {label[:1].lower()}{label[1:]}"
    label = label[:1].upper() + label[1:]

    return {
        "curie": chosen,
        "label": label,
        "ontology_label": term["label"],
        "label_source": term["source"],
        # How this mapping was picked: an exact label match, an exact synonym,
        # or vocabulary preference. Anything but "label" deserves a look.
        "matched_on": matched_on or "priority",
        "vocabulary": term.get("vocabulary"),
        "definition": term.get("description"),
        "unresolved": [c for c in concept.get("mappings", []) if c not in terms],
        "competing": competing,
    }
