import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    // Enables Vite to resolve imports using path aliases.
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    // this is the plugin that enables path aliases
    // viteTsConfigPaths({
    //   projects: ["./tsconfig.json"],
    // }),
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src", // This is the default
      router: {
        routesDirectory: "app", // Defaults to "routes", relative to srcDirectory
      },
    }),
    viteReact(),
    nitro(),
  ],
});
