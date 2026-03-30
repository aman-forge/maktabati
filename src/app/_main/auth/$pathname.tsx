import { AuthView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/auth/$pathname")({
  component: Auth,
});

function Auth() {
  const { pathname } = Route.useParams();
  const isSignUpView = pathname.includes("sign-up") || pathname.includes("register");

  return (
    <div className="flex items-center justify-center h-full min-h-[calc(100vh-var(--header-height))]">
      <AuthView
        pathname={pathname}
        classNames={{
          form: {
            base: isSignUpView ? "first-input-rtl" : "",
            input: "direction-ltr",
          },
        }}
      />
    </div>
  );
}
