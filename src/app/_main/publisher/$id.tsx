import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/publisher/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/publisher/$id"!</div>;
}
