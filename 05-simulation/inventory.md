# Inventory & Asset Management Specification

## 1. Overview
The **Inventory System** tracks all physical and digital assets owned by the simulated enterprise. For an AIOS, this acts as the primary resource management layer, testing the AI's ability to maintain optimal stock levels, manage software licenses, and track intellectual property.

## 2. Core Capabilities

### 2.1 Asset Tracking
- **Physical Goods**: Tracks raw materials, work-in-progress (WIP), and finished goods across various simulated warehouse nodes.
- **Digital Assets**: Manages software licenses, cloud compute credits, API quotas, and proprietary datasets.
- **Intellectual Property**: Tracks patents, trademarks, and trade secrets, which can be monetized or stolen (Crime System).

### 2.2 Inventory Optimization
- **Just-In-Time (JIT) vs. Stockpiling**: Tests the AI's inventory strategy. JIT saves working capital but is highly vulnerable to Weather/Transportation disruptions.
- **Depreciation & Spoilage**: Physical goods spoil or become obsolete; software licenses expire; server hardware depreciates.

### 2.3 Procurement Automation
- Interfaces with the B2B Businesses System to automatically trigger reorder points when inventory drops below defined thresholds.

## 3. Architecture

### 3.1 Distributed Ledger
Inventory is not a single global variable. It is tracked per-node (e.g., Warehouse A has 500 units; Data Center B has 10,000 compute credits). Moving inventory between nodes requires the Transportation System.

### 3.2 Valuation Engine
Continuously calculates the balance sheet value of the inventory using FIFO (First-In-First-Out) or LIFO (Last-In-First-Out) accounting methods, feeding data into the Economy System.

## 4. Data Models

```json
{
  "inventory_ledger": [
    {
      "item_id": "silicon_wafers_grade_A",
      "type": "physical_raw_material",
      "location_node": "manufacturing_hub_taiwan",
      "quantity": 25000,
      "unit_cost": 15.00,
      "reorder_point": 5000,
      "shelf_life_remaining_ticks": null
    },
    {
      "item_id": "enterprise_crm_seats",
      "type": "digital_license",
      "location_node": "global",
      "quantity": 500,
      "expiration_tick": 1200
    }
  ]
}
```

## 5. Integration Points
- **Crafting (R&D) System**: Consumes raw materials/compute to generate finished goods or new IP.
- **Transportation System**: Moves physical inventory between nodes.
- **Economy System**: Inventory valuation is a core component of the corporate balance sheet.
