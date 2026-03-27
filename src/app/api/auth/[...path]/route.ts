import { auth } from "@/features/auth/lib/server";

export const { GET, POST } = auth.handler();
