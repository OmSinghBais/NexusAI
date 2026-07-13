# Agent Planning Algorithms

## Overview
Planning is the cognitive process by which AIOS agents determine a sequence of actions required to transition from a current state to a desired goal state. Robust planning is essential for handling complex, multi-step business processes.

## Planning Paradigms

### 1. Chain of Thought (CoT) & Step-by-Step
For straightforward tasks, agents are prompted to think step-by-step before acting.
- **Mechanism**: The agent outputs a reasoning trace before outputting an action command.
- **Use Case**: Simple data retrieval, basic calculations, and linear workflows.

### 2. ReAct (Reasoning and Acting)
Interleaves reasoning traces with tool execution, allowing the agent to observe the outcome of an action before deciding on the next step.
- **Mechanism**: `Thought -> Action -> Observation -> Thought...`
- **Use Case**: Interactive troubleshooting, web browsing, and API exploration.

### 3. Tree of Thoughts (ToT) / Graph of Thoughts (GoT)
For highly complex problems requiring exploration of multiple pathways.
- **Mechanism**: The agent explores multiple possible plans simultaneously, evaluates their likelihood of success, and backtracks if a path hits a dead end.
- **Use Case**: Complex coding tasks, strategic business analysis, and multi-variable optimization.

### 4. Hierarchical Task Network (HTN) Planning
Top-down decomposition of tasks into smaller sub-tasks.
- **Mechanism**: A Supervisor agent breaks a High-Level Goal (e.g., "Onboard new employee") into Sub-Goals (e.g., "Create IT accounts", "Schedule orientation"). These are further decomposed until they map to primitive actions (Tool Calls).
- **Use Case**: Orchestrating enterprise workflows involving multiple specialized agents.

## Plan Execution and Monitoring
- **Dynamic Replanning**: If an action fails (e.g., API downtime), the agent must detect the failure, assess the new state, and generate an alternative plan.
- **State Tracking**: The system maintains an explicit state representation of the plan's progress, which is visible to monitoring tools and human supervisors.
- **Validation Gates**: Critical plan steps may require external validation (e.g., running tests, human-in-the-loop approval) before proceeding to the next step.
