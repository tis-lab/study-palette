"""Validate canonical request documents; does not execute filters or decode summary IDs.

The LinkML-generated JSON Schema checks structure. These additional checks enforce
runtime limits and canonical no-null encoding that generators do not fully express.
"""
import argparse
import json
import re
import unicodedata
from pathlib import Path

from jsonschema import Draft202012Validator
from linkml.generators.jsonschemagen import JsonSchemaGenerator

SCHEMA = Path(__file__).with_name("summary-request.yaml")
RELATIONSHIPS = {"ONESELF", "NATURAL_PARENT", "NATURAL_FATHER", "NATURAL_MOTHER",
                 "NATURAL_SIBLING", "NATURAL_BROTHER", "NATURAL_SISTER",
                 "NATURAL_CHILD", "BLOOD_RELATIVE"}


def request_validator():
    schema = json.loads(JsonSchemaGenerator(str(SCHEMA), top_class="SummaryRequest",
                                           not_closed=False).serialize())
    Draft202012Validator.check_schema(schema)
    return Draft202012Validator(schema)


def validate_request(request, validator=None):
    """Raise ValueError for an invalid canonical request; return it unchanged.

    HTTP/GraphQL adapters normalize omitted/null filter and focus before calling
    this check. Do not trim, case-fold, expand or decode the supplied identifiers.
    """
    check = validator if validator is not None else request_validator()
    errors = list(check.iter_errors(request))
    if errors:
        raise ValueError(errors[0].message)

    def no_nulls(value):
        if value is None:
            raise ValueError("Canonical requests omit null fields")
        if isinstance(value, dict):
            for child in value.values():
                no_nulls(child)
        elif isinstance(value, list):
            for child in value:
                no_nulls(child)

    def curie(value):
        if (not isinstance(value, str) or len(value) > 512
                or not re.fullmatch(r"[A-Za-z][A-Za-z0-9._-]*:[^\s|*?]+", value)
                or any(unicodedata.category(c).startswith(("C", "Z")) for c in value)):
            raise ValueError("Expected an exact CURIE without whitespace or wildcards")

    no_nulls(request)
    for value in request.get("focus", []):
        curie(value)
    nodes = 0

    def visit(node, depth):
        nonlocal nodes
        nodes += 1
        if depth > 8 or nodes > 100:
            raise ValueError("Filter exceeds 8 levels or 100 nodes")
        if len(node) != 1:
            raise ValueError("Each node must have exactly one operator")
        if "condition" in node:
            condition = node["condition"]
            curie(condition["concept"])
            selection, status = condition.get("selection"), condition.get("status")
            if selection is None and status is None:
                raise ValueError("Supply selection or status")
            if selection and status and {"INCLUDE": "PRESENT", "EXCLUDE": "ABSENT"}[selection] != status:
                raise ValueError("Selection and status disagree")
        elif "summaryId" in node:
            if not node["summaryId"].strip():
                raise ValueError("summaryId must be nonempty")
        else:
            for child in node.get("and", node.get("or", [])):
                visit(child, depth + 1)

    if "filter" in request:
        visit(request["filter"], 1)
    return request


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path)
    args = parser.parse_args()
    validate_request(json.loads(args.file.read_text(encoding="utf-8")))
    print("PASS", args.file)
