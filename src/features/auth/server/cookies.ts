export const NEON_AUTH_COOKIE_PREFIX = "__Secure-neon-auth";
export const NEON_AUTH_SESSION_COOKIE_NAME = `${NEON_AUTH_COOKIE_PREFIX}.session_token`;
const AUTH_COOKIE_PREFIXES = [
  NEON_AUTH_COOKIE_PREFIX,
  "neon-auth",
  "__Secure-better-auth",
  "better-auth",
] as const;
const AUTH_SESSION_COOKIE_SUFFIXES = [".session_token", ".next.session_data"] as const;

const SET_COOKIE_SEPARATOR = /,(?=\s*[^;,=\s]+=[^;,]+(?:;|$))/g;

export function extractNeonAuthCookies(headers: Headers | string): string {
  const cookieHeader = typeof headers === "string" ? headers : headers.get("cookie");
  if (!cookieHeader) return "";

  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter((cookie) => isKnownAuthCookieName(cookie.split("=")[0] ?? ""))
    .join("; ");
}

export function hasNeonSessionCookie(headers: Headers | string): boolean {
  const cookieHeader = typeof headers === "string" ? headers : headers.get("cookie");
  return (
    cookieHeader
      ?.split(";")
      .map((cookie) => cookie.trim().split("=")[0] ?? "")
      .some((name) =>
        AUTH_COOKIE_PREFIXES.some((prefix) =>
          AUTH_SESSION_COOKIE_SUFFIXES.some((suffix) => name === `${prefix}${suffix}`),
        ),
      ) ?? false
  );
}

export function getSetCookieHeaders(headers: Headers): string[] {
  const getSetCookie = (headers as Headers & { getSetCookie?: () => string[] }).getSetCookie;
  if (typeof getSetCookie === "function") return getSetCookie.call(headers);

  const value = headers.get("set-cookie");
  return value ? splitSetCookieHeader(value) : [];
}

export function splitSetCookieHeader(header: string): string[] {
  return header
    .split(SET_COOKIE_SEPARATOR)
    .map((cookie) => cookie.trim())
    .filter(Boolean);
}

export function rewriteNeonSetCookie(
  cookie: string,
  options: { domain?: string; sameSite?: "lax" | "strict" | "none" } = {},
): string {
  const parts = cookie
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean);
  const [nameValue, ...attributes] = parts;
  const nextAttributes = attributes.filter(
    (attribute) =>
      !/^domain=/i.test(attribute) &&
      !/^samesite=/i.test(attribute) &&
      !/^partitioned$/i.test(attribute),
  );

  if (options.domain) nextAttributes.push(`Domain=${options.domain}`);
  nextAttributes.push(`SameSite=${formatSameSite(options.sameSite ?? "strict")}`);

  if (
    isKnownAuthCookieName(nameValue?.split("=")[0] ?? "") &&
    !hasAttribute(nextAttributes, "secure")
  ) {
    nextAttributes.push("Secure");
  }

  return [nameValue, ...nextAttributes].join("; ");
}

function hasAttribute(attributes: string[], name: string) {
  return attributes.some((attribute) => attribute.toLowerCase() === name.toLowerCase());
}

function isKnownAuthCookieName(name: string) {
  return AUTH_COOKIE_PREFIXES.some((prefix) => name.startsWith(`${prefix}.`));
}

function formatSameSite(value: "lax" | "strict" | "none") {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
