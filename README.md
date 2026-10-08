# One Ummah

A comprehensive Islamic learning, research, and community platform built with React, FastAPI, and PostgreSQL.

## 🌟 Features

- **Quran & Hadith**: Access authentic Islamic texts with translations
- **Teacher Platform**: Connect with qualified Islamic teachers
- **Research Hub**: Publish and access Islamic research papers
- **Community**: Discussion forums and Q&A
- **Verification System**: Admin-approved teacher and researcher credentials

## 🏗️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router

**Backend:**
- FastAPI (Python 3.11+)
- PostgreSQL
- SQLAlchemy
- JWT Authentication

## 📁 Project Structure

```
one-ummah/
├── src/                    # Frontend (React)
├── backend/                # Backend (FastAPI)
├── .github/workflows/      # CI/CD
├── README.md              # This file
├── QUICKSTART.md          # Setup guide
├── SYSTEM_ARCHITECTURE.md # Technical details
└── PROJECT_SUMMARY.md     # Feature overview
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+

### Frontend Setup
```bash
npm install
npm run dev
```
Visit: http://localhost:5173

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database credentials
uvicorn app.main:app --reload
```
Visit: http://localhost:8000/docs

## 🔐 Demo Accounts

**Admin** (pre-configured):
- Email: `admin@oneummah.org`
- Password: `Admin@2024!Secure`

**Regular users** (any password):
- Teacher: `teacher@oneummah.org`
- Student: `student@oneummah.org`
- Researcher: `researcher@oneummah.org`

## 📚 Documentation

- [Quick Start Guide](QUICKSTART.md) - Detailed setup instructions
- [System Architecture](SYSTEM_ARCHITECTURE.md) - Technical architecture
- [Project Summary](PROJECT_SUMMARY.md) - Complete feature list
- [Backend Docs](backend/README.md) - API documentation
- [Contributing](CONTRIBUTING.md) - How to contribute

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

Built with the intention to serve the Muslim community and facilitate Islamic learning.

*"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise."* — Prophet Muhammad ﷺ
