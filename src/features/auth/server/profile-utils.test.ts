import { describe, expect, it } from "vitest";

import { getDisplayName, getUsernameBase, getUsernameCandidate } from "./profile-utils";

describe("profile provisioning helpers", () => {
  it("derives a readable display name", () => {
    expect(getDisplayName({ id: "user_123", email: "reader@example.com", name: "" })).toBe(
      "reader",
    );
  });

  it("normalizes username candidates", () => {
    expect(getUsernameBase({ id: "user_12345678", email: "Reader.Name@example.com" })).toBe(
      "reader-name",
    );
  });

  it("adds bounded suffixes for conflicts", () => {
    expect(getUsernameCandidate("very-long-username-that-needs-trimming", 2)).toBe(
      "very-long-username-that-needs--3",
    );
  });
});
