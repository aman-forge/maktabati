import { describe, expect, it } from "vitest";

import { getSafeAuthRedirect } from "./redirect";

describe("auth redirects", () => {
  it("keeps safe internal redirects", () => {
    expect(getSafeAuthRedirect("/library")).toBe("/library");
  });

  it("rejects external and auth redirects", () => {
    expect(getSafeAuthRedirect("https://example.com")).toBe("/");
    expect(getSafeAuthRedirect("//example.com")).toBe("/");
    expect(getSafeAuthRedirect("/auth/login")).toBe("/");
  });
});
