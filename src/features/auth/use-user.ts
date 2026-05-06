import { authClient } from "@features/auth/lib";

export function useUser() {
  const { data, isPending } = authClient.useSession();

  const user = data?.user ?? null;

  return {
    user,
    isLoggedIn: !!user,
    isLoading: isPending,
  };
}
