import { createAuthClient } from "@neondatabase/auth";
import { BetterAuthReactAdapter } from "@neondatabase/auth/react";

const getAuthBaseUrl = () => {
  if (!import.meta.env.SSR) {
    return new URL("/api/auth", window.location.origin).toString();
  }

  const appUrl = new URL(import.meta.env.VITE_APP_URL || "http://localhost:3000");

  if (import.meta.env.DEV && import.meta.env.MODE === "https") {
    appUrl.protocol = "https:";
  }

  return new URL("/api/auth", appUrl).toString();
};

export const authClient = createAuthClient(getAuthBaseUrl(), {
  adapter: BetterAuthReactAdapter(),
});
