# Database Indexing Strategy

## Overview
Proper indexing is critical for the performance of AIOS, especially given the heavy read loads from dashboards and the fast-paced inserts of execution logs.

## Core Principles
- **Primary Keys**: Automatically indexed by PostgreSQL (B-Tree).
- **Foreign Keys**: Every foreign key column (`tenant_id`, `template_id`) must have an index to speed up joins and cascading deletes.
- **Unique Constraints**: Used for fields like email addresses, automatically creating unique B-Tree indexes.

## Advanced Indexing
### JSONB Indexing (GIN)
Since workflow definitions and execution states are stored as JSONB, GIN (Generalized Inverted Index) indexes are used extensively to query inside JSON documents.
- Example: Indexing the `config` field to find all workflows using a specific integration.
```sql
CREATE INDEX idx_workflow_config ON "WorkflowNode" USING GIN (config);
```

### Partial Indexes
For tables with soft deletes or specific high-query states, partial indexes are used to save space and improve performance.
- Example: Indexing only active users.
```sql
CREATE INDEX idx_active_users ON "User" (email) WHERE "deletedAt" IS NULL;
```
- Example: Indexing pending workflow executions.
```sql
CREATE INDEX idx_pending_executions ON "WorkflowExecution" (status) WHERE status = 'PENDING';
```

### Composite Indexes
Used when queries frequently filter or sort by multiple columns together.
- Example: Fetching workflows for a specific tenant ordered by creation date.
```sql
CREATE INDEX idx_tenant_created ON "Workflow" ("tenantId", "createdAt" DESC);
```

## Maintenance
Indexes are monitored via `pg_stat_user_indexes`. Unused indexes are pruned periodically to reduce write amplification. `REINDEX` is scheduled during maintenance windows to resolve index bloat.
