import { CalendarBlankIcon, LockKeyIcon, MapPinIcon, UserIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { UserAvatar } from "@/features/auth/components/user-avatar";
import { getPublicProfileById } from "@/features/auth/server/public-profile";

export const Route = createFileRoute("/_public/u/$userId")({
  component: PublicProfilePage,
  loader: async ({ params }) => {
    const profile = await getPublicProfileById({ data: { userId: params.userId } });
    if (!profile) throw notFound();
    return profile;
  },
});

function PublicProfilePage() {
  const profile = Route.useLoaderData();
  const joinedAt = new Date(profile.createdAt).toLocaleDateString("ar");

  return (
    <main className="bg-background min-h-screen" dir="rtl">
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto flex max-w-5xl flex-col gap-5 px-4 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <UserAvatar
              user={{
                id: profile.id,
                email: "",
                name: profile.displayName,
                image: profile.avatarUrl,
              }}
              className="bg-background size-20 border"
            />
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h1 className="text-foreground truncate text-2xl font-bold">
                  {profile.displayName}
                </h1>
                {profile.isPrivate ? (
                  <Badge variant="secondary" className="gap-1">
                    <LockKeyIcon className="size-3.5" />
                    خاص
                  </Badge>
                ) : null}
              </div>
              <p className="text-muted-foreground text-sm">@{profile.username}</p>
            </div>
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
            {profile.location && !profile.isPrivate ? (
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="size-3.5" />
                {profile.location}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1">
              <CalendarBlankIcon className="size-3.5" />
              انضم في {joinedAt}
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-[1fr_18rem]">
        <div className="bg-card rounded-xl border p-5">
          <h2 className="mb-3 text-base font-semibold">نبذة</h2>
          {profile.isPrivate ? (
            <div className="text-muted-foreground bg-muted/50 flex items-center gap-2 rounded-lg p-4 text-sm">
              <LockKeyIcon className="size-5 shrink-0" />
              هذا الملف خاص ولا يعرض تفاصيل القراءة للعامة.
            </div>
          ) : profile.bio ? (
            <p className="text-muted-foreground text-sm leading-7">{profile.bio}</p>
          ) : (
            <p className="text-muted-foreground text-sm">لم يضف هذا القارئ نبذة بعد.</p>
          )}
        </div>

        <aside className="bg-card rounded-xl border p-5">
          <h2 className="mb-3 text-base font-semibold">معلومات عامة</h2>
          <dl className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">حالة الملف</dt>
              <dd>{profile.isPrivate ? "خاص" : "عام"}</dd>
            </div>
            {profile.website && !profile.isPrivate ? (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">الموقع</dt>
                <dd className="truncate">
                  <a
                    href={profile.website}
                    className="text-primary hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    زيارة
                  </a>
                </dd>
              </div>
            ) : null}
            <div className="text-muted-foreground bg-muted/50 flex items-center gap-2 rounded-lg p-3 text-xs">
              <UserIcon className="size-4 shrink-0" />
              نشاط القراءة العام سيظهر هنا عند توفر بيانات اجتماعية حقيقية.
            </div>
          </dl>
        </aside>
      </section>
    </main>
  );
}
