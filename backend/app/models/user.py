from sqlalchemy import Column, String, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum

from app.database import Base


class UserRole(str, enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    RESEARCHER = "researcher"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.STUDENT)
    
    # Profile fields
    bio = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    languages = Column(String, nullable=True)  # JSON array as string
    
    # Status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    email_verified = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<User {self.email}>"
