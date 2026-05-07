import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/author/$id/series")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/author/$id/series"!</div>;
}
