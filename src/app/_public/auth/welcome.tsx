import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/auth/welcome")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/auth/welcome"!</div>;
}
