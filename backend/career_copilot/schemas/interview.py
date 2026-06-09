from pydantic import BaseModel, Field


class InterviewQuestion(BaseModel):
    question: str
    category: str = "technical"
    difficulty: str = "medium"
    hints: list[str] = []


class InterviewEvaluation(BaseModel):
    score: int = Field(ge=0, le=100)
    strengths: list[str] = []
    improvements: list[str] = []
    model_answer: str = ""
