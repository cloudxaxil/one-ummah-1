from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from app.database import Base


class Teacher(Base):
    __tablename__ = "teachers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    
    # Professional information
    headline = Column(String(200), nullable=True)
    bio = Column(Text, nullable=True)
    experience_years = Column(Integer, default=0)
    hourly_rate = Column(Float, nullable=True)
    currency = Column(String(10), default="USD")
    
    # Qualifications (stored as JSON)
    subjects = Column(JSONB, default=list)  # ["Quran", "Tajweed", "Arabic"]
    languages = Column(JSONB, default=list)  # ["English", "Arabic"]
    qualifications = Column(JSONB, default=list)  # ["Ijazah", "MA Islamic Studies"]
    
    # Availability
    availability = Column(JSONB, default=list)  # ["Mon-Fri", "Evenings"]
    timezone = Column(String(50), default="UTC")
    
    # Statistics
    total_students = Column(Integer, default=0)
    total_lessons = Column(Integer, default=0)
    rating = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    
    # Verification
    is_verified = Column(Boolean, default=False)
    verification_status = Column(String(20), default="not_submitted")  # not_submitted, pending, approved, rejected
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", backref="teacher_profile")
    certificates = relationship("TeacherCertificate", back_populates="teacher", cascade="all, delete-orphan")
    recitation_clips = relationship("TeacherRecitationClip", back_populates="teacher", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Teacher {self.user_id}>"


class TeacherCertificate(Base):
    __tablename__ = "teacher_certificates"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    teacher_id = Column(UUID(as_uuid=True), ForeignKey("teachers.id"), nullable=False)
    
    file_name = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    file_type = Column(String(20), nullable=False)  # pdf, image
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    teacher = relationship("Teacher", back_populates="certificates")


class TeacherRecitationClip(Base):
    __tablename__ = "teacher_recitation_clips"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    teacher_id = Column(UUID(as_uuid=True), ForeignKey("teachers.id"), nullable=False)
    
    file_name = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    media_type = Column(String(20), nullable=False)  # audio, video
    duration_seconds = Column(Integer, nullable=True)
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    teacher = relationship("Teacher", back_populates="recitation_clips")
