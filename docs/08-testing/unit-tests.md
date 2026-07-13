# Unit Testing Guidelines

## Tools
- **Framework:** Jest (Backend/Logic) and Vitest/Jest (Frontend)
- **UI Testing:** React Testing Library (RTL)

## Backend Unit Tests
- Focus on business logic, utility functions, and complex algorithms.
- Mock external dependencies (e.g., database clients, external APIs) heavily.
- Keep tests fast and isolated.

## Frontend Unit Tests
- Use React Testing Library to test components from the user's perspective.
- **Do:** Query by accessible roles (e.g., `getByRole('button', { name: /submit/i })`).
- **Don't:** Test internal component state or query by DOM structure/classes.

## File Organization
- Place test files next to the implementation files with a `.test.ts` or `.spec.ts` suffix.
  ```
  src/utils/math.ts
  src/utils/math.test.ts
  ```

## Writing Good Tests
- Use the **Arrange, Act, Assert (AAA)** pattern.
- Write clear and descriptive test names (`it('should return error when input is negative')`).
