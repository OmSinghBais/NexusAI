# NexusAI Platform

Dual-product monorepo:

- **Product A — AIOS:** Enterprise SaaS for AI business employees
- **Product B — Civilization Simulator:** Autonomous AI citizen living world

Shared core: agent runtime, memory, orchestration, model routing, event bus.

## Repository layout

```
apps/
  api/          NestJS API gateway (modular monolith host)
  web/          Next.js dashboard / observer UI shell
  worker/       Background workers (simulation clock, jobs)
packages/
  ai/           AI planners, routers, prompts, providers
  auth/         Shared auth types
  config/       Environment validation (Zod)
  database/     Prisma client + schema bootstrap
  events/       Domain event contracts
  logger/       Structured JSON logger
  sdk/          Typed API client
  ui/           Shared React UI components
services/       NestJS feature modules (AIOS + simulation)
infrastructure/ Docker, deployment assets
00-core/ … 08-testing/  Engineering documentation
```

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (optional, for Postgres/Redis/RabbitMQ/Qdrant)

## Quick start

```bash
cp .env.example .env
pnpm install
pnpm build
pnpm dev
```

Services:

- Web: http://localhost:3000
- API: http://localhost:3001/api
- Health: http://localhost:3001/api/health

## Infrastructure (local)

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | ESLint across workspace |
| `pnpm typecheck` | TypeScript check |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check |

## Documentation

- [Requirements](00-core/requirements.md)
- [Architecture](01-architecture/architecture.md)
- [Phases](00-core/phases.md)
- [Simulation specs](05-simulation/README.md)
- [Development memory](01-architecture/memory.md)

## License

Private — Final year / commercial platform development.
