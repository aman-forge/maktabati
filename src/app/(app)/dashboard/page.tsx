import { createClient } from "@server/db/server";
import { redirect } from "next/navigation";

type Profile = {
  id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at?: string | null;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, first_name, last_name, created_at")
    .eq("id", user.id)
    .single<Profile>();

  const safeProfile: Profile | null = error ? null : profile;

  return (
    <main className="container mx-auto px-4 pt-10 pb-16 space-y-8">
      <section className="space-y-2 text-right">
        <h1 className="text-2xl md:text-3xl font-bold">لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground">
          نظرة عامة على حسابك في مكتبتي.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-4 space-y-3">
          <h2 className="text-base font-semibold">معلومات الحساب</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">البريد الإلكتروني</span>
              <span className="font-medium break-all">{user.email}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">اسم المستخدم</span>
              <span className="font-medium">
                {safeProfile?.username ?? "غير محدد"}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">الاسم الأول</span>
              <span className="font-medium">
                {safeProfile?.first_name ?? "غير محدد"}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">اسم العائلة</span>
              <span className="font-medium">
                {safeProfile?.last_name ?? "غير محدد"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-3">
          <h2 className="text-base font-semibold">بيانات أخرى</h2>
          <p className="text-sm text-muted-foreground">
            يمكن لاحقاً توسيع هذه البطاقة لعرض مزيد من تفاصيل الحساب مثل عدد
            الكتب، الإحصائيات، وقوائم القراءة.
          </p>
        </div>
      </section>
    </main>
  );
}
