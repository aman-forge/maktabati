import type { AuthState } from "@/features/auth/server/types";

const CLIENT_AUTH_SNAPSHOT_TTL = 5 * 60 * 1000;

let clientAuthSnapshot: { auth: AuthState; updatedAt: number } | null = null;

export function readClientAuthSnapshot() {
  if (typeof window === "undefined" || !clientAuthSnapshot) return null;

  if (Date.now() - clientAuthSnapshot.updatedAt > CLIENT_AUTH_SNAPSHOT_TTL) {
    clientAuthSnapshot = null;
    return null;
  }

  return clientAuthSnapshot.auth;
}

export function writeClientAuthSnapshot(auth: AuthState) {
  if (typeof window === "undefined") return;

  clientAuthSnapshot = { auth, updatedAt: Date.now() };
}

export function clearClientAuthSnapshot() {
  if (typeof window === "undefined") return;

  clientAuthSnapshot = null;
}
