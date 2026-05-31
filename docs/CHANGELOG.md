# chore: modernize TanStack, Neon, and Drizzle foundation

## 2026-05-31

- Updated project documentation with the current TanStack Start, TanStack Router, Neon Auth, Neon Postgres, Drizzle ORM, and Vite architecture.
- Added a README with setup, environment, database, quality, and project map sections.
- Documented the Neon Auth same-origin proxy and server-function auth rules.
- Documented Drizzle migration boundaries for the app-owned `public` schema.
- Added Vite 8/Rolldown vendor chunk groups for better long-term browser caching and smaller route chunks.
- Replaced per-review rating hydration with Postgres aggregate summaries for ratings, review counts, and star distribution.
- Removed an unused no-op auth provider wrapper.
- Removed unused scaffold routes that only rendered placeholder text.
- Cleaned stale commented navigation code.
- Verified `pnpm lint`, `pnpm test`, and `pnpm build`.
