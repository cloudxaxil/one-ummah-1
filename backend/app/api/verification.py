from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional
from datetime import datetime
from uuid import UUID

from app.database import get_db
from app.models.user import User
from app.models.teacher import Teacher, TeacherCertificate, TeacherRecitationClip
from app.models.researcher import Researcher, ResearcherAcademicCertificate, ResearcherPaper
from app.models.verification import VerificationRequest, VerificationStatus
from app.schemas.verification import (
    VerificationRequestCreate,
    VerificationRequestResponse,
    VerificationRequestDetail,
    VerificationReview,
    VerificationStats,
)
from app.core.security import get_current_user, require_admin, require_teacher, require_researcher

router = APIRouter(prefix="/verification", tags=["Verification"])


@router.post("/submit", response_model=VerificationRequestResponse, status_code=status.HTTP_201_CREATED)
async def submit_verification_request(
    request_data: VerificationRequestCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Submit a verification request (for teachers and researchers)."""
    # Check if user has appropriate role
    if request_data.role == "teacher" and current_user.role != "teacher":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can submit teacher verification requests",
        )
    if request_data.role == "researcher" and current_user.role != "researcher":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only researchers can submit researcher verification requests",
        )
    
    # Check if there's already a pending request
    result = await db.execute(
        select(VerificationRequest).where(
            VerificationRequest.user_id == current_user.id,
            VerificationRequest.status == VerificationStatus.PENDING,
        )
    )
    existing = result.scalar_one_or_none()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have a pending verification request",
        )
    
    # Create verification request
    new_request = VerificationRequest(
        user_id=current_user.id,
        role=request_data.role,
        additional_notes=request_data.additional_notes,
        status=VerificationStatus.PENDING,
    )
    
    db.add(new_request)
    await db.commit()
    await db.refresh(new_request)
    
    return new_request


@router.get("/my-status", response_model=VerificationRequestResponse)
async def get_my_verification_status(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get current user's verification status."""
    result = await db.execute(
        select(VerificationRequest)
        .where(VerificationRequest.user_id == current_user.id)
        .order_by(VerificationRequest.submitted_at.desc())
        .limit(1)
    )
    request = result.scalar_one_or_none()
    
    if not request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No verification request found",
        )
    
    return request


# Admin endpoints

