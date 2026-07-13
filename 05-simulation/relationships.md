# Relationships & Network Specification

## 1. Overview
The **Relationships System** tracks the complex web of interactions, trust, and reputation between all entities in the simulation (Citizens, Businesses, Factions). For an AI operating system, understanding and manipulating B2B and B2C relationships is paramount for long-term success.

## 2. Core Capabilities

### 2.1 B2B Trust Metrics
- **Vendor Reliability**: Tracks how often a vendor delivers on time versus how often they breach SLAs.
- **Partnership Synergy**: Measures the compounding benefits of long-term strategic partnerships.
- **Corporate Reputation**: A global metric reflecting how the broader market perceives the AI's enterprise (affected by PR, product quality, and controversies).

### 2.2 B2C Brand Loyalty
- **Net Promoter Score (NPS)**: A simulated metric tracking how likely Citizens are to recommend the product.
- **Customer Lifetime Value (CLV) Correlation**: Strong relationships increase CLV and reduce churn probability.

### 2.3 Network Graphing
- Maps the "Six Degrees of Separation" within the simulated industry. The AI agent can utilize this to find warm introductions for sales or identify key influencers within a Faction.

## 3. Architecture

### 3.1 Directed Edge Weights
Relationships are modeled as a directed graph. Entity A's trust in Entity B is an edge weight `[-1.0 to 1.0]`. It is not always symmetrical (A might trust B, but B might not trust A).

### 3.2 Decay and Reinforcement
- **Decay**: Trust naturally decays toward 0.0 over time if there are no interactions.
- **Reinforcement**: Successful transactions, positive dialogue, and fulfilled contracts reinforce positive trust.
- **Betrayal**: Broken contracts or aggressive combat actions cause massive negative spikes in trust.

### 3.3 Sentiment Analysis Integration
Interacts with the Dialogue system to parse natural language interactions and convert them into mathematical adjustments to relationship weights.

## 4. Data Models

```json
{
  "relationship_graph": {
    "entity_a": "player_enterprise",
    "entity_b": "vendor_omega",
    "edge_data": {
      "trust_score": 0.82,
      "historical_transactions": 45,
      "last_interaction_tick": 402,
      "relationship_type": "strategic_supplier"
    }
  },
  "global_reputation": {
    "brand_equity_index": 78.5,
    "public_sentiment": "favorable"
  }
}
```

## 5. Integration Points
- **Dialogue System**: The primary interface for altering relationship states through negotiation.
- **Factions System**: Relationships with individual members influence relationships with the overall faction.
- **Businesses System**: Determines the likelihood of closing B2B deals.
