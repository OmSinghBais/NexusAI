# Crafting & Product Development Specification

## 1. Overview
In the context of the AIOS business simulation, "Crafting" represents **Research & Development (R&D) and Product Manufacturing**. It tests the AI agent's ability to innovate, allocate engineering resources, and bring new products to market efficiently.

## 2. Core Capabilities

### 2.1 The R&D Pipeline
- **Ideation & Prototyping**: Consumes simulated compute resources and engineering time (Jobs System) to develop new product blueprints.
- **Tech Trees**: Products are arranged in dependency trees. To develop "Advanced AI SaaS," the enterprise must first research "Cloud Infrastructure" and "Machine Learning Basics."

### 2.2 Manufacturing & Deployment
- **Physical Manufacturing**: Consumes raw materials (Inventory System) and factory time to produce finished goods.
- **Software Deployment**: Consumes compute credits and QA resources to push new software versions to the simulated market.

### 2.3 Quality Control & Bugs
- R&D is non-deterministic. Rushing a product to market reduces development time but increases the probability of shipping with "bugs" or manufacturing defects, which severely damages Brand Reputation (Relationships System).

## 3. Architecture

### 3.1 Recipe Engine
Every product has a "recipe" requiring specific inputs: time, capital, specific skill sets from Citizens, and physical/digital resources.

### 3.2 Iteration Cycles
Simulates agile development. The AI agent can choose to release an MVP (Minimum Viable Product) quickly to generate revenue, or spend more ticks iterating in stealth mode to release a polished V1.

### 3.3 Innovation Shocks
Occasionally, R&D efforts yield unexpected breakthroughs (positive shocks) or hit dead ends (negative shocks), testing the AI's ability to pivot its strategy.

## 4. Data Models

```json
{
  "active_projects": [
    {
      "project_id": "next_gen_mobile_app",
      "type": "software",
      "current_phase": "beta_testing",
      "resources_consumed": {
        "engineering_hours": 1500,
        "compute_credits": 50000
      },
      "estimated_completion_tick": 450,
      "projected_bug_rate": 0.05
    }
  ],
  "unlocked_tech": ["basic_encryption", "distributed_db"]
}
```

## 5. Integration Points
- **Inventory System**: Consumes raw resources and generates finished goods.
- **Jobs System**: Requires allocation of specific employee skill sets.
- **Combat System**: Products can be designed specifically to counter a competitor's offering.
