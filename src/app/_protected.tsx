import { RedirectToSignIn, SignedIn } from "@neondatabase/auth/react/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: () => (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <RedirectToSignIn />
    </>
  ),
});
