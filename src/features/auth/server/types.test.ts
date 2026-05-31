import { describe, expect, it } from "vitest";

import { EMPTY_AUTH, isAuthState, normalizeNeonSessionResponse } from "./types";

describe("auth type helpers", () => {
  it("normalizes nested Neon session responses", () => {
    const auth = normalizeNeonSessionResponse({
      data: {
        user: {
          id: "user_123",
          email: "reader@example.com",
          name: "Reader",
          image: null,
          emailVerified: true,
        },
        session: {
          id: "session_123",
          token: "token",
          userId: "user_123",
          expiresAt: "2030-01-01T00:00:00.000Z",
        },
      },
    });

    expect(auth).toEqual({
      user: {
        id: "user_123",
        email: "reader@example.com",
        name: "Reader",
        image: null,
        emailVerified: true,
      },
      session: {
        id: "session_123",
        token: "token",
        userId: "user_123",
        expiresAt: "2030-01-01T00:00:00.000Z",
      },
    });
  });

  it("rejects malformed users and empty sessions", () => {
    const auth = normalizeNeonSessionResponse({
      user: { id: "user_123" },
      session: {},
    });

    expect(auth).toEqual({ user: null, session: null });
  });

  it("validates auth state shape", () => {
    expect(isAuthState(EMPTY_AUTH)).toBe(true);
    expect(
      isAuthState({
        user: { id: "user_123", email: "reader@example.com" },
        session: { userId: "user_123" },
        profile: {
          id: "user_123",
          username: "reader",
          displayName: "Reader",
          avatarUrl: null,
        },
      }),
    ).toBe(true);
    expect(isAuthState({ user: {}, session: null, profile: null })).toBe(false);
  });
});
