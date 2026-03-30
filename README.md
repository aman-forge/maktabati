# [Maktabati Tech Stack](https://github.com/aman-forge/maktabati)

**Official Tech Stack for Maktabati** — The ultimate Goodreads killer for Arabic readers.

---

**Status Key**:

- `[x]` = Currently in use / fully integrated
- `[  ]` = Planned for future phases

---

## Core Stack

### Database & Backend

- [x] **[Neon Postgres](https://neon.com/docs/introduction/architecture-overview)** — Serverless Postgres with branching, autoscaling, and built-in RLS. Primary data store for all platform data.
- [x] **[Drizzle ORM](https://orm.drizzle.team/)** — Type-safe ORM with Drizzle Kit for migrations and Drizzle Studio for database inspection.
- [x] **[Neon Auth](https://neon.com/docs/auth/overview)** (built on Better Auth) — Database-native authentication. Handles sessions, OAuth, and email/password out of the box.

### Framework & Routing

- [x] **[TanStack Start v1](https://tanstack.com/start/latest/docs/framework/react/overview)** — Full-stack React framework powered by Vite and Vinxi. Server Functions replace traditional API routes.
- [x] **[TanStack Router](https://tanstack.com/router/latest/docs/overview)** — Fully type-safe file-based routing with built-in search param validation and route loaders.
- [x] **[Vite](https://vite.dev/guide/)** — Build tool and dev server. Significantly faster than Webpack-based alternatives.

### TanStack Ecosystem

- [x] **[TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)** — Server state management: caching, background refetching, and optimistic updates.
- [ ] **[TanStack Table](https://tanstack.com/table/latest/docs/introduction)** — Headless table primitives for book catalog, admin dashboards, and analytics.
- [ ] **[TanStack Form](https://tanstack.com/form/latest/docs/overview)** — Type-safe form handling with Zod integration.
- [ ] **[TanStack Virtual](https://tanstack.com/virtual/latest/docs/introduction)** — Virtualized lists for rendering large book catalogs without performance degradation.

### UI & Styling

- [x] **[Tailwind CSS v4](https://tailwindcss.com/docs)** — Utility-first CSS, RTL-first configuration.
- [x] **[Shadcn/UI (Nova — Base UI)](https://ui.shadcn.com/docs)** — Component library built on Base UI primitives instead of Radix.
- [x] **[Base UI](https://base-ui.com/react/overview/about)** — Unstyled, accessible primitives powering Shadcn Nova components.
- [x] **[Phosphor Icons](https://phosphoricons.com/)** — Consistent icon library with React package and SSR-safe imports.
- [x] **[Sonner](https://sonner.emilkowal.ski/)** — Toast notifications.
- [x] **[Fontsource (Arabic subsets)](https://fontsource.org/?subsets=arabic)** — Self-hosted Arabic fonts (Noto Naskh Arabic, Noto Sans Arabic).
- [ ] **[Shadcn Charts (Recharts)](https://ui.shadcn.com/docs/charts)** — Reading heatmaps, genre breakdowns, and yearly stats.

### Forms & Validation

- [x] **[Zod](https://zod.dev/)** — Runtime schema validation. Used across Server Functions, forms, and API boundaries.
- [x] **[t3-env](https://env.t3.gg/docs/introduction)** — Type-safe environment variable validation on startup.

### Date & Time

- [x] **[date-fns](https://date-fns.org/)** — Lightweight, tree-shakeable date utility library (Arabic locale included).

### Development Tools

- [x] **[pnpm](https://pnpm.io/)** — Fast, disk-efficient package manager with strict dependency isolation.
- [x] **[Biome](https://biomejs.dev/)** — Replaces ESLint + Prettier. Single tool for linting and formatting.
- [x] **[TypeScript (strict)](https://www.typescriptlang.org/)** — Full type safety across frontend, backend, DB schema, and router.
- [x] **[Zed](https://zed.dev/)** — Primary high-performance IDE.
- [ ] **[Vitest](https://vitest.dev/guide/) + [Playwright](https://playwright.dev/)** — Unit, integration, and end-to-end testing.

---

## Future

- [ ] **[Turborepo](https://turborepo.dev/docs)** — Monorepo management for scaling.
- [ ] **[Tauri v2](https://v2.tauri.app/)** — Desktop and mobile apps sharing the same Vite/React codebase.
- [ ] **[Fumadocs](https://www.fumadocs.dev/docs)** — Developer and publisher documentation site.
- [ ] **[Cloudflare R2](https://developers.cloudflare.com/r2/)** — S3-compatible object storage with zero egress fees.
- [ ] **[Resend](https://resend.com/)** — Transactional email with React Email for templates.
- [ ] **[Trigger.dev v3](https://trigger.dev/docs/introduction)** — Background jobs for book imports and scheduled updates.
- [ ] **[Upstash (Redis)](https://upstash.com/docs/introduction)** — Serverless Redis for rate limiting and hot data caching.
- [ ] **[Typesense](https://typesense.org/docs/)** — Typo-tolerant full-text search engine for Arabic book discovery.
- [ ] **[PostHog](https://posthog.com/)** — Product analytics, feature flags, and session replay.
- [ ] **[Sentry](https://sentry.io/docs/)** — Error monitoring and performance tracing.
