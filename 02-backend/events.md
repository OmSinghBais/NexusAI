# Event Bus Architecture

## Overview
AIOS uses an event-driven architecture to ensure loose coupling between microservices and modules. RabbitMQ is utilized as the primary message broker.

## Architecture
- **Broker**: RabbitMQ
- **Exchange Type**: Primarily `Topic` exchanges for flexible routing.
- **Message Format**: All payloads must be serialized as JSON and conform to the standard Event Envelope structure.

## Event Envelope
```json
{
  "eventId": "uuid-v4",
  "eventType": "workflow.completed",
  "timestamp": "2026-07-13T12:00:00Z",
  "source": "aios-workflow-engine",
  "payload": {
    "workflowId": "wf-12345",
    "status": "COMPLETED"
  },
  "metadata": {
    "correlationId": "req-98765"
  }
}
```

## Standard Topics
Events are published to the `aios.events` exchange. The routing keys follow the format: `<domain>.<entity>.<action>`.

### Workflow Events
- `workflow.execution.started`
- `workflow.execution.completed`
- `workflow.execution.failed`
- `workflow.task.retried`

### User & Auth Events
- `user.account.created`
- `user.session.revoked`

### System Events
- `system.health.degraded`
- `system.config.updated`

## Consumer Guidelines
- **Idempotency**: Consumers must be designed to handle duplicate messages gracefully.
- **Dead Letter Exchanges (DLX)**: Messages that fail processing after maximum retries are routed to a DLX for manual inspection and alerting.
