from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

class User(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    email: EmailStr
    selected_role: str
    assessment_history: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class Assessment(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    description: str
    difficulty: str  # Beginner, Intermediate, Advanced
    duration: int  # minutes
    skills: List[str]
    scenario_template: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

class AssessmentResult(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    assessment_id: str
    scenario: str
    user_response: str
    score: float  # 0-100
    ai_feedback: str
    improvement_delta: float = 0.0
    strengths: List[str] = []
    areas_for_improvement: List[str] = []
    proficiency_level: str = "Beginner"
    completed_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True

# Request/Response Models
class StartAssessmentRequest(BaseModel):
    assessment_id: str
    user_id: str

class StartAssessmentResponse(BaseModel):
    session_id: str
    assessment_title: str
    scenario: str
    max_duration_minutes: int

class SubmitAssessmentRequest(BaseModel):
    session_id: str
    user_id: str
    user_response: str
    time_spent_minutes: int

class SubmitAssessmentResponse(BaseModel):
    result_id: str
    score: float
    ai_feedback: str
    improvement_delta: float
    proficiency_level: str
    strengths: List[str]
    areas_for_improvement: List[str]

class DashboardMetrics(BaseModel):
    active_assessments: int
    completed_assessments: int
    avg_score: float
    improvement: float
    skill_progress: List[dict]
    ai_feedback: List[str]