from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from app.database import Base


class Researcher(Base):
    __tablename__ = "researchers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    
    # Professional information
    bio = Column(Text, nullable=True)
    institution = Column(String(200), nullable=True)
    specializations = Column(JSONB, default=list)  # ["Islamic Finance", "Maqasid"]
    languages = Column(JSONB, default=list)  # ["English", "Arabic"]
    
    # Academic credentials
    has_academic_credentials = Column(Boolean, default=False)
    
    # Statistics
    total_papers = Column(Integer, default=0)
    total_citations = Column(Integer, default=0)
    
    # Verification
    is_verified = Column(Boolean, default=False)
    verification_status = Column(String(20), default="not_submitted")  # not_submitted, pending, approved, rejected
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", backref="researcher_profile")
    academic_certificates = relationship("ResearcherAcademicCertificate", back_populates="researcher", cascade="all, delete-orphan")
    research_papers = relationship("ResearcherPaper", back_populates="researcher", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Researcher {self.user_id}>"


class ResearcherAcademicCertificate(Base):
    __tablename__ = "researcher_academic_certificates"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    researcher_id = Column(UUID(as_uuid=True), ForeignKey("researchers.id"), nullable=False)
    
    file_name = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    file_type = Column(String(20), nullable=False)  # pdf, image
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    researcher = relationship("Researcher", back_populates="academic_certificates")


class ResearcherPaper(Base):
    __tablename__ = "researcher_papers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    researcher_id = Column(UUID(as_uuid=True), ForeignKey("researchers.id"), nullable=False)
    
    file_name = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    file_type = Column(String(20), default="pdf")
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    researcher = relationship("Researcher", back_populates="research_papers")
