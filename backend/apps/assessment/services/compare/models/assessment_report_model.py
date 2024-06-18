from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class MaturityLevel(BaseModel):
    id: int
    title: str
    index: int
    value: int


class Attribute(BaseModel):
    id: int
    title: str
    description: str
    index: int
    confidenceValue: Optional[float] = None
    maturityLevel: MaturityLevel


class Subject(BaseModel):
    id: int
    title: str
    index: int
    description: Optional[str] = None
    confidenceValue: Optional[float] = None
    maturityLevel: MaturityLevel
    attributes: List[Attribute]


class Color(BaseModel):
    code: str
    id: int


class ExpertGroup(BaseModel):
    id: int
    title: str
    picture: Optional[str] = None


class AssessmentKit(BaseModel):
    id: int
    title: str
    summary: str
    maturityLevelCount: int
    maturityLevels: List[MaturityLevel]
    expertGroup: ExpertGroup


class Assessment(BaseModel):
    id: str
    title: str
    assessmentKit: AssessmentKit
    maturityLevel: MaturityLevel
    confidenceValue: Optional[float] = None
    isCalculateValid: bool
    isConfidenceValid: bool
    color: Color
    creationTime: datetime
    lastModificationTime: datetime


class AssessmentReportModel(BaseModel):
    assessment: Assessment
    subjects: List[Subject]
