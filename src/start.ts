import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

import { authRequestMiddleware } from "@/features/auth/server/session";

export const startInstance = createStart(() => ({
  requestMiddleware: [
    createCsrfMiddleware({
      filter: (ctx) => ctx.handlerType === "serverFn",
    }),
    authRequestMiddleware,
  ],
}));
