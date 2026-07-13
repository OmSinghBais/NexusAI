# Combat & Market Competition Specification

## 1. Overview
In the AIOS simulation, "Combat" does not mean physical violence; it refers to **Market Competition, Hostile Takeovers, and Aggressive Corporate Tactics**. This system evaluates the AI agent's strategic execution when engaged in direct, zero-sum conflict with rival businesses.

## 2. Core Capabilities

### 2.1 Pricing Wars (Direct Engagement)
- **Undercutting**: Intentionally operating at a loss to bleed a competitor's cash reserves and steal market share.
- **Predatory Pricing**: Tests the AI's ability to survive or execute price-dumping strategies while managing the resulting regulatory scrutiny (Government System).

### 2.2 Hostile Takeovers (Siege Mechanics)
- **Boardroom Battles**: Simulates proxy fights, acquiring voting shares, and attempting to force acquisitions.
- **Poaching**: Aggressively targeting a competitor's top talent (interfacing with the Jobs/Citizen system) to degrade their R&D capabilities.

### 2.3 IP & Patent Litigation (Tactical Strikes)
- Launching or defending against patent infringement lawsuits designed to halt a competitor's product sales or drain their legal budgets.

## 3. Architecture

### 3.1 Competitive Action Queue
"Attacks" in this system are asynchronous. An AI agent queues a competitive action (e.g., "Launch Patent Lawsuit"), which resolves over several simulation ticks, allowing the defender time to react.

### 3.2 Resource Burn Rate
Combat is expensive. Every aggressive action carries a high capital cost and potentially a high reputation cost. The system calculates the "Damage" (loss of market share, cash, or talent) versus the "Cost of Attack."

### 3.3 Win/Loss Condition Evaluation
A combat scenario ends when one entity successfully acquires the other, forces them into bankruptcy (Economy System), or both parties agree to a truce/settlement (Dialogue System).

## 4. Data Models

```json
{
  "active_conflict": {
    "aggressor_id": "player_enterprise",
    "defender_id": "startup_competitor_x",
    "conflict_type": "hostile_takeover_attempt",
    "current_phase": "share_accumulation",
    "resources_committed": 15000000,
    "estimated_success_probability": 0.65
  },
  "tactical_actions": [
    {
      "action": "poach_cto",
      "status": "in_progress",
      "cost": 500000
    }
  ]
}
```

## 5. Integration Points
- **Businesses System**: Defines the targets and aggressors.
- **Economy System**: Provides the capital necessary to wage market warfare.
- **Government System**: Aggressive tactics often trigger antitrust investigations.
