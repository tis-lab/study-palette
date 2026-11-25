"""
Generate per-tier example responses from exact example counts, under the disclosure policy.

Hand-written examples supply the exact counts: the overview, for every study with no criteria
applied; the T2D example, filtered to participants with a fasting glucose measurement; and its
female follow-up, which adds sex FEMALE to that filter. Each is shaped once for every (tier,
profile) pair the policy uses, and written to examples/profiles/.

The policy seeds noise from the matched participant set, and the examples have counts, not
participants. So the generator first builds one fictional roster that reproduces every count in
every example, with each filtered cohort drawn from the one it narrows. Each cell's exact count
and noise then come from a real set, and identical sets get identical noise in every file, as the
policy requires.

    python schema/generate_profile_examples.py
"""

import hashlib
import hmac
from itertools import pairwise
from pathlib import Path

import yaml

SCHEMA_DIR = Path(__file__).resolve().parent
EXAMPLES_DIR = SCHEMA_DIR / "examples"
POLICY = SCHEMA_DIR.parent / "policy" / "disclosure-policy.yaml"
OUTPUT = EXAMPLES_DIR / "profiles"
# Label -> source, outermost first. The first has no criteria and defines everyone; each later one
# adds filter terms to the one before, so its cohort is drawn from that one's.
SOURCES = {
    "overview": EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-overview.yaml",
    "t2d": EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d.yaml",
    "t2d-female": EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d-female.yaml",
}

# A placeholder, labelled so it cannot be mistaken for a real key. The policy's real key lives in
# Key Vault and is never written down.
NOISE_KEY = b"SYNTHETIC-example-noise-key"
# The examples do not split studies by consent group, so each study is one fictional group.
CONSENT_GROUP = "{study}/c1"
# The authorized example's caller is entitled to, and eligible for exact counts in, study one only.
EXAMPLE_EXACT_SCOPE = frozenset({"palette:study_one/c1"})

FACETS = ("participants", "demographics", "conditions", "procedures", "drug_exposures", "measurements")
COUNT_KEYS = {"studies", "values", "participant_count", "count_mode", "count_status", "record_count"}
# Copied from a source into every shaped response, in this order, where present.
QUERY_KEYS = ("release", "focus", "filter", "min_count", "research_studies")
ROOT = "root"
TOTAL = "*"
REPORTED, BELOW, WITHHELD = "REPORTED", "BELOW_MIN_COUNT", "WITHHELD"


class View:
    """One source example: its tree of summaries, its exact counts, and the participants it counts."""

    def __init__(self, label, path):
        """Index the source's summaries; members() needs a roster bound afterwards."""
        self.label, self.path = label, path
        self.source = yaml.safe_load(path.read_text(encoding="utf-8"))
        self.filter = list(self.source.get("filter") or [])
        self.studies = [s["research_study"] for s in self.source["studies"]]
        self.nodes, self.children, self.facet = {}, {ROOT: []}, {}
        for facet in FACETS:
            for node in self.source["summary"].get(facet) or []:
                self.children[ROOT].append(node["id"])
                self._index(node, facet)
        self.roster = None

    def _index(self, node, facet):
        self.nodes[node["id"]] = node
        self.facet[node["id"]] = facet
        self.children[node["id"]] = [v["id"] for v in node.get("values") or []]
        for value in node.get("values") or []:
            self._index(value, facet)

    def count(self, node_id, study):
        """Return the source's exact count for one study, zero where the study or summary is not listed."""
        if node_id == ROOT:
            return next(s["participant_count"] for s in self.source["studies"] if s["research_study"] == study)
        if node_id not in self.nodes:
            return 0
        listed = {c["research_study"]: c["participant_count"] for c in self.nodes[node_id].get("studies") or []}
        return listed.get(study, 0)

    def cohort(self, study):
        """Return everyone the source counts in one study: those matching every filter term, or everyone."""
        sets = self.roster.sets[study]
        return frozenset.intersection(*(sets[term] for term in self.filter)) if self.filter else sets[ROOT]

    def members(self, node_id, column):
        """Return the participants a cell counts: one study, or every study for a total."""
        studies = self.studies if column == TOTAL else [column]
        return frozenset().union(*(self.roster.sets[s][node_id] & self.cohort(s) for s in studies))

    def walk(self, node_id=ROOT):
        """Yield every (parent, children) pair in the tree, the cohort included."""
        if self.children[node_id]:
            yield node_id, self.children[node_id]
        for child in self.children[node_id]:
            yield from self.walk(child)


