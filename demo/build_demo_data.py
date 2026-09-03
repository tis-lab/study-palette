"""
Assemble the demo dataset: VarLib concepts, Monarch KG context, corpus counts.

Three real sources, no mocking:

  BDC-VarLib      which harmonized concepts exist, their ontology mappings, and
                  which studies contribute each one
  Monarch KG      what those ontology terms mean — labels, definitions,
                  synonyms, and the parent/child hierarchy used for expansion
  synthetic corpus  participants coded with those concepts

The KG lookups are baked in here rather than left to the browser so the demo
does not depend on the network at showtime. The UI still queries Monarch live
for free-text search; this is the floor it falls back to.

Both inputs live outside this repo: BDC-VarLib is a separate clone, and the
corpus is the output of the synthetic corpus generator.

    python demo/build_demo_data.py \
        --varlib path/to/BDC-VarLib/docs/schema/bdc_varlib.yaml \
        --corpus path/to/synthetic/output
"""

import argparse
import json
import random
import time
import urllib.parse
import urllib.request
from pathlib import Path

import yaml

MONARCH = "https://api-v3.monarchinitiative.org/v3/api"

# Only these vocabularies resolve in Monarch. OMOP, ATC and RxCUI appear in
# VarLib's mappings but are not in the KG, so they are carried through as
# identifiers without enrichment.
RESOLVABLE = ("MONDO:", "HP:", "OBA:")


def fetch(path, **params):
    """One Monarch call, returning None rather than raising on failure."""
    url = f"{MONARCH}/{path}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url, timeout=20) as response:  # noqa: S310
            return json.load(response)
    except Exception as exc:  # noqa: BLE001 - a missing term should not stop the build
        print(f"    ! {path}: {exc}")
        return None


def annotation(slot, tag):
    """VarLib keeps study and accession lists in annotations, as delimited strings."""
    ann = (slot.get("annotations") or {}).get(tag)
    value = ann.get("value") if isinstance(ann, dict) else ann
    return [v.strip() for v in str(value).split(",") if v.strip()] if value else []


def load_varlib(path):
    """Flatten VarLib into concepts, each with mappings and contributing studies."""
    with open(path) as fh:
        schema = yaml.safe_load(fh)
    slots = schema.get("slots", {})

    category_of = {}
    for cls_name, cls in schema.get("classes", {}).items():
        for slot_name in cls.get("slots") or []:
            category_of[slot_name] = cls_name

    concepts = []
    for name, slot in slots.items():
        concepts.append(
            {
                "name": name,
                "title": slot.get("title") or name,
                "description": slot.get("description") or "",
                "category": category_of.get(name, "Uncategorized"),
                "bdchm_class": (
                    (slot.get("annotations") or {}).get("bdchm_class", {}) or {}
                ).get("value"),
                "mappings": slot.get("exact_mappings") or [],
                "studies": annotation(slot, "source_study"),
                "variable_count": len(annotation(slot, "variable_accession")),
            }
        )
    return sorted(concepts, key=lambda c: (c["category"], c["name"]))


def enrich(curies):
    """Look each ontology term up in Monarch, with its immediate hierarchy."""
    terms = {}
    resolvable = sorted(c for c in curies if c.startswith(RESOLVABLE))
    print(f"  resolving {len(resolvable)} terms against Monarch")

    for i, curie in enumerate(resolvable, 1):
        entity = fetch(f"entity/{urllib.parse.quote(curie)}")
        if not entity:
            continue
        hierarchy = entity.get("node_hierarchy") or {}
        terms[curie] = {
            "id": curie,
            "label": entity.get("name"),
            "description": entity.get("description"),
            "synonyms": (entity.get("exact_synonym") or [])[:6],
            "parents": [n["id"] for n in (hierarchy.get("super_classes") or [])],
            "children": [n["id"] for n in (hierarchy.get("sub_classes") or [])],
            "child_labels": {
                n["id"]: n.get("name") for n in (hierarchy.get("sub_classes") or [])
            },
        }
        if i % 20 == 0:
            print(f"    {i}/{len(resolvable)}")
        time.sleep(0.05)
    return terms


# Hierarchy is is-a only, so walking it from a disease reaches other diseases.
# These are the associative edges Monarch does hold, and they are what carry a
# term sideways into phenotypes and anatomy rather than just up and down.
HARVESTED = {
    "biolink:has_phenotype",
    "biolink:disrupts",
    "biolink:disease_has_location",
    "biolink:related_to",
}


