# ruff: noqa: S311
"""The population model.

Builds people, their study participation, visits, measurements, conditions and
drug exposures. Emits nothing — see generate.py for the dbGaP-style writers.

Everything is deterministic given SEED, so the corpus need not be committed:
the same seed reproduces it byte for byte.
"""

import random
from dataclasses import dataclass, field

import vocab as v

SEED = 20260807

# 0.5% of individual cell values are nulled, per the brief.
NULL_RATE = 0.005
# 10% of measurements land outside the normal range.
PATHOLOGY_RATE = 0.10
# Exactly this many HDL results fall below the assay's lower limit.
HDL_BELOW_LLOD = 5

HDL_LLOD = 5.0
HDL_ULOD = 150.0


@dataclass
class Study:
    """A synthetic cohort. Accessions are fictional but well-formed."""

    name: str
    phs: str
    size: int
    visits: int
    male_fraction: float
    race_mix: dict
    bmi_categorical: bool
    tables: dict


STUDY_ONE = Study(
    name="Example Study One",
    phs="phs000101",
    size=500,
    visits=3,
    male_fraction=0.54,
    race_mix={v.WHITE: 0.50, v.BLACK: 0.30, v.ASIAN: 0.10, v.AMERICAN_INDIAN: 0.10},
    bmi_categorical=False,
    tables={
        "subject": "pht000111",
        "visit": "pht000112",
        "clinical": "pht000113",
        "labs": "pht000114",
        "conditions": "pht000115",
        "meds": "pht000116",
    },
)

STUDY_TWO = Study(
    name="Example Study Two",
    phs="phs000102",
    size=500,
    visits=5,
    male_fraction=0.46,
    race_mix={
        v.WHITE: 0.60,
        v.BLACK: 0.20,
        v.MIDDLE_EASTERN: 0.10,
        v.NATIVE_HAWAIIAN: 0.10,
    },
    bmi_categorical=True,
    tables={
        "subject": "pht000121",
        "visit": "pht000122",
        "clinical": "pht000123",
        "labs": "pht000124",
        "conditions": "pht000125",
        "meds": "pht000126",
    },
)


@dataclass
class Person:
    """An individual. Shared across studies when they enrol in both."""

    dbgap_id: int
    sex: str
    race: str
    ethnicity: str
    deceased: bool
    death_cause: str | None
    baseline_age: int


@dataclass
class Participant:
    """A person's enrolment in one study."""

    person: Person
    subject_id: int
    study: Study
    visits: list = field(default_factory=list)
    conditions: dict = field(default_factory=dict)
    ccb: str | None = None


@dataclass
class Visit:
    number: int
    category: str
    age_days: int
    height_cm: float | None = None
    weight_kg: float | None = None
    bmi: float | None = None
    bmi_category: str | None = None
    systolic: float | None = None
    diastolic: float | None = None
    hdl: float | None = None
    hdl_operator: str | None = None
    bun: float | None = None
    wbc: float | None = None


def _weighted(rng, mapping):
    return rng.choices(list(mapping), weights=list(mapping.values()), k=1)[0]


def _maybe_null(rng, value):
    """Sprinkle nulls at NULL_RATE, per the brief."""
    return None if rng.random() < NULL_RATE else value


def _measure(rng, normal, pathological):
    """Draw from the normal range, or the pathological one PATHOLOGY_RATE of the time."""
    lo, hi = pathological if rng.random() < PATHOLOGY_RATE else normal
    return round(rng.uniform(lo, hi), 1)


def _make_person(rng, dbgap_id, study):
    sex = v.MALE if rng.random() < study.male_fraction else v.FEMALE
    race = _weighted(rng, study.race_mix)

    # 10% of white and 5% of black participants are Hispanic.
    hispanic_chance = {v.WHITE: 0.10, v.BLACK: 0.05}.get(race, 0.0)
    ethnicity = v.HISPANIC if rng.random() < hispanic_chance else v.NOT_HISPANIC

    deceased = rng.random() < 0.10
    return Person(
        dbgap_id=dbgap_id,
        sex=sex,
        race=race,
        ethnicity=ethnicity,
        deceased=deceased,
        death_cause=rng.choice(v.TOP_DEATH_CAUSES) if deceased else None,
        baseline_age=rng.randint(45, 78),
    )


def _make_visits(rng, study, person):
    """One TELEHEALTH visit per participant; the rest are site visits.

    Deceased participants stop attending: visits are truncated at a random
    point so nobody is measured after they die.
    """
    telehealth_at = rng.randrange(study.visits)
    count = study.visits
    if person.deceased:
        count = rng.randint(1, study.visits)

    visits = []
    for i in range(count):
        category = v.TELEHEALTH if i == telehealth_at else v.STUDY_SITE_VISIT
        visits.append(
            Visit(
                number=i + 1,
                category=category,
                age_days=(person.baseline_age + i * 2) * 365,
            )
        )
    return visits


