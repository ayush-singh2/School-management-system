# Modern School OS — SaaS Platform

An AI-powered school management platform built as a Turborepo monorepo. Replaces fragmented ERPs with a unified system for students, parents, teachers, accountants, principals, and admins — with a Groq LLaMA-powered AI layer across every portal.

---

## Architecture Overview

```
School-management-system/
├── apps/
│   ├── web/              # Next.js 15 — SaaS web portal (main app)
│   └── mobile/           # Expo React Native — parent/student app
├── services/
│   ├── api/              # NestJS 10 — REST API + Prisma ORM
│   └── ai/               # FastAPI — AI microservice (Groq LLaMA-3.3)
├── packages/
│   ├── ui/               # Shared React components
│   ├── types/            # Shared TypeScript types
│   ├── config/           # ESLint / TS configs
│   └── utils/            # Shared utilities
├── infrastructure/
│   └── docker/           # Docker Compose for local Postgres + Redis
└── school_website/       # Public marketing site (Next.js)
```

**Tech stack:**
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Radix UI, TanStack Query
- **Backend:** NestJS 10, Prisma ORM, PostgreSQL 16, Redis 7
- **AI layer:** FastAPI, LangChain, Groq LLaMA-3.3-70b, ChromaDB, HuggingFace embeddings
- **Monorepo:** Turborepo + pnpm workspaces
- **Auth:** JWT (httpOnly cookie), role-based portal routing

---

## Prerequisites

Make sure you have these installed on your machine:

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20+ | https://nodejs.org |
| pnpm | 9+ | `npm install -g pnpm` |
| Python | 3.11+ | https://python.org |
| Docker | any | https://docs.docker.com/get-docker/ |
| Git | any | https://git-scm.com |

---

## Quick Start (First Time Setup)

### 1. Clone the repo

```bash
git clone https://github.com/ayush-singh2/School-management-system.git
cd School-management-system
```

### 2. Install all dependencies

```bash
pnpm install
```

> If `pnpm` is not found: `npm install -g pnpm` then retry.

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
# REQUIRED for AI features — get a free key at console.groq.com
GROQ_API_KEY="gsk_xxxxxxxxxxxxxxxxxxxx"

# Leave others as-is for local development
```

The database URL in `.env` is pre-configured to match the Docker container below. You only need to change it if you are using an external Postgres instance.

### 4. Start databases (Docker)

```bash
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d
```

This starts:
- **PostgreSQL 16** on port `5433` (mapped to avoid conflict with any local Postgres)
- **Redis 7** on port `6380`

Verify they are running:
```bash
docker ps
```

### 5. Set up the database schema + seed data

```bash
cd services/api
pnpm prisma migrate dev --name init
pnpm prisma db seed
cd ../..
```

This creates all tables and inserts demo users for all 6 roles.

### 6. Set up the Python AI service

```bash
cd services/ai
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ../..
```

---

## Running the App

You need **four terminals** running simultaneously (or use the Turborepo dev command for a single terminal):

### Option A — Single command (recommended)

```bash
pnpm dev
```

Turborepo starts the web app and API together. Watch the terminal output for port info.

### Option B — Manual (one terminal each)

**Terminal 1 — NestJS API**
```bash
cd services/api
pnpm dev
# Runs on http://localhost:3000
```

**Terminal 2 — Next.js Web App**
```bash
cd apps/web
pnpm dev
# Runs on http://localhost:3001
```

**Terminal 3 — AI Microservice**
```bash
cd services/ai
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
# Runs on http://localhost:8000
```

**Terminal 4 — Databases (keep running)**
```bash
docker compose -f infrastructure/docker/docker-compose.dev.yml up
```

---

## URLs

| Service | URL |
|---------|-----|
| Web App (SaaS Portal) | http://localhost:3001 |
| NestJS API | http://localhost:3000 |
| API Swagger Docs | http://localhost:3000/api |
| AI Microservice | http://localhost:8000 |
| AI API Docs | http://localhost:8000/docs |

---

## Demo Login Credentials

All accounts belong to **Jitendra Public School** (the seeded demo school).

| Role | Email | Password |
|------|-------|----------|
| Student | student@school.edu | Password123! |
| Parent | parent@school.edu | Password123! |
| Teacher | teacher@school.edu | Password123! |
| Accountant | accountant@school.edu | Password123! |
| Principal | principal@school.edu | Password123! |
| Admin | admin@school.edu | Password123! |

Each role is redirected to its own portal with relevant AI-powered dashboard.

---

## Project Structure — Key Files

```
apps/web/src/
├── app/
│   ├── (auth)/login/         # Login page with role quick-fill cards
│   ├── dashboard/
│   │   ├── student/          # Student portal
│   │   ├── parent/           # Parent portal
│   │   ├── teacher/          # Teacher portal
│   │   ├── accountant/       # Accounts portal
│   │   ├── principal/        # Principal overview
│   │   └── admin/            # Admin console
│   ├── crm/leads/            # Admission CRM pipeline
│   └── api/auth/             # Next.js API route (proxies to NestJS)
├── components/
│   ├── shared/
│   │   ├── Sidebar.tsx        # Dark sidebar with nav + user footer
│   │   ├── StatCard.tsx       # Metric card with icon + variant
│   │   └── Topbar.tsx         # Page header with notification bell
│   └── ai/
│       └── AIInsight.tsx      # AI response card (5 types)
└── middleware.ts              # JWT check + role-based redirect

