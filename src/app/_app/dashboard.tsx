import { createFileRoute, redirect } from "@tanstack/react-router";

import DashboardHomeSkeleton from "@/features/dashboard/components/home-page-skeleton";
import DashboardHome from "@/features/dashboard/pages/home-page";

export const Route = createFileRoute("/_app/dashboard")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  pendingComponent: DashboardHomeSkeleton,
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardHome />;
}
