# World Generation Specification

> **Product:** AI Civilization Simulator (Product B)
> **Phase:** B1 — World Engine
> **ADR:** ADR-0014 (Discrete-Event Simulation Clock)

## 1. Overview

The **World Generation Engine** procedurally creates persistent living worlds from a deterministic seed. Each world is a self-contained simulation instance owned by a player or organization. Worlds continue evolving autonomously via the simulation clock — no player connection required.

---

## 2. Core Capabilities

### 2.1 Procedural World Creation

- **Seed-based generation:** Same seed + same config = identical world every time
- **Terrain:** Height maps, biomes, water bodies, resource deposits
- **Settlements:** Towns and villages placed based on terrain suitability
- **Starting population:** Configurable citizen count (default: 50–500)
- **Era selection:** Medieval, industrial, modern, sci-fi (configurable)
- **World size:** Small (64×64), Medium (256×256), Large (1024×1024)

### 2.2 World Configuration

```json
{
  "world_id": "uuid",
  "seed": "alpha-7f3a2b",
  "name": "Eldoria",
  "era": "medieval",
  "size": "medium",
  "starting_population": 100,
  "difficulty": "normal",
  "features": {
    "combat_enabled": true,
    "magic_enabled": false,
    "trade_routes": true
  }
}
```

### 2.3 Environmental Parameterization

World rules established at generation time:

- **Climate:** Temperature ranges, seasonal cycles, precipitation patterns
- **Resources:** Distribution of wood, stone, iron, food, water
- **Political:** Starting government type, faction count, stability index
- **Economic:** Starting currency, trade route density, market maturity
- **Social:** Cultural values, population density, education baseline

---

## 3. Architecture

### 3.1 Seed Generator

Accepts world configuration constraints and produces a deterministic seed. Ensures reproducible worlds for debugging and sharing.

### 3.2 World Instantiator

Reads the seed and populates PostgreSQL with foundational entities:

- Terrain grid
- Settlement nodes
- Resource nodes
- Initial citizen population (via Citizen System)
- Starting factions and government

### 3.3 Simulation Clock (ADR-0014)

World time advances via BullMQ background workers:

```text
World Job Queue (one per world instance)
        │
        ├── tick_job: advance simulation by 1 tick
        ├── citizen_jobs: process citizen decision loops
        └── snapshot_job: save world state (every N ticks)
```

Tick rate configurable: 1 tick = 1 in-game hour (default).

World runs autonomously. Player connection is optional — the world does not pause when the observer disconnects.

### 3.4 Dynamic Evolution

World state evolves based on:

- Citizen actions (primary driver)
- Environmental events (weather.md)
- Economic forces (economy.md)
- Random world events (disasters, discoveries, migrations)

---

## 4. Data Models

```json
{
  "world_id": "uuid",
  "owner_id": "uuid",
  "seed": "alpha-7f3a2b",
  "name": "Eldoria",
  "status": "running",
  "current_tick": 450,
  "config": {
    "era": "medieval",
    "size": "medium",
    "tick_rate_ms": 1000,
    "snapshot_interval_ticks": 100
  },
  "state": {
    "season": "autumn",
    "year": 3,
    "day": 142,
    "hour": 8,
    "population": 97,
    "settlements": 4,
    "active_events": []
  },
  "created_at": "2026-07-21T10:00:00Z",
  "updated_at": "2026-07-21T14:30:00Z"
}
```

---

## 5. Observer Controls

The player (observer/admin) can:

| Control | Effect |
|---------|--------|
| Pause | Stops tick processing |
| Resume | Restarts tick processing |
| Speed ×1/×2/×5/×10 | Adjusts tick rate |
| Step | Advance exactly 1 tick manually |
| Inject Event | Add disaster, policy change, resource boom |
| Inspect | Read any world entity state |

Player **cannot** control individual citizens.

---

## 6. Integration Points

| System | Integration |
|--------|------------|
| Citizen System | Initial population generation |
| Economy Engine | Starting market conditions |
| Save System | World state snapshots |
| Weather System | Climate parameters from seed |
| Factions | Initial faction seeding |
| Government | Starting political structure |
| Observer API | Read world state, admin controls |

---

## 7. MVP Scope (Phase B1)

- [ ] World generates from seed with terrain and settlements
- [ ] Simulation clock advances ticks via BullMQ worker
- [ ] World state persists to PostgreSQL
- [ ] Observer API returns current world state
- [ ] Pause/resume controls work via API
