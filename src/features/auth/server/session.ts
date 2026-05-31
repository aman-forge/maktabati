import { createMiddleware, createServerFn } from "@tanstack/react-start";

import { EMPTY_AUTH, isAuthState, type AuthState } from "./types";

type AuthContext = {
  auth?: AuthState;
};

export const authRequestMiddleware = createMiddleware().server(
  async ({ request, pathname, next }) => {
    if (pathname.startsWith("/api/auth")) {
      return next({ context: { auth: EMPTY_AUTH } });
    }

    const { getCurrentAuthFromRequest } = await import("./session.impl");
    const auth = await getCurrentAuthFromRequest(request);

    return next({ context: { auth } });
  },
);

export const optionalAuthMiddleware = createMiddleware({ type: "function" }).server(
  async ({ context, next }) => {
    return next({ context: { auth: readAuthFromContext(context) } });
  },
);

export const requireAuthMiddleware = createMiddleware({ type: "function" })
  .middleware([optionalAuthMiddleware])
  .server(async ({ context, next }) => {
    const auth = readAuthFromContext(context);
    if (!auth.user) {
      throw new Response("Unauthorized", { status: 401 });
    }

    return next({ context: { auth, user: auth.user } });
  });

export const getCurrentAuth = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  return readAuthFromContext(context);
});

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  return readAuthFromContext(context).user;
});

export function requireUser(context: AuthContext) {
  const auth = readAuthFromContext(context);
  if (!auth.user) throw new Response("Unauthorized", { status: 401 });
  return auth.user;
}

function readAuthFromContext(context: unknown): AuthState {
  const auth = (context as AuthContext | undefined)?.auth;
  return isAuthState(auth) ? auth : EMPTY_AUTH;
}
