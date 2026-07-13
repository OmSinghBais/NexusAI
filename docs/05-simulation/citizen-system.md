# Citizen System Specification

## 1. Overview
In the AIOS Simulation Environment, the **Citizen System** models the individual human actors that populate the business ecosystem. These "citizens" act as simulated employees, customers, partners, investors, and stakeholders. This system is crucial for testing how AI agents interact with complex human behaviors, motivations, and irrationalities.

## 2. Core Capabilities

### 2.1 Persona Generation
- **Demographics**: Age, location, education level, income bracket.
- **Psychographics**: Risk tolerance, brand loyalty, ethical boundaries, susceptibility to marketing.
- **Professional Attributes**: Skill sets, experience levels, leadership capacity, job satisfaction.

### 2.2 Behavioral State Machine
Citizens operate using a complex state machine driven by internal needs (Maslow's hierarchy adapted for corporate/consumer contexts) and external stimuli:
- **Consumer State**: Browsing, researching, purchasing, churning, advocating.
- **Employee State**: Productive, disgruntled, seeking promotion, collaborating, resigning.
- **Stakeholder State**: Satisfied, activist, divesting, auditing.

### 2.3 Interaction Matrix
Citizens do not exist in a vacuum. They form networks and influence one another:
- **Viral Mechanics**: Modeling how sentiments, product recommendations, or corporate rumors spread through the citizen population.
- **Collective Action**: Simulating unionization, consumer boycotts, or mass adoption of a trend.

## 3. Architecture

### 3.1 Agent-Based Modeling (ABM)
The system utilizes lightweight ABM. Each citizen is an independent entity with its own loop, evaluating its environment and making localized decisions.

### 3.2 Archetype Templates
To optimize performance, citizens are generated from base archetypes (e.g., "Early Adopter," "Disgruntled Middle Manager," "Activist Investor") with procedural variance applied to ensure heterogeneity.

### 3.3 Sentiment Engine
A sub-component that calculates a citizen's sentiment score (ranging from -1.0 to 1.0) toward specific brands, products, policies, or the AI agents themselves, updated dynamically based on interactions.

## 4. Data Models

```json
{
  "citizen_id": "uuid",
  "archetype": "consumer_value_driven",
  "attributes": {
    "risk_tolerance": 0.3,
    "price_sensitivity": 0.9,
    "loyalty_index": 0.5
  },
  "current_state": "researching_alternatives",
  "sentiment_ledger": {
    "brand_a": 0.1,
    "brand_b": -0.4
  }
}
```

## 5. Integration Points
- **Economy Engine**: Citizen behavior directly impacts supply, demand, and labor availability.
- **Personality System**: Draws heavily on personality profiles to determine specific reactions to AI agent dialogue or actions.
- **Jobs System**: Maps citizens to organizational roles and tracks their performance and tenure.
