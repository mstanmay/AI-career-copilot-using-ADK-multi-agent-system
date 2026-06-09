from pydantic import BaseModel, Field


class SkillItem(BaseModel):
    name: str
    current: int = Field(ge=0, le=100)
    required: int = Field(ge=0, le=100)
    gap: int = Field(ge=0, le=100)
    priority: str = "medium"


class SkillGapAnalysis(BaseModel):
    target_role: str = ""
    skills: list[SkillItem] = []
    overall_readiness: int = Field(ge=0, le=100, default=0)
    top_gaps: list[str] = []
