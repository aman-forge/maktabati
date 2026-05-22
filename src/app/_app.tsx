import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "@/features/auth/client";
import {
  clearHasSessionHint,
  readHasSessionHint,
  writeHasSessionHint,
} from "@/features/auth/session-storage";
import MainLayout from "@/ui/components/layout";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location }) => {
    // SSR has no auth state — skip and let client handle it
    if (typeof window === "undefined") return {};

    const likelyLoggedIn = readHasSessionHint();
    const { data: session } = await authClient.getSession();
    const user = session?.user ?? null;

    if (!user) {
      clearHasSessionHint();
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
      writeHasSessionHint();
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
