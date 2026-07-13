# Overall Testing Strategy

## Philosophy
Quality is critical for AIOS. We adopt a multi-tiered testing strategy, emphasizing reliability and confidence during continuous deployment.

## The Testing Pyramid
1. **Unit Tests (Base):** Fast, isolated tests for individual functions, hooks, and utilities. High volume.
2. **Integration Tests (Middle):** Tests combining multiple units, especially focusing on API endpoints, database interactions, and complex component interactions. Moderate volume.
3. **End-to-End (E2E) Tests (Top):** Tests simulating real user workflows in a real browser environment against a fully running system. Low volume, focusing on critical paths.

## Continuous Integration (CI)
- All tests must pass in the CI pipeline before a PR can be merged into the `main` branch.
- Test coverage reports should be generated, aiming for an acceptable threshold (e.g., >80% for critical logic).

## Principles
- **Test Behavior, Not Implementation:** Focus on what the code does (inputs/outputs, UI rendered), not how it's written.
- **Deterministic Tests:** Tests should not be flaky. Avoid implicit dependencies on external state or timing where possible.
