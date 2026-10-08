# One Ummah Backend API

FastAPI backend for the One Ummah Islamic learning platform.

## Architecture

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── models/              # SQLAlchemy models
│   │   ├── user.py
│   │   ├── teacher.py
│   │   ├── student.py
│   │   ├── researcher.py
│   │   └── verification.py
│   ├── schemas/             # Pydantic schemas
│   │   ├── user.py
│   │   ├── teacher.py
│   │   ├── student.py
│   │   ├── researcher.py
│   │   └── verification.py
│   ├── api/                 # API routes
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── teachers.py
│   │   ├── students.py
│   │   ├── researchers.py
│   │   └── verification.py
│   ├── core/                # Core functionality
│   │   ├── security.py      # Authentication & authorization
│   │   └── dependencies.py  # Dependency injection
│   └── utils/               # Utility functions
├── alembic/                 # Database migrations
├── tests/                   # Test suite
├── requirements.txt
├── .env.example
└── README.md
```

## Features

### Authentication & Authorization
- JWT-based authentication with access and refresh tokens
- Role-based access control (RBAC): Student, Teacher, Researcher, Admin
- Secure password hashing with bcrypt
- Pre-configured admin account (cannot be self-registered)

### User Management
- User registration (Student, Teacher, Researcher only)
- User login with JWT tokens
- Profile management
- Email verification (planned)

### Teacher Features
- Create and update teacher profiles
- Upload certificates and qualifications
- Upload recitation clips (audio/video)
- Verification system with admin approval
- Search and filter teachers

### Researcher Features
- Create and update researcher profiles
- Upload academic credentials OR published research papers
- Verification system with admin approval
- Research paper management (planned)

### Admin Features
- Review verification requests
- Approve/reject teacher and researcher verifications
- View detailed verification documents
- Manage users (planned)

## Setup Instructions

### Prerequisites
- Python 3.11+
- PostgreSQL 14+
- pip

### Installation

1. **Clone the repository and navigate to backend directory:**
```bash
cd backend
```

2. **Create a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and update:
- `DATABASE_URL`: Your PostgreSQL connection string
- `SECRET_KEY`: Generate a secure random key (use `openssl rand -hex 32`)
- `ADMIN_PASSWORD`: Change the default admin password

5. **Create PostgreSQL database:**
```bash
createdb oneummah
# Or using psql:
# CREATE DATABASE oneummah;
```

6. **Run the application:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Database Models

### User
- Base user with authentication
- Roles: student, teacher, researcher, admin
- Profile information

### Teacher
- Professional information (headline, bio, experience)
- Subjects and languages taught
- Hourly rate and availability
- Verification status
- Certificates and recitation clips

### Student
- Learning goals and level
- Languages
- Lesson statistics

### Researcher
- Academic credentials
- Specializations
- Research papers
- Verification status

### VerificationRequest
- Tracks verification requests for teachers and researchers
- Status: pending, approved, rejected
- Review information

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get tokens
- `GET /api/v1/auth/me` - Get current user info

### Teachers
- `GET /api/v1/teachers/` - List all teachers
- `GET /api/v1/teachers/{id}` - Get teacher details
- `POST /api/v1/teachers/` - Create teacher profile
- `PUT /api/v1/teachers/me` - Update own profile
- `POST /api/v1/teachers/me/certificates` - Add certificate
- `POST /api/v1/teachers/me/recitation-clips` - Add recitation clip

### Verification
- `POST /api/v1/verification/submit` - Submit verification request
- `GET /api/v1/verification/my-status` - Get own verification status
- `GET /api/v1/verification/admin/stats` - Get verification statistics (admin)
- `GET /api/v1/verification/admin/requests` - List all requests (admin)
- `GET /api/v1/verification/admin/requests/{id}` - Get request details (admin)
- `POST /api/v1/verification/admin/requests/{id}/review` - Review request (admin)

## Authentication Flow

1. **Registration:**
   - User registers with email, password, and role
   - Admin accounts cannot be self-registered
   - Returns user object

2. **Login:**
   - User logs in with email and password
   - Returns JWT access token (30 min) and refresh token (7 days)
   - Admin login validates against pre-configured credentials

3. **Authenticated Requests:**
   - Include `Authorization: Bearer <access_token>` header
   - Token contains user ID and role
   - Role-based access control enforced

## Verification Flow

### Teacher Verification
1. Teacher creates profile
2. Teacher uploads certificates (PDF/images)
3. Teacher uploads recitation clips (audio/video)
4. Teacher submits verification request
5. Admin reviews documents
6. Admin approves or rejects with reason
7. Teacher profile marked as verified

### Researcher Verification
1. Researcher creates profile
2. Researcher uploads EITHER:
   - Academic credentials (degrees), OR
   - Published research papers (as proof of expertise)
3. Researcher submits verification request
4. Admin reviews documents
5. Admin approves or rejects with reason
6. Researcher profile marked as verified

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ CORS configuration
- ✅ Input validation with Pydantic
- ✅ SQL injection prevention (SQLAlchemy ORM)
- ✅ Admin credentials pre-configured (not self-registerable)
- ✅ Token expiration

## Testing

```bash
pytest
```

## Development

### Run with hot reload:
```bash
uvicorn app.main:app --reload
```

### Database migrations (when using Alembic):
```bash
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## Production Deployment

1. Set `DEBUG=False` in `.env`
2. Use a strong `SECRET_KEY`
3. Change default admin password
4. Use production PostgreSQL with proper backups
5. Deploy with gunicorn:
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```
6. Use reverse proxy (nginx) with SSL
7. Set up monitoring and logging

## Environment Variables

See `.env.example` for all available configuration options.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

**Built with intention to serve the Ummah**
