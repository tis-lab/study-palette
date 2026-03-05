from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Study Palette API", version="0.0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

EXAMPLE_STUDIES = [
    {
        "id": "phs000209",
        "name": "CARe: Candidate Gene Association Resource",
        "description": "Multi-ethnic cohort study of cardiovascular, lung, blood, and sleep disorders.",
        "participant_count": 40181,
        "data_types": ["Genomic", "Phenotypic", "Clinical"],
    },
    {
        "id": "phs000179",
        "name": "MESA: Multi-Ethnic Study of Atherosclerosis",
        "description": "Prospective study of subclinical cardiovascular disease progression.",
        "participant_count": 6814,
        "data_types": ["Imaging", "Genomic", "Phenotypic"],
    },
    {
        "id": "phs000286",
        "name": "ARIC: Atherosclerosis Risk in Communities",
        "description": "Community-based prospective cohort study of cardiovascular disease etiology.",
        "participant_count": 15792,
        "data_types": ["Genomic", "Phenotypic", "Clinical", "Imaging"],
    },
    {
        "id": "phs001024",
        "name": "JHS: Jackson Heart Study",
        "description": "Prospective study of cardiovascular disease among African Americans.",
        "participant_count": 5306,
        "data_types": ["Genomic", "Phenotypic", "Clinical"],
    },
]


OVERVIEW_DATA = {
    "conditions": [
        {"name": "Cardiovascular", "value": 45200, "children": [
            {"name": "Coronary artery disease", "value": 18500},
            {"name": "Heart failure", "value": 12300},
            {"name": "Hypertension", "value": 14400},
        ]},
        {"name": "Respiratory", "value": 22800, "children": [
            {"name": "Asthma", "value": 9400},
            {"name": "COPD", "value": 8200},
            {"name": "Lung fibrosis", "value": 5200},
        ]},
        {"name": "Cancer", "value": 15600, "children": [
            {"name": "Lung cancer", "value": 7800},
            {"name": "Breast cancer", "value": 4900},
            {"name": "Colorectal cancer", "value": 2900},
        ]},
        {"name": "Neurologic", "value": 11400, "children": [
            {"name": "Stroke", "value": 6100},
            {"name": "Alzheimer's", "value": 3200},
            {"name": "Parkinson's", "value": 2100},
        ]},
    ],
    "procedures": [
        {"name": "Echocardiography", "value": 28700},
        {"name": "Spirometry", "value": 19200},
        {"name": "CT imaging", "value": 15800},
        {"name": "Blood panel", "value": 42100},
        {"name": "Genetic sequencing", "value": 31500},
    ],
}


@app.get("/api/overview")
def get_overview():
    """Return summary data for the overview dashboard charts."""
    return OVERVIEW_DATA


@app.get("/api/health")
def health():
    """Return API health status."""
    return {"status": "ok"}


@app.get("/api/studies")
def list_studies():
    """Return all available studies."""
    return {"studies": EXAMPLE_STUDIES, "total": len(EXAMPLE_STUDIES)}


@app.get("/api/studies/{study_id}")
def get_study(study_id: str):
    """Return a single study by ID."""
    for study in EXAMPLE_STUDIES:
        if study["id"] == study_id:
            return study
    raise HTTPException(status_code=404, detail="Study not found")
