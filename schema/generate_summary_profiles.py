"""Generate the draft access profiles from the summary schema's facet classes."""
from pathlib import Path

import yaml

OBFUSCATED = {"required": True, "equals_string": "OBFUSCATED"}
OUTSIDE_SCOPE = {"range": "ObfuscatedOutsideScope"}

# Per profile: what each facet summary, and the response itself, may carry. Totals and Breakdown are
# for tiers with no exact scope. Exact Totals gives exact counts within scope and only one obfuscated
# figure outside it, matching what Totals gives at the same stage; Exact Breakdown, at stage 5 only,
# adds obfuscated per-study counts outside scope, matching Breakdown.
FACETS = {
    "Totals": {
        "record_count": {"value_presence": "ABSENT"},
        "count_mode": OBFUSCATED,
        "studies": {"maximum_cardinality": 0},
    },
    "Breakdown": {
        "record_count": {"value_presence": "ABSENT"},
        "count_mode": OBFUSCATED,
        "studies": {"range": "ObfuscatedContribution"},
    },
    "ExactTotals": {
        "count_mode": {"equals_string": "EXACT"},
        "studies": {"range": "ExactContribution"},
        "outside_scope": OUTSIDE_SCOPE,
    },
}
RESPONSES = {
    "Totals": {"studies": {"range": "ListedStudyEntry"}, "count_mode": OBFUSCATED},
    "Breakdown": {"studies": {"range": "ObfuscatedStudyEntry"}, "count_mode": OBFUSCATED},
    "ExactTotals": {
        "studies": {"range": "ExactStudyEntry"},
        "count_mode": {"equals_string": "EXACT"},
        "outside_scope": OUTSIDE_SCOPE,
    },
}
DESCRIPTIONS = {
    "ExactTotals": (
        "For stages 2 to 4. Exact counts within the caller's exact scope, per study and in total; outside it, "
        "studies are listed without counts and only one obfuscated figure is given, as Totals gives. The service "
        "must verify scope before releasing any exact count."
    ),
}


def main():
    """Write deterministic LinkML profiles for policy review."""
    directory = Path(__file__).resolve().parent
    extension = yaml.safe_load((directory / "summary.yaml").read_text())
    schema = {
        "id": "https://w3id.org/tis-lab/study-palette/summary-profiles",
        "name": "study_palette_summary_profiles",
        "description": ("Draft structural profiles. Authorization, noise and complementary suppression "
                        "require service enforcement."),
        "license": "MIT",
        "prefixes": extension["prefixes"],
        "default_prefix": "palette",
        "imports": ["summary"],
        "classes": {},
    }
    classes = schema["classes"]
    classes["ListedStudyEntry"] = {
        "is_a": "StudySummary",
        "slot_usage": {
            "participant_count": {"required": False, "value_presence": "ABSENT"},
            "count_status": {"required": True, "equals_string": "LISTED"},
        },
    }
    for name, base in (("ObfuscatedStudyEntry", "StudySummary"),
                       ("ObfuscatedContribution", "StudyContribution")):
        classes[name] = {"is_a": base, "slot_usage": {
            "count_mode": OBFUSCATED,
            "count_status": {"required": True},
        }}
    classes["ExactStudyEntry"] = {
        "is_a": "StudySummary",
        "description": "Exact within scope; a study outside scope is listed without a count.",
        "slot_usage": {
            "count_mode": {"equals_string": "EXACT"},
            "count_status": {"required": True, "equals_string_in": ["REPORTED", "LISTED"]},
        },
    }
    classes["ExactContribution"] = {
        "is_a": "StudyContribution",
        "description": "A contribution from a consent group within scope; groups outside it contribute none.",
        "slot_usage": {
            "count_mode": {"required": True, "equals_string": "EXACT"},
            "count_status": {"required": True, "equals_string": "REPORTED"},
        },
    }
    classes["ObfuscatedOutsideScope"] = {
        "is_a": "OutsideScopeCount",
        "slot_usage": {"count_mode": OBFUSCATED},
    }
    facets = {slot: {"range": extension["slots"][slot]["range"]}
              for slot in extension["classes"]["SummaryFacets"]["slots"]}
    for profile, facet_usage in FACETS.items():
        ranges = {}
        for slot, config in facets.items():
            base = config["range"]
            name = profile + base
            classes[name] = {"is_a": base, "slot_usage": {"values": {"range": name}, **facet_usage}}
            ranges[slot] = {"range": name}
        classes[profile + "SummaryFacets"] = {"is_a": "SummaryFacets", "slot_usage": ranges}
        response = {"is_a": "SummaryResponse"}
        if profile in DESCRIPTIONS:
            response["description"] = DESCRIPTIONS[profile]
        response["slot_usage"] = {
            **RESPONSES[profile],
            "summary": {"range": profile + "SummaryFacets"},
            "records": {"value_presence": "ABSENT"},
        }
        classes[profile + "SummaryResponse"] = response
    classes["ExactBreakdownSummaryResponse"] = {
        "is_a": "SummaryResponse",
        "description": ("For stage 5, on a materialized cohort. Exact counts within the caller's exact scope and "
                        "obfuscated per-study counts outside it, as Breakdown gives. Structural contract only: the "
                        "service must verify scope before releasing any exact count."),
        "slot_usage": {"records": {"value_presence": "ABSENT"}, "outside_scope": OUTSIDE_SCOPE},
    }
    header = "# Generated by schema/generate_summary_profiles.py.\n"
    (directory / "summary-profiles.yaml").write_text(header + yaml.safe_dump(schema, sort_keys=False, width=110))


if __name__ == "__main__":
    main()
