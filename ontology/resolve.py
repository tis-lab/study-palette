"""
Resolve a CURIE to the label its ontology actually gives it.

Harmonized BDC data codes everything as a CURIE. A CURIE is not readable, so
every interface has to show a label beside it — and the only defensible label
is the one the source vocabulary publishes. Writing them out by hand, or
expanding the machine-readable variable name into something that looks like a
term, produces text that reads as authoritative and is not.

So nothing here invents a label. A CURIE either resolves against the service
that owns its vocabulary, or it is reported as unresolved.

    Monarch     MONDO, HP and OBA. Preferred over OLS for these because it
                types its synonyms — `exact_synonym` is separate from
                `narrow_synonym`, and only an exact one is safe to match a
                variable against
    OLS4        the rest of OBO: MMO, NCBITaxon, UBERON and anything Monarch
                does not carry
    OHDSI       OMOP concept names. Athena is the usual route but its API
                refuses unauthenticated callers; the public WebAPI serves the
                same vocabulary tables
    RxClass     ATC and NDFRT drug *class* names, which is what the medication
                variables ask about
    RxNav       RxCUI ingredients

ICD10CM has no free resolver, and the codes the corpus uses are chapter ranges
("I20-I25") rather than concepts, so they stay unresolved by design.
"""

import json
import time
import urllib.error
import urllib.parse
import urllib.request

MONARCH = "https://api-v3.monarchinitiative.org/v3/api"
OLS = "https://www.ebi.ac.uk/ols4/api"
OHDSI = "https://api.ohdsi.org/WebAPI"
RXNAV = "https://rxnav.nlm.nih.gov/REST"

# Monarch carries these three, with typed synonyms and an is-a hierarchy.
MONARCH_PREFIXES = ("MONDO:", "HP:", "OBA:")

# OLS ontology id per CURIE prefix. Only prefixes listed here are looked up
# there; anything else routes to a service below or stays unresolved.
OLS_ONTOLOGIES = {
    "MONDO": "mondo",
    "HP": "hp",
    "OBA": "oba",
    "MMO": "mmo",
    "NCBITaxon": "ncbitaxon",
    "UBERON": "uberon",
    "CHEBI": "chebi",
    "EFO": "efo",
}


def _get(url, timeout=20):
    """One HTTP call, returning None rather than raising on failure."""
    try:
        with urllib.request.urlopen(url, timeout=timeout) as response:  # noqa: S310
            return json.load(response)
    except (urllib.error.URLError, TimeoutError, ValueError, OSError):
        return None


def from_monarch(curie):
    """
    Look a disease, phenotype or attribute term up in the Monarch KG.

    Monarch is the primary source for these three because it distinguishes
    exact synonyms from narrow and broad ones. That matters: MONDO:0004979
    ("asthma") lists "exercise induced asthma" as a *narrow* synonym, and a
    matcher that cannot see the difference will happily label a general asthma
    variable with a specific one. The hierarchy comes along for free and is
    what term expansion will need.
    """
    if not curie.startswith(MONARCH_PREFIXES):
        return None
    entity = _get(f"{MONARCH}/entity/{urllib.parse.quote(curie)}")
    if not entity or not entity.get("name"):
        return None
    hierarchy = entity.get("node_hierarchy") or {}
    return {
        "id": curie,
        "label": entity.get("name"),
        "description": entity.get("description"),
        "synonyms": entity.get("exact_synonym") or [],
        # Flagged so the label chooser knows these are safe to match on.
        "synonyms_exact": True,
        "narrow_synonyms": entity.get("narrow_synonym") or [],
        "parents": [n["id"] for n in (hierarchy.get("super_classes") or [])],
        "children": [n["id"] for n in (hierarchy.get("sub_classes") or [])],
        "source": "monarch",
        "vocabulary": curie.split(":", 1)[0],
    }


def from_ols(curie):
    """
    Look a CURIE up in its defining ontology via OLS4.

    An OBO term is frequently imported into other ontologies, and OLS indexes
    every copy. `exact=true` scoped to the owning ontology narrows it, and
    `is_defining_ontology` is then checked on the result so a label can only
    come from the ontology that actually defines the term.
    """
    prefix = curie.split(":", 1)[0]
    ontology = OLS_ONTOLOGIES.get(prefix)
    if not ontology:
        return None

    url = (
        f"{OLS}/search?q={urllib.parse.quote(curie)}"
        f"&ontology={ontology}&exact=true&queryFields=obo_id"
        "&fieldList=obo_id,label,description,synonym,is_defining_ontology&rows=5"
    )
    payload = _get(url)
    docs = ((payload or {}).get("response") or {}).get("docs") or []
    for doc in docs:
        if doc.get("obo_id") != curie:
            continue
        if not doc.get("is_defining_ontology"):
            continue
        description = doc.get("description") or []
        return {
            "id": curie,
            "label": doc.get("label"),
            "description": description[0] if description else None,
            "synonyms": doc.get("synonym") or [],
            # OLS flattens exact, narrow, broad and related synonyms into one
            # list. They cannot be told apart here, so they are not safe to
            # match a variable against — only to display.
            "synonyms_exact": False,
            "source": "ols",
            "vocabulary": prefix,
        }
    return None


