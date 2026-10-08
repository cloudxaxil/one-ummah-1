import { GitBranch, Database, Shield, Server, Layers, CheckCircle, Clock, ArrowRight, AlertTriangle } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  type: 'feature' | 'api' | 'model' | 'test' | 'decision' | 'module' | 'status';
  status: 'completed' | 'in-progress' | 'planned' | 'blocked';
  connections: string[];
}

const GRAPH_NODES: GraphNode[] = [
  // Phase 1: Foundation
  { id: 'auth', label: 'Authentication System', type: 'feature', status: 'completed', connections: ['jwt', 'rbac', 'users-table'] },
  { id: 'jwt', label: 'JWT Token Management', type: 'module', status: 'completed', connections: ['auth'] },
  { id: 'rbac', label: 'Role-Based Access Control', type: 'feature', status: 'completed', connections: ['auth', 'teacher-profile', 'student-profile'] },
  { id: 'users-table', label: 'Users Table (PostgreSQL)', type: 'model', status: 'completed', connections: ['auth', 'teacher-profile', 'student-profile'] },
  
  // Phase 1: Profiles
  { id: 'teacher-profile', label: 'Teacher Profile System', type: 'feature', status: 'completed', connections: ['users-table', 'POST /teachers/register', 'test_teacher_profile'] },
  { id: 'student-profile', label: 'Student Profile System', type: 'feature', status: 'completed', connections: ['users-table', 'POST /students/register', 'test_student_profile'] },
  { id: 'POST /teachers/register', label: 'POST /api/v1/teachers/register', type: 'api', status: 'completed', connections: ['teacher-profile', 'teacher-schema'] },
  { id: 'POST /students/register', label: 'POST /api/v1/students/register', type: 'api', status: 'completed', connections: ['student-profile', 'student-schema'] },
  { id: 'teacher-schema', label: 'TeacherCreate / TeacherResponse', type: 'model', status: 'completed', connections: ['POST /teachers/register'] },
  { id: 'student-schema', label: 'StudentCreate / StudentResponse', type: 'model', status: 'completed', connections: ['POST /students/register'] },
  
  // Phase 1: Search & Requests
  { id: 'teacher-search', label: 'Teacher Search & Discovery', type: 'feature', status: 'completed', connections: ['GET /teachers', 'test_teacher_search'] },
  { id: 'GET /teachers', label: 'GET /api/v1/teachers?subject=&lang=', type: 'api', status: 'completed', connections: ['teacher-search'] },
  { id: 'lesson-request', label: 'Lesson Request System', type: 'feature', status: 'in-progress', connections: ['POST /requests', 'requests-table', 'test_lesson_request'] },
  { id: 'POST /requests', label: 'POST /api/v1/requests', type: 'api', status: 'in-progress', connections: ['lesson-request'] },
  { id: 'requests-table', label: 'lesson_requests table', type: 'model', status: 'in-progress', connections: ['lesson-request'] },
  
  // Phase 2: Knowledge
  { id: 'quran-module', label: 'Quran Module', type: 'feature', status: 'planned', connections: ['surahs-table', 'ayahs-table', 'GET /quran/surahs'] },
  { id: 'hadith-module', label: 'Hadith Module', type: 'feature', status: 'planned', connections: ['collections-table', 'hadiths-table', 'GET /hadith/collections'] },
  { id: 'research-module', label: 'Research Papers Module', type: 'feature', status: 'planned', connections: ['papers-table', 'GET /research/papers'] },
  { id: 'community-module', label: 'Community & Forums', type: 'feature', status: 'planned', connections: ['topics-table', 'posts-table', 'moderation'] },
  { id: 'fiqh-module', label: 'Fiqh Comparison Module', type: 'feature', status: 'planned', connections: ['schools-table', 'rulings-table'] },
  
  // Infrastructure
  { id: 'docker', label: 'Docker Configuration', type: 'module', status: 'completed', connections: ['ci-cd'] },
  { id: 'ci-cd', label: 'GitHub Actions CI/CD', type: 'module', status: 'completed', connections: ['docker', 'tests'] },
  { id: 'tests', label: 'Test Suite (pytest)', type: 'module', status: 'in-progress', connections: ['ci-cd'] },
  { id: 'moderation', label: 'Content Moderation System', type: 'feature', status: 'planned', connections: ['community-module'] },
];

// Architecture decisions
const DECISIONS = [
  {
    id: 'd-1',
    title: 'FastAPI for Backend',
    decision: 'Using FastAPI with async support for the REST API layer.',
    rationale: 'Type safety via Pydantic, automatic OpenAPI docs, async performance, and strong Python ecosystem for data processing.',
    alternatives: ['Django REST Framework', 'Flask'],
    status: 'completed' as const,
  },
  {
    id: 'd-2',
    title: 'PostgreSQL as Primary Database',
    decision: 'PostgreSQL with SQLAlchemy ORM and Alembic migrations.',
    rationale: 'Robust relational data model needed for users, profiles, relationships. Full-text search capabilities for Quran/Hadith.',
    alternatives: ['MySQL', 'MongoDB'],
    status: 'completed' as const,
  },
  {
    id: 'd-3',
    title: 'JWT with Refresh Tokens',
    decision: 'Access tokens (15min) + refresh tokens (7 days) stored securely.',
    rationale: 'Balance between security (short-lived access) and UX (longer refresh). HttpOnly cookies for refresh tokens.',
    alternatives: ['Session-based auth', 'OAuth2 only'],
    status: 'completed' as const,
  },
  {
    id: 'd-4',
    title: 'Modular Monolith Architecture',
    decision: 'Single deployable with clear module boundaries, not microservices.',
    rationale: 'Team size and complexity don\'t justify microservices yet. Modules can be extracted later if needed.',
    alternatives: ['Microservices', 'Serverless'],
    status: 'completed' as const,
  },
  {
    id: 'd-5',
    title: 'Separate Quran/Hadith Database',
    decision: 'Read-only database for Quran/Hadith text data, separate from user data.',
    rationale: 'Large static datasets with different access patterns. Allows independent scaling and caching.',
    alternatives: ['Same database', 'External API'],
    status: 'planned' as const,
  },
];

