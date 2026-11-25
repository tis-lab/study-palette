"""
Generate per-tier example responses from exact example counts, under the disclosure policy.

Two hand-written examples supply the exact counts: the overview, for every study with no criteria
applied, and the T2D example, filtered to participants with a fasting glucose measurement. Each is
shaped once for every (tier, profile) pair the policy uses, and written to examples/profiles/.

The policy seeds noise from the matched participant set, and the examples have counts, not
participants. So the generator first builds one fictional roster that reproduces every count in
both examples, with the filtered cohort drawn from the overview's participants. Each cell's exact
count and noise then come from a real set, and identical sets get identical noise in every file,
as the policy requires.

    python schema/generate_profile_examples.py
"""

import hashlib
import hmac
from pathlib import Path

import yaml

SCHEMA_DIR = Path(__file__).resolve().parent
EXAMPLES_DIR = SCHEMA_DIR / "examples"
POLICY = SCHEMA_DIR.parent / "policy" / "disclosure-policy.yaml"
OUTPUT = EXAMPLES_DIR / "profiles"
# Label -> source. The first has no criteria and defines everyone; the rest are filtered from it.
SOURCES = {
    "overview": EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-overview.yaml",
    "t2d": EXAMPLES_DIR / "SYNTHETIC.SummaryResponse-t2d.yaml",
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
        assert len(self.filter) <= 1, f"{path.name}: only a single filter is supported"
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
        """Return everyone the source counts in one study: the filter's participants, or everyone."""
        return self.roster.sets[study][self.filter[0] if self.filter else ROOT]

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
    Fictional participants that reproduce every count in the overview and the filtered examples.

    Numbering follows the synthetic sample: study one is 100001 onwards, study two 200001. The
    filtered cohort is a study's first participants, so it is drawn from the overview's. Every
    summary takes its filtered count from that block and the rest of its overview count from the
    participants after it. Values take consecutive runs within their parent's, so a facet's values
    partition the participants with that facet recorded, and the rest are its implied "not
    recorded" part.
    """

    def __init__(self, overview, filtered):
        """Assign participants for every study in the overview."""
        assert not overview.filter, "the overview must have no criteria"
        assert len(filtered) <= 1, "one filtered example at a time"
        self.overview, self.filtered = overview, filtered[0] if filtered else None
        self.hidden = {}
        if self.filtered:
            for study in overview.studies:
                self._infer_hidden(study)
        self.sets = {study: self._study(i, study) for i, study in enumerate(overview.studies)}

    def _infer_hidden(self, study):
        """
        Recover the values a filtered example left out because they were below its min_count.

        Where a summary's values sum to less than the summary, the difference belongs to values the
        example omitted. It is assigned when exactly one omitted value, present in the overview,
        can hold it; anything else means the examples disagree, and is an error.
        """
        for parent, children in self.filtered.walk():
            if parent == ROOT:
                continue  # facets are independent, not parts of the cohort
            residual = self.filtered.count(parent, study) - sum(self.filtered.count(c, study) for c in children)
            if residual <= 0:
                continue  # overlapping values, such as race, can sum past their parent
            candidates = [c for c in self._children(parent) if self.filtered.count(c, study) == 0
                          and c in self.overview.nodes and self.overview.count(c, study) >= residual]
            if len(candidates) != 1:
                raise ValueError(f"{parent} in {study}: {residual} participants belong to no single omitted value "
                                 f"(candidates {candidates}); the examples disagree")
            self.hidden[(candidates[0], study)] = residual

    def _counts(self, node_id, study):
        """Return (filtered count, overview count) for one summary in one study."""
        inside = self.filtered.count(node_id, study) if self.filtered else 0
        inside = self.hidden.get((node_id, study), inside)
        total = self.overview.count(node_id, study) if node_id in self.overview.nodes else inside
        return inside, total

    def _children(self, node_id):
        ordered = list(self.overview.children.get(node_id, []))
        if self.filtered:
            ordered += [c for c in self.filtered.children.get(node_id, []) if c not in ordered]
        return ordered

    def _study(self, index, study):
        everyone = [(index + 1) * 100000 + n + 1 for n in range(self.overview.count(ROOT, study))]
        size = self.filtered.count(ROOT, study) if self.filtered else 0
        block, rest = everyone[:size], everyone[size:]
        sets = {ROOT: frozenset(everyone)}

        def assign(node_id, inside, outside, partition=True):
            # A facet's values partition it, so they take successive runs. Facets under the cohort
            # are independent of one another, so each starts from the cohort's first participant.
            sets[node_id] = frozenset(inside) | frozenset(outside)
            i = o = 0
            for child in self._children(node_id):
                n_in, n_all = self._counts(child, study)
                n_out = n_all - n_in
                assert n_out >= 0, f"{child} in {study}: the filtered count exceeds the overview's"
                assert i + n_in <= len(inside) and o + n_out <= len(outside), f"{child} in {study} overlaps"
                assign(child, inside[i:i + n_in], outside[o:o + n_out])
                if partition:
                    i, o = i + n_in, o + n_out

        assign(ROOT, block, rest, partition=False)
        sets[ROOT] = frozenset(everyone)
        if self.filtered:
            assert sets[self.filtered.filter[0]] == frozenset(block), f"{study}: the filter is not the cohort"
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
    """Pair every parent cell in one column with its child cells."""
    return [((parent, column), [(c, column) for c in children]) for parent, children in view.walk()]


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
        criteria = f"filtered by {view.filter[0]}; its participants are drawn from the overview's."
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


def filename(label, tier, profile):
    """Name one shaped example."""
    return f"SYNTHETIC.SummaryResponse-{label}-{tier}-{SUFFIXES[profile]}.yaml"


def views():
    """Load every source and bind them to one shared roster; return {label: view}."""
    loaded = {label: View(label, path) for label, path in SOURCES.items()}
    overview, *filtered = loaded.values()
    roster = Roster(overview, filtered)
    for view in loaded.values():
        view.roster = roster
    return loaded


def generate():
    """Shape every source for every (tier, profile) pair; return {filename: text}."""
    policy = yaml.safe_load(POLICY.read_text(encoding="utf-8"))
    files = {}
    for label, view in views().items():
        assert view.source["min_count"] == policy["counting"]["min_count"], f"{label} and the policy disagree"
        disclosure = Disclosure(view, policy)
        for tier, profile in tier_profiles(policy):
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
