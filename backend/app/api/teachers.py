from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from uuid import UUID

from app.database import get_db
from app.models.user import User
from app.models.teacher import Teacher, TeacherCertificate, TeacherRecitationClip
from app.schemas.teacher import (
    TeacherCreate,
    TeacherUpdate,
    TeacherResponse,
    TeacherDetailResponse,
    TeacherListResponse,
    CertificateCreate,
    CertificateResponse,
    RecitationClipCreate,
    RecitationClipResponse,
)
from app.core.security import get_current_user, require_teacher

router = APIRouter(prefix="/teachers", tags=["Teachers"])


@router.get("/", response_model=List[TeacherListResponse])
async def list_teachers(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    subject: Optional[str] = None,
    language: Optional[str] = None,
    verified_only: bool = False,
    db: AsyncSession = Depends(get_db),
):
    """List all teachers with optional filters."""
    query = select(Teacher).join(User, Teacher.user_id == User.id)
    
    if verified_only:
        query = query.where(Teacher.is_verified == True)
    
    # Note: JSONB filtering would need more complex queries
    # For now, we'll filter in Python after fetching
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    teachers = result.scalars().all()
    
    # Filter by subject and language in Python
    teacher_list = []
    for teacher in teachers:
        # Get user info
        user_result = await db.execute(select(User).where(User.id == teacher.user_id))
        user = user_result.scalar_one()
        
        # Apply filters
        if subject and subject not in teacher.subjects:
            continue
        if language and language not in teacher.languages:
            continue
        
        teacher_list.append(TeacherListResponse(
            id=teacher.id,
            user_id=teacher.user_id,
            user_name=user.full_name,
            user_email=user.email,
            headline=teacher.headline,
            bio=teacher.bio,
            experience_years=teacher.experience_years,
            subjects=teacher.subjects,
            languages=teacher.languages,
            hourly_rate=teacher.hourly_rate,
            currency=teacher.currency,
            rating=teacher.rating,
            rating_count=teacher.rating_count,
            is_verified=teacher.is_verified,
            verification_status=teacher.verification_status,
        ))
    
    return teacher_list


@router.get("/{teacher_id}", response_model=TeacherDetailResponse)
async def get_teacher(teacher_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get teacher details by ID."""
    result = await db.execute(select(Teacher).where(Teacher.id == teacher_id))
    teacher = result.scalar_one_or_none()
    
    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher not found",
        )
    
    # Get certificates and clips
    cert_result = await db.execute(
        select(TeacherCertificate).where(TeacherCertificate.teacher_id == teacher_id)
    )
    certificates = cert_result.scalars().all()
    
    clip_result = await db.execute(
        select(TeacherRecitationClip).where(TeacherRecitationClip.teacher_id == teacher_id)
    )
    recitation_clips = clip_result.scalars().all()
    
    return TeacherDetailResponse(
        id=teacher.id,
        user_id=teacher.user_id,
        headline=teacher.headline,
        bio=teacher.bio,
        experience_years=teacher.experience_years,
        hourly_rate=teacher.hourly_rate,
        currency=teacher.currency,
        subjects=teacher.subjects,
        languages=teacher.languages,
        qualifications=teacher.qualifications,
        availability=teacher.availability,
        timezone=teacher.timezone,
        total_students=teacher.total_students,
        total_lessons=teacher.total_lessons,
        rating=teacher.rating,
        rating_count=teacher.rating_count,
        is_verified=teacher.is_verified,
        verification_status=teacher.verification_status,
        created_at=teacher.created_at,
        updated_at=teacher.updated_at,
        certificates=[CertificateResponse.model_validate(cert) for cert in certificates],
        recitation_clips=[RecitationClipResponse.model_validate(clip) for clip in recitation_clips],
    )


@router.post("/", response_model=TeacherResponse, status_code=status.HTTP_201_CREATED)
async def create_teacher(
    teacher_data: TeacherCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_teacher),
):
    """Create a teacher profile (requires teacher role)."""
    # Check if teacher profile already exists
    result = await db.execute(select(Teacher).where(Teacher.user_id == current_user.id))
    existing = result.scalar_one_or_none()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Teacher profile already exists",
        )
    
    # Create teacher profile
    new_teacher = Teacher(
        user_id=current_user.id,
        **teacher_data.model_dump(),
    )
    
    db.add(new_teacher)
    await db.commit()
    await db.refresh(new_teacher)
    
    return new_teacher


@router.put("/me", response_model=TeacherResponse)
async def update_teacher(
    teacher_data: TeacherUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_teacher),
):
    """Update own teacher profile."""
    result = await db.execute(select(Teacher).where(Teacher.user_id == current_user.id))
    teacher = result.scalar_one_or_none()
    
    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher profile not found",
        )
    
    # Update fields
    update_data = teacher_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(teacher, field, value)
    
    await db.commit()
    await db.refresh(teacher)
    
    return teacher


@router.post("/me/certificates", response_model=CertificateResponse, status_code=status.HTTP_201_CREATED)
async def add_certificate(
    certificate: CertificateCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_teacher),
):
    """Add a certificate to teacher profile."""
    result = await db.execute(select(Teacher).where(Teacher.user_id == current_user.id))
    teacher = result.scalar_one_or_none()
    
    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher profile not found",
        )
    
    new_cert = TeacherCertificate(
        teacher_id=teacher.id,
        **certificate.model_dump(),
    )
    
    db.add(new_cert)
    await db.commit()
    await db.refresh(new_cert)
    
    return new_cert


@router.post("/me/recitation-clips", response_model=RecitationClipResponse, status_code=status.HTTP_201_CREATED)
async def add_recitation_clip(
    clip: RecitationClipCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_teacher),
):
    """Add a recitation clip to teacher profile."""
    result = await db.execute(select(Teacher).where(Teacher.user_id == current_user.id))
    teacher = result.scalar_one_or_none()
    
    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher profile not found",
        )
    
    new_clip = TeacherRecitationClip(
        teacher_id=teacher.id,
        **clip.model_dump(),
    )
    
    db.add(new_clip)
    await db.commit()
    await db.refresh(new_clip)
    
    return new_clip
