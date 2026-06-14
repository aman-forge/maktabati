import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/account/$pathname")({
  beforeLoad: () => {
    throw redirect({ to: "/settings/account" });
  },
});
