# ruff: noqa: S311
"""
The population model.

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
# Measurements co-occur with the conditions that explain them, so that selecting
# a cohort produces a distribution that differs from the corpus as a whole.
# Illustrative: the direction of each association is real, the strength is not
# taken from any literature and must not be read as a finding.
COMORBID_PATHOLOGY_RATE = 0.55
COMORBIDITY = {
    "heart_failure": ("systolic", "diastolic", "bmi", "hdl", "bun"),
    "hypertension": ("systolic", "diastolic"),
    "heart_attack": ("systolic", "hdl"),
    "diabetes": ("glucose", "hba1c", "bmi"),
}
# Exactly this many HDL results fall below the assay's lower limit.
HDL_BELOW_LLOD = 5

# A quarter of the conditions a participant ever has are diagnosed during
# follow-up rather than before enrolment. Without incident cases there is
# nothing for a measurement to fall before or after, and the temporal slots
# carry no query value — a corpus where every diagnosis predates every visit
# answers 'measurements after diagnosis' with the whole cohort.
INCIDENT_FRACTION = 0.25
# A prevalent condition starts this many years before the first visit.
PREVALENT_YEARS = (5, 20)
# Nobody is diagnosed before this age, however far back the draw reaches.
MIN_DIAGNOSIS_AGE_DAYS = 18 * 365

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
    """One study visit and the measurements taken at it."""

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
    glucose: float | None = None
    hba1c: float | None = None


def _weighted(rng, mapping):
    return rng.choices(list(mapping), weights=list(mapping.values()), k=1)[0]


def _maybe_null(rng, value):
    """Sprinkle nulls at NULL_RATE, per the brief."""
    return None if rng.random() < NULL_RATE else value


def _measure(rng, normal, pathological, rate=PATHOLOGY_RATE):
    """Draw from the normal range, or the pathological one `rate` of the time."""
    lo, hi = pathological if rng.random() < rate else normal
    return round(rng.uniform(lo, hi), 1)


def _elevated(conditions, age_days):
    """
    Which measures this participant's conditions make abnormal at this age.

    A condition only elevates measurements taken while it is active: at or
    after diagnosis, and not after it resolved. That is what makes 'glucose
    before diagnosis' a different distribution from 'glucose after it', rather
    than the same elevated draw applied to every visit a participant attended.
    """
    if not conditions:
        return frozenset()
    measures = set()
    for name, linked in COMORBIDITY.items():
        entry = conditions.get(name)
        if not entry or entry["status"] not in (v.PRESENT, v.HISTORICAL):
            continue
        start, end = entry["age_start"], entry["age_end"]
        if start is None or age_days < start:
            continue
        if end is not None and age_days > end:
            continue
        measures.update(linked)
    return frozenset(measures)


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
    """
    One TELEHEALTH visit per participant; the rest are site visits.

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


def _fill_measurements(rng, study, visit, conditions=None):
    elevated = _elevated(conditions, visit.age_days)

    def rate(measure):
        return COMORBID_PATHOLOGY_RATE if measure in elevated else PATHOLOGY_RATE

    visit.height_cm = _maybe_null(rng, _measure(rng, (150, 190), (135, 205)))
    visit.weight_kg = _maybe_null(rng, _measure(rng, (55, 95), (38, 145)))

    bmi = _measure(rng, (18.5, 24.9), (25.0, 41.0), rate("bmi"))
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

    sys_rate, dia_rate = rate("systolic"), rate("diastolic")
    visit.systolic = _maybe_null(rng, _measure(rng, (105, 132), (141, 178), sys_rate))
    visit.diastolic = _maybe_null(rng, _measure(rng, (68, 84), (91, 108), dia_rate))
    visit.hdl = _maybe_null(rng, _measure(rng, (40, 72), (22, 39), rate("hdl")))
    visit.bun = _maybe_null(rng, _measure(rng, (7, 20), (21, 46), rate("bun")))
    visit.wbc = _maybe_null(rng, _measure(rng, (4.5, 11.0), (1.8, 19.5), rate("wbc")))
    # Fasting glucose and HbA1c step straight from normal to diabetic; the
    # corpus does not model the prediabetic band between them, in keeping with
    # every other measure here being drawn from one range or the other.
    visit.glucose = _maybe_null(rng, _measure(rng, (70, 99), (126, 260), rate("glucose")))
    visit.hba1c = _maybe_null(rng, _measure(rng, (4.8, 5.6), (6.5, 11.5), rate("hba1c")))


def _diagnosis(rng, visits, resolves=False):
    """
    Date a diagnosis: when it started, when it ended, and which visit recorded it.

    Prevalent conditions start before enrolment and are recorded at the first
    visit — the common case, and the only one the corpus had before. Incident
    ones start between two visits and are recorded at the next, which is what
    puts some of a participant's measurements before the diagnosis and some
    after.

    Ages are in days, matching BDCHM's age_at_condition_start and _end.
    """
    if not visits:
        return None, None, None

    if len(visits) > 1 and rng.random() < INCIDENT_FRACTION:
        i = rng.randrange(1, len(visits))
        start = rng.randint(visits[i - 1].age_days + 1, visits[i].age_days)
        recorded = visits[i]
    else:
        lo, hi = PREVALENT_YEARS
        start = visits[0].age_days - rng.randint(lo * 365, hi * 365)
        start = max(start, MIN_DIAGNOSIS_AGE_DAYS)
        recorded = visits[0]

    # A resolved condition ends somewhere between diagnosis and the last visit
    # the participant attended, so nothing resolves after they stop being seen.
    end = None
    if resolves and start < visits[-1].age_days:
        end = rng.randint(start + 1, visits[-1].age_days)
    return start, end, recorded.number


