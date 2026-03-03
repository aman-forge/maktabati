"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

type UserContextType = {
  user: User | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
  initialUser?: User | null;
};

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const [loading, setLoading] = useState<boolean>(!initialUser);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    // 1. Initial check (only if we don't already have a server-hydrated user)
    if (!initialUser) {
      const getUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
      };

      getUser();
    }

    // 2. Listen for auth changes (Login/Logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [initialUser, supabase]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
