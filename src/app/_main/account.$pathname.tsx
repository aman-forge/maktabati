import { AccountView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/account/$pathname")({
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
