import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getCurrentAuth } from "@/features/auth/server/session";
import { isAuthState, type AuthState } from "@/features/auth/server/types";
import MainLayout from "@/ui/components/layout";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context, location }) => {
    const contextAuth = isAuthState(context.auth) ? context.auth : null;
    if (contextAuth) return requireRouteAuth(contextAuth, location.href);

    return getCurrentAuth().then((auth) => requireRouteAuth(auth, location.href));
  },
  component: AppLayout,
});

function requireRouteAuth(auth: AuthState, redirectTo: string) {
  if (!auth.user) {
    throw redirect({
      to: "/auth/$pathname",
      params: { pathname: "login" },
      search: { redirect: redirectTo },
    });
  }

  return { auth };
}

function AppLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
