import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    NEON_AUTH_BASE_URL: z.url(),
    NEON_AUTH_COOKIE_SECRET: z.string().min(32, "Secret should be at least 32 characters"),
  },

  /**
   * Client-side Environment variables.
   * To expose them to the browser, they MUST start with VITE_.
   */
  clientPrefix: "VITE_",
  client: {
    VITE_NEON_AUTH_URL: z.url(),
    VITE_NEON_DATA_API_URL: z.url(),
  },

  /**
   * What object to use for the raw environment variables.
   * For Vite-based TanStack apps, this is import.meta.env.
   */
  runtimeEnv: {
    ...process.env,
    ...import.meta.env,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION=true` to skip env validation.
   * Useful for CI/CD pipelines where env vars might be injected differently.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * DATABASE_URL="" becomes DATABASE_URL=undefined (which fails validation).
   */
  emptyStringAsUndefined: true,
});
