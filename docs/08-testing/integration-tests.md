# Integration Testing Guidelines

## Tools
- **Framework:** Supertest (for Node.js API endpoints), Jest/Vitest

## Scope
Integration tests verify that different parts of the system work together. 
- **Backend:** Testing API routes including middleware, input validation, controllers, and database queries.
- **Frontend:** Testing complex page views connected to state management or mocked API layers (e.g., MSW - Mock Service Worker).

## Database for Integration Tests
- Do not mock the database for backend integration tests.
- Use an isolated test database (e.g., a localized Docker container or an in-memory SQLite for Prisma) that is spun up, migrated, and torn down for the test suite.
- **Seeding:** Ensure each test starts with a clean slate by wiping data and seeding necessary fixtures `beforeEach` or `beforeAll`.

## Example (Supertest)
```typescript
import request from 'supertest';
import app from '../src/app';

describe('POST /api/users', () => {
  it('should create a new user and return 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test User' });
    
    expect(res.status).toBe(201);
    expect(res.body.email).toBe('test@example.com');
  });
});
```
