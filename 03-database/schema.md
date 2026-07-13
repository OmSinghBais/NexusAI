# Prisma Schema Overview

## Overview
AIOS uses Prisma as its ORM. The `schema.prisma` file serves as the single source of truth for the database structure, relationships, and model generation.

## Schema Conventions
- **Naming**: Models use PascalCase (`User`, `WorkflowExecution`). Fields use camelCase (`createdAt`, `tenantId`).
- **IDs**: UUIDs (v4) are used as primary keys for all models to ensure uniqueness across distributed environments and make migrations easier.
- **Timestamps**: All models include `createdAt` and `updatedAt` standard fields.
- **Soft Deletes**: Critical models (like Users and Templates) implement soft deletes via a `deletedAt` DateTime field.

## Example Model Segment

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Tenant {
  id        String     @id @default(uuid())
  name      String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  users     User[]
  workflows Workflow[]
}

model User {
  id        String    @id @default(uuid())
  tenantId  String
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  tenant    Tenant    @relation(fields: [tenantId], references: [id])
  roles     Role[]
}

model Workflow {
  id          String   @id @default(uuid())
  tenantId    String
  name        String
  definition  Json
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  tenant      Tenant   @relation(fields: [tenantId], references: [id])
}
```

## Schema Management
- Changes to the schema are applied via the Prisma CLI (`npx prisma migrate dev`).
- The generated Prisma Client is injected into the application's service layer, providing full type safety across the backend.