def _absent(concept, subtype=None):
    """
    Build a condition that was asked about and answered no.

    No diagnosis means no dates and no source code: a screening question
    records the concept it screened for, not a coded diagnosis.
    """
    entry = {
        "status": v.ABSENT,
        "concept": concept,
        "age_start": None,
        "age_end": None,
        "visit": None,
    }
    if subtype is not None:
        entry.update(snomed=None, icd10=None, subtype=subtype.label)
    return entry


def _make_conditions(rng, visits):
    """
    Condition statuses follow the proportions in the brief.

    Each condition the participant has carries the temporal metadata BDCHM
    provides for it — age at start, age at end where it resolved, and the visit
    that recorded it. Absent conditions carry none of the three.
    """
    conditions = {}

    r = rng.random()
    if r < 0.15:
        start, end, visit = _diagnosis(rng, visits)
        conditions["heart_failure"] = {
            "status": v.PRESENT,
            "concept": rng.choice(v.HEART_FAILURE),
            "age_start": start,
            "age_end": end,
            "visit": visit,
        }
    else:
        conditions["heart_failure"] = _absent(rng.choice(v.HEART_FAILURE))

    r = rng.random()
    if r < 0.35:
        status = v.PRESENT
    elif r < 0.95:
        status = v.ABSENT
    else:
        status = v.UNKNOWN
    # Family history is about a relative, so age_at_condition_start — defined as
    # the *participant's* age — has no meaning here. The visit that recorded the
    # answer does, and is populated.
    conditions["family_stroke"] = {
        "status": status,
        "concept": rng.choice(v.STROKE),
        "relationship": rng.choice([v.NATURAL_FATHER, v.NATURAL_MOTHER]),
        "age_start": None,
        "age_end": None,
        "visit": visits[0].number if visits else None,
    }

    conditions["hypertension"] = _make_hypertension(rng, visits)
    conditions["diabetes"] = _make_diabetes(rng, visits)

    if rng.random() < 0.10:
        start, _, visit = _diagnosis(rng, visits)
        conditions["heart_attack"] = {
            "status": v.PRESENT,
            "concept": rng.choice(v.HEART_ATTACK),
            # Half of those with an MI have it from the study record, with an
            # ECG in evidence; the rest self-report.
            "from_study_record": rng.random() < 0.5,
            "age_start": start,
            # An infarction is an event, not a state that resolves, so it has a
            # start and no end.
            "age_end": None,
            "visit": visit,
        }
    else:
        entry = _absent(rng.choice(v.HEART_ATTACK))
        entry["from_study_record"] = False
        conditions["heart_attack"] = entry

    return conditions


def _make_hypertension(rng, visits):
    """
    Hypertension, coded to a subtype from the code-set reference when diagnosed.

    HISTORICAL means resolved, so those carry an age_at_condition_end.
    """
    r = rng.random()
    if r < 0.10:
        status = v.PRESENT
    elif r < 0.20:
        status = v.HISTORICAL
    else:
        return _absent(v.HYPERTENSION_ROOT.concept, v.HYPERTENSION_ROOT)

    subtype = _weighted(rng, {s: s.weight for s in v.HYPERTENSION_SUBTYPES})
    start, end, visit = _diagnosis(rng, visits, resolves=status == v.HISTORICAL)
    return {
        "status": status,
        "concept": subtype.concept,
        "subtype": subtype.label,
        "snomed": subtype.snomed,
        "icd10": rng.choice(subtype.icd10) if subtype.icd10 else None,
        "age_start": start,
        "age_end": end,
        "visit": visit,
    }


def _make_diabetes(rng, visits):
    """
    Type 2 diabetes, coded to a subtype from the code-set reference.

    The reference gives MONDO:0005148 for nearly every T2D row and puts the
    complication detail in ICD-10-CM, so the concept is often the same across
    subtypes and the source code is what distinguishes them. 'In remission' is
    the one subtype that resolves, and is recorded HISTORICAL with an end age.
    """
    r = rng.random()
    if r < 0.02:
        entry = _absent(v.DIABETES_ROOT.concept, v.DIABETES_ROOT)
        entry["status"] = v.UNKNOWN
        return entry
    if r >= 0.22:
        return _absent(v.DIABETES_ROOT.concept, v.DIABETES_ROOT)

    subtype = _weighted(rng, {s: s.weight for s in v.DIABETES_SUBTYPES})
    remission = subtype is v.DIABETES_REMISSION
    status = v.HISTORICAL if remission else v.PRESENT
    start, end, visit = _diagnosis(rng, visits, resolves=remission)
    return {
        "status": status,
        "concept": subtype.concept,
        "subtype": subtype.label,
        "snomed": subtype.snomed,
        "icd10": rng.choice(subtype.icd10) if subtype.icd10 else None,
        "age_start": start,
        "age_end": end,
        "visit": visit,
    }


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

            # Visits, then conditions, then measurements. Conditions are dated
            # against the visit schedule, and measurements are drawn conditional
            # on which conditions were active at the visit — so an abnormal
            # result and the diagnosis explaining it co-occur, and only from the
            # diagnosis onwards.
            participant.visits = _make_visits(rng, study, person)
            participant.conditions = _make_conditions(rng, participant.visits)
            for visit in participant.visits:
                _fill_measurements(rng, study, visit, participant.conditions)

            if rng.random() < 0.20:
                participant.ccb = rng.choice(v.CALCIUM_CHANNEL_BLOCKERS)

            participants.append(participant)

    _apply_hdl_limits(rng, participants)
    return people, participants


def _apply_hdl_limits(rng, participants):
    """
    Force exactly HDL_BELOW_LLOD results below the assay's lower limit.

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
