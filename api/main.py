from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from api import db

app = FastAPI(title="Study Palette API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    """Return all available studies with participant counts."""
    studies = db.get_all_studies()
    return {"studies": studies, "total": len(studies)}


@app.get("/api/studies/{study_id}")
def get_study(study_id: str):
    """Return a single study by ID with summary statistics."""
    if study_id not in db.list_study_ids():
        raise HTTPException(status_code=404, detail="Study not found")
    study = db.get_study(study_id)
    if not study:
        raise HTTPException(status_code=404, detail="Study not found")
    return study


@app.get("/api/studies/{study_id}/participants")
def list_participants(study_id: str):
    """Return participants for a study, joined with demographics."""
    if study_id not in db.list_study_ids():
        raise HTTPException(status_code=404, detail="Study not found")
    participants = db.get_participants(study_id)
    return {"participants": participants, "total": len(participants)}


@app.get("/api/studies/{study_id}/conditions")
def list_conditions(study_id: str):
    """Return condition summary for a study."""
    if study_id not in db.list_study_ids():
        raise HTTPException(status_code=404, detail="Study not found")
    conditions = db.get_condition_summary(study_id)
    return {"conditions": conditions}
