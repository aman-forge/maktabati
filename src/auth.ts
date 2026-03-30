import { createAuthClient } from "@neondatabase/neon-js/auth";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react";
import { env } from "@/env";

export const authClient = createAuthClient(env.VITE_NEON_AUTH_URL, {
  adapter: BetterAuthReactAdapter(),
});
