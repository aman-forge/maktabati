import { useEffect, useState } from "react";

import { authClient } from "@/features/auth/client";

const HAS_SESSION_KEY = "auth:hasSession";

function readHasSessionHint(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(HAS_SESSION_KEY) === "1";
}

export function useUser() {
  const { data: session, isPending } = authClient.useSession();
  const [likelyHasSession, setLikelyHasSession] = useState(readHasSessionHint);

  useEffect(() => {
    if (session?.user) {
      localStorage.setItem(HAS_SESSION_KEY, "1");
      setLikelyHasSession(true);
    } else if (!isPending) {
      localStorage.removeItem(HAS_SESSION_KEY);
      setLikelyHasSession(false);
    }
  }, [session, isPending]);

  return {
    user: session?.user ?? null,
    isLoggedIn: !!session?.user,
    isLoading: likelyHasSession && isPending,
  };
}
