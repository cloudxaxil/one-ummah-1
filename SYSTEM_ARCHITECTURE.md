# One Ummah - Complete System Architecture

## Overview

One Ummah is a comprehensive Islamic learning, research, and community platform with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Python + FastAPI + PostgreSQL
- **Authentication**: JWT-based with role-based access control

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  React + TypeScript + Vite + Tailwind CSS                   │
│  Port: 3000/5173                                            │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         │ JWT Bearer Token
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│  FastAPI + SQLAlchemy + Pydantic                            │
│  Port: 8000                                                 │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth System  │  │ Teacher APIs │  │ Verification │     │
│  │ (JWT + RBAC) │  │              │  │   System     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │ SQLAlchemy ORM
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE                                │
│  PostgreSQL 14+                                              │
│  Database: oneummah                                          │
│                                                              │
│  Tables:                                                     │
│  - users                                                     │
│  - teachers                                                  │
│  - teacher_certificates                                      │
│  - teacher_recitation_clips                                  │
│  - students                                                  │
│  - researchers                                               │
│  - researcher_academic_certificates                          │
│  - researcher_papers                                         │
│  - verification_requests                                     │
└─────────────────────────────────────────────────────────────┘
```

## User Roles & Permissions

### 1. Student
- **Can Register**: ✅ Yes
- **Can Access**:
  - Browse Quran, Hadith, Fiqh (public)
  - Browse research papers (public)
  - Find and view teachers
  - Request lessons from teachers
  - View own dashboard
  - Participate in community

### 2. Teacher
- **Can Register**: ✅ Yes
- **Can Access**:
  - All student features
  - Create/update teacher profile
  - Upload certificates
  - Upload recitation clips (audio/video)
  - Submit verification request
  - View student requests
  - Manage lessons

### 3. Researcher
- **Can Register**: ✅ Yes
- **Can Access**:
  - All student features
  - Create/update researcher profile
  - Upload academic credentials OR research papers
  - Submit verification request
  - Publish research papers
  - View citations

### 4. Admin
- **Can Register**: ❌ No (pre-configured credentials only)
- **Credentials**: admin@oneummah.org / Admin@2024!Secure
- **Can Access**:
  - All features
  - Review verification requests
  - Approve/reject verifications
  - Manage users (planned)
  - View system statistics
  - Moderate content

## Verification System

### Teacher Verification Requirements
1. **Certificates** (Required):
   - Islamic studies degrees
   - Ijazah certificates
   - Teaching certifications
   - Format: PDF, JPG, PNG

2. **Recitation Clips** (Required):
   - Audio clips (MP3, WAV)
   - Video clips (MP4, MOV)
   - Demonstrate Quran recitation with tajweed
   - Minimum 1 clip, recommended 2+ minutes

3. **Admin Review**:
   - Admin reviews all documents
   - Checks authenticity and quality
   - Approves or rejects with reason
   - Updates teacher verification status

### Researcher Verification Requirements
**Option A - Academic Credentials**:
- BA/MA/PhD in Islamic studies
- Degree certificates (PDF)
- University transcripts

**Option B - Research Papers** (No degree required):
- Published research papers
- Peer-reviewed articles
- Conference presentations
- Demonstrates research capability

**Admin Review**:
- Admin reviews credentials OR papers
- Verifies authenticity
- Approves or rejects with reason
- Updates researcher verification status

## Database Schema

### users
```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- hashed_password (VARCHAR)
- full_name (VARCHAR)
- role (ENUM: student, teacher, researcher, admin)
- bio (TEXT)
- avatar_url (VARCHAR)
- languages (JSONB)
- is_active (BOOLEAN)
- is_verified (BOOLEAN)
- email_verified (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### teachers
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users.id)
- headline (VARCHAR)
- bio (TEXT)
- experience_years (INTEGER)
- hourly_rate (FLOAT)
- currency (VARCHAR)
- subjects (JSONB)
- languages (JSONB)
- qualifications (JSONB)
- availability (JSONB)
- timezone (VARCHAR)
- total_students (INTEGER)
- total_lessons (INTEGER)
- rating (FLOAT)
- rating_count (INTEGER)
- is_verified (BOOLEAN)
- verification_status (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### teacher_certificates
```sql
- id (UUID, PK)
- teacher_id (UUID, FK -> teachers.id)
- file_name (VARCHAR)
- file_url (VARCHAR)
- file_type (VARCHAR)
- description (TEXT)
- created_at (TIMESTAMP)
```

### teacher_recitation_clips
```sql
- id (UUID, PK)
- teacher_id (UUID, FK -> teachers.id)
- file_name (VARCHAR)
- file_url (VARCHAR)
- media_type (VARCHAR: audio, video)
- duration_seconds (INTEGER)
- description (TEXT)
- created_at (TIMESTAMP)
```

### verification_requests
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users.id)
- role (VARCHAR: teacher, researcher)
- status (ENUM: pending, approved, rejected)
- additional_notes (TEXT)
- reviewed_by (UUID, FK -> users.id)
- reviewed_at (TIMESTAMP)
- rejection_reason (TEXT)
- submitted_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## API Authentication Flow

