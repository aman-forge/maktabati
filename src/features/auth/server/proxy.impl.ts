import { env } from "@/env";

import { extractNeonAuthCookies, getSetCookieHeaders, rewriteNeonSetCookie } from "./cookies";

const REQUEST_HEADERS = ["user-agent", "authorization", "referer", "content-type"];
const RESPONSE_HEADERS = [
  "content-type",
  "content-length",
  "content-encoding",
  "transfer-encoding",
  "connection",
  "date",
  "set-auth-jwt",
  "set-auth-token",
  "x-neon-ret-request-id",
];

export async function handleAuthProxyRequest(request: Request): Promise<Response> {
  const path = getProxyPath(request);
  if (!path) return Response.json({ error: "Missing auth path" }, { status: 404 });

  const upstreamUrl = new URL(path, withTrailingSlash(env.NEON_AUTH_BASE_URL));
  upstreamUrl.search = new URL(request.url).search;

  const upstreamResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers: getProxyRequestHeaders(request),
    body: shouldProxyBody(request.method) ? await request.text() : undefined,
  }).catch((error) => {
    console.error("[auth] Neon Auth proxy failed", error);
    return null;
  });

  if (!upstreamResponse) {
    return Response.json(
      { error: "Unable to reach Neon Auth", code: "NEON_AUTH_UNAVAILABLE" },
      { status: 502 },
    );
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: getProxyResponseHeaders(upstreamResponse.headers),
  });
}

function getProxyPath(request: Request) {
  const pathname = new URL(request.url).pathname;
  return decodeURIComponent(pathname.replace(/^\/api\/auth\/?/, ""));
}

function getProxyRequestHeaders(request: Request) {
  const headers = new Headers();

  for (const header of REQUEST_HEADERS) {
    const value = request.headers.get(header);
    if (value) headers.set(header, value);
  }

  headers.set("Origin", getOrigin(request));
  headers.set("Cookie", extractNeonAuthCookies(request.headers));
  headers.set("x-neon-auth-middleware", "true");
  headers.set("x-neon-auth-proxy", "tanstack-start");

  return headers;
}

function getProxyResponseHeaders(upstreamHeaders: Headers) {
  const headers = new Headers();

  for (const header of RESPONSE_HEADERS) {
    const value = upstreamHeaders.get(header);
    if (value) headers.set(header, value);
  }

  for (const cookie of getSetCookieHeaders(upstreamHeaders)) {
    headers.append("Set-Cookie", rewriteNeonSetCookie(cookie, { sameSite: "strict" }));
  }

  return headers;
}

function getOrigin(request: Request) {
  return (
    request.headers.get("origin") ??
    request.headers.get("referer")?.split("/").slice(0, 3).join("/") ??
    new URL(request.url).origin
  );
}

function shouldProxyBody(method: string) {
  return !["GET", "HEAD"].includes(method.toUpperCase());
}

function withTrailingSlash(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}
