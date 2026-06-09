from pydantic import BaseModel, Field


class ResumeAnalysis(BaseModel):
    score: int = Field(ge=0, le=100)
    strengths: list[str] = []
    weaknesses: list[str] = []
    missing_keywords: list[str] = []
    suggestions: list[str] = []
    extracted_skills: list[str] = []
    years_experience: int = 0
    target_role: str = ""
