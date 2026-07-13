# AIOS Development Rules & Coding Standards

Version: 1.0

---

# Project Philosophy

This project should be developed as if it were a real enterprise SaaS product.

Every feature should be

- Scalable
- Modular
- Secure
- Maintainable
- Testable
- Extensible

Never write code only to "make it work".

Write code that another developer can understand after one year.

---

# General Development Rules

## DO

- Write clean code.
- Follow SOLID principles.
- Follow DRY (Don't Repeat Yourself).
- Follow KISS (Keep It Simple).
- Follow Separation of Concerns.
- Use Dependency Injection.
- Keep business logic inside services.
- Write reusable components.
- Keep functions small.
- Handle every possible error.
- Log important events.
- Write meaningful commit messages.

---

## DON'T

- Don't copy-paste logic.
- Don't use global variables.
- Don't hardcode secrets.
- Don't place business logic inside controllers.
- Don't write massive functions.
- Don't ignore exceptions.
- Don't expose internal APIs.
- Don't directly access the database from controllers.
- Don't use "any" in TypeScript unless absolutely necessary.

---

# Architecture Rules

## Preferred Architecture

```
Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer
```

---

## Controllers

Controllers should only

- Validate input
- Call services
- Return response

Controllers should NOT

- Query database
- Execute AI
- Call LLM
- Implement business logic

Maximum controller size

```
100 lines
```

---

## Services

Services contain

- Business logic
- Validation
- Rules
- Workflow execution

Services should never

- Render UI
- Return HTML
- Access browser APIs

---

## Repository Layer

Repositories are responsible only for

- Database queries

Repositories should NOT

- Execute AI
- Validate requests
- Send emails
- Call APIs

---

## Models

Models should

- Represent data only

Models should never

- Execute business logic

---

# Folder Rules

Every module must follow

```
module/

controllers/

services/

repositories/

dto/

entities/

guards/

middleware/

events/

utils/

index.ts
```

Never create random folders.

---

# Frontend Rules

Use

- React Server Components where appropriate
- Client Components only when necessary

Use

- TailwindCSS

Use

- shadcn/ui

Use

- React Hook Form

Use

- Zod Validation

Avoid

- CSS files
- Bootstrap
- Material UI
- jQuery

---

# Component Rules

Every component should

- Have one responsibility

Bad

```
Dashboard.tsx

4000 lines
```

Good

```
Dashboard

├── Sidebar

├── Header

├── AnalyticsCard

├── AgentTable

├── RecentTasks

└── Footer
```

---

# Backend Rules

Use

- NestJS Modules

One module

```
Agents

Users

Organizations

Workflow

Memory

Analytics

Notifications
```

Each module owns its data.

Never access another module's database directly.

---

# Database Rules

Use

- PostgreSQL

ORM

- Prisma

Never

- Write raw SQL unless necessary.

Every table must

- UUID Primary Key
- createdAt
- updatedAt

Optional

- deletedAt

Use Soft Delete whenever possible.

---

# AI Rules

Never call an LLM directly from a controller.

Flow

```
Controller

↓

Agent Service

↓

AI Orchestrator

↓

Provider Router

↓

LLM
```

---

Never hardcode prompts.

Store prompts inside

```
ai/prompts/
```

---

Every AI request should include

- Context
- Memory
- User
- Organization
- Task
- System Prompt

---

Never trust LLM output.

Always validate

- JSON
- Tool Calls
- Agent Responses

---

# Multi-Agent Rules

Every agent must have

- ID
- Name
- Role
- Model
- Tools
- Memory
- Permissions
- Status

Every agent should only perform one responsibility.

Good

```
Sales Agent
```

Bad

```
Sales + HR + Finance + Coding Agent
```

---

# Memory Rules

Separate memory

```
Short Term

Long Term

Knowledge Base

Documents

Organization Memory
```

Never mix memories.

---

Memory should always be searchable.

---

# Tool Rules

Every external API should be wrapped.

Good

```
Slack Tool

GitHub Tool

Gmail Tool

Salesforce Tool
```

Bad

```
fetch()

inside AI service
```

---

# API Rules

REST Naming

Good

```
GET /agents

POST /agents

GET /agents/:id

PATCH /agents/:id

DELETE /agents/:id
```

Bad

```
/getAgents

/createAgent

/deleteAgent
```

---

Always

Return

```
status

message

data

timestamp
```

Example

```json
{
  "status": "success",
  "message": "Agent created successfully",
  "data": {},
  "timestamp": "2026-01-01T10:00:00Z"
}
```

---

# Authentication Rules

Always use

JWT

Refresh Tokens

RBAC

Never

Store passwords in plain text.

Use

bcrypt

---

# Security Rules

Never

Store API Keys in database as plain text.

Never

Expose Stack Trace

Never

Trust Client Input

Always

Validate

Sanitize

Escape

---

Use

Helmet

CORS

Rate Limiting

HTTPS

---

# Logging Rules

Every important action should be logged.

Examples

User Login

Agent Created

Workflow Started

Workflow Failed

LLM Error

Approval Requested

Database Error

---

Never log

Passwords

Tokens

Secrets

Private Keys

---

# Error Handling Rules

Never

```
catch(e){

}
```

Always

```
catch(error){

logger.error()

throw

}
```

Use custom exceptions.

---

# Event Rules

Use events for

Notifications

Analytics

Logging

Memory Update

Workflow Completed

Avoid synchronous execution when possible.

---

# Workflow Rules

Every workflow should

Have

ID

Name

Owner

Status

Created At

Updated At

Version

Support

Retry

Pause

Resume

Cancel

---

# Background Jobs

Use BullMQ

Examples

Email

Embedding

Analytics

Cleanup

Reports

Notifications

Never execute heavy work inside HTTP requests.

---

# Caching Rules

Use Redis for

Sessions

Frequently Used Agents

Organization Settings

LLM Responses

Rate Limits

Never cache

Sensitive Data

Passwords

Tokens

---

# Documentation Rules

Every API

Swagger

Every module

README.md

Every function

Meaningful comments only when necessary.

Don't comment obvious code.

Bad

```ts
// increment i

i++;
```

---

# Git Rules

Branch Naming

```
feature/

bugfix/

hotfix/

release/

refactor/
```

Example

```
feature/agent-builder

feature/workflow-engine

bugfix/login

refactor/auth-service
```

---

Commit Format

Good

```
feat(agent): add memory service

fix(auth): refresh token bug

refactor(workflow): improve execution engine

docs(api): update endpoints

test(agent): add unit tests
```

Bad

```
update

fix

done

working
```

---

# Testing Rules

Minimum Coverage

80%

Write

Unit Tests

Integration Tests

E2E Tests

Never deploy untested code.

---

# Performance Rules

Avoid

N+1 Queries

Blocking Operations

Repeated LLM Calls

Large Payloads

Use

Pagination

Caching

Compression

Lazy Loading

Background Workers

---

# UI Rules

Theme

Dark First

Responsive

Desktop

Tablet

Mobile

Support

Keyboard Navigation

Accessibility

Loading States

Error States

Empty States

---

# Naming Rules

Variables

Good

```
userProfile

organizationId

workflowExecution
```

Bad

```
x

abc

temp

obj
```

Classes

```
AgentService

WorkflowEngine

NotificationService
```

Interfaces

```
IAgent

IWorkflow

IMemory
```

Enums

```
AgentStatus

WorkflowState

TaskPriority
```

---

# Environment Variables

Never hardcode

```
DATABASE_URL

JWT_SECRET

OPENAI_API_KEY

GEMINI_API_KEY

REDIS_URL

RABBITMQ_URL
```

Store only in

```
.env

.env.local

.env.production
```

Never commit `.env` files.

---

# What to Use

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Zustand

---

## Backend

- NestJS
- Prisma
- PostgreSQL
- Redis
- RabbitMQ
- BullMQ

---

## AI

- LangGraph
- LiteLLM
- Qdrant
- OpenAI
- Gemini
- Claude
- Ollama (Development)

---

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- Nginx

---

## Monitoring

- Prometheus
- Grafana
- Sentry

---

# What to Avoid

❌ Massive Controllers

❌ Massive Components

❌ Raw SQL Everywhere

❌ Hardcoded Prompts

❌ Business Logic in Controllers

❌ Inline API Calls

❌ Global State Everywhere

❌ Copy-Paste Code

❌ `console.log()` in Production

❌ `any` in TypeScript

❌ Monolithic 5000-line Files

❌ Blocking HTTP Requests

❌ Unhandled Promise Rejections

❌ Direct LLM Calls Without Validation

❌ Hardcoded Secrets

❌ Circular Dependencies

❌ Tight Coupling Between Modules

❌ Magic Numbers and Strings

❌ Inconsistent Naming

---

# Golden Rule

> **Every feature should be replaceable without affecting the rest of the system.**

Design each module as if, in the future, it could become its own microservice. Keep interfaces stable, dependencies minimal, and responsibilities focused. This makes the system easier to maintain, test, and scale.
