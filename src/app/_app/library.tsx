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
          <p className="font-medium text-gray-700 dark:text-gray-200 mt-4">
            Session and User Data:
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap wrap-break-word w-full max-w-full sm:max-w-2xl mx-auto text-left">
            <code>{JSON.stringify({ session: data?.session, user: data?.user }, null, 2)}</code>
          </pre>
        </div>
      </div>
    </SignedIn>
  );
}