class Roster:
    """
    Fictional participants that reproduce every count in a chain of nested examples.

    Levels run from the unfiltered overview (level 0) inwards, each filtered example narrowing the
    one before. Numbering follows the synthetic sample: study one is 100001 onwards, study two
    200001. Each study's participants are laid out innermost cohort first, so every cohort is a
    prefix of the one it narrows, and the participants are split into segments: those in the
    innermost cohort, those in the next cohort out but not the innermost, and so on.

    A summary takes, in each segment, the difference between its counts at the two levels either
    side. Values take consecutive runs within their parent's, so a facet's values partition the
    participants with that facet recorded, and the rest are its implied "not recorded" part.
    Facets are independent of one another, so each starts from a segment's first participant.

    An example that leaves out a facet says nothing about it at that level. Inwards, the facet
    spans the cohorts it was not described for; outwards, it has no participants beyond the
    outermost example that describes it.
    """

    def __init__(self, levels):
        """Infer omitted counts, then assign participants for every study in the overview."""
        assert not levels[0].filter, "the outermost example must have no criteria"
        for outer, inner in pairwise(levels):
            assert set(outer.filter) < set(inner.filter), f"{inner.label} must add filter terms to {outer.label}"
        self.levels = levels
        self.parent = {}
        for view in levels:
            for parent, children in view.walk():
                self.parent.update(dict.fromkeys(children, parent))
        self.hidden = {}
        for level in range(1, len(levels)):
            for study in levels[0].studies:
                self._infer_hidden(level, study)
        self.sets = {study: self._study(i, study) for i, study in enumerate(levels[0].studies)}

    def known(self, level, node_id):
        """Say whether an example constrains a summary: it lists it, or lists the facet it belongs to."""
        if node_id in self.levels[level].nodes:
            return True
        parent = self.parent[node_id]
        return parent != ROOT and self.known(level, parent)

    def count(self, level, node_id, study):
        """Return a summary's exact count at one level, inferred where the example omitted it."""
        return self.hidden.get((level, node_id, study), self.levels[level].count(node_id, study))

    def children(self, node_id):
        """Return a summary's values, in order, across every example."""
        ordered = []
        for view in self.levels:
            ordered += [c for c in view.children.get(node_id, []) if c not in ordered]
        return ordered

    def _infer_hidden(self, level, study):
        """
        Recover the values an example left out because they were below its min_count.

        Where a summary's values sum to less than the summary, the difference belongs to values the
        example omitted. It is assigned when exactly one omitted value can hold it at the next level
        out; anything else means the examples disagree, and is an error.
        """
        view = self.levels[level]
        for parent, children in view.walk():
            if parent == ROOT:
                continue  # facets are independent, not parts of the cohort
            residual = view.count(parent, study) - sum(view.count(c, study) for c in children)
            if residual <= 0:
                continue  # overlapping values, such as race, can sum past their parent
            candidates = [c for c in self.children(parent) if view.count(c, study) == 0
                          and self.known(level - 1, c) and self.count(level - 1, c, study) >= residual]
            if len(candidates) != 1:
                raise ValueError(f"{view.label}: {parent} in {study} has {residual} participants that belong "
                                 f"to no single omitted value (candidates {candidates}); the examples disagree")
            self.hidden[(level, candidates[0], study)] = residual

    def _study(self, index, study):
        sizes = [view.count(ROOT, study) for view in self.levels]
        assert sizes == sorted(sizes, reverse=True), f"{study}: a filtered cohort outgrows the one it narrows"
        everyone = [(index + 1) * 100000 + n + 1 for n in range(sizes[0])]
        innermost = len(sizes) - 1
        # Segment L holds the participants in cohort L but not in cohort L + 1.
        segments = {level: everyone[sizes[level + 1] if level < innermost else 0:sizes[level]]
                    for level in range(len(sizes))}
        sets = {ROOT: frozenset(everyone)}

        def counts(node_id, deepest):
            """Return the summary's count at each level up to its facet's deepest described level."""
            described = [level for level in range(deepest + 1) if self.known(level, node_id)]
            shallowest = described[0]
            return [self.count(max(level, shallowest), node_id, study) for level in range(deepest + 1)]

        def assign(node_id, runs, deepest, partition=True):
            sets[node_id] = frozenset().union(*runs.values())
            used = dict.fromkeys(runs, 0)
            for child in self.children(node_id):
                described = [lv for lv in range(innermost + 1) if self.known(lv, child)]
                child_deepest = deepest if partition else max(described)
                totals = counts(child, child_deepest)
                sizes_by_level = {lv: totals[lv] - (totals[lv + 1] if lv < child_deepest else 0)
                                  for lv in range(child_deepest + 1)}
                source = runs if partition else merged(child_deepest)
                start = used if partition else dict.fromkeys(source, 0)
                taken = {}
                for lv, size in sizes_by_level.items():
                    assert size >= 0, f"{child} in {study}: level {lv + 1} counts more than level {lv}"
                    assert start[lv] + size <= len(source[lv]), f"{child} in {study} overlaps its siblings"
                    taken[lv] = source[lv][start[lv]:start[lv] + size]
                    if partition:
                        used[lv] += size
                assign(child, taken, child_deepest)

        def merged(deepest):
            """Return the segments a facet described down to one level sees: deeper ones are merged into it."""
            runs = {level: segments[level] for level in range(deepest)}
            runs[deepest] = everyone[:sizes[deepest]]
            return runs

        assign(ROOT, merged(innermost), innermost, partition=False)
        sets[ROOT] = frozenset(everyone)
        for level, view in enumerate(self.levels):
            if view.filter:
                cohort = frozenset.intersection(*(sets[term] for term in view.filter))
                assert cohort == frozenset(everyone[:sizes[level]]), (
                    f"{view.label} in {study}: the filter is not the cohort")
        return sets


