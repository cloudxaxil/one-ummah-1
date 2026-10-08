from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID

from app.models.user import UserRole


# Base schemas

class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=100)
    role: UserRole = UserRole.STUDENT


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: UUID
    role: UserRole
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    languages: Optional[List[str]] = None
    is_active: bool
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    languages: Optional[List[str]] = None


# Token schemas

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[str] = None
    role: Optional[str] = None


class RefreshTokenRequest(BaseModel):
    refresh_token: str
