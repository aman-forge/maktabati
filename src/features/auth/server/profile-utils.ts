import type { AuthUser } from "./types";

const USERNAME_MAX_LENGTH = 32;

export function getDisplayName(user: AuthUser): string {
  const name = user.name?.trim();
  if (name) return name;

  const emailName = user.email.split("@")[0]?.trim();
  if (emailName) return emailName;

  return "Maktabati reader";
}

export function getUsernameBase(user: AuthUser): string {
  const source = user.email.split("@")[0] || user.name || `user-${user.id.slice(0, 8)}`;
  const normalized = source
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}_-]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, USERNAME_MAX_LENGTH);

  return normalized || `user-${user.id.slice(0, 8)}`;
}

export function getUsernameCandidate(base: string, attempt: number): string {
  if (attempt === 0) return base.slice(0, USERNAME_MAX_LENGTH);

  const suffix = `-${attempt + 1}`;
  return `${base.slice(0, USERNAME_MAX_LENGTH - suffix.length)}${suffix}`;
}
