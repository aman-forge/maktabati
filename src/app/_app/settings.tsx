import { SettingsSidebar } from "@/features/settings/components/settings-sidebar";
import { SidebarInset, SidebarProvider } from "@/ui/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <SidebarProvider>
      <SettingsSidebar />
      <SidebarInset className="flex-1 overflow-y-auto mx-auto max-w-2xl px-6 py-8 lg:px-10 lg:py-10">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
