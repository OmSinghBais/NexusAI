# Core Backend Services

## Overview
The AIOS backend is structured as a modular monolith, allowing components to be easily extracted into independent microservices as the platform scales. The system is divided into bounded contexts (services).

## Service Boundaries

### 1. API Gateway / Router
- **Responsibilities**: Request validation, rate limiting, JWT verification, and routing requests to the appropriate service module.
- **Tech**: Node.js / Express or Fastify.

### 2. Identity and Access Management (IAM) Service
- **Responsibilities**: User registration, authentication, RBAC, tenant management, and API key provisioning.
- **Database**: PostgreSQL (Users, Tenants, Roles).

### 3. Workflow Service
- **Responsibilities**: CRUD operations for workflow templates, DAG validation, and managing the workflow execution lifecycle.
- **Dependencies**: Integrates closely with BullMQ and the Event Bus.

### 4. Integration Service
- **Responsibilities**: Manages connections to third-party APIs (e.g., Salesforce, Slack, GitHub). Handles OAuth handshakes and securely stores credentials.
- **Tech**: Vault integration for secret management.

### 5. AI Orchestration Service
- **Responsibilities**: Abstracts the underlying AI models (OpenAI, Anthropic, local models). Handles prompt templating, token counting, and caching responses.
- **Queue**: Listens to the `ai-inference` queue.

### 6. Notification Service
- **Responsibilities**: Formatting and dispatching alerts and notifications via email, SMS, or in-app channels.

## Inter-Service Communication
- **Synchronous**: Direct function calls (in modular monolith mode) or internal gRPC/REST (in microservices mode) for data fetching.
- **Asynchronous**: RabbitMQ events for state changes (e.g., IAM emitting `user.created`, triggering Notification service).
