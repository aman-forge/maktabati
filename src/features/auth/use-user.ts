import { useEffect, useState } from "react";

import { authClient } from "@/features/auth/client";
import {
  clearHasSessionHint,
  readHasSessionHint,
  writeHasSessionHint,
} from "@/features/auth/session-storage";

export function useUser() {
  const { data: session, isPending } = authClient.useSession();
  const [likelyHasSession, setLikelyHasSession] = useState(false);

  useEffect(() => {
    setLikelyHasSession(readHasSessionHint());
  }, []);

  useEffect(() => {
    if (session?.user) {
      writeHasSessionHint();
      setLikelyHasSession(true);
    } else if (!isPending) {
      clearHasSessionHint();
      setLikelyHasSession(false);
    }
  }, [session, isPending]);

  return {
    user: session?.user ?? null,
    isLoggedIn: !!session?.user,
    isLoading: likelyHasSession && isPending,
  };
}
