# Businesses & Ecosystem Specification

## 1. Overview
The **Businesses System** handles the creation, lifecycle, and behavior of all corporate entities within the simulation other than the one managed by the primary AI agent. This populates the market with competitors, vendors, partners, and acquisition targets, creating a vibrant, interactive B2B ecosystem.

## 2. Core Capabilities

### 2.1 Entity Lifecycle Management
- **Startup Generation**: Periodically spawns new, agile competitors into the market.
- **Growth & Scaling**: Simulates the organic growth of businesses based on their market share and product success.
- **Insolvency & M&A**: Handles the bankruptcy of poorly performing entities and facilitates Mergers & Acquisitions (allowing the AI agent to buy out competitors or be acquired).

### 2.2 B2B Interaction
- **Vendor Networks**: Simulated businesses act as suppliers for raw materials, SaaS tools, or professional services required by the AI agent's enterprise.
- **Partnerships**: Allows the AI agent to negotiate joint ventures, co-marketing agreements, or channel partnerships.

### 2.3 Competitive Intelligence
- **Opaque Data**: Information about competitor businesses is not freely available. The AI agent must allocate resources to "Market Research" or "Corporate Espionage" to uncover competitor financials, R&D pipelines, and strategic priorities.

## 3. Architecture

### 3.1 Autonomous Entity AI
Each business is driven by a lightweight, specialized AI model that attempts to maximize its own enterprise value. These entities follow specific "Corporate Culture Profiles" defined in the Personality system.

### 3.2 Market Share Allocation
A zero-sum calculation engine that distributes the Total Addressable Market (TAM) among active businesses based on their product quality, pricing, and marketing spend.

### 3.3 Contract Engine
Manages the creation, execution, and breach of B2B contracts (e.g., SLAs for SaaS vendors, supply agreements).

## 4. Data Models

```json
{
  "business_id": "corp_omega_tech",
  "profile": {
    "type": "competitor",
    "culture": "aggressive_growth",
    "market_share_percent": 15.4
  },
  "financials": {
    "estimated_valuation": 500000000,
    "pricing_strategy": "undercut"
  },
  "active_contracts": [
    {
      "partner_id": "player_enterprise",
      "type": "vendor_api_supply",
      "status": "active",
      "sla_breach_count": 0
    }
  ]
}
```

## 5. Integration Points
- **Combat (Market Competition) System**: Businesses actively utilize aggressive tactics against the player agent.
- **Economy System**: Aggregate business performance drives macro-economic indicators.
- **Relationships System**: Tracks the trust and reputation metrics between different corporate entities.
