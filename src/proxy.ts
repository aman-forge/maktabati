import { auth } from "@/features/auth/lib/server";

export default auth.middleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: [
    // Protected routes requiring authentication
    "/account/:path*",
  ],
};