def noise(release, members, rule):
    """Draw noise seeded by the release and the sorted matched participants, so a set always gets the same."""
    message = (release + "|" + ",".join(str(m) for m in sorted(members))).encode()
    digest = hmac.new(NOISE_KEY, message, hashlib.sha256).digest()
    span = rule["max"] - rule["min"] + 1
    return int.from_bytes(digest[:8], "big") % span + rule["min"]


class Disclosure:
    """Exact counts, their released values, and the suppression rules applied to them."""

    def __init__(self, view, policy):
        """Hold the counting rules every tier shares."""
        self.view = view
        self.counting = policy["counting"]
        self.min_count = self.counting["min_count"]
        self.release = view.source["release"]

    def exact(self, cell):
        """Return a cell's exact count."""
        return len(self.view.members(*cell))

    def obfuscated(self, cell):
        """Return the noisy count, clamped to min_count."""
        n = self.exact(cell) + noise(self.release, self.view.members(*cell), self.counting["noise"])
        return max(n, self.min_count) if self.counting["noise"]["clamp_to_min_count"] else n

    def release_cells(self, cells, groups, exact_columns=frozenset()):
        """
        Decide each cell's status and released value.

        Cells in an exact column are released exactly. Others are BELOW_MIN_COUNT under min_count,
        and noised otherwise. Then the remainder rule: wherever a reported parent appears with its
        parts, what a reader can derive from the hidden parts (parent minus reported parts, which
        includes any implied "not recorded" part) must be at least min_count. Parts are withheld
        smallest first until it is, and the parent if that cannot be done.
        """
        status, value = {}, {}
        for cell in cells:
            if cell[1] in exact_columns:
                status[cell], value[cell] = REPORTED, self.exact(cell)
            elif self.exact(cell) < self.min_count:
                status[cell] = BELOW
            else:
                status[cell], value[cell] = REPORTED, self.obfuscated(cell)

        changed = True
        while changed:
            changed = False
            for parent, parts in groups:
                if status[parent] != REPORTED:
                    continue
                shown = [p for p in parts if status[p] == REPORTED]
                remainder = self.exact(parent) - sum(self.exact(p) for p in shown)
                hidden = len(shown) < len(parts) or remainder > 0
                # Overlapping values, such as race, can sum past their parent; nothing is derivable then.
                if not hidden or remainder < 0 or remainder >= self.min_count:
                    continue
                target = min(shown, key=lambda p: (self.exact(p), p)) if shown else parent
                status[target] = WITHHELD
                value.pop(target, None)
                changed = True
        return status, value


