// TODO: DELETE (moved to /settings/account)

import { AccountView } from "@neondatabase/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/account/$pathname")({
  component: Account,
});

function Account() {
  const { pathname } = Route.useParams();
  return (
    <div className="flex items-start py-12 h-full min-h-[calc(100vh-var(--header-height))] container mx-auto">
      <AccountView pathname={pathname} />
    </div>
  );
}
