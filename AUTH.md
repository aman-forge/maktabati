# Auth usage in `apps/web` (Next.js + Supabase)

This app uses **Supabase Auth** with:

- **Server-side utilities** in `src/utils/supabase/server.ts` and `src/utils/supabase/middleware.ts`
- **Client-side utilities** in `src/utils/supabase/client.ts`
- A shared **user context** in `src/context/user-context.tsx`
- Optional **server actions** in `src/actions/auth.ts`
- A `profiles` table that is populated from `raw_user_meta_data` when a user is created

Below is how to work with auth in different places.

---

## 1. Global session flow

- `apps/web/middleware.ts` calls `updateSession` from `src/utils/supabase/middleware.ts`
  - Keeps Supabase auth cookies in sync for all requests
  - Can protect routes (e.g. `/settings`, `/admin`) and redirect unauthenticated users to `/login`
- `src/actions/auth.ts` exposes helpers like:
  - `registerUser(formData)` – server action for sign up, sending `username`, `first_name`, `last_name` into `raw_user_meta_data`
  - `getCurrentUser()` – get the current user on the server
- `src/context/user-context.tsx` exposes:
  - `<UserProvider initialUser={user}>` – wraps the app and hydrates from the server
  - `useUser()` – hook to read `{ user, loading }` on the client

---

## 2. Using auth in **Next.js Server Actions**

File: `src/actions/auth.ts`

```ts
"use server";

import { createClient } from "@/utils/supabase/server";

export async function exampleAction() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Use `user.id` in your logic here
  return { success: true };
}
```

**Key points**

- Always call `await createClient()` **inside** the action; do not reuse server clients across requests.
- Prefer `auth.getUser()` over `getSession()` so the JWT is validated at Supabase.

---

## 3. Using auth in **Server Components**

Example: `src/app/layout.tsx`:

```ts
import { getCurrentUser } from "@/actions/auth";
import { UserProvider } from "@/context/user-context";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser(); // single server-side fetch at the root

  return (
    <html /* ... */>
      <body>
        <UserProvider initialUser={user}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
};
```

In any other **server component** (e.g. dashboard layout, page):

```ts
import { getCurrentUser } from "@/actions/auth";

export default async function ProtectedPage() {
  const user = await getCurrentUser();

  if (!user) {
    // You can redirect or render a public state
    return <div>يجب تسجيل الدخول للوصول إلى هذه الصفحة.</div>;
  }

  return <div>مرحباً {user.email}</div>;
}
```

**Key points**

- You can call `getCurrentUser()` directly in **async server components**.
- For hard protection + redirects, combine:
  - `middleware.ts` (for global protection + redirects)
  - `getCurrentUser()` checks inside specific server components.

---

## 4. Using auth in **Client Components**

### 4.1. Reading the current user with `useUser`

File: `src/context/user-context.tsx`:

```ts
import { useUser } from "@/context/user-context";

export function ExampleClientComponent() {
  const { user, loading } = useUser();

  if (loading) {
    return <span>جاري التحميل...</span>;
  }

  if (!user) {
    return <a href="/login">تسجيل الدخول</a>;
  }

  return <span>مرحباً، {user.email}</span>;
}
```

**Behavior**

- On first load, `UserProvider` receives `initialUser` from the server (via `RootLayout`).
  - If logged in: `user` is immediately available, no visible flicker.
  - If logged out: `user` is `null`, and `loading` quickly becomes `false`.
- Then, the provider:
  - Calls `supabase.auth.getUser()` once on the client (if needed)
  - Subscribes to `auth.onAuthStateChange` so login/logout instantly update the navbar and any other `useUser` consumers.

### 4.2. Logging in on the client

Example: `src/app/(auth)/login/page.tsx` uses the browser client:

```ts
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const { error } = await supabase.auth.signInWithPassword({
  email: data.email,
  password: data.password,
});
```

**Guidelines**

- Use the **browser client** (`createClient` from `src/utils/supabase/client.ts`) in client components.
- On success, redirect with `useRouter().push("/")` (or wherever you need).
- The `UserProvider` subscription will update the UI automatically (no manual refresh).

### 4.3. Logging out on the client

Logout is now centralized in the user context:

```ts
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";

const router = useRouter();
const { logout } = useUser();

await logout();
router.push("/login");
```

`UserProvider` listens to `auth.onAuthStateChange` and will clear the user, so nav and pages react without reloads.

---

## 5. Middleware and route protection

File: `src/utils/supabase/middleware.ts`:

- Creates a **server Supabase client** using `createServerClient`.
- Calls `supabase.auth.getUser()` on every matched request.
- Redirects to `/login` for selected protected paths (`/settings`, `/admin`, etc.).

File: `src/middleware.ts`:

```ts
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}
```

**To protect more routes**

- Update the `isProtectedRoute` logic in `src/utils/supabase/middleware.ts` or refine the `matcher` in `src/middleware.ts`.

---

## 6. Summary of when to use what

- **Server actions** (`"use server"`):
  - Use `await createClient()` from `src/utils/supabase/server.ts`.
  - Good for form submissions, mutations, and data fetching that need auth.

- **Server components**:
  - Use `getCurrentUser()` from `src/actions/auth.ts` to read the current user.
  - Combine with middleware for stricter route protection.

- **Client components**:
  - Use `useUser()` for reactive UI based on login state.
  - Use `createClient()` (browser) for login, logout, and other auth flows that must run fully on the client.