def tree_groups(view, column):
    """
    Pair every parent cell in one column with the parts the remainder rule protects it over.

    A summary is a parent of its values. The cohort is not one group over all its facets: facets
    overlap (one participant has an age, a sex and a race), so their sum says nothing. Instead the
    cohort is a parent of each facet on its own, and of each facet's values, so the implied "not
    recorded" part (cohort minus the facet) is protected wherever it can be derived.
    """
    groups = []
    for parent, children in view.walk():
        if parent != ROOT:
            groups.append(((parent, column), [(c, column) for c in children]))
            continue
        for facet in children:
            groups.append(((ROOT, column), [(facet, column)]))
            if view.children[facet]:
                groups.append(((ROOT, column), [(v, column) for v in view.children[facet]]))
    return groups


def describe(node):
    """Return what a summary describes, without its counts."""
    return {k: v for k, v in node.items() if k not in COUNT_KEYS}


def counted(status, value, cell, mode):
    """Return the count fields for one cell: status, mode, and the count when it is reported."""
    fields = {"count_status": status[cell], "count_mode": mode}
    if cell in value:
        fields["participant_count"] = value[cell]
    return fields


def header(view, tier, profile, policy, notes):
    """Write the comment block that labels a file as synthetic and says how it was made."""
    if view.filter:
        criteria = f"filtered by {' and '.join(view.filter)}; its participants are drawn from the overview's."
    else:
        criteria = "with no criteria applied."
    lines = [
        "SYNTHETIC: fictional study data for contract validation. Not derived from participant data.",
        "Generated by schema/generate_profile_examples.py; do not edit by hand.",
        f"Exact counts: {view.path.name}, {criteria}",
        f"Shaped for the {tier} tier as {profile}, under policy/disclosure-policy.yaml "
        f"(policy_version {policy['policy_version']}, {policy['status']}).",
        f"Noise is keyed with a synthetic placeholder ({NOISE_KEY.decode()}), not the policy's key.",
    ]
    if view.source.get("records"):
        lines.append("The source's participant-level records are omitted: no profile allows them.")
    return "".join(f"# {line}\n" for line in lines + notes)


def base_response(view):
    """Copy the query and study metadata every tier shares."""
    return {k: view.source[k] for k in QUERY_KEYS if k in view.source}