def harvest_edges(curies):
    """Pull associative edges out of Monarch for the terms that have them."""
    edges = {}
    subjects = sorted(c for c in curies if c.startswith(("MONDO:", "HP:")))
    print(f"  harvesting edges for {len(subjects)} terms")

    for i, curie in enumerate(subjects, 1):
        result = fetch(f"association?subject={urllib.parse.quote(curie)}&limit=100")
        found = []
        for item in (result or {}).get("items") or []:
            predicate = item.get("predicate")
            if predicate in HARVESTED and item.get("object"):
                found.append({
                    "predicate": predicate,
                    "object": item["object"],
                    "label": item.get("object_label"),
                    "source": "kg",
                })
        if found:
            edges[curie] = found
        if i % 25 == 0:
            print(f"    {i}/{len(subjects)}")
        time.sleep(0.05)

    print(f"  {sum(len(v) for v in edges.values())} edges harvested")
    return edges


def keep_landing(edges, attested):
    """
    Drop harvested edges that do not reach a harmonized variable.

    Monarch returns every phenotype of a disease, and BDC harmonizes a small
    fraction of them. The rest cannot drive anything in the interface and cost
    a few hundred KB, so only the landing edges are carried — with a count of
    what was dropped, because "20 neighbours, 3 of them harmonized" is the
    honest framing of how much of the graph BDC actually covers.
    """
    kept = {}
    coverage = {}
    for subject, found in edges.items():
        lands = [e for e in found if e["object"] in attested]
        if lands:
            kept[subject] = lands
        harvested = [e for e in found if e["source"] == "kg"]
        if harvested:
            coverage[subject] = {
                "neighbours": len(harvested),
                "harmonized": sum(1 for e in harvested if e["object"] in attested),
            }
    dropped = sum(len(v) for v in edges.values()) - sum(len(v) for v in kept.values())
    print(f"  {dropped} edges dropped as unharmonized, "
          f"{sum(len(v) for v in kept.values())} kept")
    return kept, coverage


def curated_edges(path, attested):
    """
    Load the hand-curated disease -> measurement/procedure edges.

    These exist because no public graph holds them. Every edge is checked
    against the terms the variable library actually uses, so a typo or a stale
    CURIE fails the build rather than silently dropping out of the interface.
    """
    if not path.exists():
        print(f"  ! no curated edges at {path}")
        return {}

    with open(path) as fh:
        raw = yaml.safe_load(fh) or {}

    edges = {}
    unknown = []
    for subject, predicates in raw.items():
        for predicate, objects in (predicates or {}).items():
            for obj in objects or []:
                if obj not in attested:
                    unknown.append(f"{subject} {predicate} {obj}")
                    continue
                edges.setdefault(subject, []).append({
                    "predicate": predicate,
                    "object": obj,
                    "label": None,
                    "source": "curated",
                })
    if unknown:
        raise SystemExit(
            "curated edges reference terms the variable library does not use:\n  "
            + "\n  ".join(unknown)
        )

    print(f"  {sum(len(v) for v in edges.values())} curated edges over "
          f"{len(edges)} subjects")
    return edges


def enrich_rxcui(curies):
    """RxCUI is not in Monarch but RxNav resolves it, and needs no key."""
    terms = {}
    ids = sorted(c for c in curies if c.startswith("RxCUI:"))
    print(f"  resolving {len(ids)} RxCUI terms against RxNav")
    for curie in ids:
        url = f"https://rxnav.nlm.nih.gov/REST/rxcui/{curie.split(':')[1]}.json"
        try:
            with urllib.request.urlopen(url, timeout=15) as response:  # noqa: S310
                name = json.load(response).get("idGroup", {}).get("name")
        except Exception:  # noqa: BLE001
            name = None
        if name:
            terms[curie] = {
                "id": curie, "label": name, "description": None,
                "synonyms": [], "parents": [], "children": [],
                "child_labels": {}, "label_source": "rxnav",
            }
        time.sleep(0.05)
    return terms


