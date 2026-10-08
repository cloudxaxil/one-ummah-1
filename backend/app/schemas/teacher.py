from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# Certificate schemas

class CertificateBase(BaseModel):
    file_name: str
    file_url: str
    file_type: str
    description: Optional[str] = None


class CertificateCreate(CertificateBase):
    pass


class CertificateResponse(CertificateBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True


# Recitation clip schemas

class RecitationClipBase(BaseModel):
    file_name: str
    file_url: str
    media_type: str  # audio, video
    duration_seconds: Optional[int] = None
    description: Optional[str] = None


class RecitationClipCreate(RecitationClipBase):
    pass


class RecitationClipResponse(RecitationClipBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True


# Teacher schemas

class TeacherBase(BaseModel):
    headline: Optional[str] = Field(None, max_length=200)
    bio: Optional[str] = None
    experience_years: int = Field(default=0, ge=0)
    hourly_rate: Optional[float] = Field(None, ge=0)
    currency: str = "USD"
    subjects: List[str] = []
    languages: List[str] = []
    qualifications: List[str] = []
    availability: List[str] = []
    timezone: str = "UTC"


class TeacherCreate(TeacherBase):
    pass


class TeacherUpdate(BaseModel):
    headline: Optional[str] = Field(None, max_length=200)
    bio: Optional[str] = None
    experience_years: Optional[int] = Field(None, ge=0)
    hourly_rate: Optional[float] = Field(None, ge=0)
    currency: Optional[str] = None
    subjects: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    qualifications: Optional[List[str]] = None
    availability: Optional[List[str]] = None
    timezone: Optional[str] = None


class TeacherResponse(TeacherBase):
    id: UUID
    user_id: UUID
    total_students: int
    total_lessons: int
    rating: float
    rating_count: int
    is_verified: bool
    verification_status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class TeacherDetailResponse(TeacherResponse):
    certificates: List[CertificateResponse] = []
    recitation_clips: List[RecitationClipResponse] = []


class TeacherListResponse(BaseModel):
    id: UUID
    user_id: UUID
    user_name: str
    user_email: str
    headline: Optional[str] = None
    bio: Optional[str] = None
    experience_years: int
    subjects: List[str]
    languages: List[str]
    hourly_rate: Optional[float] = None
    currency: str
    rating: float
    rating_count: int
    is_verified: bool
    verification_status: str
    
    class Config:
        from_attributes = True
