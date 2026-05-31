import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { authClient } from "@/features/auth/client";
import {
  clearClientAuthSnapshot,
  writeClientAuthSnapshot,
} from "@/features/auth/client-auth-snapshot";
import { EMPTY_AUTH, type AuthState, type AuthUser } from "@/features/auth/server/types";
import {
  clearHasSessionHint,
  readHasSessionHint,
  writeHasSessionHint,
} from "@/features/auth/session-storage";

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();
  const routeAuth = useRouterState({
    select: (state) =>
      (state.matches[0]?.context as { auth?: AuthState } | undefined)?.auth ?? EMPTY_AUTH,
  });
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
      if (routeAuth.user) clearClientAuthSnapshot();
      setLikelyHasSession(false);
    }
  }, [session, isPending, routeAuth.user]);

  const user = (session?.user ?? routeAuth.user ?? null) as AuthUser | null;

  useEffect(() => {
    writeClientAuthSnapshot({
      user,
      session: routeAuth.session,
      profile: routeAuth.profile,
    });
  }, [routeAuth.profile, routeAuth.session, user]);

  return {
    session: session ?? routeAuth.session ?? null,
    user,
    isLoggedIn: !!user,
    isLoading: !routeAuth.user && likelyHasSession && isPending,
    isPending,
  };
}

export function useUser() {
  return useAuth();
}
