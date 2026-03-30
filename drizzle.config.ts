import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schemaFilter: ["public"],
  entities: {
    roles: {
      provider: "neon",
    },
  },
});
