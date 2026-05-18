console.log("useProfile imported");

// import { useQuery } from "@tanstack/react-query";
// import { eq } from "drizzle-orm";
// import { db } from "@/db";
// import { profiles } from "@/db/schema";

// export function useProfile(userId: string | null | undefined) {
//   return useQuery({
//     queryKey: ["profile", userId],
//     queryFn: async () => {
//       const profile = await db.query.profiles.findFirst({
//         where: eq(profiles.id, userId!),
//       });
//       // Return null explicitly so consumers can distinguish
//       // "still loading" from "loaded but not found"
//       return profile ?? null;
//     },
//     enabled: !!userId,
//     staleTime: 1000 * 60 * 5, // profiles don't change that often
//   });
// }
