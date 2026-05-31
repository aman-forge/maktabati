# Maktabati

Arabic-first book discovery and reading tracker built with TanStack Start, Neon Postgres, Neon Auth, Drizzle ORM, Tailwind CSS, and shadcn/ui.

## Stack

- **TanStack Start + Router**: file-based routes, SSR, server functions, request middleware, route guards, and search-param validation.
- **Neon Postgres**: serverless Postgres using the Neon HTTP driver for serverless-friendly query execution.
- **Neon Auth**: same-origin `/api/auth` proxy to the Neon Auth branch endpoint, with app-owned profiles in `public.profiles`.
- **Drizzle ORM**: typed schema, relations v2, RLS policies, Neon roles, and `drizzle-kit` migrations scoped to the public schema.
- **React Query**: client server-state cache for interactive UI workflows.
- **Tailwind CSS v4 + shadcn/ui**: RTL-ready component system using Base UI primitives.

## Requirements

- Node.js compatible with the pinned toolchain in `pnpm-lock.yaml`
- pnpm
- A Neon project with Postgres and Neon Auth enabled

## Environment

Create `.env.local` from `.env.example` and fill in:

- `DATABASE_URL`: pooled Neon app connection string.
- `DATABASE_MIGRATION_URL`: optional unpooled migration connection string.
- `DATABASE_URL_UNPOOLED`: optional unpooled fallback for Drizzle commands.
- `NEON_AUTH_BASE_URL`: server-side Neon Auth branch URL.
- `NEON_AUTH_COOKIE_SECRET`: 32+ character secret reserved for auth cookie/session support.
- `VITE_APP_URL`: public app origin, such as `http://localhost:3000`.
- `VITE_NEON_DATA_API_URL`: Neon Data API URL for browser-side authenticated data access.

## Development

```bash
pnpm install
pnpm dev
```

Use HTTPS for LAN or mobile auth testing:

```bash
pnpm dev:https
```

## Database

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

Drizzle commands use `DATABASE_MIGRATION_URL`, then `DATABASE_URL_UNPOOLED`, then a de-pooled `DATABASE_URL` fallback. App migrations intentionally use `schemaFilter: ["public"]` so Neon Auth's `neon_auth` schema stays provider-managed.

## Quality

```bash
pnpm lint
pnpm test
pnpm build
```

The production build emits client, SSR, and Nitro server output in `.output`.

## Project Map

- `src/app`: TanStack Start file routes and server routes.
- `src/features/auth`: Neon Auth client, proxy, request middleware, session normalization, and profile provisioning.
- `src/features/books`: book search, library tracking, mappers, validators, and server functions.
- `src/db`: Drizzle schema, tables, relations, Neon roles, and RLS policies.
- `src/ui`: shared layout, RTL styles, and shadcn/ui components.
- `docs`: architecture, auth notes, and project changelog.

## References

- [TanStack Start React docs](https://tanstack.com/start/latest/docs/framework/react/)
- [TanStack Router docs](https://tanstack.com/router/latest/docs)
- [Drizzle with Neon](https://orm.drizzle.team/docs/get-started/neon-new)
- [Neon Auth branchable identity](https://neon.com/blog/neon-auth-branchable-identity-in-your-database)
- [Vite build options](https://vite.dev/config/build-options.html)
