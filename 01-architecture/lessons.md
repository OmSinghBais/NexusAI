# AIOS - Lessons Learned

> File: lessons.md
>
> Purpose:
>
> Store valuable development knowledge discovered while building AIOS.
>
> Unlike errors.md, this file contains successful patterns, optimizations, and best practices.

---

# Rules

Whenever you discover

- Better architecture
- Better code
- Better performance
- Better UX
- Better security

Add it here.

Never delete lessons.

---

# Lesson Template

## LESSON-XXXX

Title

Short title

---

Date

YYYY-MM-DD

---

Category

Backend

Frontend

Database

AI

Security

Performance

Deployment

Architecture

---

Problem

What was learned?

---

Solution

What improved?

---

Benefits

- Faster
- Cleaner
- Easier
- More Secure

---

Applies To

Modules affected.

---

# Lessons

---

## LESSON-0001

Title

Prefer Services over Controllers

Category

Architecture

Problem

Controllers became too large.

Solution

Move business logic to services.

Benefits

- Easier testing
- Better separation
- Cleaner code

---

## LESSON-0002

Title

Always Validate AI Output

Category

AI

Problem

LLMs occasionally return malformed JSON.

Solution

Use schema validation.

Benefits

- More reliable
- Fewer runtime errors

---

## LESSON-0003

Title

Use Background Jobs

Category

Performance

Problem

Long-running HTTP requests caused timeouts.

Solution

Move heavy work to BullMQ.

Benefits

- Faster responses
- Better UX

---

## LESSON-0004

Title

Use DTO Validation

Category

Backend

Problem

Invalid requests reached services.

Solution

Validate every DTO.

Benefits

- Cleaner services
- Better security

---

## LESSON-0005

Title

Cache Frequently Used Data

Category

Performance

Problem

Repeated database queries.

Solution

Use Redis.

Benefits

- Faster dashboard
- Lower DB load

---

# Best Practices

## Backend

- One service = one responsibility.
- DTOs for every request.
- Repository only accesses database.
- Never expose entities directly.

---

## Frontend

- Reusable components.
- Skeleton loading.
- Optimistic UI updates.
- Mobile responsiveness.

---

## Database

- UUID primary keys.
- Soft deletes.
- Index foreign keys.
- Avoid N+1 queries.

---

## AI

- Validate every response.
- Keep prompts versioned.
- Separate system prompts.
- Limit unnecessary context.

---

## Security

- Never expose secrets.
- Validate inputs.
- Rate limit APIs.
- Encrypt sensitive data.

---

## Performance

- Cache expensive operations.
- Queue heavy jobs.
- Paginate large datasets.
- Lazy load data.

---

# Optimization Log

| Date | Improvement | Impact |
|------|-------------|--------|

---

# Things That Worked Well

- Modular architecture
- Shared UI components
- Event-driven communication
- AI memory abstraction

---

# Things To Improve

- Reduce token usage.
- Better workflow visualization.
- Improve caching.
- More integration tests.

---

# AI Instructions

When finishing a task ask:

1. Did we learn something valuable?
2. Is it reusable?
3. Can future developers benefit?

If yes,

Add it here.
