# Economy Simulation Specification

> **Product:** AI Civilization Simulator (Product B)
> **Phase:** B3 — Social & Economy

## 1. Overview

The **Economy Engine** simulates the financial and resource dynamics of the living world. Every citizen has personal wealth. Businesses produce and trade goods. Supply and demand emerge from citizen behavior — not scripted events. The economy runs autonomously each simulation tick.

---

## 2. Macro-Economic Simulation

### 2.1 World Market Indicators

- **Prosperity Index:** Aggregate citizen wealth and employment rate
- **Inflation:** Dynamic price adjustment based on supply scarcity
- **Trade Volume:** Total transaction value per tick
- **Unemployment Rate:** Citizens without jobs / total population

### 2.2 Seasonal and Event Effects

- Harvest seasons increase food supply, reduce prices
- Disasters (weather, war) spike commodity prices
- Technological discoveries create new markets

---

## 3. Micro-Economic Simulation

### 3.1 Citizen Wealth

Every citizen maintains a personal ledger:

```json
{
  "citizen_id": "uuid",
  "cash": 1200,
  "assets": [{ "type": "property", "value": 3000 }],
  "debts": [{ "creditor_id": "uuid", "amount": 500 }],
  "net_worth": 3700
}
```

Wealth changes via: wages, purchases, sales, gifts, theft, inheritance.

### 3.2 Supply & Demand Engine

- **Price Elasticity:** Prices adjust based on buyer/seller ratio per good
- **Resource Scarcity:** Limited resources drive price increases
- **Labor Market:** Wages adjust based on skill supply and employer demand

### 3.3 Transactions

All exchanges are recorded:

```json
{
  "transaction_id": "uuid",
  "tick": 450,
  "type": "purchase",
  "buyer_id": "uuid",
  "seller_id": "uuid",
  "item": "Iron Sword",
  "quantity": 1,
  "price": 150,
  "currency": "gold"
}
```

### 3.4 Employment & Wages

- Citizens seek jobs matching their skills (jobs.md)
- Employers post roles with wage offers
- Wages paid each tick to employed citizens
- Unemployment reduces citizen wealth and increases social unrest

---

## 4. Architecture

### 4.1 Tick-Based Evaluation

Economy engine runs as part of the simulation clock (ADR-0014):

```text
Each tick:
  1. Process pending transactions
  2. Pay wages to employed citizens
  3. Update supply/demand prices
  4. Evaluate unemployment effects
  5. Emit economy.tick event
```

### 4.2 Clearinghouse Mechanism

Matches buy and sell orders. If a citizen attempts to purchase an item:

1. Check seller inventory
2. Verify buyer wealth
3. Execute transfer (item + currency)
4. Record transaction
5. Update both citizen states

---

## 5. Data Models

```json
{
  "economy_state": {
    "world_id": "uuid",
    "tick": 450,
    "macro": {
      "prosperity_index": 0.72,
      "inflation_rate": 0.035,
      "unemployment_rate": 0.08,
      "trade_volume": 12500
    },
    "markets": {
      "iron": { "supply": 450, "demand": 520, "price": 12.5 },
      "food": { "supply": 1200, "demand": 980, "price": 3.2 }
    }
  }
}
```

---

## 6. Integration Points

| System | Integration |
|--------|------------|
| Citizen System | Wealth updates, purchase decisions |
| Jobs System | Wage payments, employment status |
| Inventory System | Item transfers on transactions |
| Businesses | Production output, revenue |
| Crafting | Resource consumption and product creation |
| Government | Taxation, policy effects on prices |
| Save System | Economy state in world snapshots |

---

## 7. MVP Scope (Phase B3)

- [ ] Citizen personal wealth tracked
- [ ] Basic buy/sell transactions between citizens
- [ ] Wage payments to employed citizens
- [ ] Supply/demand price adjustment
- [ ] Economy state included in world snapshots
