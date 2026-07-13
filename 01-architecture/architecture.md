# AIOS - AI Operating System for Businesses
## Architecture Document

Version: 1.0

---

# System Overview

AIOS is a cloud-native, multi-tenant SaaS platform where organizations can create, deploy, monitor, and manage AI employees that collaborate autonomously to complete business workflows.

Unlike traditional chatbots, AIOS provides an operating system for AI agents by combining:

- Multi-Agent Orchestration
- Shared Memory
- Workflow Automation
- Enterprise Security
- Human Approval
- Analytics
- Tool Integration

---

# High-Level Architecture

```text
                              Users
                                │
                ┌───────────────┴───────────────┐
                │                               │
          Web Dashboard                   REST API
                │                               │
                └───────────────┬───────────────┘
                                │
                        API Gateway (NestJS)
                                │
       ┌────────────────────────┼────────────────────────┐
       │                        │                        │
 Authentication          Organization Service      Notification Service
       │                        │                        │
       └──────────────┬─────────┴──────────┬─────────────┘
                      │                    │
               AI Orchestrator      Workflow Engine
                      │                    │
      ┌───────────────┼────────────────────┼───────────────────┐
      │               │                    │                   │
 Memory Engine   Tool Executor      Agent Registry     Event Bus
      │               │                    │                   │
      │               │                    │             RabbitMQ
      │               │                    │
 Vector DB      External APIs       Agent Runtime
      │               │                    │
      └───────────────┼────────────────────┘
                      │
             LLM Provider Router
      GPT • Gemini • Claude • Ollama
```

---

# Application Flow

## 1. User Login

```text
User

↓

Frontend

↓

Authentication Service

↓

JWT Generated

↓

Dashboard
```

---

## 2. Create Organization

```text
Organization Admin

↓

Create Company

↓

Departments

↓

Invite Members

↓

Assign Roles
```

---

## 3. Create AI Employee

```text
Dashboard

↓

Create Agent

↓

Choose Model

↓

Assign Role

↓

Assign Memory

↓

Assign Tools

↓

Deploy
```

---

## 4. User Sends Task

```text
User

↓

AI Gateway

↓

Workflow Engine

↓

AI Orchestrator

↓

Agent Selection

↓

Execution

↓

Response
```

---

## 5. Multi-Agent Collaboration

```text
Customer Support Agent

↓

Finance Agent

↓

Legal Agent

↓

Manager Agent

↓

Customer Response
```

Each agent can

- Ask another agent
- Delegate work
- Share memory
- Share files
- Wait for approval

---

## 6. Human Approval Flow

```text
AI Agent

↓

Approval Required

↓

Manager Notification

↓

Approve / Reject

↓

Continue Workflow
```

---

## 7. Memory Flow

```text
Conversation

↓

Embedding

↓

Vector Database

↓

Semantic Search

↓

Relevant Memories

↓

Context

↓

LLM
```

---

## 8. Tool Calling Flow

```text
Agent

↓

Tool Executor

↓

Slack

↓

GitHub

↓

Salesforce

↓

Google Calendar

↓

Return Result
```

---

# Core Components

---

## Authentication Service

Responsibilities

- Login
- Register
- JWT
- OAuth
- RBAC
- MFA

---

## Organization Service

Responsibilities

- Companies
- Departments
- Teams
- Members

---

## Agent Registry

Stores

- Agent Metadata
- Agent Capabilities
- Agent Permissions
- Available Tools

---

## AI Orchestrator

Brain of the system.

Responsibilities

- Select Agent
- Route Task
- Maintain Context
- Coordinate Agents
- Retry Failed Tasks
- Execute Workflows

---

## Workflow Engine

Responsibilities

- Workflow Builder
- Workflow Execution
- Conditional Logic
- Parallel Execution
- Scheduling

---

## Memory Engine

Responsibilities

- Store Memories
- Search Memories
- Update Memories
- Forget Memories
- Summarize Long Conversations

---

## Tool Executor

Responsibilities

- API Calls
- Authentication
- Retry Logic
- Tool Discovery
- Permission Verification

---

## Notification Service

Responsibilities

Email

Push

Slack

Discord

SMS

---

## Analytics Service

Collects

Response Time

Token Usage

Errors

Agent Health

Success Rate

Cost

---

# Database Architecture

```
PostgreSQL

│

├── Users
├── Organizations
├── Departments
├── Projects
├── Agents
├── Tasks
├── Workflows
├── Messages
├── Notifications
├── Audit Logs
└── API Keys
```

---

# Memory Architecture

```
Vector Database

│

├── Conversation Memory
├── User Memory
├── Organization Memory
├── Knowledge Base
├── Documents
└── Semantic Embeddings
```

