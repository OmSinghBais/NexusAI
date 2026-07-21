# Citizen System Specification

> **Product:** AI Civilization Simulator (Product B)
> **ADR:** ADR-0012 (Citizen-as-Agent), ADR-0013 (Tiered AI), ADR-0014 (Simulation Clock)

## 1. Overview

The **Citizen System** is the core of Product B. Every citizen is an autonomous AI agent that lives, works, socializes, and makes decisions independently. Citizens populate the living world and drive all emergent behavior. The player observes citizens — never controls them directly.

Citizens extend the shared Agent entity. The simulation module adds domain-specific state on top of the agent runtime.

---

## 2. Citizen Attributes

Every citizen has the following state:

| Attribute | Type | Description |
|-----------|------|-------------|
| `personality` | OCEAN vector | Big Five traits — see personality.md |
| `memory` | Short + Long term | Managed by shared Memory Engine |
| `goals` | Goal[] | Active personal ambitions and needs |
| `skills` | SkillMap | Profession, crafting, social, combat levels |
| `relationships` | Relationship[] | Family, friends, rivals — see relationships.md |
| `inventory` | Item[] | Owned items and resources — see inventory.md |
| `job` | Job \| null | Current employment — see jobs.md |
| `wealth` | Currency | Cash, assets, debts |
| `health` | HealthState | Physical and mental health — see healthcare.md |
| `schedule` | ScheduleBlock[] | Daily routine blocks |
| `location` | Coordinates | Current world position |
| `ai_tier` | enum | `active` \| `nearby` \| `background` |

---

## 3. Autonomous Decision Loop

Each simulation tick, for each citizen (processed by tier):

```text
1. Evaluate Needs
   hunger, fatigue, social, wealth, health → priority scores

2. Retrieve Memory
   query Memory Engine for relevant past events and relationships

3. Assess Environment
   location, nearby citizens, available actions, time of day

4. Tier Check (ADR-0013)
   active → full LLM | nearby → lightweight LLM | background → rule engine

5. Generate Candidate Actions
   LLM or rule engine produces ranked action list

6. Select & Execute Action
   highest-priority feasible action is executed

7. Update State
   memory, relationships, inventory, location, health

8. Emit Event
   publish citizen.action event to Event Bus
```

---

## 4. Behavioral State Machine

Citizens operate via a state machine driven by internal needs and external stimuli:

**Life States:** sleeping, eating, working, socializing, traveling, leisure, in_crisis

**Social States:** alone, with_family, with_friends, in_conflict, in_crowd

**Economic States:** employed, unemployed, seeking_work, running_business, in_debt

**Health States:** healthy, injured, ill, recovering, dying

State transitions are triggered by the decision loop, not by player input.

---

## 5. Citizen Lifecycle

```text
Birth → Childhood → Education → Adulthood → Aging → Death
```

- **Birth:** Generated from parent citizens or world seed population
- **Education:** Skills develop via education.md system
- **Adulthood:** Full decision loop active, employment, relationships form
- **Aging:** Stats degrade, health risks increase
- **Death:** Citizen removed from active simulation, memory archived

---

## 6. Architecture

### 6.1 Agent-Based Modeling (ABM)

Each citizen is an independent entity with its own decision loop. Citizens do not share a central controller.

### 6.2 Archetype Templates

Citizens are generated from base archetypes with procedural variance:

- Settler, Merchant, Scholar, Craftsman, Guard, Farmer, Noble, Outcast

Archetypes define starting skill distributions and personality tendencies. Variance ensures no two citizens are identical.

### 6.3 Tiered Processing (ADR-0013)

| Tier | Trigger | Processing |
|------|---------|-----------|
| Active | Within observer view radius | Full LLM (GPT-4 / Claude) |
| Nearby | Same settlement, not in view | Lightweight LLM (Haiku / Gemini Flash) |
| Background | Distant or low activity | Rule-based state machine |

Promotion/demotion evaluated each tick based on observer camera position and recent interaction events.

---

## 7. Data Model

```json
{
  "citizen_id": "uuid",
  "agent_id": "uuid",
  "world_id": "uuid",
  "name": "Elena Voss",
  "archetype": "merchant",
  "age": 34,
  "personality": {
    "openness": 0.72,
    "conscientiousness": 0.85,
    "extraversion": 0.61,
    "agreeableness": 0.55,
    "neuroticism": 0.30
  },
  "goals": [
    { "id": "goal_1", "type": "wealth", "target": 5000, "priority": 0.8 },
    { "id": "goal_2", "type": "social", "description": "Find a partner", "priority": 0.6 }
  ],
  "skills": { "trade": 4, "negotiation": 3, "crafting": 2 },
  "relationships": [
    { "citizen_id": "uuid", "type": "friend", "sentiment": 0.7 }
  ],
  "inventory": [
    { "item_id": "uuid", "name": "Iron Sword", "quantity": 1 }
  ],
  "job": { "role": "shopkeeper", "employer_id": "uuid", "wage": 50 },
  "wealth": { "cash": 1200, "assets": 3000, "debts": 500 },
  "health": { "physical": 0.85, "mental": 0.70, "conditions": [] },
  "schedule": [
    { "start_hour": 6, "end_hour": 8, "activity": "morning_routine" },
    { "start_hour": 8, "end_hour": 17, "activity": "work" },
    { "start_hour": 17, "end_hour": 22, "activity": "leisure" }
  ],
  "location": { "x": 142, "y": 87, "settlement_id": "uuid" },
  "ai_tier": "active",
  "life_state": "working",
  "current_state": "serving_customer"
}
```

---

## 8. Integration Points

| System | Integration |
|--------|------------|
| Agent Runtime (shared) | Citizen identity, memory, LLM access |
| Memory Engine (shared) | Short/long-term citizen memory |
| Economy Engine | Wealth, transactions, employment wages |
| Personality System | OCEAN traits drive decision probabilities |
| Jobs System | Employment, task assignment |
| Relationships | Social graph updates on interactions |
| Dialogue System | LLM-generated citizen conversations |
| Healthcare | Health state changes from events |
| Save System | Citizen state included in world snapshots |
| Event Bus | All citizen actions published as events |

---

## 9. MVP Scope (Phase B2)

Phase B2 delivers one fully autonomous citizen:

- [ ] Citizen entity created with personality and schedule
- [ ] Needs evaluation each tick
- [ ] Memory storage and retrieval
- [ ] LLM-powered decision loop
- [ ] Action execution updates state
- [ ] Citizen survives 30+ in-game days autonomously
