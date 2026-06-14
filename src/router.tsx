import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPendingMs: 300,
    defaultPendingMinMs: 0,
    defaultStaleTime: 60_000,
  });

  return router;
};
