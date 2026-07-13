# General UI/UX Guidelines

## Philosophy
The AIOS interface is designed to be professional, fast, and accessible. As a business-facing operating system, clarity and efficiency are prioritized over flashy elements.

## Design System Principles
1. **Consistency:** Use the established Tailwind CSS theme tokens (colors, spacing, typography). Avoid hardcoded values.
2. **Accessibility (a11y):** All interactive elements must be keyboard navigable and screen-reader friendly. Radix UI (via shadcn/ui) handles much of this, but ensure proper ARIA labels are used for custom components.
3. **Responsiveness:** Design mobile-first. Ensure the application is fully functional on mobile, tablet, and desktop viewports using Tailwind breakpoints (`sm:`, `md:`, `lg:`).

## Typography & Colors
- **Font:** Inter (or project specific standard font) is the primary typeface for clarity.
- **Colors:** Utilize CSS variables (defined in `globals.css`) for semantic colors (primary, secondary, destructive, muted) to easily support Dark Mode.

## Feedback and States
- **Loading:** Provide immediate visual feedback for user actions. Use skeleton loaders for page content and spinner icons for button actions.
- **Empty States:** Always design clear empty states for lists or dashboards when no data is available, guiding the user on the next steps.
- **Errors:** Display user-friendly error messages (via toast notifications or inline alerts) that offer a path to resolution.
