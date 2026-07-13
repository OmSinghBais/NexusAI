# React Component Architecture

## Overview
The AIOS frontend uses React with Next.js and shadcn/ui for building modular, reusable, and accessible components. This document outlines our component architecture and best practices.

## shadcn/ui Integration
- Components are not installed via npm; they are copied into the `components/ui` directory.
- This allows full ownership and customization of the underlying Tailwind CSS and Radix UI primitives.
- Always check if a shadcn/ui component exists before building a custom primitive.

## Component Structure
We follow a feature-based folder structure combined with a shared `components` directory:
- `components/ui/`: Contains all shadcn/ui base components (e.g., Button, Input, Dialog).
- `components/shared/`: Reusable components composed of UI primitives (e.g., PageHeader, DataTable).
- `features/[feature-name]/components/`: Components specific to a single feature domain.

## Guidelines
- **Server vs. Client Components:** Default to React Server Components (RSC) to reduce client JavaScript bundle size. Add `"use client"` only at the leaves of the component tree when interactivity, state (useState), or lifecycle (useEffect) is required.
- **Props:** Define explicit TypeScript interfaces for all component props. Use `PropsWithChildren` when appropriate.
- **Styling:** Use Tailwind CSS utility classes via the `cn()` utility function (clsx + tailwind-merge) for conditional styling and overriding.