def load_corpus(output_dir):
    """Count corpus participants per condition concept, per study."""
    counts = {}
    for study, prefix in (("study_one", "SYNTH1"), ("study_two", "SYNTH2")):
        path = output_dir / study / "mapped-data" / f"{prefix}-Condition--data.jsonl"
        if not path.exists():
            print(f"  ! no corpus at {path}, skipping")
            continue
        label = "Example Study One" if study == "study_one" else "Example Study Two"
        with open(path) as fh:
            for line in fh:
                record = json.loads(line)
                if record.get("condition_status") != "PRESENT":
                    continue
                concept = record.get("condition_concept")
                counts.setdefault(concept, {}).setdefault(label, 0)
                counts[concept][label] += 1
    return counts


DEMOGRAPHY_LABELS = {
    "OMOP:8507": "Male",
    "OMOP:8532": "Female",
    "OMOP:8527": "White",
    "OMOP:8516": "Black or African American",
    "OMOP:8515": "Asian",
    "OMOP:8657": "American Indian or Alaska Native",
    "OMOP:38003615": "Middle Eastern or North African",
    "OMOP:8557": "Native Hawaiian or Pacific Islander",
    "OMOP:38003563": "Hispanic or Latino",
    "OMOP:38003564": "Not Hispanic or Latino",
}

# Measurements worth charting for a cohort, by observation_type.
MEASURES = {
    "OMOP:3038553": "BMI",
    "OMOP:4152194": "Systolic BP",
    "OMOP:4154790": "Diastolic BP",
    "OMOP:3007070": "HDL",
    "OMOP:3013682": "BUN",
    "OMOP:3000905": "WBC",
    "OMOP:3036277": "Height",
    "OMOP:3025315": "Weight",
}

# Units, so a chart can say what it is measuring.
MEASURE_UNITS = {
    "BMI": "kg/m²",
    "Systolic BP": "mm[Hg]",
    "Diastolic BP": "mm[Hg]",
    "HDL": "mg/dL",
    "BUN": "mg/dL",
    "WBC": "10³/µL",
    "Height": "cm",
    "Weight": "kg",
}


def load_participants(output_dir):
    """Join demography, conditions and a few measures into one row per participant.

    This is what makes a cohort chartable: pick a concept, keep the participants
    who have it, and the demographic and clinical breakdowns follow.
    """
    people = {}

    for study, prefix in (("study_one", "SYNTH1"), ("study_two", "SYNTH2")):
        base = output_dir / study / "mapped-data"
        label = "Example Study One" if study == "study_one" else "Example Study Two"
        if not (base / f"{prefix}-Demography--data.jsonl").exists():
            print(f"  ! no corpus for {study}, skipping")
            continue

        def read(kind):
            path = base / f"{prefix}-{kind}--data.jsonl"
            with open(path) as fh:
                for line in fh:
                    yield json.loads(line)

        for row in read("Demography"):
            pid = row["associated_participant"]
            races = row.get("race") or []
            people[pid] = {
                "id": pid[:8],
                "study": label,
                "sex": DEMOGRAPHY_LABELS.get(row.get("sex"), "Unknown"),
                "race": DEMOGRAPHY_LABELS.get(
                    races[0] if races else None, "Unknown"
                ),
                "ethnicity": DEMOGRAPHY_LABELS.get(row.get("ethnicity"), "Unknown"),
                "concepts": [],
                "measures": {},
            }

        for row in read("Condition"):
            pid = row.get("associated_participant")
            if row.get("condition_status") == "PRESENT" and pid in people:
                people[pid]["concepts"].append(row["condition_concept"])

        # One value per measure per participant is enough to chart a distribution.
        def record(row):
            pid = row.get("associated_participant")
            measure = MEASURES.get(row.get("observation_type"))
            if not measure or pid not in people:
                return
            value = (row.get("value_quantity") or {}).get("value_decimal")
            if value is not None and measure not in people[pid]["measures"]:
                people[pid]["measures"][measure] = round(value, 1)

        for row in read("MeasurementObservation"):
            record(row)

        # Blood pressure is modelled as ARIC records it: systolic and diastolic
        # are two observations nested inside one set, so they never appear in the
        # flat MeasurementObservation file.
        for row in read("MeasurementObservationSet"):
            for observation in row.get("observations") or []:
                record(observation)

    for person in people.values():
        person["concepts"] = sorted(set(person["concepts"]))
    return list(people.values())


