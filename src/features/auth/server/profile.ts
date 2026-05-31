import { eq } from "drizzle-orm";

import { db } from "@/db";
import { profiles } from "@/db/tables";

import { getDisplayName, getUsernameBase, getUsernameCandidate } from "./profile-utils";
import type { AuthProfile, AuthUser } from "./types";

const MAX_PROFILE_INSERT_ATTEMPTS = 8;

export async function ensureUserProfile(user: AuthUser): Promise<AuthProfile> {
  const existing = await getProfileById(user.id);
  if (existing) return existing;

  const usernameBase = getUsernameBase(user);
  const displayName = getDisplayName(user);

  for (let attempt = 0; attempt < MAX_PROFILE_INSERT_ATTEMPTS; attempt++) {
    const username = getUsernameCandidate(usernameBase, attempt);
    const [inserted] = await db
      .insert(profiles)
      .values({
        id: user.id,
        username,
        displayName,
        avatarUrl: user.image ?? null,
      })
      .onConflictDoNothing()
      .returning({
        id: profiles.id,
        username: profiles.username,
        displayName: profiles.displayName,
        avatarUrl: profiles.avatarUrl,
      });

    if (inserted) return inserted;

    const profile = await getProfileById(user.id);
    if (profile) return profile;
  }

  throw new Error(`Unable to provision profile for user ${user.id}`);
}

async function getProfileById(id: string): Promise<AuthProfile | null> {
  const [profile] = await db
    .select({
      id: profiles.id,
      username: profiles.username,
      displayName: profiles.displayName,
      avatarUrl: profiles.avatarUrl,
    })
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1);

  return profile ?? null;
}