def from_ohdsi(curie):
    """OMOP concept names, out of the OHDSI WebAPI vocabulary tables."""
    if not curie.startswith("OMOP:"):
        return None
    record = _get(f"{OHDSI}/vocabulary/concept/{curie.split(':', 1)[1]}")
    name = (record or {}).get("CONCEPT_NAME")
    if not name:
        return None
    return {
        "id": curie,
        "label": name,
        "description": None,
        "synonyms": [],
        "source": "ohdsi",
        # OMOP is a mapping layer over other vocabularies; recording which one
        # the concept actually came from keeps that visible.
        "vocabulary": record.get("VOCABULARY_ID"),
        "domain": record.get("DOMAIN_ID"),
        "standard": record.get("STANDARD_CONCEPT"),
    }


def from_rxclass(curie):
    """
    ATC and NDFRT class names from RxNav's RxClass service.

    The medication variables ask about a drug class, which ATC names and a
    single RxCUI ingredient does not.
    """
    prefix, _, class_id = curie.partition(":")
    if prefix not in ("ATC", "NDFRT"):
        return None
    payload = _get(
        f"{RXNAV}/rxclass/class/byId.json?classId={urllib.parse.quote(class_id)}"
    )
    found = ((payload or {}).get("rxclassMinConceptList") or {}).get(
        "rxclassMinConcept"
    ) or []
    if not found:
        return None
    # Verbatim, including case. ATC publishes upper-case ("ACE INHIBITORS,
    # PLAIN") while NDFRT is mixed ("Central alpha-2 Adrenergic Agonist"), and
    # normalising either way corrupts the acronyms that carry the meaning —
    # ACE, ARBs and the II in "ANGIOTENSIN II". How it is cased on screen is
    # the interface's decision to make, not this module's.
    return {
        "id": curie,
        "label": found[0]["className"],
        "description": None,
        "synonyms": [],
        "source": "rxclass",
        "vocabulary": found[0].get("classType") or prefix,
    }


def from_rxnav(curie):
    """RxCUI ingredient names."""
    if not curie.startswith("RxCUI:"):
        return None
    payload = _get(f"{RXNAV}/rxcui/{curie.split(':', 1)[1]}.json", timeout=15)
    name = ((payload or {}).get("idGroup") or {}).get("name")
    if not name:
        return None
    return {
        "id": curie,
        "label": name,
        "description": None,
        "synonyms": [],
        "source": "rxnav",
        "vocabulary": "RxNorm",
    }


RESOLVERS = (from_monarch, from_ols, from_ohdsi, from_rxclass, from_rxnav)

# Prefixes some resolver above will at least attempt. Anything else — ICD10CM,
# LOINC, a bare accession — reaches no service, so there is nothing to request
# and nothing to throttle.
ROUTABLE = (
    {p.rstrip(":") for p in MONARCH_PREFIXES}
    | set(OLS_ONTOLOGIES)
    | {"OMOP", "ATC", "NDFRT", "RxCUI"}
)


def routes_somewhere(curie):
    """Whether any resolver claims this CURIE's vocabulary."""
    return curie.split(":", 1)[0] in ROUTABLE


def resolve(curie, cache=None, delay=0.05):
    """
    Resolve one CURIE, or return None if no service owns its vocabulary.

    `cache` is an optional dict that also records misses, so a rebuild does not
    re-request terms that are known not to resolve.
    """
    if cache is not None and curie in cache:
        return cache[curie]

    term = None
    if routes_somewhere(curie):
        for resolver in RESOLVERS:
            term = resolver(curie)
            if term and term.get("label"):
                break
            term = None
        # Only after a request was actually made. The delay paces the services;
        # a vocabulary nothing resolves never touched one.
        time.sleep(delay)

    if cache is not None:
        cache[curie] = term
    return term


def resolve_all(curies, cache=None, progress=None):
    """Resolve a collection of CURIEs, reporting progress as it goes."""
    terms = {}
    unresolved = []
    ordered = sorted(set(curies))
    for i, curie in enumerate(ordered, 1):
        term = resolve(curie, cache=cache)
        if term:
            terms[curie] = term
        else:
            unresolved.append(curie)
        if progress and i % 25 == 0:
            progress(f"  {i}/{len(ordered)}")
    return terms, unresolved
