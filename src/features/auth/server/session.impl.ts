import { env } from "@/env";

import { extractNeonAuthCookies, hasNeonSessionCookie } from "./cookies";
import { ensureUserProfile } from "./profile";
import { EMPTY_AUTH, normalizeNeonSessionResponse, type AuthState } from "./types";

export async function getCurrentAuthFromRequest(
  request: Request,
  options: { ensureProfile?: boolean } = {},
): Promise<AuthState> {
  if (!hasNeonSessionCookie(request.headers)) return EMPTY_AUTH;

  const cookie = extractNeonAuthCookies(request.headers);
  if (!cookie) return EMPTY_AUTH;

  const upstreamUrl = new URL("get-session", withTrailingSlash(env.NEON_AUTH_BASE_URL));
  const sessionVerifier = new URL(request.url).searchParams.get("neon_auth_session_verifier");
  if (sessionVerifier) upstreamUrl.searchParams.set("neon_auth_session_verifier", sessionVerifier);

  const response = await fetch(upstreamUrl, {
    method: "GET",
    headers: getAuthHeaders(request, cookie),
  }).catch(() => null);

  if (!response?.ok) return EMPTY_AUTH;

  const payload = await response.json().catch(() => null);
  const { user, session } = normalizeNeonSessionResponse(payload);

  if (!user || !session) return EMPTY_AUTH;

  const profile =
    options.ensureProfile === false
      ? null
      : await ensureUserProfile(user).catch((error) => {
          console.error("[auth] Failed to ensure user profile", error);
          return null;
        });

  return { user, session, profile };
}

function getAuthHeaders(request: Request, cookie: string) {
  const headers = new Headers();
  for (const header of ["user-agent", "authorization", "referer", "content-type"]) {
    const value = request.headers.get(header);
    if (value) headers.set(header, value);
  }
  headers.set("Origin", getOrigin(request));
  headers.set("Cookie", cookie);
  headers.set("x-neon-auth-middleware", "true");
  headers.set("x-neon-auth-proxy", "tanstack-start");
  return headers;
}

function getOrigin(request: Request) {
  return (
    request.headers.get("origin") ??
    request.headers.get("referer")?.split("/").slice(0, 3).join("/") ??
    new URL(request.url).origin
  );
}

function withTrailingSlash(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}
