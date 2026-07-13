# Personality & Behavior Profile Specification

## 1. Overview
The **Personality System** provides the psychological underpinning for all simulated entities (citizens, competitors, regulatory bodies) within the AIOS Simulation Environment. It defines how these entities perceive the world, process information, and react to stimuli, specifically testing the EQ (Emotional Quotient) and adaptability of the AI agents under evaluation.

## 2. Core Frameworks

### 2.1 The OCEAN Model (Big Five)
The core personality generation relies on the Big Five personality traits, parameterized on a continuous scale [0.0 - 1.0]:
- **Openness**: Willingness to adopt new technologies or business models proposed by AI agents.
- **Conscientiousness**: Adherence to compliance, detail orientation in negotiations, reliability.
- **Extraversion**: Communication volume, likelihood of networking and viral sharing.
- **Agreeableness**: Receptiveness to AI agent proposals, negotiation friction, customer service interactions.
- **Neuroticism**: Volatility in decision making, panic selling, overreaction to PR crises.

### 2.2 Corporate Culture Profiles
For macro-entities (competitor companies, partner firms), the system applies organizational behavior profiles:
- **Aggressive/Predatory**: Prioritizes market share, utilizes hostile tactics, ignores unwritten industry norms.
- **Conservative/Bureaucratic**: Slow decision cycles, highly risk-averse, requires extensive data validation from AI agents.
- **Innovative/Agile**: Rapid pivots, embraces experimental partnerships, highly reactive to market shifts.

## 3. Cognitive Biases and Irrationality
To provide a realistic testing ground, the system injects cognitive biases into entity decision-making. AI agents must learn to navigate these non-logical human factors:
- **Anchoring Bias**: Fixation on initial pricing or terms during negotiation simulations.
- **Loss Aversion**: Preference for avoiding losses over acquiring equivalent gains, affecting investment and partnership logic.
- **Confirmation Bias**: Entities selectively ignoring data presented by the AI agent that contradicts their pre-existing beliefs.

## 4. Architecture

### 4.1 Trait Vectorization
Personality profiles are stored as high-dimensional vectors. When an entity must make a decision, the stimulus is evaluated against this vector to calculate the probabilistic outcome.

### 4.2 State Modifiers
Base personality traits are static, but temporary modifiers are applied based on external events (e.g., high market volatility temporarily increases Neuroticism and decreases Openness).

## 5. Data Models

```json
{
  "profile_id": "uuid",
  "entity_type": "executive_buyer",
  "ocean_metrics": {
    "openness": 0.2,
    "conscientiousness": 0.8,
    "extraversion": 0.5,
    "agreeableness": 0.3,
    "neuroticism": 0.6
  },
  "active_biases": ["loss_aversion", "status_quo_bias"],
  "temporary_modifiers": {
    "stress_level": 0.7
  }
}
```

## 6. Integration Points
- **Dialogue System**: Determines the tone, hostility, and openness of natural language interactions with the AI agent.
- **Combat/Competition Engine**: Defines the strategic approach a simulated competitor will take.
- **Citizen System**: Acts as the psychological core for every simulated individual.
