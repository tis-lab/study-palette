"""
A toy middleware: serves the SYNTHETIC examples as contract documents.

It stands in for the real middleware to show the pattern: build the document,
validate it against the JSON Schema generated from the LinkML contract, and
return it as plain JSON. A document that fails validation is refused, so a
contract break surfaces on the server instead of in the UI.

    make -C contracts
    uvicorn --app-dir contracts/toy server:app --port 8001
"""

import json
from pathlib import Path

import yaml
from fastapi import FastAPI, HTTPException
from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[2]
EXAMPLES = ROOT / "schema" / "examples"
GENERATED = ROOT / "contracts" / "generated"
PREFIX = "SYNTHETIC.SummaryResponse-"


def create_app(generated: Path = GENERATED, examples: Path = EXAMPLES) -> FastAPI:
    """Serve the examples in `examples`, validated against the JSON Schemas in `generated`."""
    app = FastAPI(title="Toy contract middleware")
    validators: dict[str, Draft202012Validator] = {}

    def summaries() -> dict[str, Path]:
        return {path.stem.removeprefix(PREFIX): path for path in examples.glob(f"{PREFIX}*.yaml")}

    def checked(contract: str, document: dict) -> dict:
        if contract not in validators:
            schema = json.loads((generated / f"{contract}.schema.json").read_text())
            validators[contract] = Draft202012Validator(schema)
        errors = [error.message for error in validators[contract].iter_errors(document)]
        if errors:
            raise HTTPException(500, {"contract": contract, "errors": errors[:5]})
        return document

    @app.get("/summary/{name}")
    def summary(name: str) -> dict:
        """Serve a SummaryResponse, e.g. /summary/t2d."""
        path = summaries().get(name)
        if path is None:
            raise HTTPException(404, f"no example {name!r}; try one of {sorted(summaries())}")
        return checked("summary", yaml.safe_load(path.read_text()))

    @app.get("/terms/{curie}")
    def term(curie: str) -> dict:
        """Serve one Term by CURIE, from the terms carried in the examples."""
        for path in summaries().values():
            for found in yaml.safe_load(path.read_text()).get("terms") or []:
                if found["curie"] == curie:
                    return checked("terms", found)
        raise HTTPException(404, f"no term {curie!r}")

    return app


app = create_app()
