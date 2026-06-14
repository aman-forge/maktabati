import type { BetterAuthSession, BetterAuthUser } from "@neondatabase/auth/types";

import type { profiles } from "@/db/tables";

export type ProfileRow = typeof profiles.$inferSelect;
export type NewProfileRow = typeof profiles.$inferInsert;

export type AuthProfile = Pick<ProfileRow, "id" | "username" | "displayName" | "avatarUrl">;

export type AuthUser = Pick<BetterAuthUser, "id" | "email"> & {
  name?: BetterAuthUser["name"] | null;
  image?: BetterAuthUser["image"] | null;
  emailVerified?: BetterAuthUser["emailVerified"];
};

export type AuthSession = {
  id?: BetterAuthSession["id"];
  token?: BetterAuthSession["token"] | null;
  expiresAt?: BetterAuthSession["expiresAt"] | string | null;
  userId?: BetterAuthSession["userId"];
};

export type AuthState = {
  user: AuthUser | null;
  session: AuthSession | null;
  profile: AuthProfile | null;
};

export const EMPTY_AUTH: AuthState = {
  user: null,
  session: null,
  profile: null,
};

export function normalizeNeonSessionResponse(value: unknown): Pick<AuthState, "user" | "session"> {
  const root = isRecord(value) && "data" in value && isRecord(value.data) ? value.data : value;

  return {
    user: isRecord(root) ? normalizeAuthUser(root.user) : null,
    session: isRecord(root) ? normalizeAuthSession(root.session) : null,
  };
}

export function normalizeAuthUser(value: unknown): AuthUser | null {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.email !== "string") {
    return null;
  }

  const user: AuthUser = { id: value.id, email: value.email };
  const name = optionalStringOrNull(value.name);
  const image = optionalStringOrNull(value.image);

  if (name !== undefined) user.name = name;
  if (image !== undefined) user.image = image;
  if (typeof value.emailVerified === "boolean") user.emailVerified = value.emailVerified;

  return user;
}

export function normalizeAuthSession(value: unknown): AuthSession | null {
  if (!isRecord(value)) return null;

  const id = optionalString(value.id);
  const token = optionalStringOrNull(value.token);
  const expiresAt = optionalDateLike(value.expiresAt);
  const userId = optionalString(value.userId);

  if (!id && !token && !expiresAt && !userId) return null;

  const session: AuthSession = {};

  if (id !== undefined) session.id = id;
  if (token !== undefined) session.token = token;
  if (expiresAt !== undefined) session.expiresAt = expiresAt;
  if (userId !== undefined) session.userId = userId;

  return session;
}

export function isAuthState(value: unknown): value is AuthState {
  if (!isRecord(value)) return false;

  return (
    "user" in value &&
    "session" in value &&
    "profile" in value &&
    (value.user === null || isAuthUser(value.user)) &&
    (value.session === null || isAuthSession(value.session)) &&
    (value.profile === null || isAuthProfile(value.profile))
  );
}

function isAuthUser(value: unknown): value is AuthUser {
  return normalizeAuthUser(value) !== null;
}

function isAuthSession(value: unknown): value is AuthSession {
  return normalizeAuthSession(value) !== null;
}

function isAuthProfile(value: unknown): value is AuthProfile {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.username === "string" &&
    typeof value.displayName === "string" &&
    (typeof value.avatarUrl === "string" || value.avatarUrl === null)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function optionalStringOrNull(value: unknown): string | null | undefined {
  if (value === null) return null;
  return optionalString(value);
}

function optionalDateLike(value: unknown): AuthSession["expiresAt"] {
  if (value === null) return null;
  if (typeof value === "string" || value instanceof Date) return value;
  return undefined;
}
