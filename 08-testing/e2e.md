# End-to-End (E2E) Testing Guidelines

## Tools
- **Framework:** Playwright (Preferred) or Cypress

## Scope
E2E tests ensure the entire application stack (Frontend + Backend + DB) works together from a user's perspective in a real browser.

## What to Test
Focus strictly on **critical user journeys (Core Workflows)**. E2E tests are slow and prone to flakiness, so avoid testing exhaustive edge cases here (leave those to Unit/Integration tests).
Examples of critical paths:
- User Registration & Login
- Creating a core AIOS entity (e.g., starting an agent process)
- Billing / Checkout flows

## Best Practices
- **Resilience:** Use auto-waiting features of Playwright/Cypress. Avoid hard `sleep()` or `wait(ms)` calls.
- **Selectors:** Use data attributes specifically for testing (e.g., `data-testid="submit-btn"`) if accessible roles are insufficient or prone to change.
- **Environment:** Run tests against a dedicated staging environment or a localized production build. Do not run against production databases.
- **Mocking:** Avoid mocking in E2E tests unless dealing with third-party services (like payment gateways) that cannot be triggered safely in tests.
