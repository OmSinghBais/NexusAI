# Next.js App Router Structure

## Overview
The AIOS web application leverages the Next.js App Router (`app/` directory) for routing, layouts, and data fetching, enabling optimal performance and a seamless developer experience.

## Routing Convention
- **Directories:** Define routes (e.g., `app/dashboard/page.tsx` maps to `/dashboard`).
- **Route Groups:** Use parenthesis `(folderName)` to group routes logically without affecting the URL path (e.g., `app/(auth)/login`).
- **Dynamic Routes:** Use square brackets `[param]` for dynamic segments (e.g., `app/users/[id]/page.tsx`).

## Special Files
- `layout.tsx`: Defines a UI shared across multiple pages. Does not re-render on navigation.
- `page.tsx`: The unique UI for a route.
- `loading.tsx`: An optional Suspense fallback that renders instantly while the page content loads.
- `error.tsx`: An Error Boundary to isolate and recover from runtime errors.
- `not-found.tsx`: Renders when `notFound()` is called or a route is unmatched.

## Data Fetching
- Fetch data directly in Server Components using async/await.
- Use `fetch` with Next.js caching options (`force-cache`, `no-store`, `revalidate`) for fine-grained cache control.
- Avoid passing large amounts of data as props from Server to Client Components; pass only what is needed.
