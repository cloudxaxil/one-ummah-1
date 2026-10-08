# One Ummah - Quick Start Guide

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 14+
- **Git**

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd one-ummah
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env and update:
# - DATABASE_URL (your PostgreSQL connection)
# - SECRET_KEY (generate with: openssl rand -hex 32)
# - ADMIN_PASSWORD (change from default)

# Create database
createdb oneummah
# Or using psql: psql -c "CREATE DATABASE oneummah;"

# Run the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**
API Documentation: **http://localhost:8000/docs**

### 3. Setup Frontend

Open a new terminal:

```bash
# Navigate to project root (if not already there)
cd /path/to/one-ummah

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## Default Accounts

### Admin Account (Pre-configured)
- **Email**: admin@oneummah.org
- **Password**: Admin@2024!Secure
- **Note**: Cannot be changed through registration

### Demo Accounts (Any password works)
- **Teacher**: teacher@oneummah.org
- **Student**: student@oneummah.org
- **Researcher**: researcher@oneummah.org

## Testing the System

### 1. Register a Teacher
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newteacher@example.com",
    "password": "password123",
    "full_name": "Sheikh Ahmad",
    "role": "teacher"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newteacher@example.com",
    "password": "password123"
  }'
```

Save the `access_token` from the response.

### 3. Create Teacher Profile
```bash
curl -X POST http://localhost:8000/api/v1/teachers/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "headline": "Quran Teacher with 10 years experience",
    "bio": "Specialized in Tajweed and Hifz",
    "experience_years": 10,
    "hourly_rate": 25,
    "subjects": ["Quran", "Tajweed", "Arabic"],
    "languages": ["English", "Arabic"]
  }'
```

### 4. Submit Verification Request
```bash
curl -X POST http://localhost:8000/api/v1/verification/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "role": "teacher",
    "additional_notes": "I have ijazah from Al-Azhar University"
  }'
```

### 5. Login as Admin and Review
```bash
# Login as admin
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@oneummah.org",
    "password": "Admin@2024!Secure"
  }'

# Save admin access token, then view pending requests
curl http://localhost:8000/api/v1/verification/admin/requests \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```

## Using the Frontend

1. **Visit** http://localhost:5173
2. **Browse** Quran, Hadith, Fiqh (no login required)
3. **Register** as a teacher, student, or researcher
4. **Login** with your credentials
5. **Teachers**: Complete profile and submit verification
6. **Admin**: Login with admin credentials to review verifications

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l | grep oneummah`
- Check `.env` file has correct DATABASE_URL

### Frontend won't start
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version: `node --version` (should be 18+)

### Database connection errors
- Verify PostgreSQL is running
- Check credentials in `.env`
- Try connecting manually: `psql -U postgres -d oneummah`

### CORS errors
- Ensure backend CORS_ORIGINS includes frontend URL
- Default: `["http://localhost:3000","http://localhost:5173"]`

## Development Workflow

### Backend Development
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend Development
```bash
npm run dev
```

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend type checking
npm run typecheck
```

## Production Deployment

### Backend
```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend
```bash
# Build for production
npm run build

# Serve with nginx or deploy to Vercel/Netlify
```

### Database
- Use managed PostgreSQL (AWS RDS, DigitalOcean, etc.)
- Set up automated backups
- Use connection pooling for production

## Next Steps

1. ✅ Backend API is ready
2. ✅ Frontend UI is complete
3. 🔄 Connect frontend to backend API
4. 🔄 Implement file upload system
5. 🔄 Add email verification
6. 🔄 Deploy to production

## Support

- **Backend Issues**: Check `/backend/README.md`
- **Frontend Issues**: Check `/README.md`
- **Architecture**: See `/SYSTEM_ARCHITECTURE.md`
- **API Docs**: http://localhost:8000/docs

---

**Happy coding! 🚀**

*"The seeking of knowledge is obligatory for every Muslim."* — Prophet Muhammad ﷺ
