# NexusAI Platform — Development Memory

> **Purpose**
>
> This file acts as the project's persistent memory.
>
> Every AI assistant (ChatGPT, Claude, Gemini, Cursor, GitHub Copilot, etc.) should read this file before starting work.
>
> **IMPORTANT**
>
> This file **MUST** be updated after every completed task.

---

# Project Information

Project Name

```
NexusAI Platform
├── Product A: AIOS (AI Operating System for Businesses)
└── Product B: AI Civilization Simulator
```

Version

```
v0.2.0
```

Status

```
Documentation — Dual-Product Architecture Defined
```

Current Phase

```
Track Shared — Foundation (Planning)
Next: Phase B1 — World Engine
```

Repository

```
https://github.com/OmSinghBais/NexusAI
Local: /Users/omsinghbais/Desktop/Ai-OS
```

Started On

```
2026-07-21
```

Last Updated

```
2026-07-21 11:45
```

---

# Current Sprint

```
Sprint 1
```

Sprint Goal

```
Dual-Product Documentation Alignment
```

Sprint Status

```
Completed
```

---

# Current Working File

```
01-architecture/memory.md
```

Current Task

```
Documentation complete. Ready for Shared Foundation implementation.
```

Current Developer

```
AI Assistant (Lead Architect)
```

Progress

```
25%
```

---

# Current TODO

- [x] Align requirements.md for dual-product vision
- [x] Update architecture.md with shared core + Product B design
- [x] Restructure phases.md with Track A / Track B / Shared
- [x] Add ADRs 0011–0014 (dual-product, citizen-as-agent, tiered AI, sim clock)
- [x] Reframe 05-simulation/ specs for civilization product
- [ ] Create README.md
- [ ] Create database.md (shared + product schemas)
- [ ] Create api.md
- [ ] Setup monorepo
- [ ] Configure Docker Compose
- [ ] Configure CI/CD
- [ ] Phase B1: World Engine implementation

---

# Completed Files

| File | Status | Date |
|-------|--------|------|
| requirements.md | ✅ Completed | YYYY-MM-DD |
| architecture.md | ✅ Completed | YYYY-MM-DD |
| rules.md | ✅ Completed | YYYY-MM-DD |
| phases.md | ✅ Completed | YYYY-MM-DD |
| design.md | ✅ Completed | YYYY-MM-DD |
| memory.md | ✅ Completed | 2026-07-21 |
| requirements.md (v2.0 dual-product) | ✅ Completed | 2026-07-21 |
| architecture.md (v2.0 dual-product) | ✅ Completed | 2026-07-21 |
| phases.md (Track A/B/Shared) | ✅ Completed | 2026-07-21 |
| decisions.md (ADR-0011–0014) | ✅ Completed | 2026-07-21 |
| 05-simulation/ (reframed) | ✅ Completed | 2026-07-21 |

---

# Documentation Status

| Document | Status |
|-----------|--------|
| README.md | ⏳ Pending |
| requirements.md | ✅ |
| architecture.md | ✅ |
| design.md | ✅ |
| rules.md | ✅ |
| phases.md | ✅ |
| memory.md | ✅ |
| database.md | ⏳ |
| api.md | ⏳ |
| deployment.md | ⏳ |
| workflows.md | ⏳ |
| 05-simulation/README.md | ✅ |

---

# Completed Features

## Planning

- [x] Project Idea
- [x] Scope
- [x] Architecture
- [x] Design System
- [x] Development Rules
- [x] Development Phases

---

## Backend

- [ ] Authentication
- [ ] Users
- [ ] Organizations
- [ ] Agents
- [ ] Memory
- [ ] Workflow
- [ ] Notifications

---

## Frontend

- [ ] Dashboard
- [ ] Login
- [ ] Agent Builder
- [ ] Workflow Builder
- [ ] Analytics

---

## AI

- [ ] LLM Integration
- [ ] Memory Engine
- [ ] Tool Calling
- [ ] Agent Orchestrator

---

# Current Folder Structure

```
Ai-OS/  (NexusAI repo)
├── 00-core/          requirements, rules, phases, roadmap
├── 01-architecture/  architecture, decisions, memory, lessons
├── 02-backend/       API, services, events, auth
├── 03-database/      schema, migrations, ER diagram
├── 04-ai/            AI engine, memory, orchestration
├── 05-simulation/    Product B: civilization sim specs
├── 06-frontend/      UI specs (both products)
├── 07-devops/        Docker, deployment, monitoring
└── 08-testing/       test strategy
```

---

# Recently Completed

### 2026-07-21

- Cloned NexusAI repository into Ai-OS workspace
- Established dual-product architecture (AIOS + Civilization Simulator)
- Updated requirements.md v2.0 with Product B specification
- Updated architecture.md v2.0 with shared core and simulation design
- Restructured phases.md with Track Shared / Track A / Track B
- Added ADR-0011 through ADR-0014
- Reframed 05-simulation/ specs for civilization product
- Updated memory.md to v0.2.0