def _fill_measurements(rng, study, visit):
    visit.height_cm = _maybe_null(rng, _measure(rng, (150, 190), (135, 205)))
    visit.weight_kg = _maybe_null(rng, _measure(rng, (55, 95), (38, 145)))

    bmi = _measure(rng, (18.5, 24.9), (25.0, 41.0))
    if study.bmi_categorical:
        if bmi < 18.5:
            category = "underweight"
        elif bmi < 25.0:
            category = "normal weight"
        else:
            category = "over weight"
        visit.bmi_category = _maybe_null(rng, category)
    else:
        visit.bmi = _maybe_null(rng, bmi)

    visit.systolic = _maybe_null(rng, _measure(rng, (105, 132), (141, 178)))
    visit.diastolic = _maybe_null(rng, _measure(rng, (68, 84), (91, 108)))
    visit.hdl = _maybe_null(rng, _measure(rng, (40, 72), (22, 39)))
    visit.bun = _maybe_null(rng, _measure(rng, (7, 20), (21, 46)))
    visit.wbc = _maybe_null(rng, _measure(rng, (4.5, 11.0), (1.8, 19.5)))


def _make_conditions(rng):
    """Condition statuses follow the proportions in the brief."""
    conditions = {}

    r = rng.random()
    conditions["heart_failure"] = {
        "status": v.PRESENT if r < 0.15 else v.ABSENT,
        "concept": rng.choice(v.HEART_FAILURE),
    }

    r = rng.random()
    if r < 0.35:
        status = v.PRESENT
    elif r < 0.95:
        status = v.ABSENT
    else:
        status = v.UNKNOWN
    conditions["family_stroke"] = {
        "status": status,
        "concept": rng.choice(v.STROKE),
        "relationship": rng.choice([v.NATURAL_FATHER, v.NATURAL_MOTHER]),
    }

    r = rng.random()
    if r < 0.10:
        status = v.PRESENT
    elif r < 0.20:
        status = v.HISTORICAL
    else:
        status = v.ABSENT
    conditions["hypertension"] = {"status": status, "concept": v.HYPERTENSION}

    present = rng.random() < 0.10
    conditions["heart_attack"] = {
        "status": v.PRESENT if present else v.ABSENT,
        "concept": rng.choice(v.HEART_ATTACK),
        # Half of those with an MI have it from the study record, with an ECG
        # in evidence; the rest self-report.
        "from_study_record": present and rng.random() < 0.5,
    }
    return conditions


def build():
    """Build both cohorts, with 5% of Study Two's participants shared with One."""
    rng = random.Random(SEED)

    people = {}
    participants = []

    next_dbgap = 900001
    next_subject = {STUDY_ONE.name: 100001, STUDY_TWO.name: 200001}

    for study in (STUDY_ONE, STUDY_TWO):
        shared = []
        if study is STUDY_TWO:
            one = [p for p in participants if p.study is STUDY_ONE]
            shared = rng.sample(one, k=int(round(study.size * 0.05)))

        for i in range(study.size):
            if i < len(shared):
                # Same individual, so the same dbGaP_Subject_ID and therefore
                # the same Person after harmonisation — but a new study-local
                # SUBJECT_ID, and therefore a distinct Participant.
                person = shared[i].person
            else:
                person = _make_person(rng, next_dbgap, study)
                people[next_dbgap] = person
                next_dbgap += 1

            participant = Participant(
                person=person,
                subject_id=next_subject[study.name],
                study=study,
            )
            next_subject[study.name] += 1

            participant.visits = _make_visits(rng, study, person)
            for visit in participant.visits:
                _fill_measurements(rng, study, visit)

            participant.conditions = _make_conditions(rng)
            if rng.random() < 0.20:
                participant.ccb = rng.choice(v.CALCIUM_CHANNEL_BLOCKERS)

            participants.append(participant)

    _apply_hdl_limits(rng, participants)
    return people, participants


def _apply_hdl_limits(rng, participants):
    """Force exactly HDL_BELOW_LLOD results below the assay's lower limit.

    These carry a '<' operator on the Quantity rather than a plain value, which
    is how BDCHM represents a censored result.
    """
    candidates = [
        (p, visit)
        for p in participants
        for visit in p.visits
        if visit.hdl is not None
    ]
    for _, visit in rng.sample(candidates, k=HDL_BELOW_LLOD):
        visit.hdl = HDL_LLOD
        visit.hdl_operator = "<"
