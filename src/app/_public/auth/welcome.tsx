import { createFileRoute, redirect } from "@tanstack/react-router";

import { getCurrentAuth } from "@/features/auth/server/session";
import { isAuthState, type AuthState } from "@/features/auth/server/types";

export const Route = createFileRoute("/_public/auth/welcome")({
  beforeLoad: ({ context }) => {
    const contextAuth = isAuthState(context.auth) ? context.auth : null;
    if (contextAuth) return redirectFromWelcome(contextAuth);

    return getCurrentAuth().then(redirectFromWelcome);
  },
});

function redirectFromWelcome(auth: AuthState) {
  throw redirect(
    auth.user
      ? { to: "/" }
      : {
          to: "/auth/$pathname",
          params: { pathname: "login" },
        },
  );
}
