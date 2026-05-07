import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/_marketing/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_marketing/sbout"!</div>;
}
