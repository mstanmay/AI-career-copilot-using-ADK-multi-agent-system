from pydantic import BaseModel


class RoadmapMonth(BaseModel):
    month: int
    title: str
    skills: list[str] = []
    resources: list[str] = []
    milestones: list[str] = []


class CareerRoadmap(BaseModel):
    target_role: str = ""
    duration_months: int = 6
    months: list[RoadmapMonth] = []
