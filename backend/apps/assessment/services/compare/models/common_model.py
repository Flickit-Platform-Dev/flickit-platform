from pydantic import BaseModel, Field
from uuid import UUID


class AssessmentProgres(BaseModel):
    id: UUID
    answersCount: int
    questionsCount: int


class SubjectProgres(BaseModel):
    id: int
    title: str
    answerCount: int
    questionCount: int


class MaturityLevel(BaseModel):
    id: int
    title: str
    value: int
    index: int


class ConfidenceModel(BaseModel):
    confidenceValue: float


class AssessmentConfidenceModel(BaseModel):
    confidence: ConfidenceModel
