from typing import List, Optional
from pydantic import BaseModel


class MaturityLevelModel(BaseModel):
    id: int
    title: str
    index: int
    value: int


class StrengthModel(BaseModel):
    id: int
    title: str


class WeaknessModel(BaseModel):
    id: int
    title: str


class MaturityScoreModel(BaseModel):
    maturityLevel: MaturityLevelModel
    score: Optional[float]


class AttributeModel(BaseModel):
    id: int
    index: int
    title: str
    description: str
    maturityLevel: MaturityLevelModel
    maturityScores: List[MaturityScoreModel]
    confidenceValue: Optional[float] = None


class SubjectModel(BaseModel):
    id: int
    title: str
    maturityLevel: MaturityLevelModel
    confidenceValue: Optional[float] = None
    isCalculateValid: bool
    isConfidenceValid: bool


class SubjectReportModel(BaseModel):
    subject: SubjectModel
    topStrengths: List[StrengthModel]
    topWeaknesses: List[WeaknessModel]
    attributes: List[AttributeModel]
    maturityLevelsCount: int
