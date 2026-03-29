import { AccountView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_auth/account/$pathname")({
  component: Account,
});

function Account() {
  const { pathname } = Route.useParams();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <AccountView pathname={pathname} />
    </div>
  );
}
