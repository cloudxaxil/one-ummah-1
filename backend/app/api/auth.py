from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.user import User, UserRole
from app.schemas.user import UserCreate, UserLogin, Token, UserResponse
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
    get_current_user,
)
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    """Register a new user."""
    # Check if user already exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    # Prevent admin registration
    if user_data.role == UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin accounts cannot be self-registered",
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        full_name=user_data.full_name,
        role=user_data.role,
    )
    
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    return new_user


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    """Login and get access token."""
    # Check for admin credentials
    if credentials.email == settings.ADMIN_EMAIL:
        if credentials.password == settings.ADMIN_PASSWORD:
            # Get or create admin user
            result = await db.execute(select(User).where(User.email == settings.ADMIN_EMAIL))
            admin_user = result.scalar_one_or_none()
            
            if not admin_user:
                # Create admin user if doesn't exist
                admin_user = User(
                    email=settings.ADMIN_EMAIL,
                    hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                    full_name="Admin Team",
                    role=UserRole.ADMIN,
                    is_active=True,
                    is_verified=True,
                )
                db.add(admin_user)
                await db.commit()
                await db.refresh(admin_user)
            
            # Create tokens
            access_token = create_access_token(data={"sub": str(admin_user.id), "role": admin_user.role})
            refresh_token = create_refresh_token(data={"sub": str(admin_user.id), "role": admin_user.role})
            
            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer",
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid admin credentials",
            )
    
    # Regular user login
    result = await db.execute(select(User).where(User.email == credentials.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated",
        )
    
    # Create tokens
    access_token = create_access_token(data={"sub": str(user.id), "role": user.role})
    refresh_token = create_refresh_token(data={"sub": str(user.id), "role": user.role})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get current user information."""
    return current_user
