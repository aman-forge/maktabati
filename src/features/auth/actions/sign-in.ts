import { authClient } from "@features/auth/lib";
import { redirect } from "@tanstack/react-router";

export async function signInWithEmail(_prevState: { error: string } | null, formData: FormData) {
  const { error } = await authClient.signIn.email({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message || "Failed to sign in. Try again" };
  }

  redirect({ to: "/" });
}
