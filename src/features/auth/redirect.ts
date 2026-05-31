export function getSafeAuthRedirect(redirect?: string | null, fallback = "/") {
  if (!redirect?.startsWith("/") || redirect.startsWith("//")) return fallback;
  if (redirect === "/auth" || redirect.startsWith("/auth/")) return fallback;
  return redirect;
}