---

# Event Architecture

```
RabbitMQ

Task Created

↓

Agent Assigned

↓

Workflow Started

↓

Tool Executed

↓

Memory Updated

↓

Notification Sent
```

Every important action becomes an event.

---

# API Architecture

```
REST API

/api/auth

/api/users

/api/org

/api/agents

/api/tasks

/api/workflows

/api/tools

/api/memory

/api/analytics

/api/admin
```

---

# Security Architecture

```
HTTPS

↓

JWT

↓

RBAC

↓

Permission Middleware

↓

Business Logic

↓

Audit Log
```

Features

- OAuth
- MFA
- Encryption
- API Keys
- Rate Limiting
- Audit Trail

---

# AI Architecture

```
User Prompt

↓

Planner Agent

↓

Task Breakdown

↓

Agent Selection

↓

Memory Retrieval

↓

Tool Execution

↓

Reasoning

↓

Final Response
```

---

# Folder Structure

```
AIOS/

│
├── apps/
│
│   ├── web/
│   │
│   ├── api/
│   │
│   └── worker/
│
├── packages/
│
│   ├── ui/
│   ├── config/
│   ├── database/
│   ├── auth/
│   ├── logger/
│   ├── events/
│   └── sdk/
│
├── services/
│
│   ├── auth-service/
│   ├── user-service/
│   ├── organization-service/
│   ├── workflow-service/
│   ├── agent-service/
│   ├── orchestrator/
│   ├── memory-service/
│   ├── notification-service/
│   ├── analytics-service/
│   ├── tool-service/
│   ├── gateway/
│   └── audit-service/
│
├── ai/
│
│   ├── planners/
│   ├── routers/
│   ├── prompts/
│   ├── agents/
│   ├── reasoning/
│   ├── memory/
│   ├── embeddings/
│   ├── evaluators/
│   └── providers/
│
├── infrastructure/
│
│   ├── docker/
│   ├── kubernetes/
│   ├── nginx/
│   ├── monitoring/
│   ├── terraform/
│   └── scripts/
│
├── docs/
│
│   ├── architecture.md
│   ├── requirements.md
│   ├── api.md
│   ├── database.md
│   ├── workflows.md
│   └── deployment.md
│
├── prisma/
│
├── tests/
│
├── .github/
│
└── README.md
```

---

# Backend Structure

```
agent-service/

src/

├── controllers/
├── services/
├── repositories/
├── dto/
├── entities/
├── middleware/
├── guards/
├── events/
├── workers/
├── utils/
└── main.ts
```

---

# Frontend Structure

```
web/

src/

├── app/
├── components/
├── layouts/
├── pages/
├── hooks/
├── services/
├── store/
├── types/
├── utils/
├── styles/
└── assets/
```

---

# Tech Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Framer Motion
- React Flow (Workflow Builder)
- ECharts (Analytics)
- Leaflet (Maps, optional)

---

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- RabbitMQ
- BullMQ (Background Jobs)
- Swagger/OpenAPI

---

## AI Stack

- LangGraph (Agent orchestration)
- OpenAI Agents SDK (optional)
- OpenAI API
- Google Gemini API
- Anthropic Claude API
- Ollama (Local Models)
- LiteLLM (Model Routing)
- Qdrant (Vector Database)
- VoyageAI/OpenAI Embeddings

---

## Storage

- AWS S3
- Cloudinary (optional)
- MinIO (Self-hosted)

---

## Authentication

- JWT
- OAuth 2.0
- Clerk/Auth.js (optional)
- Google Login
- Microsoft Login
- GitHub Login

---

## DevOps

- Docker
- Docker Compose
- Kubernetes
- Nginx
- GitHub Actions
- Terraform (optional)

---

## Monitoring

- Prometheus
- Grafana
- Loki
- OpenTelemetry
- Sentry

---

## Testing

- Jest
- Supertest
- Playwright
- Cypress

---

## CI/CD

```
GitHub

↓

GitHub Actions

↓

Docker Build

↓

Run Tests

↓

Push Image

↓

Deploy Kubernetes

↓

Production
```

---

# Recommended MVP Scope (12–16 Weeks)

### Phase 1
- Authentication
- Organization Management
- AI Agent CRUD
- Shared Memory
- Basic Dashboard

### Phase 2
- Workflow Builder
- Multi-Agent Collaboration
- Tool Integrations
- Human Approval

### Phase 3
- Analytics
- Notifications
- Audit Logs
- AI Marketplace (basic)

### Phase 4 (Optional)
- Multi-model Routing
- Voice Agents
- Kubernetes Deployment
- Billing & Usage Tracking
- Agent Marketplace Publishing