def totals(view, disclosure):
    """Shape a TotalsSummaryResponse: obfuscated totals; studies listed without counts."""
    cells = [(ROOT, TOTAL)] + [(n, TOTAL) for n in view.nodes]
    status, value = disclosure.release_cells(cells, tree_groups(view, TOTAL))

    def node(node_id):
        values = [v for v in (node(c) for c in view.children[node_id]) if v]
        cell = (node_id, TOTAL)
        if status[cell] != REPORTED and not values:
            return None  # suppressed: omitted, which is not zero
        out = describe(view.nodes[node_id])
        if cell in value:
            out["participant_count"] = value[cell]
        out["count_mode"] = "OBFUSCATED"
        if values:
            out["values"] = values
        return out

    names = {s["research_study"]: s["name"] for s in view.source["studies"]}
    listed = [s for s in view.studies if disclosure.exact((ROOT, s)) >= disclosure.min_count]
    response = base_response(view)
    response["studies"] = [{"research_study": s, "name": names[s], "count_status": "LISTED"} for s in listed]
    response["suppressed_study_count"] = len(view.studies) - len(listed)
    if (ROOT, TOTAL) in value:
        response["participant_count"] = value[(ROOT, TOTAL)]
    response["count_mode"] = "OBFUSCATED"
    response["summary"] = facets(view, node)
    omitted = sorted(n for (n, _), s in status.items() if s != REPORTED and n != ROOT)
    notes = [f"Omitted as below min_count or withheld: {', '.join(omitted)}."] if omitted else []
    return response, notes


def breakdown(view, disclosure):
    """Shape a BreakdownSummaryResponse: obfuscated counts per study and consent group, each with a status."""
    columns = [TOTAL, *view.studies]
    cells = [(n, c) for n in (ROOT, *view.nodes) for c in columns]
    groups = [g for c in columns for g in tree_groups(view, c)]
    groups += [((n, TOTAL), [(n, s) for s in view.studies]) for n in (ROOT, *view.nodes)]
    status, value = disclosure.release_cells(cells, groups)

    def contribution(node_id, study):
        return {"research_study": study, "consent_group": CONSENT_GROUP.format(study=study),
                **counted(status, value, (node_id, study), "OBFUSCATED")}

    def node(node_id):
        out = describe(view.nodes[node_id])
        if (node_id, TOTAL) in value:
            out["participant_count"] = value[(node_id, TOTAL)]
        out["count_mode"] = "OBFUSCATED"
        out["studies"] = [contribution(node_id, s) for s in view.studies]
        if view.children[node_id]:
            out["values"] = [node(c) for c in view.children[node_id]]
        return out

    names = {s["research_study"]: s["name"] for s in view.source["studies"]}
    response = base_response(view)
    response["studies"] = [{"name": names[s], **contribution(ROOT, s)} for s in view.studies]
    if (ROOT, TOTAL) in value:
        response["participant_count"] = value[(ROOT, TOTAL)]
    response["count_mode"] = "OBFUSCATED"
    response["summary"] = facets(view, node)
    withheld = sorted({n for (n, _), s in status.items() if s == WITHHELD})
    notes = [f"Withheld by the remainder rule under: {', '.join(withheld)}."] if withheld else []
    return response, notes


def exact(view, disclosure):
    """
    Shape an ExactSummaryResponse: exact counts within the caller's exact scope, obfuscated outside it.

    The two are never combined, so no total spans both, and suppression applies only to the
    obfuscated part. Within exact scope there is no min_count and no noise.
    """
    in_scope = frozenset(s for s in view.studies if CONSENT_GROUP.format(study=s) in EXAMPLE_EXACT_SCOPE)
    cells = [(n, s) for n in (ROOT, *view.nodes) for s in view.studies]
    groups = [g for s in view.studies if s not in in_scope for g in tree_groups(view, s)]
    status, value = disclosure.release_cells(cells, groups, exact_columns=in_scope)

    def contribution(node_id, study):
        mode = "EXACT" if study in in_scope else "OBFUSCATED"
        return {"research_study": study, "consent_group": CONSENT_GROUP.format(study=study),
                **counted(status, value, (node_id, study), mode)}

    def node(node_id):
        out = describe(view.nodes[node_id])
        out["studies"] = [contribution(node_id, s) for s in view.studies]
        if view.children[node_id]:
            out["values"] = [node(c) for c in view.children[node_id]]
        return out

    names = {s["research_study"]: s["name"] for s in view.source["studies"]}
    response = base_response(view)
    response["studies"] = [{"name": names[s], **contribution(ROOT, s)} for s in view.studies]
    response["summary"] = facets(view, node)
    notes = [
        f"The caller's exact scope is {', '.join(sorted(EXAMPLE_EXACT_SCOPE))}.",
        "No total is released: one spanning both scopes would combine the exact and obfuscated figures.",
    ]
    return response, notes


