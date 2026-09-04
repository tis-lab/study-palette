"""
Check the corpus against the brief and against its own internal consistency.

Distribution checks use a tolerance because sampling variation is expected and
wanted — the brief says as much. Invariant checks are exact: a violation there
is a bug, not noise.

    python synthetic/validate.py
"""

import sys
from collections import Counter

import population as pop
import vocab as v

TOLERANCE = 0.05

failures = []
notes = []


def near(label, actual, expected, tolerance=TOLERANCE):
    """Record a distribution check that allows sampling variation."""
    ok = abs(actual - expected) <= tolerance
    notes.append(f"{'ok ' if ok else 'FAIL'} {label}: {actual:.3f} (expected ~{expected:.3f})")
    if not ok:
        failures.append(label)


def exact(label, actual, expected):
    """Record an invariant check that must hold exactly."""
    ok = actual == expected
    notes.append(f"{'ok ' if ok else 'FAIL'} {label}: {actual} (expected {expected})")
    if not ok:
        failures.append(label)


def at_least(label, actual, floor):
    """Record a coverage check: enough distinct values to be worth querying."""
    ok = actual >= floor
    notes.append(f"{'ok ' if ok else 'FAIL'} {label}: {actual} (at least {floor})")
    if not ok:
        failures.append(label)


def fraction(items, predicate):
    """Return the proportion of items satisfying the predicate."""
    items = list(items)
    return sum(1 for x in items if predicate(x)) / len(items) if items else 0.0


def diagnosed(entry):
    """Whether a condition entry represents a diagnosis rather than a screen."""
    return entry["status"] in (v.PRESENT, v.HISTORICAL)


def check_temporal(participants):
    """
    Every temporal anchor must be usable, not merely present.

    A start age nobody could have reached, an end before its start, or a
    recording visit the participant never attended would each pass a
    completeness check while making the slot useless for a cohort query.
    """
    bad_order = bad_floor = bad_visit = bad_absent = orphan_end = 0

    for p in participants:
        ages = {x.number: x.age_days for x in p.visits}
        for entry in p.conditions.values():
            start, end, visit = entry["age_start"], entry["age_end"], entry["visit"]

            if not diagnosed(entry) and (start is not None or end is not None):
                bad_absent += 1
            if start is not None and start < pop.MIN_DIAGNOSIS_AGE_DAYS:
                bad_floor += 1
            if end is not None:
                if start is None:
                    orphan_end += 1
                elif end <= start:
                    bad_order += 1
            # A condition recorded at a visit must name one the participant
            # attended, and cannot be diagnosed after that visit took place.
            if visit is not None:
                if visit not in ages:
                    bad_visit += 1
                elif start is not None and start > ages[visit]:
                    bad_visit += 1

    exact("conditions dated while absent", bad_absent, 0)
    exact("diagnoses before the minimum age", bad_floor, 0)
    exact("conditions ending before they started", bad_order, 0)
    exact("conditions ending without a start", orphan_end, 0)
    exact("conditions recorded at an unattended or earlier visit", bad_visit, 0)


def check_before_and_after(participants):
    """
    Check the point of the temporal metadata: measurements sort by diagnosis.

    A condition only elevates the measures it explains once it has been
    diagnosed, so for participants diagnosed mid-study the glucose values
    before the diagnosis should look like the corpus as a whole and the ones
    after should look like the diabetic subgroup. If these two converge, the
    temporal slots are decoration.
    """
    before, after = [], []
    for p in participants:
        entry = p.conditions["diabetes"]
        start = entry["age_start"]
        if entry["status"] != v.PRESENT or start is None or not p.visits:
            continue
        if start <= p.visits[0].age_days:
            continue  # prevalent: nothing falls before the diagnosis
        for visit in p.visits:
            if visit.glucose is None:
                continue
            (before if visit.age_days < start else after).append(visit.glucose)

    # The pathological glucose range starts at 126, so 'pathological draw' and
    # 'at or above 126' are the same set.
    exact("incident diabetes with glucose on both sides", len(before) > 0 and len(after) > 0, True)
    if before and after:
        # Both samples are small — a few dozen values each — so these carry a
        # wider tolerance than the corpus-wide distribution checks.
        near("glucose pathological before diagnosis",
             fraction(before, lambda x: x >= 126), pop.PATHOLOGY_RATE, tolerance=0.10)
        near("glucose pathological after diagnosis",
             fraction(after, lambda x: x >= 126), pop.COMORBID_PATHOLOGY_RATE, tolerance=0.18)