# VarLib slot names are internal shorthand. They should never reach a user, so
# every concept gets a display label — from the knowledge graph where a term
# resolves, and otherwise by expanding the abbreviations the team writes in.
ABBREVIATIONS = {
    "hist": "history of", "fam": "family history of", "tak": "taking",
    "bdy": "body", "hgt": "height", "wgt": "weight", "hrt": "heart",
    "hrtdis": "heart disease", "hrtfail": "heart failure", "dis": "disease",
    "bld": "blood", "urin": "urine", "urine": "urine", "lvl": "level",
    "edu": "education", "chol": "cholesterol", "gluc": "glucose",
    "creat": "creatinine", "hemo": "hemoglobin", "hemat": "hematocrit",
    "cac": "coronary artery calcium", "imt": "intima-media thickness",
    "sten": "stenosis", "mi": "myocardial infarction",
    "my": "myocardial", "inf": "infarction", "cvd": "cardiovascular disease",
    "chd": "coronary heart disease", "pad": "peripheral artery disease",
    "cor": "coronary", "angio": "angiography", "bypg": "bypass graft",
    "art": "artery", "ven": "venous", "thromb": "thrombosis",
    "trt": "treatment", "hyperten": "hypertension", "diab": "diabetes",
    "med": "medication", "meds": "medications", "smok": "smoking",
    "cig": "cigarette", "serving": "servings", "vege": "vegetable",
    "circ": "circumference", "rt": "rate", "press": "pressure",
    "art_press": "arterial pressure", "spirometry": "spirometry",
    "calchanblk": "calcium channel blockers", "betablk": "beta blockers",
    "aceinhib": "ACE inhibitors", "diuret": "diuretics",
    "statin": "statins", "nstat": "non-statin", "orlhypoag": "oral hypoglycaemics",
    "vasodil": "vasodilators", "alphablk": "alpha blockers",
    "adrenergics": "adrenergics", "cenactag": "centrally acting agents",
    "aldorecepblk": "aldosterone receptor blockers",
    "angiorecepblk": "angiotensin receptor blockers",
    "antihypertensives": "antihypertensives", "steroid": "steroids",
    "cort": "corticosteroid", "resp": "respiratory", "slp": "sleep",
    "ap": "apnoea", "isch": "ischaemic", "atk": "attack",
    "valv": "valvular", "pacem": "pacemaker", "stat": "status",
    "ct": "count", "pct": "percent", "ncnc_bld": "count in blood",
    "rdbld": "red blood", "whtbld": "white blood", "lympho": "lymphocyte",
    "neutro": "neutrophil", "fast": "fasting", "tot": "total",
    "triglyc": "triglycerides", "albumin": "albumin", "bilirubin": "bilirubin",
    "con": "conjugated", "cysc": "cystatin C", "fibrin": "fibrinogen",
    "factor": "factor", "willeb": "von Willebrand", "fac": "factor",
    "lppla2": "Lp-PLA2", "act": "activity", "mass": "mass",
    "isoprostane_8_epi_pgf2a": "8-epi-PGF2a isoprostane",
    "apnea_hypop_index": "apnoea-hypopnoea index",
}


def expand(name):
    """Turn a slot shorthand into something readable."""
    if name in ABBREVIATIONS:
        return ABBREVIATIONS[name].capitalize()
    words = [ABBREVIATIONS.get(part, part) for part in name.split("_")]
    text = " ".join(words).replace("_", " ").strip()
    return text[:1].upper() + text[1:]


QUALIFIERS = {
    "hist": "History of",
    "fam": "Family history of",
    "tak": "Taking",
}


def add_labels(concepts, terms):
    """Give every concept a human label, resolved from its CURIEs where possible.

    History and family-history variables are a disease term combined with a
    status, so the ontology label alone would read as a current diagnosis. The
    qualifier is restored from the slot's prefix.
    """
    resolved = 0
    for concept in concepts:
        label = None
        # Medication variables ask about a drug *class*. RxCUI names a specific
        # ingredient and ATC names the class but does not resolve publicly, so
        # the expanded shorthand is the most accurate option available.
        if concept["name"].startswith("tak_"):
            concept["label"] = expand(concept["name"])
            continue
        for curie in concept["mappings"]:
            term = terms.get(curie)
            if term and term.get("label_source") in ("monarch", "rxnav") and term.get("label"):
                label = term["label"]
                resolved += 1
                break

        if label:
            qualifier = QUALIFIERS.get(concept["name"].split("_")[0])
            if qualifier:
                label = f"{qualifier} {label[:1].lower()}{label[1:]}"
        else:
            label = expand(concept["name"])

        concept["label"] = label.strip()
        concept["label"] = concept["label"][:1].upper() + concept["label"][1:]
    return resolved


