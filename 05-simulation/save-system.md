# Save System & State Persistence Specification

## 1. Overview
The **Save System** is a critical infrastructure component for the AIOS Simulation Environment. It allows for deterministic snapshotting, state persistence, and scenario replay. This is essential for regression testing AI agents, debugging complex multi-agent interactions, and running Monte Carlo simulations of specific business decisions.

## 2. Core Capabilities

### 2.1 Deterministic State Snapshots
- Captures the exact state of every module in the simulation (Economy ledgers, Citizen sentiments, Inventory levels, RNG seeds) at a specific tick.
- Allows an AI agent to be rolled back to a previous state if a critical failure occurs, or to test alternative strategies from the same starting point.

### 2.2 Time-Travel Debugging
- Maintains an immutable append-only log of all state changes. Developers (and meta-AI supervisors) can step backward and forward through the simulation tick-by-tick to understand exactly why a cascading failure (e.g., market crash + cyber attack) occurred.

### 2.3 Scenario Branching (Multiverse)
- From a single save state, the system can spawn multiple concurrent simulation branches. This allows for A/B testing of AI strategies (e.g., "Branch A: Aggressive Pricing" vs. "Branch B: Quality Focus") to mathematically determine the optimal path.

## 3. Architecture

### 3.1 Event Sourcing
The simulation relies heavily on an Event Sourcing pattern. Rather than just storing the current state, the system stores the sequence of events that led to that state. Rebuilding a save file involves replaying these events from the genesis block (the World Generation seed).

### 3.2 Delta Compression
To optimize storage, full snapshots are taken periodically (e.g., every 100 ticks). Interim states are stored as deltas (diffs) against the last full snapshot.

### 3.3 Hashing and Validation
Every save state is cryptographically hashed. This ensures that the state has not been manually tampered with, guaranteeing the integrity of AI benchmark scores derived from the simulation.

## 4. Data Models

```json
{
  "snapshot_metadata": {
    "snapshot_id": "snap_alpha_tick_1500",
    "parent_snapshot_id": "snap_alpha_tick_1400",
    "world_seed": "0x8F4A2B",
    "timestamp": "2026-07-13T10:00:00Z",
    "hash": "sha256-hash-string"
  },
  "state_payload": {
    "economy_state": "{...}",
    "inventory_state": "{...}",
    "citizen_state_blob_ref": "s3://bucket/blob_id"
  }
}
```

## 5. Integration Points
- **World Generation**: The initial seed is the foundation of the save file.
- **All Simulation Modules**: Every module (Economy, Combat, Crime, etc.) must implement a `serialize()` and `deserialize()` interface to interact with the Save System.
