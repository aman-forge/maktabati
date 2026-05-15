import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  sortImports: true,
  sortTailwindcss: true,
  sortPackageJson: true,
  ignorePatterns: [
    ".agents/**",
    ".tanstack/**",
    ".vscode/**",
    "drizzle/**",
    "dist/**",
    ".output/**",
    ".vinxi/**",
    "src/routeTree.gen.ts",
  ],
});
