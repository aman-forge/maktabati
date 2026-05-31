import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/library")({
  component: lazyRouteComponent(
    () => import("@/features/dashboard/pages/library-route-page"),
    "LibraryRoutePage",
  ),
});
