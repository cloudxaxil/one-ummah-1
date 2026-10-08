# CI/CD Guide - Write Your Own

This guide will help you understand and write your own CI/CD pipeline for One Ummah.

## What is CI/CD?

**CI (Continuous Integration)**: Automatically test your code when you push
**CD (Continuous Deployment)**: Automatically deploy when tests pass

## Why You Need It

- Catch bugs before they reach production
- Ensure code quality
- Automate repetitive tasks
- Deploy with confidence

## File Location

Create this file: `.github/workflows/ci.yml`

GitHub Actions looks for workflows in this exact location.

## Basic Structure

Every GitHub Actions workflow has this structure:

```yaml
name: Name of your workflow

on:
  # When to run this workflow
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  # What to do
  job-name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4  # Get your code
      - name: Step name
        run: command to run
```

## Your Project Needs

You have two parts:
1. **Frontend** (React) - needs Node.js
2. **Backend** (FastAPI) - needs Python + PostgreSQL

So you need **two jobs** or one job with multiple steps.

## Template for Your CI/CD

Here's a template you can customize:

```yaml
name: One Ummah CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  # Job 1: Frontend
  frontend:
    runs-on: ubuntu-latest
    
    steps:
      - name: Get code
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Type check
        run: npm run typecheck
      
      - name: Build
        run: npm run build

  # Job 2: Backend
  backend:
    runs-on: ubuntu-latest
    
    # Backend needs PostgreSQL
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: oneummah_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - name: Get code
        uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        working-directory: ./backend
        run: |
          pip install -r requirements.txt
      
      - name: Run tests
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql+asyncpg://postgres:postgres@localhost:5432/oneummah_test
        run: pytest
```

## Key Concepts Explained

### `on:` - When to run
```yaml
on:
  push:
    branches: [ main ]  # Run when pushing to main
  pull_request:
    branches: [ main ]  # Run on PRs to main
```

### `jobs:` - What to do
Each job runs on a fresh virtual machine.

### `runs-on:` - Where to run
- `ubuntu-latest` - Linux (most common)
- `windows-latest` - Windows
- `macos-latest` - macOS

### `steps:` - Individual tasks
Each step is a command or action.

### `uses:` - Pre-made actions
GitHub provides ready-made actions like:
- `actions/checkout@v4` - Get your code
- `actions/setup-node@v4` - Install Node.js
- `actions/setup-python@v5` - Install Python

### `run:` - Commands to execute
Any bash command you want to run.

### `env:` - Environment variables
Set environment variables for your commands.

### `services:` - Databases and other services
For backend, you need PostgreSQL running.

### `working-directory:` - Where to run commands
Since backend is in `/backend` folder.

## Common Commands

### Frontend (React)
```bash
npm install          # Install dependencies
npm run typecheck    # Check TypeScript
npm run build        # Build for production
npm test             # Run tests (if you have them)
```

### Backend (FastAPI)
```bash
pip install -r requirements.txt  # Install dependencies
pytest                           # Run tests
ruff check app/                  # Lint code
mypy app/                        # Type check
```

## Environment Variables

For secrets (like API keys), use GitHub Secrets:

1. Go to repository Settings → Secrets → Actions
2. Add your secrets (e.g., `DATABASE_URL`, `SECRET_KEY`)
3. Use them in workflow:

```yaml
env:
  SECRET_KEY: ${{ secrets.SECRET_KEY }}
```

## Testing Your Workflow

1. Create the file: `.github/workflows/ci.yml`
2. Commit and push:
   ```bash
   git add .github/workflows/ci.yml
   git commit -m "Add CI/CD workflow"
   git push
   ```
3. Go to your GitHub repo → Actions tab
4. You'll see your workflow running

## Debugging

If it fails:
1. Click on the failed run in Actions tab
2. Click on the failed job
3. Click on the failed step
4. Read the error message
5. Fix and push again

## Next Steps

1. Write your workflow file
2. Test it works
3. Add more checks as needed:
   - Security scanning
   - Code coverage
   - Deployment (when ready)

## Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Pre-made Actions](https://github.com/marketplace?type=actions)

## Questions?

- What triggers do you want? (push, PR, manual?)
- What tests do you need to run?
- Do you need deployment too?

Let me know what you want to customize!
