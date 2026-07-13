# AIOS - Development Memory

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
AIOS
AI Operating System for Businesses
```

Version

```
v0.1.0
```

Status

```
Planning
```

Current Phase

```
Phase 1 — Foundation
```

Repository

```
TBD
```

Started On

```
YYYY-MM-DD
```

Last Updated

```
YYYY-MM-DD HH:MM
```

---

# Current Sprint

```
Sprint 1
```

Sprint Goal

```
Project Planning & Foundation Setup
```

Sprint Status

```
In Progress
```

---

# Current Working File

> **ONLY ONE FILE SHOULD BE MARKED AS CURRENTLY BEING WORKED ON**

```
docs/memory.md
```

Current Task

```
Creating project documentation.
```

Current Developer

```
AI Assistant
```

Progress

```
15%
```

---

# Current TODO

- [ ] Finish documentation
- [ ] Create README
- [ ] Create database.md
- [ ] Create api.md
- [ ] Create workflow.md
- [ ] Initialize repository
- [ ] Setup monorepo
- [ ] Configure Docker
- [ ] Configure CI/CD

---

# Completed Files

| File | Status | Date |
|-------|--------|------|
| requirements.md | ✅ Completed | YYYY-MM-DD |
| architecture.md | ✅ Completed | YYYY-MM-DD |
| rules.md | ✅ Completed | YYYY-MM-DD |
| phases.md | ✅ Completed | YYYY-MM-DD |
| design.md | ✅ Completed | YYYY-MM-DD |
| memory.md | 🚧 In Progress | YYYY-MM-DD |

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
| memory.md | 🚧 |
| database.md | ⏳ |
| api.md | ⏳ |
| deployment.md | ⏳ |
| workflows.md | ⏳ |

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
docs/

├── architecture.md
├── design.md
├── memory.md
├── phases.md
├── requirements.md
└── rules.md
```

---

# Recently Completed

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

✅ Modular Monolith

Reason

```
Easy to develop

Easy to scale later

Enterprise architecture

Suitable for Final Year Project
```

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

- README
- Database Design
- API Documentation

Priority 2

- Monorepo Setup
- Docker
- Authentication

Priority 3

- Dashboard
- Organizations
- AI Employees

---

# Changelog

## v0.1.0

Planning Started

---

# Daily Log

## YYYY-MM-DD

Worked On

```
Project Documentation
```

Completed

- requirements.md
- architecture.md
- rules.md
- phases.md
- design.md

Next

```
database.md
```

---

# AI Context

When another AI opens this repository, it should know:

- The project is currently in the **Planning Phase**.
- The architecture has been finalized.
- The design system has been finalized.
- Coding has **not** started yet.
- Documentation should be completed before implementation begins.

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
