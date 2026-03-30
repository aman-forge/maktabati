import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="dashboard-wrapper">
      <Outlet />
    </div>
  );
}
