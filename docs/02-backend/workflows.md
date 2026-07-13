# Workflow Engine Architecture

## Overview
The AIOS Workflow Engine is the core component responsible for orchestrating complex business logic, chaining tasks, and managing state transitions. It executes workflows deterministically based on predefined templates.

## Architecture
The engine consists of several components:
- **Workflow Parser**: Validates and parses workflow definitions (JSON/YAML) into an execution graph (DAG).
- **Scheduler**: Determines when the next step in a workflow should be executed.
- **Executor**: Responsible for running specific tasks/actions, including API calls, AI inference, and data transformations.
- **State Manager**: Persists the state of running workflows to PostgreSQL, ensuring durability.

## Execution Flow
1. **Triggering**: A workflow is triggered via an API call, a scheduled cron job, or an event on the Event Bus.
2. **Initialization**: A new `WorkflowExecution` record is created with the state `PENDING`.
3. **Graph Traversal**: The engine traverses the DAG. Nodes (tasks) without unfulfilled dependencies are enqueued in BullMQ for execution.
4. **Task Execution**: Worker nodes pick up tasks from BullMQ, execute them, and report back the status (`COMPLETED`, `FAILED`, `RETRYING`).
5. **State Update**: Upon task completion, the State Manager updates the workflow context and evaluates the next nodes in the DAG.
6. **Completion**: When all terminal nodes are executed, the workflow is marked as `COMPLETED`.

## Error Handling & Retries
- **Transient Errors**: Configured with exponential backoff and a maximum retry count.
- **Fatal Errors**: Immediately halt the branch of the workflow and mark the execution as `FAILED`.
- **Compensation**: Workflows can define compensation steps (Sagas) to roll back actions if a subsequent step fails.
