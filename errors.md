# AIOS - Error Knowledge Base

> **File Name:** `errors.md`
>
> **Purpose**
>
> This file acts as the project's permanent error memory.
>
> Every AI assistant (ChatGPT, Claude, Gemini, Cursor, Copilot, etc.) **MUST** read this file before modifying any code.
>
> Every new error encountered during development **MUST** be documented here.
>
> Before fixing an error, search this file first to determine whether the same issue has already occurred.

---

# Error Management Rules

## Before Writing Code

Always

- Read `errors.md`
- Search for similar errors
- Apply existing solutions if available

---

## After an Error Occurs

Always

1. Record the error.
2. Record the root cause.
3. Record the fix.
4. Record the prevention strategy.
5. Update occurrence count.
6. Link the commit or PR if applicable.

---

## Never

- Delete old errors.
- Remove historical fixes.
- Ignore repeated errors.
- Store incomplete information.

---

# Error Severity Levels

| Level | Meaning |
|--------|----------|
| 🔴 Critical | Application crashes, security issues, data loss |
| 🟠 High | Major functionality broken |
| 🟡 Medium | Feature partially broken |
| 🔵 Low | Minor UI/UX issue |
| ⚪ Info | Warning or optimization |

---

# Error Status

```
Open
Investigating
Fixed
Won't Fix
Resolved
Monitoring
```

---

# Error Categories

- Backend
- Frontend
- AI
- Authentication
- Database
- API
- Infrastructure
- Docker
- Kubernetes
- Redis
- RabbitMQ
- Prisma
- PostgreSQL
- LangGraph
- Qdrant
- Deployment
- Performance
- Security
- Build
- Testing

---

# Error Template

Copy this template whenever a new error occurs.

```md
## ERR-XXXX

### Title

Short error title

---

Severity

🔴 Critical

---

Status

Open

---

First Seen

YYYY-MM-DD HH:MM

---

Last Seen

YYYY-MM-DD HH:MM

---

Occurrences

1

---

Category

Backend

---

Module

Authentication

---

File

src/auth/auth.service.ts

---

Function

login()

---

Error Message

```text
Paste exact error here
```

---

Root Cause

Describe the actual reason.

---

Solution

Describe the implemented fix.

---

Prevention

How to prevent this error again.

---

Related Errors

ERR-0003

ERR-0011

---

Git Commit

abc123

---

Verified

Yes

---

Notes

Additional observations.
```

---

# Error Index

| ID | Title | Severity | Status | Occurrences |
|----|--------|----------|----------|-------------|

---

# Common Error Library

---

## ERR-0001

### NestJS Dependency Injection Error

Severity

🟠 High

Status

Resolved

Occurrences

0

Category

Backend

Error

```text
Nest can't resolve dependencies
```

Root Cause

Missing provider registration inside module.

Solution

Register provider inside

```
providers:[]
```

Prevention

Always verify module imports and providers.

---

## ERR-0002

### Prisma Migration Failed

Severity

🟠 High

Status

Resolved

Occurrences

0

Error

```text
Migration failed.
```

Root Cause

Database schema mismatch.

Solution

Reset migration.

```
npx prisma migrate reset
```

Prevention

Review migration before applying.

---

## ERR-0003

### JWT Invalid

Severity

🟠 High

Occurrences

0

Solution

Check

- Secret
- Expiration
- Token format

---

## ERR-0004

### RabbitMQ Connection Failed

Severity

🟠 High

Occurrences

0

Solution

Check

- Docker
- Port
- Credentials

---

## ERR-0005

### Redis Connection Failed

Occurrences

0

Solution

Verify

- Redis running
- Host
- Port

---

## ERR-0006

### Qdrant Collection Missing

Occurrences

0

Solution

Create collection before inserting vectors.

---

## ERR-0007

### LLM JSON Parsing Failed

Occurrences

0

Root Cause

Model returned invalid JSON.

Solution

Use structured outputs or schema validation.

Never trust raw LLM output.

---

## ERR-0008

### React Hydration Error

Occurrences

0

Solution

Avoid rendering browser-only code during SSR.

---

## ERR-0009

### Infinite React Re-render

Occurrences

0

Solution

Check

- useEffect dependencies
- State updates

---

## ERR-0010

### Docker Container Won't Start

Occurrences

0

Solution

Check

- Docker logs
- Environment variables
- Ports
- Build output

---

# Frequently Repeated Errors

| Error ID | Count | Last Seen |
|----------|--------|------------|

---

# Root Cause Statistics

| Cause | Count |
|---------|--------|
| Missing Dependency | 0 |
| Invalid Types | 0 |
| Environment Variable | 0 |
| API Error | 0 |
| Database Error | 0 |
| Build Error | 0 |
| Authentication | 0 |
| AI Parsing | 0 |
| Network Error | 0 |

---

# Prevention Checklist

Before every commit verify

- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] No Prisma migration issues
- [ ] No Docker errors
- [ ] No Console errors
- [ ] No Build warnings
- [ ] Tests passed
- [ ] API working
- [ ] Authentication working
- [ ] AI responses validated

---

# AI Assistant Instructions

Every AI assistant working on AIOS MUST follow this workflow.

## Step 1

Read

```
docs/errors.md
```

---

## Step 2

Search whether the same error already exists.

If found

Increase

```
Occurrences
```

Update

```
Last Seen
```

Do NOT create duplicate entries.

---

## Step 3

If new

Create

```
ERR-XXXX
```

---

## Step 4

Record

- Error
- Cause
- Fix
- Prevention

---

## Step 5

Before finishing

Update

- Error Index
- Frequently Repeated Errors
- Root Cause Statistics

---

# Error Resolution Workflow

```
Code

↓

Error

↓

Search errors.md

↓

Already Exists?

├── Yes
│      │
│      ▼
│ Increase Occurrence Count
│ Update Last Seen
│ Apply Existing Fix
│
└── No
       │
       ▼
Create New Error Entry

↓

Investigate Root Cause

↓

Fix

↓

Verify

↓

Document

↓

Commit
```

---

# Prompt for AI Assistants

```text
Before fixing any issue:

1. Read docs/errors.md completely.
2. Search for the current error.
3. If the error exists:
   - Increase the occurrence count.
   - Update "Last Seen".
   - Reuse or improve the documented solution.
4. If it does not exist:
   - Create a new ERR-XXXX entry.
5. Never create duplicate records for the same root cause.
6. Every fix must include:
   - Root Cause
   - Solution
   - Prevention
7. Update the Error Index and statistics before ending the session.
8. If the same error occurs more than three times, propose a permanent architectural improvement instead of another temporary fix.
```

---

# Repeated Error Thresholds

| Occurrences | Required Action |
|--------------|-----------------|
| 1 | Document the issue and fix |
| 2 | Verify the previous fix still applies |
| 3 | Investigate why the fix did not prevent recurrence |
| 5 | Refactor the affected module or workflow |
| 10+ | Escalate as a design or architecture problem requiring a broader solution |

---

# Golden Rule

> **Every repeated error represents a gap in the system, the process, or the documentation.**
>
> The objective is not just to fix errors, but to eliminate the conditions that allow them to happen again.
