import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const useHttps = mode === "https";

  return {
    server: {
      port: 3000,
    },
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "auth-vendor",
                test: /[/\\]node_modules[/\\](@neondatabase|better-auth|better-fetch)[/\\]/,
                priority: 40,
              },
              {
                name: "tanstack-vendor",
                test: /@tanstack/,
                priority: 30,
              },
              {
                name: "react-vendor",
                test: /[/\\]node_modules[/\\].*(react|react-dom|scheduler)[/\\]/,
                priority: 25,
              },
              {
                name: "ui-vendor",
                test: /[/\\]node_modules[/\\](@base-ui|@radix-ui|@phosphor-icons|cmdk|sonner|vaul)[/\\]/,
                priority: 20,
              },
              {
                name: "data-vendor",
                test: /[/\\]node_modules[/\\](date-fns|drizzle-orm|tailwind-merge|zod)[/\\]/,
                priority: 10,
              },
            ],
          },
        },
      },
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      devtools(),
      ...(useHttps ? [basicSsl()] : []),
      tailwindcss(),
      tanstackStart({
        srcDirectory: "src",
        router: {
          routesDirectory: "app",
        },
      }),
      viteReact(),
      nitro(),
    ],
  };
});
