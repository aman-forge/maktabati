import BottomBar from "@components/layout/bottom-bar";
import Header from "@components/layout/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: () => (
    <>
      <Header />
      <main className="md:pt-14 md:pb-0 pb-16">
        <Outlet />
      </main>
      <BottomBar />
    </>
  ),
});
