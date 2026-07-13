# World Generation Specification

## 1. Overview
The **World Generation Engine** is the foundational component of the AIOS Simulation Environment. In the context of business AI testing, "world generation" refers to the procedural creation of complex, dynamic market landscapes, industry ecosystems, and business scenarios. This sandbox environment is designed to test AI agents against realistic, multifaceted business challenges.

## 2. Core Capabilities

### 2.1 Market Landscape Generation
- **Industry Selection**: Procedurally generates a mix of industries (e.g., Tech, Finance, Healthcare, Manufacturing) based on parameterized seed data.
- **Market Sizing & Growth Rates**: Calculates Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM) with variable growth trajectories (hyper-growth, stagnant, declining).
- **Competitor Seeding**: Populates the market with diverse competitor profiles ranging from agile startups to entrenched monopolies.

### 2.2 Macro-Environmental Parameterization (PESTLE)
The engine utilizes a PESTLE (Political, Economic, Social, Technological, Legal, Environmental) framework to establish the foundational rules of the generated world:
- **Political**: Stability indices, trade relations, taxation policies.
- **Economic**: Interest rates, inflation curves, GDP growth, consumer spending power.
- **Social**: Demographic shifts, consumer trends, cultural paradigms.
- **Technological**: Rate of innovation, technology adoption curves, disruption events.
- **Legal**: Regulatory strictness, IP protection laws, labor laws.
- **Environmental**: Resource availability, sustainability requirements, supply chain vulnerabilities.

## 3. Architecture

### 3.1 Scenario Seed Generator
A stochastic engine that accepts constraints (e.g., "High Volatility Tech Market") and generates a deterministic seed. This ensures that specific simulation scenarios can be precisely reproduced for regression testing AI agents.

### 3.2 Landscape Instantiator
Reads the generated seed and populates the simulation graph database with foundational entities (companies, markets, resources, regulatory bodies).

### 3.3 Dynamic Evolution Engine
Unlike static datasets, the generated world evolves over time using a discrete-event simulation model. It advances the state of the market based on internal rules and the actions taken by the AI agents being tested.

## 4. Data Models

```json
{
  "scenario_id": "uuid",
  "seed": "alpha-numeric-string",
  "parameters": {
    "volatility_index": 0.8,
    "market_maturity": "emerging",
    "regulatory_environment": "strict"
  },
  "entities": {
    "markets": [],
    "competitors": [],
    "resources": []
  }
}
```

## 5. Integration Points
- **Save System**: Interfaces with the snapshot mechanism to persist the generated world state.
- **Economy Engine**: Provides the foundational parameters that drive the micro and macro economic simulations.
- **Event System (Weather/Events)**: Defines the probability matrix for macro-environmental shocks.
