from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
import enum

from app.database import Base


class LearningLevel(str, enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"


class Student(Base):
    __tablename__ = "students"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    
    # Learning information
    bio = Column(Text, nullable=True)
    learning_level = Column(Enum(LearningLevel), default=LearningLevel.BEGINNER)
    learning_goals = Column(JSONB, default=list)  # ["Quran memorization", "Arabic fluency"]
    languages = Column(JSONB, default=list)  # ["English", "Arabic"]
    
    # Statistics
    total_lessons = Column(Integer, default=0)
    completed_lessons = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", backref="student_profile")
    
    def __repr__(self):
        return f"<Student {self.user_id}>"
