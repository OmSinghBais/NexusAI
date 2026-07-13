# Weather & Macro-Event Specification

## 1. Overview
In a business simulation, "Weather" represents large-scale, often unpredictable macro-environmental events that affect the entire ecosystem. This system tests the AI agent's ability to handle "Black Swan" events, systemic shocks, and long-term environmental trends.

## 2. Core Capabilities

### 2.1 Systemic Shocks (Black Swans)
- **Pandemics/Health Crises**: Drastically alters citizen behavior, reduces labor availability, and shifts consumption patterns overnight.
- **Geopolitical Conflicts**: Triggers sanctions, halts global trade routes, and spikes specific commodity prices.
- **Natural Disasters**: Destroys physical infrastructure in specific geographic nodes, testing disaster recovery and supply chain redundancy.

### 2.2 Market "Weather" (Trends)
- **Technological Shifts**: E.g., The sudden viability of a new technology (like generative AI or quantum computing) that instantly depreciates legacy products.
- **Cultural Movements**: Sudden shifts in consumer sentiment (e.g., a massive pivot toward sustainable products) driven by the Citizen System's collective behavior.

### 2.3 Seasonality
- Models predictable cycles, such as Q4 retail spikes, end-of-fiscal-year budget dumps, or seasonal agricultural impacts on supply chains.

## 3. Architecture

### 3.1 Event Probability Matrix
Events are not entirely random; they are drawn from a probability matrix influenced by the World Generation seed. A highly volatile world seed increases the frequency and severity of systemic shocks.

### 3.2 Global Modifiers
When a "weather" event occurs, it applies global modifiers to the underlying simulation variables (e.g., a "Global Logistics Crisis" event applies a 3x multiplier to all transportation costs and a +14 day modifier to all shipping times).

### 3.3 Forecasting Engine
Provides the AI agents with noisy, imperfect predictive data (like a real weather forecast). Agents must decide how much capital to invest in preparing for a predicted event that may or may not happen.

## 4. Data Models

```json
{
  "current_events": [
    {
      "event_id": "geo_conflict_alpha",
      "type": "geopolitical",
      "intensity": 0.7,
      "affected_regions": ["eu", "apac"],
      "global_modifiers": {
        "energy_costs": 1.5,
        "consumer_confidence": -0.2
      },
      "estimated_duration_ticks": 120
    }
  ],
  "forecast": {
    "probability_of_recession_next_quarter": 0.65
  }
}
```

## 5. Integration Points
- **Economy System**: Events heavily modify macro-economic indicators and micro-economic supply/demand.
- **Transportation System**: Physical weather/disasters disrupt routing and logistics.
- **Citizen System**: Alters global sentiment and purchasing behavior.
