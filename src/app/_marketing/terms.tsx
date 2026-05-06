import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing/terms")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_marketing/terms"!</div>;
}
