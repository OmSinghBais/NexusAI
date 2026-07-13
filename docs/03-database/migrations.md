# Migration Management Rules

## Overview
Database migrations represent the evolution of the AIOS schema. We use Prisma Migrate for managing and applying schema changes reliably across local, staging, and production environments.

## Rules and Best Practices

### 1. Never Modify Applied Migrations
Once a migration has been committed to version control and applied to an environment, its SQL file (`migration.sql`) must never be edited.
- If a mistake was made, a *new* migration must be created to fix or revert the changes.

### 2. Descriptive Naming
When creating a migration, provide a clear, descriptive name.
- Good: `add_user_roles_relation`
- Bad: `update_db`, `fix_schema`
- Command: `npx prisma migrate dev --name add_user_roles_relation`

### 3. Review Generated SQL
Prisma generates SQL automatically, but it is the engineer's responsibility to review the `migration.sql` file before committing.
- Ensure column drops or type changes will not result in unintended data loss.
- Verify that default values are appropriate.

### 4. Zero-Downtime Migrations
For production systems, schema changes must support zero downtime.
- **Adding a column**: Must be nullable or have a default value.
- **Renaming a column**: Done in phases:
  1. Add new column.
  2. Write to both.
  3. Backfill data.
  4. Read from new column.
  5. Drop old column.

### 5. Custom Migrations
For complex data transformations or backfills that cannot be expressed purely in Prisma schema changes, use the `--create-only` flag to generate a skeleton SQL file, then write custom raw SQL.

### 6. Deployment
Migrations are applied automatically during the CI/CD deployment pipeline using `npx prisma migrate deploy`. This command strictly applies pending migrations without attempting to reset the database.