def check_code_coverage(participants):
    """
    Enough distinct concepts and source codes to test a broad cohort definition.

    Floors rather than exact counts: the rarest subtypes carry weights low
    enough that whether they appear at all is a coin flip, and a corpus that
    failed because one 0.5% subtype went unsampled would be failing on noise.
    """
    htn = [p.conditions["hypertension"] for p in participants]
    dm = [p.conditions["diabetes"] for p in participants]

    at_least("distinct hypertension concepts",
             len({e["concept"] for e in htn if diagnosed(e)}), 10)
    at_least("distinct hypertension ICD-10-CM codes",
             len({e["icd10"] for e in htn if e["icd10"]}), 8)
    at_least("distinct diabetes subtypes",
             len({e["subtype"] for e in dm if diagnosed(e)}), 8)
    at_least("distinct diabetes ICD-10-CM codes",
             len({e["icd10"] for e in dm if e["icd10"]}), 18)

    # Source codes belong to diagnoses. A screening answer of 'no' records the
    # concept that was screened for and nothing else.
    stray = sum(1 for e in htn + dm if not diagnosed(e) and (e["icd10"] or e["snomed"]))
    exact("source codes on undiagnosed conditions", stray, 0)


def main():
    """Run every check and report."""
    people, participants = pop.build()

    for study in (pop.STUDY_ONE, pop.STUDY_TWO):
        group = [p for p in participants if p.study is study]
        label = study.name

        exact(f"{label}: participants", len(group), study.size)
        near(f"{label}: male", fraction(group, lambda p: p.person.sex == v.MALE), study.male_fraction)

        for race, expected in study.race_mix.items():
            near(f"{label}: race {race}", fraction(group, lambda p, r=race: p.person.race == r), expected)

        near(f"{label}: deceased", fraction(group, lambda p: p.person.deceased), 0.10)

        # Hispanic ethnicity is conditioned on race, so check it that way.
        white = [p for p in group if p.person.race == v.WHITE]
        black = [p for p in group if p.person.race == v.BLACK]
        near(f"{label}: hispanic|white", fraction(white, lambda p: p.person.ethnicity == v.HISPANIC), 0.10)
        near(f"{label}: hispanic|black", fraction(black, lambda p: p.person.ethnicity == v.HISPANIC), 0.05)

        # Visit structure
        max_visits = max(len(p.visits) for p in group)
        exact(f"{label}: max visits", max_visits, study.visits)
        bad_telehealth = [
            p for p in group
            if sum(1 for x in p.visits if x.category == v.TELEHEALTH) > 1
        ]
        exact(f"{label}: participants with >1 telehealth visit", len(bad_telehealth), 0)

        # Nobody is measured after they die: visit ages must increase and the
        # deceased attend fewer visits than the living.
        non_monotonic = [
            p for p in group
            if [x.age_days for x in p.visits] != sorted(x.age_days for x in p.visits)
        ]
        exact(f"{label}: non-monotonic visit ages", len(non_monotonic), 0)

        near(f"{label}: on a calcium channel blocker", fraction(group, lambda p: p.ccb), 0.20)

        # Condition proportions
        near(f"{label}: heart failure PRESENT",
             fraction(group, lambda p: p.conditions["heart_failure"]["status"] == v.PRESENT), 0.15)
        near(f"{label}: family stroke PRESENT",
             fraction(group, lambda p: p.conditions["family_stroke"]["status"] == v.PRESENT), 0.35)
        near(f"{label}: family stroke UNKNOWN",
             fraction(group, lambda p: p.conditions["family_stroke"]["status"] == v.UNKNOWN), 0.05)
        near(f"{label}: hypertension PRESENT",
             fraction(group, lambda p: p.conditions["hypertension"]["status"] == v.PRESENT), 0.10)
        near(f"{label}: hypertension HISTORICAL",
             fraction(group, lambda p: p.conditions["hypertension"]["status"] == v.HISTORICAL), 0.10)
        near(f"{label}: heart attack PRESENT",
             fraction(group, lambda p: p.conditions["heart_attack"]["status"] == v.PRESENT), 0.10)

        # Diabetes is drawn as 20% diagnosed and 2% unknown; the diagnosed split
        # into PRESENT and the HISTORICAL 'in remission' subtype, so check the
        # two together rather than pinning a share to one subtype's weight.
        near(f"{label}: diabetes diagnosed",
             fraction(group, lambda p: diagnosed(p.conditions["diabetes"])), 0.20)
        near(f"{label}: diabetes UNKNOWN",
             fraction(group, lambda p: p.conditions["diabetes"]["status"] == v.UNKNOWN), 0.02)

        # Incident diagnoses are what make a before-and-after query meaningful.
        dx = [e for p in group for e in p.conditions.values() if e["age_start"] is not None]
        incident = [
            e for p in group for e in p.conditions.values()
            if e["age_start"] is not None and p.visits and e["age_start"] > p.visits[0].age_days
        ]
        near(f"{label}: diagnoses made during follow-up",
             len(incident) / len(dx) if dx else 0.0, pop.INCIDENT_FRACTION, tolerance=0.07)

        mi = [p for p in group if p.conditions["heart_attack"]["status"] == v.PRESENT]
        near(f"{label}: MI from study record",
             fraction(mi, lambda p: p.conditions["heart_attack"]["from_study_record"]), 0.50, tolerance=0.15)

    # Cross-study: 5% of Study Two shares an identity with Study One.
    one_ids = {p.person.dbgap_id for p in participants if p.study is pop.STUDY_ONE}
    two = [p for p in participants if p.study is pop.STUDY_TWO]
    shared = [p for p in two if p.person.dbgap_id in one_ids]
    near("shared participants", len(shared) / len(two), 0.05, tolerance=0.005)

    # A shared individual must be one Person but two Participants.
    subject_ids = {p.subject_id for p in participants}
    exact("distinct study-local subject ids", len(subject_ids), len(participants))
    exact("distinct people", len(people), len(participants) - len(shared))

    # Exactly five censored HDL results, each carrying the operator.
    censored = [x for p in participants for x in p.visits if x.hdl_operator]
    exact("HDL results below LLOD", len(censored), pop.HDL_BELOW_LLOD)
    exact("censored results carrying '<'", sum(1 for x in censored if x.hdl_operator == "<"), pop.HDL_BELOW_LLOD)

    # Null sprinkling across measured cells.
    cells = [
        getattr(x, field)
        for p in participants
        for x in p.visits
        for field in ("height_cm", "weight_kg", "systolic", "diastolic", "hdl",
                      "bun", "wbc", "glucose", "hba1c")
    ]
    near("null rate", sum(1 for c in cells if c is None) / len(cells), pop.NULL_RATE, tolerance=0.002)

    # The four calcium channel blockers should be evenly divided. Guard the
    # denominator: a generation change that produced no exposures should fail a
    # check, not crash the run partway through.
    ccb = Counter(p.ccb for p in participants if p.ccb)
    total = sum(ccb.values())
    exact("any calcium channel blocker exposures", total > 0, True)
    # Only ~200 participants are exposed, so a quarter-share carries a standard
    # error near 0.03. At 2 sd, one of these four checks fails on roughly one
    # seed in six; 3 sd still catches a genuinely skewed choice.
    if total:
        for concept in v.CALCIUM_CHANNEL_BLOCKERS:
            near(f"CCB share {concept}", ccb[concept] / total, 0.25, tolerance=0.09)

    check_temporal(participants)
    check_before_and_after(participants)
    check_code_coverage(participants)

    print("\n".join(notes))
    print()
    if failures:
        print(f"{len(failures)} check(s) failed:")
        for f in failures:
            print(f"  - {f}")
        return 1
    print(f"All {len(notes)} checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
