# NexusAI Platform

## Overview

NexusAI is a dual-product platform built on a shared multi-agent core:

| Product | Description |
|---------|-------------|
| **AIOS** (Product A) | Enterprise SaaS for creating and managing AI business employees |
| **AI Civilization Simulator** (Product B) | Living world where autonomous AI citizens evolve without player control |

Both products share agent runtime, memory engine, orchestration, authentication, and database infrastructure.

## Key Features

### Product A: AIOS
- **Agent Orchestration**: Centrally manage and deploy autonomous AI agents across business domains
- **Model Agnosticism**: Pluggable architecture for any LLM provider
- **Workflow Automation**: Multi-agent workflows with human approval gates
- **Enterprise Security**: RBAC, audit logs, OAuth

### Product B: Civilization Simulator
- **Autonomous Citizens**: Every citizen is an AI agent with personality, memory, goals, and daily schedule
- **Living World**: World evolves continuously without player input
- **Observer Mode**: Player watches and administers — never controls characters
- **Emergent Society**: Economy, relationships, factions, and culture emerge from citizen behavior

## Architecture Highlights

Built as a modular monolith (ADR-0001) with a shared core:
- **Agent Runtime**: Shared citizen/agent execution engine
- **Memory Engine**: Vector-indexed short and long-term memory
- **Simulation Clock**: BullMQ-powered discrete-event world ticks (ADR-0014)
- **Tiered AI**: Full LLM for active citizens, rule-based for background (ADR-0013)

## Getting Started

*(Monorepo setup and Docker Compose instructions coming in Shared Foundation phase.)*

## Documentation Directory

- [00-core/](00-core/) - Requirements, rules, phases, roadmap
- [01-architecture/](01-architecture/) - Architecture, ADRs, memory, lessons
- [05-simulation/](05-simulation/) - Product B: Civilization Simulator specs
- [02-backend/](02-backend/) - API, services, events
- [03-database/](03-database/) - Schema, migrations
- [04-ai/](04-ai/) - AI engine, orchestration
- [06-frontend/](06-frontend/) - UI specs
- [07-devops/](07-devops/) - Docker, deployment
- [08-testing/](08-testing/) - Test strategy
