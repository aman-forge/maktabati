import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: proxyAuthRequest,
      POST: proxyAuthRequest,
      PUT: proxyAuthRequest,
      PATCH: proxyAuthRequest,
      DELETE: proxyAuthRequest,
      OPTIONS: proxyAuthRequest,
      HEAD: proxyAuthRequest,
    },
  },
});

async function proxyAuthRequest({ request }: { request: Request }) {
  const { handleAuthProxyRequest } = await import("@/features/auth/server/proxy.impl");
  return await handleAuthProxyRequest(request);
}
