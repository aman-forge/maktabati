import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/author/$id/books")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/author/$id/books"!</div>;
}
