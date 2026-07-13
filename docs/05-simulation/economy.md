# Economy Simulation Specification

## 1. Overview
The **Economy Engine** simulates the financial and resource dynamics of the business environment. It operates at both the macro-economic (global markets, inflation, interest rates) and micro-economic (supply and demand, pricing elasticity, corporate cash flow) levels. This provides a rigorous financial sandbox for testing the fiscal management and strategic planning capabilities of AI agents.

## 2. Macro-Economic Simulation

### 2.1 Market Indicators
- **GDP & Growth Cycles**: Simulates expansion, peak, contraction, and trough cycles, affecting overall market liquidity.
- **Inflation & Deflation**: Dynamic adjustment of the cost of goods sold (COGS) and operational expenses (OpEx) over time.
- **Interest Rates**: Determines the cost of capital, impacting the simulated company's ability to take on debt for expansion.

### 2.2 Global Trade
- **Exchange Rates**: Simulates currency fluctuations for testing multi-national operational strategies.
- **Tariffs & Trade Wars**: Injects friction into global supply chains, forcing AI agents to optimize logistics dynamically.

## 3. Micro-Economic Simulation

### 3.1 Supply & Demand Engine
- **Price Elasticity Modeling**: Calculates consumer demand curves based on the pricing strategies deployed by the AI agent and competitors.
- **Resource Scarcity**: Simulates the availability of raw materials, server compute, or specialized labor, driving up costs when supply is constrained.

### 3.2 Corporate Financials
- **Ledger System**: Maintains a rigorous double-entry accounting system for the simulated enterprise.
- **Cash Flow Simulation**: Tracks revenue recognition, accounts receivable/payable, and runway. AI agents fail the simulation if the company becomes insolvent.
- **Valuation Models**: Continuously calculates enterprise value based on DCF (Discounted Cash Flow) and market multiples.

## 4. Architecture

### 4.1 Tick-Based Evaluation
The economy engine operates on a discrete tick system (e.g., 1 tick = 1 fiscal day). At each tick, ledgers are updated, contracts are executed, and market indicators fluctuate based on stochastic models (e.g., Geometric Brownian Motion for asset prices).

### 4.2 Clearinghouse Mechanism
Matches buy and sell orders across the simulated market. If the AI agent attempts to purchase inventory, the clearinghouse determines if supply exists at the requested price point.

## 5. Data Models

```json
{
  "economy_state": {
    "tick": 450,
    "macro": {
      "inflation_rate": 0.035,
      "central_bank_rate": 0.05,
      "market_sentiment": "bearish"
    },
    "micro": {
      "commodity_index": 120.4,
      "labor_cost_index": 105.2
    }
  },
  "company_ledger": {
    "cash_reserves": 5000000.00,
    "burn_rate": 150000.00,
    "arr": 12000000.00
  }
}
```

## 6. Integration Points
- **Inventory System**: Determines the cost and value of simulated physical or digital goods.
- **Jobs System**: Sets the baseline salaries and compensation expectations for simulated employees.
- **Weather/Events System**: Economy is highly susceptible to macro-environmental shocks (e.g., a "supply chain disruption" event spikes commodity prices).
