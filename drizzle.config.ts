import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env", quiet: true });
config({ path: ".env.local", override: true, quiet: true });

function getDatabaseUrl() {
  const explicitUrl = process.env.DATABASE_MIGRATION_URL ?? process.env.DATABASE_URL_UNPOOLED;
  const appUrl = process.env.DATABASE_URL;

  if (explicitUrl) {
    return explicitUrl;
  }

  if (!appUrl) {
    throw new Error("DATABASE_URL is required for Drizzle commands.");
  }

  const url = new URL(appUrl);

  if (url.hostname.endsWith(".neon.tech") && url.hostname.includes("-pooler.")) {
    url.hostname = url.hostname.replace("-pooler.", ".");
  }

  return url.toString();
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
  schemaFilter: ["public"],
  entities: {
    roles: {
      provider: "neon",
    },
  },
  strict: true,
});
