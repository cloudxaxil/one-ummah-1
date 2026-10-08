from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum

from app.database import Base


class VerificationStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class VerificationRequest(Base):
    __tablename__ = "verification_requests"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # Type of verification
    role = Column(String(20), nullable=False)  # teacher, researcher
    
    # Status
    status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    
    # Additional notes from applicant
    additional_notes = Column(Text, nullable=True)
    
    # Review information
    reviewed_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    rejection_reason = Column(Text, nullable=True)
    
    # Timestamps
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<VerificationRequest {self.user_id} - {self.status}>"