def facets(view, node):
    """Shape every facet with one tier's node function, dropping facets it omits."""
    summary = {}
    for facet_node in view.children[ROOT]:
        shaped = node(facet_node)
        if shaped:
            summary.setdefault(view.facet[facet_node], []).append(shaped)
    return summary


SHAPERS = {"TotalsSummaryResponse": totals, "BreakdownSummaryResponse": breakdown, "ExactSummaryResponse": exact}
SUFFIXES = {"TotalsSummaryResponse": "totals", "BreakdownSummaryResponse": "breakdown", "ExactSummaryResponse": "exact"}


def tier_profiles(policy):
    """Yield every (tier, profile) pair the policy uses, in policy order."""
    for tier in policy["tiers"]:
        seen = []
        for stage in tier["stages"]:
            if stage["available"] and stage["profile"] != "none" and stage["profile"] not in seen:
                seen.append(stage["profile"])
        for profile in seen:
            yield tier["name"], profile


def can_run(policy, tier_name, view):
    """
    Say whether a tier can ask the source's query at all.

    A filter of more than one term combines them, which needs an available stage with operators
    whose max_terms is at least that many. For the public tier that stage reads the fixed table,
    so its max_terms is also how deep the table goes.
    """
    if len(view.filter) <= 1:
        return True
    tier = next(t for t in policy["tiers"] if t["name"] == tier_name)
    return any(stage["available"] and stage.get("operators") and stage.get("max_terms", 0) >= len(view.filter)
               for stage in tier["stages"])


def filename(label, tier, profile):
    """Name one shaped example."""
    return f"SYNTHETIC.SummaryResponse-{label}-{tier}-{SUFFIXES[profile]}.yaml"


def views():
    """Load every source and bind them to one shared roster; return {label: view}."""
    loaded = {label: View(label, path) for label, path in SOURCES.items()}
    roster = Roster(list(loaded.values()))
    for view in loaded.values():
        view.roster = roster
    return loaded


def generate():
    """Shape every source for every (tier, profile) pair that can ask its query; return {filename: text}."""
    policy = yaml.safe_load(POLICY.read_text(encoding="utf-8"))
    files = {}
    for label, view in views().items():
        assert view.source["min_count"] == policy["counting"]["min_count"], f"{label} and the policy disagree"
        disclosure = Disclosure(view, policy)
        for tier, profile in tier_profiles(policy):
            if not can_run(policy, tier, view):
                continue
            response, notes = SHAPERS[profile](view, disclosure)
            for key in ("terms", "relations"):
                if key in view.source:
                    response[key] = view.source[key]
            text = header(view, tier, profile, policy, notes) + yaml.safe_dump(response, sort_keys=False, width=110)
            files[filename(label, tier, profile)] = text
    return files


def main():
    """Write the examples, replacing any from an earlier run."""
    OUTPUT.mkdir(exist_ok=True)
    files = generate()
    for stale in OUTPUT.glob("SYNTHETIC.SummaryResponse-*.yaml"):
        if stale.name not in files:
            stale.unlink()
    for name, text in files.items():
        (OUTPUT / name).write_text(text, encoding="utf-8", newline="\n")
        print(f"wrote {OUTPUT.relative_to(SCHEMA_DIR.parent) / name}")


if __name__ == "__main__":
    main()
