# chore: modernize TanStack, Neon, and Drizzle foundation

## 2026-05-31

### chore: finish quality cleanup and small UX polish

- Replaced public placeholder pages for about, terms, and privacy with polished Arabic draft copy dated May 31, 2026.
- Removed placeholder-only author, publisher, and notification routes that were not backed by real product behavior.
- Added public-safe profile loading with private-profile shells for non-owner viewers.
- Added real publisher detail loading with aggregate book counts and hydrated latest book cards.
- Replaced the publisher and public profile placeholder pages with real data-backed pages.
- Removed fake notification, unread badge, current-reading chip, and reading-streak UI from the app layout.
- Pointed header and mobile search entry points to the real `/discover/books` route.
- Replaced dashboard fake activity, streak, goal, and social stats with honest empty states and real library summary data.
- Replaced mock author series, quotes, news, reviews, awards, friend, ranking, and follower surfaces with polished empty states.
- Removed unpersisted book review writing, member-list, editorial article, and local helpful-vote UI from the book page.
- Split heavy route UI with `lazyRouteComponent` for discovery, book detail, author detail, and library surfaces.
- Deleted unused local shadcn component files and removed unused dependencies from `package.json` and the lockfile.
- Added unit coverage for public profile visibility, publisher detail mapping, and database rating-summary mapping.
- Production build passes; Vite still warns that the client `index` chunk is 707.44 kB minified, with the next practical remediation being a deeper audit of root/layout providers and route preloads that still feed the entry chunk.

### chore: modernize TanStack, Neon, and Drizzle foundation

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
