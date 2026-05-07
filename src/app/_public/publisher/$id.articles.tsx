import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/publisher/$id/articles")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/publisher/$id/articles"!</div>;
}
