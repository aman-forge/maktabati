// TODO: DELETE (moved to /settings/account)

import { AccountView } from "@neondatabase/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/account/$pathname")({
  component: Account,
});

function Account() {
  const { pathname } = Route.useParams();
  return (
    <div className="container mx-auto flex h-full min-h-[calc(100vh-var(--header-height))] items-start py-12">
      <AccountView pathname={pathname} />
    </div>
  );
}
