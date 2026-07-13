# Database Architecture

## Overview
AIOS utilizes PostgreSQL as the primary relational database for persistent storage, leveraging its advanced features such as JSONB, ACID compliance, and robust indexing. Redis is used as an in-memory datastore for caching and queue management.

## Primary Database: PostgreSQL
- **Version**: PostgreSQL 16+
- **Usage**: Core application state, user data, workflow definitions, and execution logs.
- **Connection Pooling**: PgBouncer is used to manage connection limits and ensure high availability.
- **ORM**: Prisma is utilized for schema management, migrations, and type-safe querying.

## Key Features Utilized
- **JSONB**: Used extensively for storing dynamic workflow configurations, arbitrary API payloads, and schemaless metadata.
- **Row-Level Security (RLS)**: Enforced at the application level via tenant ID isolation, though RLS can be configured for deep multi-tenant security.
- **CTEs (Common Table Expressions)**: Used for recursive queries, particularly when traversing workflow DAGs.

## Caching Store: Redis
- **Usage**:
  - Session store and JWT blacklisting.
  - Caching frequently accessed data (e.g., compiled workflow templates).
  - Backing store for BullMQ job queues.
  - Distributed rate limiting counters.

## Backup and Disaster Recovery
- **Continuous Archiving**: WAL (Write-Ahead Logging) is archived to S3 for Point-in-Time Recovery (PITR).
- **Daily Snapshots**: Automated daily volume snapshots.
- **Read Replicas**: Provisioned to offload heavy reporting and GraphQL queries.
