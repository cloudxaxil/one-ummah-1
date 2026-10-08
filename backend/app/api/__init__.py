from fastapi import APIRouter

from app.api.auth import router as auth_router
from app.api.teachers import router as teachers_router
from app.api.verification import router as verification_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(teachers_router)
api_router.include_router(verification_router)

__all__ = ["api_router"]
