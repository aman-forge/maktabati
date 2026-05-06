import { authClient } from "@features/auth/lib";
import { SpinnerGapIcon } from "@phosphor-icons/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_protected/me")({
  component: MeRoute,
});

function MeRoute() {
  const navigate = useNavigate();
  const { data } = authClient.useSession();

  useEffect(() => {
    const userId = data?.user?.id;
    if (userId) {
      navigate({
        to: "/u/$userId",
        params: { userId },
        replace: true,
      });
    }
  }, [data, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center text-foreground">
      {/* TODO: IMPROVE DESIGN */}
      <SpinnerGapIcon
        size={32}
        className="size-20 animate-spin"
        weight="regular"
      />
    </div>
  );
}