services/api/
├── prisma/
│   ├── schema.prisma          # Full multi-tenant DB schema
│   └── seed.ts                # Demo data seeder
└── src/modules/
    ├── auth/                  # JWT login/register
    ├── student/
    ├── teacher/
    ├── fee/
    └── admission/

services/ai/app/
├── main.py                    # FastAPI entrypoint
├── config.py                  # Pydantic settings (reads .env)
├── routers/
│   ├── admission.py           # RAG chatbot for admissions
│   ├── student_coach.py       # Student AI coach
│   ├── parent_report.py       # Parent insight reports
│   ├── teacher_copilot.py     # Teacher lesson + question gen
│   ├── principal_analytics.py # School health executive summary
│   └── fee_recovery.py        # Defaulter recovery suggestions
└── services/
    ├── llm.py                 # Groq / OpenAI / Anthropic factory
    └── rag.py                 # ChromaDB + HuggingFace embeddings
```

---

## Environment Variables Reference

All variables live in a single `.env` file at the repo root. Both Node services and the Python AI service read from it.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Change before deploying |
| `GROQ_API_KEY` | Yes* | Free at console.groq.com — powers all AI features |
| `NEXT_PUBLIC_API_URL` | Yes | URL of the NestJS API |
| `NEXT_PUBLIC_AI_URL` | Yes | URL of the AI microservice |
| `REDIS_URL` | Yes | Redis connection string |
| `OPENAI_API_KEY` | No | Optional — only for GPT-4o or OpenAI embeddings |
| `ANTHROPIC_API_KEY` | No | Optional — for Claude fallback |
| `AWS_*` | No | Only for file uploads / S3 storage |
| `SMTP_*` | No | Only for email notifications |
| `TWILIO_*` | No | Only for SMS / WhatsApp reminders |

> *AI features degrade gracefully without `GROQ_API_KEY` — the app still works, just without AI insights.

---

## Common Issues

**`pnpm` not found**
```bash
npm install -g pnpm
# If permission error, install to local prefix:
npm install -g pnpm --prefix ~/.local
export PATH="$HOME/.local/bin:$PATH"
```

**Port 5432/6379 already in use**
The Docker Compose is pre-configured to use ports `5433` (Postgres) and `6380` (Redis) to avoid conflict with any locally installed services. If you still hit conflicts, edit `infrastructure/docker/docker-compose.dev.yml` and change the host port (left side of `:`).

**Prisma migration fails**
Make sure Docker containers are running first:
```bash
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d
# Then:
cd services/api && pnpm prisma migrate dev
```

**AI service: `pydantic` validation error on startup**
The `.env` file contains some Node-specific keys that Python's pydantic ignores (`extra = "ignore"` is set in `config.py`). This is expected — ignore those warnings.

**`Cannot find module` error in Next.js**
The dev server has a stale cache. Delete `.next` and restart:
```bash
cd apps/web && rm -rf .next && pnpm dev
```

---

## Git Workflow

We use a simple feature-branch workflow:

```bash
# Start a new feature
git checkout -b feature/your-feature-name

# After making changes
git add <files>
git commit -m "feat: describe your change"
git push origin feature/your-feature-name

# Open a Pull Request on GitHub into main
```

**Branch naming:** `feature/`, `fix/`, `chore/`

**Never commit:**
- `.env` (contains secrets — already in `.gitignore`)
- `node_modules/`, `venv/`, `.next/`

---

## Scripts Reference

Run from the repo root:

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode (Turborepo) |
| `pnpm build` | Production build of all packages |
| `pnpm lint` | Lint all workspaces |
| `pnpm test` | Run all tests |
| `cd services/api && pnpm prisma studio` | Open Prisma DB browser at localhost:5555 |
| `cd services/api && pnpm prisma db seed` | Re-seed demo data |
| `cd services/api && pnpm prisma migrate dev` | Apply schema changes to DB |

---

## Contributing

1. Fork / clone the repo
2. Follow the Quick Start above
3. Make your changes on a feature branch
4. Run `pnpm lint && pnpm build` to check for errors before pushing
5. Open a PR with a clear description of what changed and why
