# Transportation & Logistics Specification

## 1. Overview
The **Transportation System** models the flow of physical goods, digital data, and human capital across the simulated world graph. It tests the AI agent's ability to optimize supply chains, manage network latency, and route resources efficiently under constraints.

## 2. Core Capabilities

### 2.1 Physical Supply Chain Logistics
- **Routing & Nodes**: Simulates manufacturing hubs, distribution centers, and last-mile delivery networks.
- **Carrier Dynamics**: Models different shipping methods (freight, air, rail) with varying costs, speeds, and reliability profiles.
- **Inventory Transit**: Tracks goods as they move. Goods in transit tie up working capital and are vulnerable to disruptions.

### 2.2 Digital Data Flow
- **Network Topology**: Simulates the flow of information across server regions (e.g., AWS us-east-1 to eu-central-1).
- **Latency & Bandwidth**: Tests the AI's ability to architect distributed systems by simulating network congestion, API rate limits, and packet loss.

### 2.3 Human Capital Movement
- **Commute & Remote Work**: Models the efficiency of the simulated workforce based on geographic distribution and remote work policies (interfacing with the Citizen and Jobs systems).

## 3. Architecture

### 3.1 Graph-Based Routing
The physical and digital worlds are represented as a weighted directed graph. The AI agent must utilize (or implement) routing algorithms (like Dijkstra's or A*) to optimize flow. Edge weights fluctuate dynamically based on the Weather and Economy systems.

### 3.2 Capacity Constraints
Every node and edge has a maximum capacity. Pushing too much volume through a specific channel causes exponential cost increases and delays (bottlenecks).

### 3.3 Disruption Engine
Randomly or deterministically degrades specific edges (e.g., "Port Strike" severs a physical edge; "BGP Routing Error" degrades a digital edge).

## 4. Data Models

```json
{
  "network_graph": {
    "nodes": [
      {"id": "factory_01", "type": "production", "capacity": 1000}
    ],
    "edges": [
      {
        "source": "factory_01",
        "target": "dist_center_A",
        "mode": "freight",
        "current_load": 850,
        "max_capacity": 1000,
        "transit_time_ticks": 5,
        "cost_per_unit": 12.50
      }
    ]
  }
}
```

## 5. Integration Points
- **Inventory System**: Goods cannot materialize instantly; they must traverse the transportation network.
- **Weather System**: Storms or conflicts alter edge weights and capacities.
- **Economy System**: Fuel costs and tariffs directly impact the `cost_per_unit` on edges.
