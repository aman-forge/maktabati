import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/discover/recommendations")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/discover/recommendations"!</div>;
}
