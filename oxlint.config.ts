import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "oxc", "react", "import"],
  categories: {
    correctness: "warn",
  },
  rules: {
    "eslint/no-unused-vars": "error",
  },
  options: {
    typeAware: true,
    typeCheck: true,
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
