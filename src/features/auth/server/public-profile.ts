import { createServerFn } from "@tanstack/react-start";
import { eq, or } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { profiles } from "@/db/tables";
import { optionalAuthMiddleware } from "@/features/auth/server/session";

import { toPublicProfile, type PublicProfile } from "./public-profile-utils";

const publicProfileInputSchema = z.object({
  userId: z.string().trim().min(1).max(128),
});

export { toPublicProfile, type PublicProfile };

export const getPublicProfileById = createServerFn({ method: "GET" })
  .middleware([optionalAuthMiddleware])
  .inputValidator(publicProfileInputSchema)
  .handler(async ({ data, context }): Promise<PublicProfile | null> => {
    const [profile] = await db
      .select({
        id: profiles.id,
        username: profiles.username,
        displayName: profiles.displayName,
        avatarUrl: profiles.avatarUrl,
        bio: profiles.bio,
        location: profiles.location,
        website: profiles.website,
        profileVisibility: profiles.profileVisibility,
        createdAt: profiles.createdAt,
      })
      .from(profiles)
      .where(or(eq(profiles.id, data.userId), eq(profiles.username, data.userId)))
      .limit(1);

    return profile ? toPublicProfile(profile, context.auth.user?.id) : null;
  });
