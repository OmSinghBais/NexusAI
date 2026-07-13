# Job Queues and Workers

## Overview
Asynchronous, background, and long-running tasks in AIOS are handled using BullMQ backed by Redis. This allows for robust job scheduling, prioritization, and distributed worker execution.

## Queue Architecture
- **Broker**: Redis
- **Library**: BullMQ
- **Workers**: Node.js microservices listening on specific queues.

## Core Queues
1. **`workflow-tasks`**: Handles individual steps of a workflow (e.g., API requests, data transformations).
2. **`ai-inference`**: Dedicated queue for interacting with LLMs or other heavy AI models. Kept separate to allow for dedicated scaling and concurrency limits.
3. **`notifications`**: Dispatches emails, webhooks, and push notifications.
4. **`system-maintenance`**: Handles data cleanup, archival, and routine checks.

## Job Priorities
BullMQ supports priority values (lower number = higher priority).
- **Priority 1 (Critical)**: Real-time user-initiated actions.
- **Priority 5 (High)**: Standard workflow tasks.
- **Priority 10 (Normal)**: Scheduled background syncs.
- **Priority 20 (Low)**: Data archival and cleanup.

## Worker Configuration
- **Concurrency**: Each worker is configured with a concurrency limit. `ai-inference` workers typically have lower concurrency to respect API rate limits.
- **Rate Limiting**: Applied globally across queues to prevent downstream API throttling.
- **Stalled Jobs**: BullMQ automatically detects stalled jobs (where the worker crashed) and re-queues them.

## Monitoring
Queue health, throughput, and error rates are monitored using BullMQ's built-in metrics, exported to Prometheus/Grafana.
