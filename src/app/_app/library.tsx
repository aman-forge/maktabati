import { SignedIn, UserButton } from "@neondatabase/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";

import { authClient } from "@/features/auth/client";

export const Route = createFileRoute("/_app/library")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = authClient.useSession();

  return (
    <SignedIn>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: "2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Welcome!</h1>
          <p>You're successfully authenticated.</p>
          <UserButton />
          <p className="mt-4 font-medium text-gray-700 dark:text-gray-200">
            Session and User Data:
          </p>
          <pre className="mx-auto w-full max-w-full overflow-x-auto rounded-lg bg-gray-900 p-4 text-left text-sm wrap-break-word whitespace-pre-wrap text-gray-100 sm:max-w-2xl">
            <code>{JSON.stringify({ session: data?.session, user: data?.user }, null, 2)}</code>
          </pre>
        </div>
      </div>
    </SignedIn>
  );
}
