# docs: align technical stack with current app

This document describes the stack currently used by Maktabati and the conventions to keep it fast, typed, and maintainable.

## Runtime

- **React 19** for the UI runtime.
- **TanStack Start** for SSR, server routes, server functions, request middleware, and Nitro output.
- **TanStack Router** for file-based routing, nested layouts, search-param validation, route context, redirects, and scroll restoration.
- **Vite 8** for development and production builds.

## Data

- **Neon Postgres** is the primary database.
- **`@neondatabase/serverless` + `drizzle-orm/neon-http`** power serverless-friendly database access.
- **Drizzle ORM 1.0 RC** owns typed schema, relations v2, RLS policies, and migrations.
- **`drizzle-kit`** is configured with `schemaFilter: ["public"]` so app migrations do not touch Neon Auth provider schema.

## Auth

- **Neon Auth** is proxied through `/api/auth`.
- Auth state is normalized in `src/features/auth/server/types.ts`.
- Protected app routes live under `/_app`.
- Private server functions use `requireAuthMiddleware`.
- Public personalized server functions use `optionalAuthMiddleware`.

## UI

- **Tailwind CSS v4** for styling.
- **shadcn/ui** components are stored locally in `src/ui/components/ui`.
- **Base UI** powers many shadcn primitives.
- **Phosphor Icons** provides iconography.
- The app is RTL-first with Arabic copy and Rubik font assets.

## Performance Rules

- Keep route data loading in TanStack loaders and server functions.
- Validate every server function input with Zod or a narrow validator.
- Fetch only the columns a route needs.
- Aggregate in Postgres when the UI needs counts, averages, or distributions.
- Use Neon HTTP for single serverless queries; use an unpooled connection string for Drizzle migrations.
- Keep user-specific server function responses private and never publicly cache session-aware data.
- Use Vite/Rolldown code splitting for large third-party dependency groups.
- Use `lazyRouteComponent` for heavy route UI while keeping loaders and search validation in route files.

## Quality Gates

- `pnpm lint`
- `pnpm test`
- `pnpm build`

## References

- [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/)
- [TanStack Router data loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [TanStack Router code splitting](https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting)
- [Drizzle with Neon](https://orm.drizzle.team/docs/get-started/neon-new)
- [Drizzle select docs](https://orm.drizzle.team/docs/select)
- [Vite build options](https://vite.dev/config/build-options.html)