def fill_gaps(concepts, terms, corpus):
    """Fill what the real sources cannot supply, deterministically.

    Two gaps. Monarch carries MONDO, HP and OBA but not OMOP, ATC or RxCUI, so
    roughly half the mappings have no label — those borrow the title of the
    VarLib concept that maps to them, which is real text rather than invention.

    The larger gap is participants: the synthetic corpus covers ten concepts and
    VarLib describes 182, so almost every concept would read as zero. Counts are
    synthesized for the rest, scaled by how many studies contribute the concept.
    They are marked `illustrative` so the UI can say so — they describe nothing
    real and should never be quoted.
    """
    rng = random.Random(20260816)

    labelled_by = {}
    for concept in concepts:
        for curie in concept["mappings"]:
            if curie in terms or curie in labelled_by:
                continue
            labelled_by[curie] = {
                "id": curie,
                "label": concept["title"],
                "description": concept["description"],
                "synonyms": [],
                "parents": [],
                "children": [],
                "child_labels": {},
                "label_source": "varlib",
            }
    for term in terms.values():
        term.setdefault("label_source", "monarch")
    terms.update(labelled_by)

    illustrative = set()
    for concept in concepts:
        present = [c for c in concept["mappings"] if c in corpus]
        if present:
            continue
        if not concept["studies"]:
            continue
        # Concepts collected by more studies plausibly reach more participants.
        counts = {}
        for study in concept["studies"]:
            counts[study] = rng.randint(40, 460)
        key = concept["mappings"][0] if concept["mappings"] else concept["name"]
        corpus[key] = counts
        illustrative.add(key)

    return sorted(illustrative)


def main():
    """Build demo/data.json."""
    here = Path(__file__).parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--varlib",
        type=Path,
        required=True,
        help="BDC-VarLib LinkML schema, docs/schema/bdc_varlib.yaml in that repo",
    )
    parser.add_argument(
        "--corpus",
        type=Path,
        required=True,
        help="synthetic corpus output directory, holding study_one/ and study_two/",
    )
    # Written straight into the app's public directory: it is the only consumer,
    # and a second copy under demo/ would just be 300KB of duplicate in git.
    parser.add_argument(
        "--curated", type=Path, default=here / "curated_edges.yaml"
    )
    parser.add_argument(
        "--out", type=Path, default=here.parent / "ui" / "public" / "explore-data.json"
    )
    args = parser.parse_args()

    print("VarLib:")
    concepts = load_varlib(args.varlib)
    print(f"  {len(concepts)} concepts across "
          f"{len({c['category'] for c in concepts})} categories")

    curies = {m for c in concepts for m in c["mappings"]}
    print("Monarch:")
    terms = enrich(curies)
    terms.update(enrich_rxcui(curies))
    print(f"  {len(terms)} resolved of {len(curies)} mapped terms")
    edges = harvest_edges(curies)

    print("Curated edges:")
    for subject, found in curated_edges(args.curated, curies).items():
        edges.setdefault(subject, []).extend(found)
    edges, coverage = keep_landing(edges, curies)

    print("Corpus:")
    corpus = load_corpus(args.corpus)
    print(f"  {len(corpus)} concepts present in participant data")
    participants = load_participants(args.corpus)
    print(f"  {len(participants)} participants with demographics and measures")

    illustrative = fill_gaps(concepts, terms, corpus)
    from_kg = add_labels(concepts, terms)
    print(f"  {from_kg} concepts labelled from the KG, "
          f"{len(concepts) - from_kg} from expanded shorthand")
    print(f"  {len(illustrative)} concepts given illustrative counts")
    print(f"  {sum(1 for t in terms.values() if t['label_source'] == 'varlib')}"
          f" terms labelled from VarLib (not in the KG)")

    payload = {
        "concepts": concepts,
        "terms": terms,
        "corpus": corpus,
        "participants": participants,
        "illustrative": illustrative,
        "studies": sorted({s for c in concepts for s in c["studies"]}),
        "measure_units": MEASURE_UNITS,
        "edges": edges,
        "kg_coverage": coverage,
    }
    args.out.write_text(json.dumps(payload, separators=(",", ":")))
    print(f"\n{args.out} — {args.out.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
