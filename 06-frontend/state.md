# Zustand State Management Strategy

## Overview
For global client-side state management, AIOS uses **Zustand**. It provides a minimalistic, hook-based API that avoids the boilerplate of Redux and the Context API's re-rendering issues.

## When to use Zustand
- Use Zustand for **global client state** that multiple unrelated components need to access or update (e.g., user preferences, UI theme, complex multi-step form state).
- Do **not** use Zustand for server state (use Server Components or SWR/React Query) or local component state (use `useState`/`useReducer`).

## Store Organization
- Split stores by domain or feature (e.g., `useAuthStore`, `useUiStore`, `useWorkspaceStore`) rather than creating a single monolithic store.
- Create stores in `src/store/` or within a feature's directory (`src/features/[feature]/store.ts`).

## Best Practices
- **Selectors:** Always use selectors when extracting state from the store to prevent unnecessary re-renders.
  ```typescript
  // Good
  const theme = useUiStore((state) => state.theme);
  
  // Bad - re-renders on any store change
  const { theme } = useUiStore();
  ```
- **Actions:** Define actions within the store to encapsulate state mutation logic.
- **Immutability:** Zustand uses immutable state updates. For complex nested state, consider integrating Immer middleware.