### 1. Registration
```
POST /api/v1/auth/register
{
  "email": "teacher@example.com",
  "password": "securepassword",
  "full_name": "Sheikh Ahmad",
  "role": "teacher"
}

Response: User object (without password)
```

### 2. Login
```
POST /api/v1/auth/login
{
  "email": "teacher@example.com",
  "password": "securepassword"
}

Response:
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```

### 3. Authenticated Request
```
GET /api/v1/teachers/me
Headers:
  Authorization: Bearer eyJ...

Response: Teacher profile
```

## Frontend-Backend Integration

### Current Status
- ✅ Frontend: Complete with all UI components
- ✅ Backend: Core API implemented
- 🔄 Integration: Frontend needs to connect to backend API

### Integration Steps

1. **Update Frontend API Client**:
   - Replace mock data with API calls
   - Add authentication token management
   - Handle API errors and loading states

2. **File Upload**:
   - Implement file upload to backend
   - Store files in cloud storage (S3/Cloudinary)
   - Return file URLs to frontend

3. **Real-time Features** (Future):
   - WebSocket for messaging
   - Real-time notifications
   - Live lesson updates

## Deployment Architecture

### Development
```
Frontend: localhost:3000 (Vite dev server)
Backend: localhost:8000 (Uvicorn)
Database: localhost:5432 (PostgreSQL)
```

### Production
```
┌─────────────────┐
│   Load Balancer │
│   (nginx/ALB)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│  FE  │  │  BE  │
│React │  │FastAPI│
│Static│  │Gunicorn│
└──────┘  └───┬──┘
              │
         ┌────▼────┐
         │   DB    │
         │PostgreSQL│
         └─────────┘
```

## Security Checklist

- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ CORS configuration
- ✅ Input validation (Pydantic)
- ✅ SQL injection prevention (ORM)
- ✅ Admin credentials pre-configured
- ✅ Token expiration
- 🔄 Rate limiting (planned)
- 🔄 File upload validation (planned)
- 🔄 HTTPS in production (required)
- 🔄 Environment variable security (required)

## Next Steps

### Immediate
1. Connect frontend to backend API
2. Implement file upload system
3. Add email verification
4. Create admin dashboard in frontend

### Short-term
1. Add student-teacher lesson system
2. Implement payment integration
3. Add video call integration
4. Create mobile app

### Long-term
1. Add AI-powered features
2. Implement advanced search
3. Add multi-language support
4. Create analytics dashboard

## Documentation

- **Frontend**: See `/README.md`
- **Backend**: See `/backend/README.md`
- **API Docs**: http://localhost:8000/docs (when running)

## Support

For issues and questions, please open an issue on GitHub.

---

**Built with intention to serve the Ummah**

*"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise."* — Prophet Muhammad ﷺ
