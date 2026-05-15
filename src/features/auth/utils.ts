import { useEffect, useState } from "react";

import { authClient } from "@/features/auth/client";

const HAS_SESSION_KEY = "auth:hasSession";

function readHasSessionHint() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(HAS_SESSION_KEY) === "1";
}

export function useUser() {
  const { data: clientSession, isPending } = authClient.useSession();

  const [likelyHasSession, setLikelyHasSession] = useState(readHasSessionHint);

  useEffect(() => {
    if (clientSession?.user) {
      localStorage.setItem(HAS_SESSION_KEY, "1");
      setLikelyHasSession(true);
      return;
    }

    if (!isPending) {
      localStorage.removeItem(HAS_SESSION_KEY);
      setLikelyHasSession(false);
    }
  }, [clientSession, isPending]);

  const user = clientSession?.user ?? null;

  return {
    session: clientSession ?? null,
    user,
    isLoggedIn: !!user,
    isLoading: likelyHasSession && isPending,
  };
}
