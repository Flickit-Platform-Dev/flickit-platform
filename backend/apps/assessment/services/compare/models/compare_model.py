from pydantic import BaseModel, Field
from typing import List, Optional


class MaturityLevel(BaseModel):
    id: int
    title: str
    value: int
    index: int
    maturityLevelCount: Optional[int] = 0


class Progress(BaseModel):
    answersCount: int
    questionsCount: int
    progress: Optional[int] = 0

    # @property
    # def progress(self) -> int:
    #     return int(self.answersCount / self.questionsCount * 100)


class Assessment(BaseModel):
    id: str
    confidenceValue: Optional[float] = None
    title: str
    maturityLevel: MaturityLevel
    assessmentKit: str
    progress: Progress


class AttributeAssessment(BaseModel):
    assessmentId: str
    maturityLevel: MaturityLevel


class Attribute(BaseModel):
    id: int
    index: int
    title: str
    assessment: Optional[List[AttributeAssessment]] = Field(default_factory=list)


class SubjectAssessment(BaseModel):
    assessmentId: str
    maturityLevel: MaturityLevel
    confidenceValue: Optional[float] = None
    progress: Progress
    topStrengths: List[str] = []
    topWeaknesses: List[str] = []


class Subject(BaseModel):
    id: int
    title: str
    assessments: Optional[List[SubjectAssessment]] = Field(default_factory=list)
    attributes: Optional[List[Attribute]] = Field(default_factory=list)


class AssessmentCompareModel(BaseModel):
    assessments: Optional[List[Assessment]] = Field(default_factory=list)
    subjects: Optional[List[Subject]] = Field(default_factory=list)
