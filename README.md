# 📚 Maktabati Tech Stack

[![Framework: TanStack Start](https://img.shields.io/badge/Framework-TanStack%20Start-ff4154?style=flat-square)](https://tanstack.com/start)
[![Database: Neon Postgres](https://img.shields.io/badge/Database-Neon%20Postgres-00e599?style=flat-square&logo=neon)](https://neon.com)
[![Auth: Better Auth](https://img.shields.io/badge/Auth-Better%20Auth-black?style=flat-square)](https://www.better-auth.com/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

The official, highly optimized architecture blueprint for **Maktabati** — the ultimate, performance-first platform for Arabic readers.

---

## 🚦 Status Legend

| Symbol | Meaning                                          |
| :----: | :----------------------------------------------- |
| `[x]`  | Fully integrated and actively used in production |
| `[ ]`  | Planned for upcoming architecture phases         |

---

## 🏗️ Core Architecture

### Database & Backend

- [x] **[Neon Postgres](https://neon.com/docs/introduction/architecture-overview)** — Serverless Postgres provider featuring instant branching, auto-scaling, and built-in Row-Level Security (RLS).
- [x] **[Drizzle ORM](https://orm.drizzle.team/)** — Next-gen TypeScript ORM. Paired with`drizzle-kit`for automated migrations and`Drizzle Studio` for rapid data visualization.
- [ ] **[Better Auth](https://www.better-auth.com/)** — Advanced, type-safe authentication framework. Handles robust sessions, multi-provider OAuth, and email/password flows with deep database integration.

### Full-Stack Framework & Routing

- [x] **[TanStack Start v1](https://tanstack.com/start/latest/docs/framework/react/overview)** — Full-stack React framework powered by Vite and Vinxi. Leverages **Server Functions** to eliminate traditional REST/GraphQL API boilerplate.
- [x] **[TanStack Router](https://tanstack.com/router/latest/docs/overview)** — 100% type-safe, file-based client and server routing featuring structural search parameter validation and concurrent route loaders.
- [x] **[Vite](https://vite.dev/guide/)** — Next-generation frontend tooling and bundler powering the dev server with lightning-fast HMR.

---

## 🌟 The TanStack Ecosystem

We rely heavily on headless, state-management primitives to keep the UI completely separate from logic:

- [ ] **[TanStack Query v5](https://tanstack.com/query/latest/docs/framework/react/overview)** — Asynchronous server-state management handling caching, background revalidation, and declarative optimistic updates.
- [ ] **[TanStack Table](https://tanstack.com/table/latest/docs/introduction)** — Headless table engine powering our book catalog grids, administrative backoffices, and data-dense dashboards.
- [ ] **[TanStack Form](https://tanstack.com/form/latest/docs/overview)** — High-performance, type-safe form state engine with native Zod validation execution.
- [ ] **[TanStack Virtual](https://tanstack.com/virtual/latest/docs/introduction)** — Dynamic list virtualization for rendering extensive book listings and infinite feeds without DOM performance degradation.

---

## 🎨 UI, UX & Localization (RTL First)

Maktabati is designed from the ground up for the Arabic language, meaning Right-to-Left (RTL) layout styling and typography are core pillars.

- [x] **[Tailwind CSS v4](https://tailwindcss.com/docs)** — Performance-optimized utility-first CSS framework natively supporting modern container queries and CSS-variable-first customization.
- [x] **[Shadcn/UI](https://ui.shadcn.com/docs)** — Radically modern component architecture using **Base UI** primitives instead of Radix for improved customization boundaries.
- [x] **[Base UI](https://base-ui.com/react/overview/about)** — Unstyled, accessible WAI-ARIA compliant accessibility primitives powering our interactive components.
- [x] **[Dark Mode (Themer)](https://lukonik.github.io/themer/docs/get-started)** — Lightweight,`next-themes` alternative tailored specifically for SSR/SSG contexts within TanStack Start.
- [x] **[Fontsource (Arabic Subsets)](https://fontsource.org/?subsets=arabic)** — Self-hosted, highly optimized Arabic typography configurations (featuring _Noto Naskh Arabic_ and _Noto Sans Arabic_).
- [x] **[Phosphor Icons](https://phosphoricons.com/)** — Cohesive, multi-weight icon set utilizing tree-shakeable, SSR-safe React wrappers.
- [x] **[Sonner](https://sonner.emilkowal.ski/)** — Highly performant, customizable toast notifications engine.
- [ ] **[Shadcn Charts (Recharts)](https://ui.shadcn.com/docs/charts)** — Native visualization layer for reading heatmaps, genre distribution breakdowns, and annual user wrap-ups.

---

## 🛠️ Data Validation & Utilities

- [x] **[Zod](https://zod.dev/)** — Strict, schema-first runtime type validation used uniformly across API boundaries, form states, and Server Functions.
- [x] **[t3-env](https://env.t3.gg/docs/introduction)** — Strict environment variable compilation validation ensuring the application fails fast during boot if keys are missing.
- [x] **[date-fns](https://date-fns.org/)** — Tree-shakeable date utility library configured cleanly with localized Arabic date structures.

---

## 💻 Developer Experience & Quality Assurance

> **Note on Tooling:** We favor high-performance Rust-based utilities to keep local development loops and CI/CD pipelines under 10 seconds.

- [x] **[pnpm](https://pnpm.io/)** — Fast, disk-efficient package manager utilizing hardlinks to prevent node_modules bloat.
- [x] **[Oxc & Oxlint](https://oxc.rs/)** — Ultra-fast Rust linter and formatter. Replaces traditional ESLint and Prettier setups with near-instant analysis loops.
- [x] **[TypeScript (Strict Mode)](https://www.typescriptlang.org/)** — End-to-end type infrastructure tightly stitching database columns, server operations, routers, and view components.
- [x] **[Zed](https://zed.dev/)** — High-performance, collaborative code editor engineered for raw speed.
- [ ] **[Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)** — Blazing fast unit/integration testing combined with robust cross-browser E2E testing capabilities.

---

## 🚀 Future Roadmap Infrastructure

As the scale of data and users grows, the following systems will be progressively integrated:

```markdown
├── Shared Infrastructure
│ ├── Turborepo # High-performance monorepo build system
│ └── Tauri v2 # Cross-platform desktop and mobile client distribution
├── Storage & Delivery
│ ├── Cloudflare R2 # Zero-egress cost object storage for book cover assets
│ └── Upstash (Redis) # Global edge caching layer and strict rate-limiting
├── Communication & Tasks
│ ├── Resend & React Email # Modern transactional email delivery
│ └── Trigger.dev v3   # Heavy background processing (EPUB parses, bulk syncs)
└── Analytics & Engine
├── Typesense # Typo-tolerant Arabic full-text search index
├── PostHog # Open-source product analytics and session recording
└── Sentry # Real-time client/server error aggregation
```
