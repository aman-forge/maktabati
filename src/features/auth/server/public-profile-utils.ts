type ProfileVisibility = "public" | "private" | "friends";

export type PublicProfileRow = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  profileVisibility: ProfileVisibility;
  createdAt: Date;
};

export type PublicProfile = PublicProfileRow & {
  isPrivate: boolean;
  isOwner: boolean;
};

export function toPublicProfile(row: PublicProfileRow, viewerUserId?: string): PublicProfile {
  const isOwner = row.id === viewerUserId;
  const isPrivate = row.profileVisibility === "private" && !isOwner;

  if (!isPrivate) {
    return {
      ...row,
      isPrivate: false,
      isOwner,
    };
  }

  return {
    id: row.id,
    username: row.username,
    displayName: row.displayName,
    avatarUrl: row.avatarUrl,
    bio: null,
    location: null,
    website: null,
    profileVisibility: row.profileVisibility,
    createdAt: row.createdAt,
    isPrivate: true,
    isOwner,
  };
}
