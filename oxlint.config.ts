import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "oxc", "react", "import"],
  categories: {
    correctness: "warn",
  },
  rules: {
    "eslint/no-unused-vars": "warn",
  },
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
