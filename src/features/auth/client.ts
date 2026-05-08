import { createAuthClient } from "@neondatabase/auth";
import { BetterAuthReactAdapter } from "@neondatabase/auth/react";
import { env } from "@/env";

export const authClient = createAuthClient(env.VITE_NEON_AUTH_URL, {
  adapter: BetterAuthReactAdapter(),
});
