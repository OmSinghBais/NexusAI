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

## ADR-0011

### Dual-Product Architecture on Shared Core

Status

Accepted

Date

2026-07-21

Decision

Build AIOS (business SaaS) and AI Civilization Simulator as two products on a shared agent runtime, memory engine, orchestrator, and infrastructure layer.

Context

The platform serves two distinct markets: enterprise AI workforce management and autonomous world simulation. Both require multi-agent orchestration, persistent memory, and LLM integration. Building separate codebases would duplicate 60%+ of infrastructure.

Alternatives Considered

- Single product (AIOS only)
- Full pivot to Civilization Simulator
- Completely separate repositories

Reason for Choosing

Shared core reduces duplication, enables cross-product innovation (e.g., business agents tested in simulation sandbox), and provides a clearer commercial path.

Trade-offs

Pros

- One codebase, one deployment pipeline
- Agent runtime improvements benefit both products
- Simulation module can serve as AIOS testing sandbox

Cons

- Module boundary discipline required
- Schema complexity increases
- Team must understand both domains

Impact

All modules. New `services/simulation/` namespace. Shared packages in `packages/`.

Future Considerations

Extract simulation into separate service if scale demands it (ADR supersession path documented).

---

## ADR-0012

### Citizen-as-Agent Model

Status

Accepted

Date

2026-07-21

Decision

Every simulation citizen is implemented as an extension of the shared Agent entity, not a separate entity type.

Context

Citizens require the same capabilities as business agents: identity, memory, LLM access, event emission. Duplicating this as a separate "Citizen" class would violate DRY and prevent reuse of orchestration infrastructure.

Alternatives Considered

- Separate Citizen entity with no agent inheritance
- Citizen as a "skin" over a generic Agent with typed metadata JSON
- Full class inheritance hierarchy

Reason for Choosing

Extension pattern: Agent base + Citizen domain state. Clean separation, full reuse of memory and runtime.

Trade-offs

Pros

- Reuses agent runtime, memory, model router
- Citizen decisions use same orchestration pipeline
- AIOS agents can interact with citizens in future cross-product features

Cons

- Agent schema must accommodate extension fields
- Citizen-specific queries need joins or views

Impact

`packages/agent/`, `services/simulation/citizen-system/`, database schema.

---

## ADR-0013

### Tiered AI Usage for Citizens

Status

Accepted

Date

2026-07-21

Decision

Citizens are processed at three AI tiers based on relevance: Full LLM (active), Lightweight LLM (nearby), Rule-based (background).

Context

Running full LLM inference for every citizen every tick is cost-prohibitive at scale (10,000+ citizens). Most citizens are not relevant to the observer at any given moment.

Alternatives Considered

- Full LLM for all citizens always
- Rule-based only (no LLM)
- LLM batching (process N citizens per call)

Reason for Choosing

Tiered approach balances immersion (active citizens feel truly intelligent) with cost and performance (background citizens use cheap rule engine).

Trade-offs

Pros

- 10–100x cost reduction at scale
- Active citizens maintain high-quality autonomous behavior
- Scales to 10,000+ citizens with worker pool

Cons

- Promotion/demotion logic adds complexity
- Background citizens may behave less richly
- Tier transitions must not cause visible behavior discontinuities

Impact

`services/simulation/citizen-system/`, `services/simulation/simulation-clock/`, model router.

Future Considerations

Batch LLM inference (ADR-0013 supplement) for medium-tier citizens.

---

## ADR-0014

### Discrete-Event Simulation Clock

Status

Accepted

Date

2026-07-21

Decision

World time advances via a discrete-event simulation clock implemented as BullMQ background workers, not HTTP request handlers or real-time game loops.

Context

The world must continue evolving when no player is connected. HTTP-based tick processing would require constant polling and cannot run autonomously. Real-time loops do not scale across multiple world instances.

Alternatives Considered

- Real-time game loop (requestAnimationFrame equivalent on server)
- Cron-based tick (fixed schedule)
- Player-triggered ticks only

Reason for Choosing

BullMQ workers provide reliable, scalable, pause/resume-capable background processing with retry logic and observability. Each world instance gets its own job queue.

Trade-offs

Pros

- World runs autonomously without player
- Scales horizontally (one worker pool per world)
- Pause/resume/speed control via queue management
- Integrates with existing BullMQ infrastructure

Cons

- Tick latency depends on worker availability
- Not suitable for sub-second real-time gameplay
- Requires worker infrastructure from day one

Impact

`services/simulation/simulation-clock/`, BullMQ configuration, observer API.

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
