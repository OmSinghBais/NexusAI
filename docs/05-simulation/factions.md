# Factions & Industry Groups Specification

## 1. Overview
The **Factions System** groups individual entities (Citizens, Businesses) into larger collectives with shared goals, ideologies, and resources. In the business simulation, factions represent entities like Industry Consortia, Labor Unions, Regulatory Watchdogs, and Open-Source Communities.

## 2. Core Capabilities

### 2.1 Collective Bargaining & Influence
- **Labor Unions**: Represents employee interests. Can trigger strikes (disabling Crafting/Jobs) if satisfaction drops.
- **Industry Consortia**: Sets de facto standards. The AI agent must decide whether to join (paying dues, sharing IP) or compete against the standard.

### 2.2 Faction Goals & Agendas
- Factions possess their own AI logic, striving to achieve macro-objectives (e.g., an Environmental Watchdog faction trying to reduce overall carbon emissions in the simulation).
- They will actively lobby the Government System or initiate PR campaigns against businesses that oppose their agenda.

### 2.3 Reputation and Standing
- The AI agent maintains a distinct "standing" with each faction. High standing unlocks benefits (e.g., favorable PR, access to talent); low standing triggers hostility (e.g., boycotts, increased regulatory scrutiny).

## 3. Architecture

### 3.1 Hierarchical State Machine
Factions operate on a slower, higher-level state machine than individual Citizens. Their decisions are based on the aggregate sentiment of their members.

### 3.2 Influence Points (IP)
Factions accumulate and spend "Influence Points" to alter the simulation state (e.g., spending IP to force a regulatory audit on a rival corporation).

### 3.3 Dynamic Membership
Citizens and Businesses can join or leave factions dynamically based on how well the faction's current actions align with the entity's Personality/Culture profile.

## 4. Data Models

```json
{
  "faction_id": "tech_workers_union_local_404",
  "type": "labor_union",
  "core_agenda": ["maximize_compensation", "remote_work_rights"],
  "influence_points": 4500,
  "membership_count": 12500,
  "player_standing": {
    "score": -0.2,
    "status": "hostile",
    "active_boycotts": false
  }
}
```

## 5. Integration Points
- **Government System**: Factions heavily influence legislative changes.
- **Relationships System**: Faction standing acts as a multiplier for individual relationship scores with faction members.
- **Citizen System**: Citizens belong to multiple overlapping factions (e.g., a Consumer Rights group AND a Labor Union).
