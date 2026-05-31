# docs: document Neon Auth architecture

Maktabati uses Neon Auth through TanStack Start. The browser calls the app at `/api/auth`; the server route proxies those requests to the Neon Auth branch URL and rewrites `Set-Cookie` headers back onto the app origin.

## Runtime Flow

- `src/features/auth/client.ts` creates the browser auth client with a same-origin `/api/auth` base URL.
- `src/app/api/auth/$.ts` catches auth requests and forwards them through `handleAuthProxyRequest`.
- `src/features/auth/server/session.ts` installs request middleware that reads Neon Auth cookies for every non-auth request.
- `getCurrentAuth()` exposes the normalized auth state to TanStack route guards and components.
- `/_app` routes require auth in `beforeLoad`; private server functions require `requireAuthMiddleware`.

## Data Ownership

- Neon owns provider users, sessions, cookies, JWTs, and the `neon_auth` schema.
- The app owns `public.profiles`, which mirrors the Neon Auth user id in `profiles.id`.
- Profile rows are provisioned lazily by `ensureUserProfile`.
- App migrations must not create or modify Neon Auth provider tables.

## Drizzle Rules

Keep the normal Drizzle config scoped to the app schema:

```ts
schemaFilter: ["public"];
```

Use a separate inspection-only workflow if `neon_auth.*` ever needs to be reviewed. Do not include provider-managed auth tables in generated migrations.

## Server Function Rules

- Use `requireAuthMiddleware` for private reads and writes.
- Use `optionalAuthMiddleware` for public endpoints with optional personalization.
- Never accept `userId` from client input for private data.
- Keep cache headers private or `no-store` for user-specific server functions.

Example:

```ts
export const privateAction = createServerFn({ method: "POST" })
  .middleware([requireAuthMiddleware])
  .handler(async ({ context }) => {
    const userId = context.user.id;
    return userId;
  });
```

## Environment

Required server variables:

- `DATABASE_URL`
- `NEON_AUTH_BASE_URL`
- `NEON_AUTH_COOKIE_SECRET`

Optional server variables:

- `DATABASE_MIGRATION_URL`
- `DATABASE_URL_UNPOOLED`

Required client variables:

- `VITE_APP_URL`
- `VITE_NEON_DATA_API_URL`

`VITE_NEON_AUTH_URL` is intentionally not used by the app runtime; auth stays behind the same-origin proxy.

## Local Development

Use standard local development for same-machine browser testing:

```bash
pnpm dev
```

Use HTTPS for LAN or mobile auth testing:

```bash
pnpm dev:https
```

## References

- [Neon Auth branchable identity](https://neon.com/blog/neon-auth-branchable-identity-in-your-database)
- [Neon Auth changelog](https://neon.com/docs/changelog/2025-12-12)
- [TanStack Start server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)
