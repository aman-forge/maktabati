import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/u/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/u/$$userId"!</div>;
}
