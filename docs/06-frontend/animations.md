# Framer Motion Usage

## Overview
Framer Motion is used in AIOS to add fluid, performant animations that enhance the user experience without causing distraction.

## When to Animate
- **Micro-interactions:** Button presses, hover states, and toggle switches.
- **Transitions:** Entering and exiting elements (modals, dropdowns, toasts).
- **Layout Changes:** Smoothly animating list reordering or expanding panels.

## Best Practices
- **Subtlety:** Keep animations quick (typically 150ms-300ms). Business tools should feel snappy and responsive.
- **Performance:** Animate `transform` and `opacity` properties only. Avoid animating layout properties (`width`, `height`, `margin`) unless using `layout` props, which can trigger browser repaints.
- **Accessibility:** Respect the user's `prefers-reduced-motion` settings.
  ```typescript
  import { useReducedMotion } from 'framer-motion';
  // Use this hook to disable or simplify animations conditionally.
  ```

## Integration with shadcn/ui
Many shadcn/ui components use standard CSS animations. Use Framer Motion only when complex, orchestrated, or layout animations are required that CSS transitions cannot easily handle.
