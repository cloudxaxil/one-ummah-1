from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "One Ummah API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/oneummah"
    DATABASE_URL_SYNC: str = "postgresql://postgres:postgres@localhost:5432/oneummah"
    
    # JWT Authentication
    SECRET_KEY: str = "your-secret-key-change-in-production-use-openssl-rand-hex-32"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Admin
    ADMIN_EMAIL: str = "admin@oneummah.org"
    ADMIN_PASSWORD: str = "Admin@2024!Secure"
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000",
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
