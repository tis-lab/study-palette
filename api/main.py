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
    return db.get_study(study_id)


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
