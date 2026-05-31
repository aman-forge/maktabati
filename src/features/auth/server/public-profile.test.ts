import { describe, expect, it } from "vitest";

import { toPublicProfile } from "./public-profile-utils";

const profileRow = {
  id: "user-1",
  username: "reader",
  displayName: "قارئ",
  avatarUrl: "https://example.com/avatar.png",
  bio: "نبذة عامة",
  location: "دمشق",
  website: "https://example.com",
  profileVisibility: "public" as const,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

describe("public profile visibility", () => {
  it("returns public profile fields for public profiles", () => {
    const profile = toPublicProfile(profileRow, "other-user");

    expect(profile.isPrivate).toBe(false);
    expect(profile.isOwner).toBe(false);
    expect(profile.bio).toBe("نبذة عامة");
    expect(profile.location).toBe("دمشق");
    expect(profile.website).toBe("https://example.com");
  });

  it("returns a shell for private profiles viewed by other users", () => {
    const profile = toPublicProfile(
      {
        ...profileRow,
        profileVisibility: "private",
      },
      "other-user",
    );

    expect(profile.isPrivate).toBe(true);
    expect(profile.isOwner).toBe(false);
    expect(profile.bio).toBeNull();
    expect(profile.location).toBeNull();
    expect(profile.website).toBeNull();
    expect(profile.displayName).toBe(profileRow.displayName);
  });

  it("returns full private profile fields for the owner", () => {
    const profile = toPublicProfile(
      {
        ...profileRow,
        profileVisibility: "private",
      },
      profileRow.id,
    );

    expect(profile.isPrivate).toBe(false);
    expect(profile.isOwner).toBe(true);
    expect(profile.bio).toBe("نبذة عامة");
  });
});