export function ArchitecturePage() {
  const completed = GRAPH_NODES.filter(n => n.status === 'completed').length;
  const inProgress = GRAPH_NODES.filter(n => n.status === 'in-progress').length;
  const planned = GRAPH_NODES.filter(n => n.status === 'planned').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold">Architecture & Graphify</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">
            The living knowledge graph of this project. Every feature, API, model, and decision is tracked here as the source of truth.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completed}</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{inProgress}</p>
                <p className="text-sm text-gray-500">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{planned}</p>
                <p className="text-sm text-gray-500">Planned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Development Pipeline */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Engineering Pipeline</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {['Requirements', 'Architecture', 'Database Design', 'API Design', 'Implementation', 'Tests', 'Code Review', 'CI/CD', 'Deployment', 'Monitoring'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-lg ${
                  i < 5 ? 'bg-emerald-50 text-emerald-700 font-medium' : i === 5 ? 'bg-amber-50 text-amber-700 font-medium' : 'bg-gray-50 text-gray-500'
                }`}>
                  {step}
                </span>
                {i < 9 && <ArrowRight className="w-4 h-4 text-gray-300" />}
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Graph */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Knowledge Graph (Graphify)</h2>
          <p className="text-sm text-gray-500 mb-6">
            Each node represents a component in the system. Connections show dependencies and relationships.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {GRAPH_NODES.map(node => (
              <div
                key={node.id}
                className={`p-3 rounded-lg border text-sm ${
                  node.status === 'completed' ? 'bg-green-50 border-green-200' :
                  node.status === 'in-progress' ? 'bg-amber-50 border-amber-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <NodeIcon type={node.type} />
                  <span className="font-medium text-gray-800 text-xs">{node.label}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    node.status === 'completed' ? 'bg-green-100 text-green-700' :
                    node.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {node.status}
                  </span>
                  <span className="text-xs text-gray-400">{node.connections.length} deps</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Decisions */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Architecture Decisions</h2>
          <div className="space-y-4">
            {DECISIONS.map(decision => (
              <div key={decision.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{decision.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    decision.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {decision.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{decision.decision}</p>
                <p className="text-sm text-gray-500 mb-2"><strong>Rationale:</strong> {decision.rationale}</p>
                <p className="text-xs text-gray-400">Alternatives considered: {decision.alternatives.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-600" /> Backend Stack
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Python 3.11+ with FastAPI</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> PostgreSQL + SQLAlchemy + Alembic</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Pydantic v2 for validation</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> JWT auth (python-jose + passlib)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> pytest + httpx for testing</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Docker + Docker Compose</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> Redis for caching (planned)</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> Celery for async tasks (planned)</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" /> Security Measures
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> bcrypt password hashing</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> JWT with short-lived access tokens</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Role-based authorization (RBAC)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Input validation (Pydantic)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> CORS configuration</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Rate limiting (slowapi)</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> Audit logging (planned)</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> File upload validation (planned)</li>
            </ul>
          </div>
        </div>

        {/* CI/CD Pipeline */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" /> CI/CD Pipeline (GitHub Actions)
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
            <pre>{`# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Ruff Linting
        run: ruff check .
      - name: MyPy Type Check
        run: mypy src/

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: oneummah_test
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: pytest --cov=src --cov-report=xml

  security:
    runs-on: ubuntu-latest
    steps:
      - name: Safety Check
        run: safety check
      - name: Bandit Security
        run: bandit -r src/

  build:
    needs: [lint, test, security]
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker Image
        run: docker build -t one-ummah .`}</pre>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800 mb-1">About This Architecture Page</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                This page represents the Graphify concept — a living documentation of the project's architecture. 
                In a full implementation, this would be backed by a database that auto-updates as code changes are made. 
                The frontend here is a React application; the production backend uses FastAPI + PostgreSQL as described above.
                The Graphify graph should always be the source of truth for understanding what exists and what's planned.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NodeIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    feature: <Layers className="w-3 h-3 text-emerald-600" />,
    api: <Server className="w-3 h-3 text-blue-600" />,
    model: <Database className="w-3 h-3 text-purple-600" />,
    test: <CheckCircle className="w-3 h-3 text-green-600" />,
    module: <GitBranch className="w-3 h-3 text-orange-600" />,
    decision: <Shield className="w-3 h-3 text-red-600" />,
    status: <Clock className="w-3 h-3 text-gray-600" />,
  };
  return <>{icons[type] || <Layers className="w-3 h-3 text-gray-600" />}</>;
}