### YYYY-MM-DD

- Created requirements.md
- Created architecture.md
- Created rules.md
- Created phases.md
- Created design.md

---

# Known Issues

None

---

# Blockers

None

---

# Important Decisions

## Architecture

✅ Dual-Product on Shared Core (ADR-0011)

✅ Modular Monolith (ADR-0001)

Reason

```
Single codebase serves AIOS + Civilization Simulator

Shared agent runtime, memory, orchestration

Product-specific logic in isolated modules
```

---

## Product B

✅ Citizen-as-Agent (ADR-0012)

✅ Tiered AI Usage (ADR-0013)

✅ Discrete-Event Simulation Clock (ADR-0014)

---

## Backend

```
NestJS
```

---

## Frontend

```
Next.js
```

---

## ORM

```
Prisma
```

---

## Database

```
PostgreSQL
```

---

## Queue

```
RabbitMQ
```

---

## Cache

```
Redis
```

---

## Vector Database

```
Qdrant
```

---

## AI Framework

```
LangGraph
```

---

# Tech Decisions

| Category | Choice |
|----------|---------|
| Frontend | Next.js |
| Backend | NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache | Redis |
| Queue | RabbitMQ |
| AI | LangGraph |
| Embeddings | OpenAI |
| Vector DB | Qdrant |

---

# Upcoming Tasks

Priority 1

- database.md (shared + Product B schemas)
- Monorepo setup
- Docker Compose

Priority 2

- Phase B1: World Engine
- Phase B2: Citizen Core Loop (vertical slice)

Priority 3

- Product A Track: Authentication, Organizations
- Observer UI (Phase B5)

---

# Changelog

## v0.2.0 — 2026-07-21

Dual-product architecture defined. Product B (Civilization Simulator) added alongside Product A (AIOS). ADRs 0011–0014 accepted. Documentation realigned.

## v0.1.0

Planning Started

---

# Daily Log

## 2026-07-21

Worked On

```
Dual-product documentation alignment
```

Completed

- requirements.md v2.0 (Product B added)
- architecture.md v2.0 (shared core + simulation design)
- phases.md (Track Shared / A / B)
- decisions.md (ADR-0011–0014)
- 05-simulation/ reframed for civilization product
- Repository cloned from GitHub

Next

```
database.md → monorepo setup → Phase B1 World Engine
```

---

# AI Context

When another AI opens this repository, it should know:

- The project is a **dual-product platform**: AIOS (business SaaS) + AI Civilization Simulator.
- Architecture v2.0 is finalized with shared core (ADR-0011).
- Product B citizens are agents with extended state (ADR-0012).
- Build order: Shared Foundation → Phase B1/B2 (world + citizen loop) → Product A track.
- Coding has **not** started yet — documentation phase complete, implementation next.
- Read `00-core/requirements.md` (Product B section), `01-architecture/architecture.md`, and `01-architecture/decisions.md` before writing any code.

---

# Update Rules (IMPORTANT)

Every time work is completed:

## Update

- Last Updated
- Current Working File
- Current Task
- Progress %
- Completed Files
- Documentation Status
- Completed Features
- Recently Completed
- Daily Log
- Changelog (if version changes)

Never leave this file outdated.

---

# Update Checklist

After every coding session:

- [ ] Update timestamp
- [ ] Update current file
- [ ] Update progress
- [ ] Move completed tasks
- [ ] Add completed features
- [ ] Update documentation status
- [ ] Update daily log
- [ ] Update changelog if needed

---

# Prompt for AI Assistants

Copy and paste this prompt at the beginning of every AI coding session.

```text
You are working on the AIOS project.

Before writing any code:

1. Read docs/memory.md completely.
2. Continue from the current working file.
3. Do NOT modify completed files unless explicitly requested.
4. Update docs/memory.md before ending the session.
5. If a task is completed:
   - Mark it completed.
   - Update the progress percentage.
   - Update the completed files list.
   - Update the daily log.
   - Update the current working file.
6. Follow docs/rules.md for all coding standards.
7. Follow docs/architecture.md for project structure.
8. Follow docs/design.md for UI consistency.
9. Follow docs/phases.md for development order.
10. Never leave docs/memory.md outdated.
```

---

# Memory File Lifecycle

```
Start Session
        │
        ▼
Read memory.md
        │
        ▼
Identify Current Working File
        │
        ▼
Complete Task
        │
        ▼
Update memory.md
        │
        ▼
Commit Changes
        │
        ▼
End Session
```

---

# Golden Rule

> **`memory.md` is the single source of truth for project progress.**
>
> Before starting any work, read it.
> Before ending any work, update it.
