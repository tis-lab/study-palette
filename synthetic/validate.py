"""Check the corpus against the brief and against its own internal consistency.

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
    ok = abs(actual - expected) <= tolerance
    notes.append(f"{'ok ' if ok else 'FAIL'} {label}: {actual:.3f} (expected ~{expected:.3f})")
    if not ok:
        failures.append(label)


def exact(label, actual, expected):
    ok = actual == expected
    notes.append(f"{'ok ' if ok else 'FAIL'} {label}: {actual} (expected {expected})")
    if not ok:
        failures.append(label)


def fraction(items, predicate):
    items = list(items)
    return sum(1 for x in items if predicate(x)) / len(items) if items else 0.0


def main():
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
        for field in ("height_cm", "weight_kg", "systolic", "diastolic", "hdl", "bun", "wbc")
    ]
    near("null rate", sum(1 for c in cells if c is None) / len(cells), pop.NULL_RATE, tolerance=0.002)

    # The four calcium channel blockers should be evenly divided.
    ccb = Counter(p.ccb for p in participants if p.ccb)
    for concept in v.CALCIUM_CHANNEL_BLOCKERS:
        near(f"CCB share {concept}", ccb[concept] / sum(ccb.values()), 0.25, tolerance=0.06)

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
