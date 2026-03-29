import { AuthView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_auth/auth/$pathname")({
  component: Auth,
});

function Auth() {
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
      <AuthView pathname={pathname} />
    </div>
  );
}
