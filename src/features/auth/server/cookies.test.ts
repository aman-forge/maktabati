import { describe, expect, it } from "vitest";

import {
  extractNeonAuthCookies,
  hasNeonSessionCookie,
  rewriteNeonSetCookie,
  splitSetCookieHeader,
} from "./cookies";

describe("auth cookie helpers", () => {
  it("extracts only Neon and Better Auth cookies", () => {
    const cookie = [
      "__Secure-neon-auth.session_token=abc",
      "theme=dark",
      "__Secure-neon-auth.next.session_data=def",
      "better-auth.session_token=ghi",
    ].join("; ");

    expect(extractNeonAuthCookies(cookie)).toBe(
      "__Secure-neon-auth.session_token=abc; __Secure-neon-auth.next.session_data=def; better-auth.session_token=ghi",
    );
  });

  it("detects Neon and Better Auth session cookies", () => {
    expect(hasNeonSessionCookie("theme=dark; better-auth.session_token=abc")).toBe(true);
    expect(hasNeonSessionCookie("theme=dark; __Secure-neon-auth.next.session_data=abc")).toBe(true);
    expect(hasNeonSessionCookie("theme=dark")).toBe(false);
  });

  it("rewrites Neon cookies for the app origin", () => {
    const cookie =
      "__Secure-neon-auth.session_token=abc; Path=/; Domain=auth.example.com; SameSite=Lax; Secure; HttpOnly; Partitioned";

    expect(rewriteNeonSetCookie(cookie)).toBe(
      "__Secure-neon-auth.session_token=abc; Path=/; Secure; HttpOnly; SameSite=Strict",
    );
  });

  it("splits combined Set-Cookie headers without breaking expires dates", () => {
    const cookies = splitSetCookieHeader(
      "a=1; Expires=Wed, 21 Oct 2030 07:28:00 GMT; Path=/, b=2; Path=/",
    );

    expect(cookies).toEqual(["a=1; Expires=Wed, 21 Oct 2030 07:28:00 GMT; Path=/", "b=2; Path=/"]);
  });
});