@router.get("/admin/stats", response_model=VerificationStats)
async def get_verification_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Get verification statistics (admin only)."""
    total_result = await db.execute(select(func.count(VerificationRequest.id)))
    total = total_result.scalar()
    
    pending_result = await db.execute(
        select(func.count(VerificationRequest.id)).where(
            VerificationRequest.status == VerificationStatus.PENDING
        )
    )
    pending = pending_result.scalar()
    
    approved_result = await db.execute(
        select(func.count(VerificationRequest.id)).where(
            VerificationRequest.status == VerificationStatus.APPROVED
        )
    )
    approved = approved_result.scalar()
    
    rejected_result = await db.execute(
        select(func.count(VerificationRequest.id)).where(
            VerificationRequest.status == VerificationStatus.REJECTED
        )
    )
    rejected = rejected_result.scalar()
    
    return VerificationStats(
        total=total,
        pending=pending,
        approved=approved,
        rejected=rejected,
    )


@router.get("/admin/requests", response_model=List[VerificationRequestResponse])
async def list_verification_requests(
    status_filter: Optional[str] = Query(None, alias="status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """List all verification requests (admin only)."""
    query = select(VerificationRequest)
    
    if status_filter:
        query = query.where(VerificationRequest.status == status_filter)
    
    query = query.order_by(VerificationRequest.submitted_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    requests = result.scalars().all()
    
    return requests


@router.get("/admin/requests/{request_id}", response_model=VerificationRequestDetail)
async def get_verification_request_detail(
    request_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Get detailed verification request with all documents (admin only)."""
    result = await db.execute(
        select(VerificationRequest).where(VerificationRequest.id == request_id)
    )
    request = result.scalar_one_or_none()
    
    if not request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Verification request not found",
        )
    
    # Get user info
    user_result = await db.execute(select(User).where(User.id == request.user_id))
    user = user_result.scalar_one()
    
    # Get documents based on role
    certificates = []
    recitation_clips = []
    academic_certificates = []
    research_papers = []
    
    if request.role == "teacher":
        # Get teacher profile
        teacher_result = await db.execute(
            select(Teacher).where(Teacher.user_id == request.user_id)
        )
        teacher = teacher_result.scalar_one_or_none()
        
        if teacher:
            # Get certificates
            cert_result = await db.execute(
                select(TeacherCertificate).where(TeacherCertificate.teacher_id == teacher.id)
            )
            certs = cert_result.scalars().all()
            certificates = [
                {
                    "id": str(cert.id),
                    "file_name": cert.file_name,
                    "file_url": cert.file_url,
                    "file_type": cert.file_type,
                    "description": cert.description,
                }
                for cert in certs
            ]
            
            # Get recitation clips
            clip_result = await db.execute(
                select(TeacherRecitationClip).where(TeacherRecitationClip.teacher_id == teacher.id)
            )
            clips = clip_result.scalars().all()
            recitation_clips = [
                {
                    "id": str(clip.id),
                    "file_name": clip.file_name,
                    "file_url": clip.file_url,
                    "media_type": clip.media_type,
                    "duration_seconds": clip.duration_seconds,
                    "description": clip.description,
                }
                for clip in clips
            ]
    
    elif request.role == "researcher":
        # Get researcher profile
        researcher_result = await db.execute(
            select(Researcher).where(Researcher.user_id == request.user_id)
        )
        researcher = researcher_result.scalar_one_or_none()
        
        if researcher:
            # Get academic certificates
            cert_result = await db.execute(
                select(ResearcherAcademicCertificate).where(
                    ResearcherAcademicCertificate.researcher_id == researcher.id
                )
            )
            certs = cert_result.scalars().all()
            academic_certificates = [
                {
                    "id": str(cert.id),
                    "file_name": cert.file_name,
                    "file_url": cert.file_url,
                    "file_type": cert.file_type,
                    "description": cert.description,
                }
                for cert in certs
            ]
            
            # Get research papers
            paper_result = await db.execute(
                select(ResearcherPaper).where(ResearcherPaper.researcher_id == researcher.id)
            )
            papers = paper_result.scalars().all()
            research_papers = [
                {
                    "id": str(paper.id),
                    "file_name": paper.file_name,
                    "file_url": paper.file_url,
                    "file_type": paper.file_type,
                    "description": paper.description,
                }
                for paper in papers
            ]
    
    return VerificationRequestDetail(
        id=request.id,
        user_id=request.user_id,
        user_name=user.full_name,
        user_email=user.email,
        role=request.role,
        status=request.status.value,
        additional_notes=request.additional_notes,
        reviewed_by=request.reviewed_by,
        reviewed_at=request.reviewed_at,
        rejection_reason=request.rejection_reason,
        submitted_at=request.submitted_at,
        certificates=certificates,
        recitation_clips=recitation_clips,
        academic_certificates=academic_certificates,
        research_papers=research_papers,
    )


@router.post("/admin/requests/{request_id}/review", response_model=VerificationRequestResponse)
async def review_verification_request(
    request_id: UUID,
    review_data: VerificationReview,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Review and approve/reject a verification request (admin only)."""
    result = await db.execute(
        select(VerificationRequest).where(VerificationRequest.id == request_id)
    )
    request = result.scalar_one_or_none()
    
    if not request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Verification request not found",
        )
    
    if request.status != VerificationStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request has already been reviewed",
        )
    
    # Update request
    if review_data.status == "approved":
        request.status = VerificationStatus.APPROVED
        
        # Update user verification status
        user_result = await db.execute(select(User).where(User.id == request.user_id))
        user = user_result.scalar_one()
        user.is_verified = True
        
        # Update profile verification status
        if request.role == "teacher":
            teacher_result = await db.execute(
                select(Teacher).where(Teacher.user_id == request.user_id)
            )
            teacher = teacher_result.scalar_one_or_none()
            if teacher:
                teacher.is_verified = True
                teacher.verification_status = "approved"
        
        elif request.role == "researcher":
            researcher_result = await db.execute(
                select(Researcher).where(Researcher.user_id == request.user_id)
            )
            researcher = researcher_result.scalar_one_or_none()
            if researcher:
                researcher.is_verified = True
                researcher.verification_status = "approved"
    
    elif review_data.status == "rejected":
        if not review_data.rejection_reason:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Rejection reason is required",
            )
        
        request.status = VerificationStatus.REJECTED
        request.rejection_reason = review_data.rejection_reason
        
        # Update profile verification status
        if request.role == "teacher":
            teacher_result = await db.execute(
                select(Teacher).where(Teacher.user_id == request.user_id)
            )
            teacher = teacher_result.scalar_one_or_none()
            if teacher:
                teacher.verification_status = "rejected"
        
        elif request.role == "researcher":
            researcher_result = await db.execute(
                select(Researcher).where(Researcher.user_id == request.user_id)
            )
            researcher = researcher_result.scalar_one_or_none()
            if researcher:
                researcher.verification_status = "rejected"
    
    request.reviewed_by = current_user.id
    request.reviewed_at = datetime.utcnow()
    
    await db.commit()
    await db.refresh(request)
    
    return request
