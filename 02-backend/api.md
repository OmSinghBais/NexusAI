# API Standards and Architecture

## Overview
This document outlines the standards, conventions, and architecture of the AIOS API. AIOS primarily utilizes a RESTful architecture for standard operations and a GraphQL interface for complex, client-driven data fetching.

## API Principles
- **Predictability**: Endpoints should be intuitive and follow standard naming conventions.
- **Statelessness**: Every request must contain all information required to execute it (via JWT).
- **Pagination**: All list endpoints must support cursor-based pagination.
- **Versioning**: API versioning is managed via URL path (e.g., `/api/v1/`).

## REST API Standards
### Base URL
`/api/v1/`

### Resource Naming
- Use plural nouns for resources (e.g., `/users`, `/workflows`, `/tasks`).
- Use lowercase and hyphens for multi-word resources (e.g., `/workflow-templates`).

### HTTP Methods
- `GET`: Retrieve a resource or a collection of resources.
- `POST`: Create a new resource.
- `PUT`: Completely replace an existing resource.
- `PATCH`: Partially update an existing resource.
- `DELETE`: Remove a resource.

### Standard Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 120
  }
}
```

### Error Handling
Errors will return standard HTTP status codes along with a structured JSON response.
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      { "field": "email", "issue": "Must be a valid email address." }
    ]
  }
}
```

## Core REST Endpoints
### Authentication
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

### Workflows
- `GET /api/v1/workflows`
- `POST /api/v1/workflows`
- `GET /api/v1/workflows/:id`
- `PATCH /api/v1/workflows/:id`

## GraphQL API
The GraphQL endpoint is available at `/api/graphql`.
It is heavily utilized by the frontend dashboard to fetch aggregated statistics and deep relational data in a single request.

### Schema Conventions
- Mutations must return a payload type containing the modified entity and any applicable errors.
- Interfaces are used for generic nodes (e.g., `Node` with an `id` field).
