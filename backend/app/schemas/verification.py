from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# Verification request schemas

class VerificationRequestBase(BaseModel):
    role: str  # teacher, researcher
    additional_notes: Optional[str] = None


class VerificationRequestCreate(VerificationRequestBase):
    pass


class VerificationRequestResponse(VerificationRequestBase):
    id: UUID
    user_id: UUID
    status: str
    reviewed_by: Optional[UUID] = None
    reviewed_at: Optional[datetime] = None
    rejection_reason: Optional[str] = None
    submitted_at: datetime
    
    class Config:
        from_attributes = True


class VerificationRequestDetail(VerificationRequestResponse):
    user_name: str
    user_email: str
    # For teachers
    certificates: List[dict] = []
    recitation_clips: List[dict] = []
    # For researchers
    academic_certificates: List[dict] = []
    research_papers: List[dict] = []


class VerificationReview(BaseModel):
    status: str  # approved, rejected
    rejection_reason: Optional[str] = None


class VerificationStats(BaseModel):
    total: int
    pending: int
    approved: int
    rejected: int
