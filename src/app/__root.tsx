import "@/ui/lib/browser-runtime";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

import {
  readClientAuthSnapshot,
  writeClientAuthSnapshot,
} from "@/features/auth/client-auth-snapshot";
import { getCurrentAuth } from "@/features/auth/server/session";
import Providers from "@/ui/components/layout/providers";
import NotFound from "@/ui/components/not-found";

import appCss from "../ui/styles.css?url";

export const Route = createRootRoute({
  beforeLoad: () => {
    const cachedAuth = readClientAuthSnapshot();
    if (cachedAuth) return { auth: cachedAuth };

    return getCurrentAuth().then((auth) => {
      writeClientAuthSnapshot(auth);

      return { auth };
    });
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "مكتبتي" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  const { auth } = Route.useRouteContext();

  useEffect(() => {
    writeClientAuthSnapshot(auth);
  }, [auth]);

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Outlet />
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}
