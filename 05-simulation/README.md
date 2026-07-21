# Product B: AI Civilization Simulator

> **Module:** `05-simulation/`
> **Product:** AI Civilization Simulator (Product B)
> **Platform:** NexusAI Dual-Product Platform
> **Architecture:** See [architecture.md](../01-architecture/architecture.md) — Product B section
> **Requirements:** See [requirements.md](../00-core/requirements.md) — Product B section

---

## Overview

The AI Civilization Simulator is a persistent, autonomous world where every citizen is an AI agent with personality, memory, goals, skills, relationships, inventory, job, wealth, health, and a daily schedule. The world evolves without player interaction. The player is an observer or administrator.

This module also serves as a testing sandbox for Product A (AIOS) business agents in future cross-product scenarios.

---

## Core Principle: Citizen-as-Agent

Every citizen extends the shared Agent entity (ADR-0012). The simulation module adds domain-specific state; the shared core provides identity, memory, and LLM access.

---

## Module Specifications

| Spec | Description |
|------|-------------|
| [citizen-system.md](citizen-system.md) | Autonomous citizen entity, decision loop, lifecycle |
| [personality.md](personality.md) | OCEAN traits, cognitive biases, behavioral profiles |
| [world-generation.md](world-generation.md) | Procedural world creation from seed |
| [economy.md](economy.md) | Supply/demand, transactions, employment, wealth |
| [jobs.md](jobs.md) | Employment, roles, task allocation |
| [relationships.md](relationships.md) | Social graph, family, friends, rivals |
| [inventory.md](inventory.md) | Items, tools, resources |
| [dialogue.md](dialogue.md) | Citizen-to-citizen LLM dialogue |
| [healthcare.md](healthcare.md) | Health, injury, illness, treatment |
| [education.md](education.md) | Skill progression, schooling |
| [government.md](government.md) | Policy, taxation, law |
| [factions.md](factions.md) | Groups, collective action |
| [crime.md](crime.md) | Crime events, law enforcement |
| [crafting.md](crafting.md) | Resource production, recipes |
| [businesses.md](businesses.md) | Citizen-owned and NPC businesses |
| [transportation.md](transportation.md) | Movement between locations |
| [weather.md](weather.md) | Environmental events and effects |
| [combat.md](combat.md) | Conflict resolution (optional per world) |
| [save-system.md](save-system.md) | World snapshots, event sourcing, replay |

---

## Simulation Architecture

```text
Simulation Clock (BullMQ Worker — ADR-0014)
        │
        ├── World Engine (world-generation.md)
        ├── Economy Engine (economy.md)
        ├── Citizen Loop (citizen-system.md)
        │       ├── Needs Evaluation
        │       ├── Memory Retrieval (shared Memory Engine)
        │       ├── Tier Check (ADR-0013)
        │       ├── Decision (LLM or rule engine)
        │       └── Action Execution
        └── Save System (save-system.md)
```

---

## Development Phases

See [phases.md](../00-core/phases.md) — Track B (Phase B1–B5).

**Current target:** Phase B1 — World Engine

---

## Integration with Shared Core

| Shared Component | Simulation Usage |
|-----------------|-----------------|
| Agent Runtime | Citizen entity base |
| Memory Engine | Citizen short/long-term memory |
| Model Router | LLM decisions for active citizens |
| Event Bus | World tick events, citizen actions |
| Auth / RBAC | Player accounts, world admin |
| PostgreSQL | World and citizen persistence |
| Redis | Hot world state cache |
| BullMQ | Simulation clock workers |
