import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "@/features/auth/client";
import MainLayout from "@/ui/components/layout";

const HAS_SESSION_KEY = "auth:hasSession";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location }) => {
    // SSR has no auth state — skip and let client handle it
    if (typeof window === "undefined") return {};

    const likelyLoggedIn = localStorage.getItem(HAS_SESSION_KEY) === "1";
    const { data: session } = await authClient.getSession();
    const user = session?.user ?? null;

    if (!user) {
      localStorage.removeItem(HAS_SESSION_KEY);
      // Only redirect if we're sure they're not logged in
      // (i.e. no localStorage hint either)
      if (!likelyLoggedIn) {
        throw redirect({
          to: "/auth/$pathname",
          params: { pathname: "login" },
          search: { redirect: location.href },
        });
      }
    } else {
      localStorage.setItem(HAS_SESSION_KEY, "1");
    }

    return { session: session ?? null, user };
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
