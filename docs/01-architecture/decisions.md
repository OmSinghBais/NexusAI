# AIOS - Architecture Decision Records (ADR)

> File: decisions.md
>
> Purpose:
>
> Every important technical decision made during the project should be recorded here.
>
> This prevents future developers or AI assistants from accidentally undoing deliberate architectural choices.

---

# Rules

Before changing any major architecture:

- Read this file.
- Understand why the decision was made.
- Do NOT replace technology without documenting why.

Every decision should answer

- What?
- Why?
- Alternatives?
- Consequences?

---

# Decision Template

## ADR-XXXX

### Title

Short title

---

Status

- Proposed
- Accepted
- Deprecated
- Superseded

---

Date

YYYY-MM-DD

---

Decision

Describe the decision.

---

Context

Why was this needed?

---

Alternatives Considered

- Option A
- Option B
- Option C

---

Reason for Choosing

Explain why.

---

Trade-offs

Pros

-

Cons

-

---

Impact

Modules affected.

---

Future Considerations

Potential improvements.

---

# Architecture Decisions

---

## ADR-0001

### Modular Monolith

Status

Accepted

Decision

Use a Modular Monolith instead of Microservices.

Context

Microservices introduce unnecessary complexity for a final-year project.

Alternatives

- Microservices
- Modular Monolith
- Traditional Monolith

Reason

Provides scalability while keeping development simple.

Trade-offs

Pros

- Easier development
- Easier deployment
- Lower infrastructure cost

Cons

- Future scaling requires service extraction

---

## ADR-0002

### NestJS

Status

Accepted

Reason

Enterprise architecture with Dependency Injection.

Alternatives

- Express
- Fastify
- Spring Boot

---

## ADR-0003

### Next.js

Status

Accepted

Reason

SSR, App Router, excellent developer experience.

---

## ADR-0004

### PostgreSQL

Status

Accepted

Reason

Reliable relational database with excellent Prisma support.

---

## ADR-0005

### Prisma ORM

Status

Accepted

Reason

Type-safe queries and migrations.

---

## ADR-0006

### LangGraph

Status

Accepted

Reason

Graph-based multi-agent orchestration.

---

## ADR-0007

### Qdrant

Status

Accepted

Reason

Efficient vector search for AI memory.

---

## ADR-0008

### RabbitMQ

Status

Accepted

Reason

Reliable asynchronous communication.

---

## ADR-0009

### Redis

Status

Accepted

Reason

Caching and temporary state.

---

## ADR-0010

### Docker

Status

Accepted

Reason

Consistent environments.

---

# Deprecated Decisions

(No entries yet)

---

# Future Decisions

- Kubernetes
- Billing System
- Marketplace
- Voice AI
- Federated Agents

---

# AI Instructions

Before changing

- Framework
- Database
- Folder Structure
- Authentication
- Queue
- Cache
- AI Framework

Read this file.

If changing any accepted decision:

- Create a new ADR.
- Mark previous one as Superseded.
- Explain why.
