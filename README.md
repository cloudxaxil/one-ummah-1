# one-ummah-
# Islamic Learning, Research & Community Platform

> A scalable, professional Islamic knowledge ecosystem where students, teachers, researchers, and the wider Muslim community can learn, teach, research, publish, and communicate.

![Python Version](https://img.shields.io/badge/python-3.11+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg?logo=postgresql)
![CI/CD](https://github.com/your-org/islamic-platform/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

## 📖 Vision & Mission

This platform is not a quick prototype. It is engineered as a **real startup product** with clean architecture, strict security, comprehensive testing, and a living documentation system (Graphify). 

The goal is to build a maintainable, scalable codebase that serves the Ummah with reliable knowledge, respectful discourse, and high-quality educational tools.

## 🛠 Tech Stack

*   **Framework:** FastAPI (Python 3.11+)
*   **Database:** PostgreSQL 15+
*   **ORM & Migrations:** SQLAlchemy 2.0 (Async) + Alembic
*   **Validation:** Pydantic V2
*   **Authentication:** JWT (Access + Refresh) via `python-jose`, `passlib[bcrypt]`
*   **Testing:** `pytest`, `pytest-asyncio`, `httpx`
*   **Code Quality:** `ruff` (linting/formatting), `mypy` (type checking)
*   **Infrastructure:** Docker, GitHub Actions (CI/CD)

## 🏗 Architecture & Design Principles

We use a **Modular Monolith** architecture. The codebase is unified for startup agility but strictly separated by domain, allowing for future extraction into microservices if necessary.

### Core Principles:
1.  **No "Vibe-Coded" Monoliths:** Features are isolated in `app/modules/`. No massive `main.py` or `models.py` files.
2.  **Source of Truth:** The **Graphify/Neurograph** system tracks all features, APIs, models, and decisions. Code and Graphify must always agree.
3.  **Security First:** Backend enforces all permissions. Passwords are hashed (bcrypt). Inputs are strictly validated. No secrets in Git.
4.  **Test-Driven:** Every feature requires unit and integration tests before merging.

## 📂 Project Structure

```text
backend/
├── app/
│   ├── main.py                 # FastAPI app entry point
│   ├── core/                   # Config, security, dependencies
│   ├── db/                     # SQLAlchemy base, async session
│   ├── modules/                # Domain modules (Auth, Users, Teachers, etc.)
│   │   ├── auth/               # schemas, router, service, models
│   │   ├── users/              
│   │   ├── teachers/           
│   │   ├── students/           
│   │   └── common/             # Shared utils, pagination, exceptions
│   └── tests/                  # Pytest directory & fixtures
├── alembic/                    # Database migrations
├── requirements/               # base.txt, dev.txt, prod.txt
├── Dockerfile
├── docker-compose.yml          # Local dev environment
└── .github/workflows/ci.yml    # CI/CD pipeline
