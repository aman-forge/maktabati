import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { AuthPage } from "@/features/auth/components/auth-page";
import { getSafeAuthRedirect } from "@/features/auth/redirect";
import { getCurrentAuth } from "@/features/auth/server/session";
import { isAuthState, type AuthState } from "@/features/auth/server/types";

const authSearchSchema = z.object({
  redirect: z.string().optional(),
  token: z.string().optional(),
});
export const Route = createFileRoute("/_public/auth/$pathname")({
  validateSearch: authSearchSchema,
  beforeLoad: ({ context, search }) => {
    const contextAuth = isAuthState(context.auth) ? context.auth : null;
    if (contextAuth) return requireGuestAuth(contextAuth, search.redirect);

    return getCurrentAuth().then((auth) => requireGuestAuth(auth, search.redirect));
  },
  component: Auth,
});

function requireGuestAuth(auth: AuthState, redirectTo?: string) {
  if (auth.user) {
    throw redirect({ href: getSafeAuthRedirect(redirectTo) });
  }

  return { auth };
}

function Auth() {
  const { pathname } = Route.useParams();
  const { redirect, token } = Route.useSearch();

  return <AuthPage pathname={pathname} redirect={redirect} token={token} />;
}
