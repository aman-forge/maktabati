"use client";

import { useUser } from "@/context/user-context";

export default function Page() {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <main className="container mx-auto px-4 pt-10 space-y-6">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-muted" />
        <div className="h-6 w-64 animate-pulse rounded-lg bg-muted" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
        </div>
      </main>
    );
  }

  if (!user) {
    // Public home (marketing)
    return (
      <main className="container mx-auto px-4 pt-10 pb-16 space-y-16">
        <section className="grid gap-8 md:grid-cols-[1.2fr_minmax(0,1fr)] items-center">
          <div className="space-y-6 text-right">
            <p className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              تنظيم قراءتك لم يكن أسهل من قبل
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-relaxed">
              اجمع كتبك، ملاحظاتك، وإحصائيات قراءتك في مكان واحد.
            </h1>
            <p className="text-muted-foreground max-w-xl ml-auto">
              مكتبتي تساعدك على تتبع الكتب التي قرأتها، الكتب التي تريد قراءتها،
              وأهدافك الشهرية في القراءة، مع تجربة عربية مميزة.
            </p>
            <div className="flex justify-end gap-3">
              <a
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                ابدأ الآن مجاناً
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-accent"
              >
                تسجيل الدخول
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border bg-card p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">تقدم هذا الشهر</span>
                <span className="text-xs text-muted-foreground">8 / 12 كتاب</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-2/3 rounded-full bg-primary" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-lg bg-muted/60 px-2 py-3">
                  <div className="text-lg font-bold">36</div>
                  <div className="text-muted-foreground">كتاباً مقروءاً</div>
                </div>
                <div className="rounded-lg bg-muted/60 px-2 py-3">
                  <div className="text-lg font-bold">5</div>
                  <div className="text-muted-foreground">كتب حالية</div>
                </div>
                <div className="rounded-lg bg-muted/60 px-2 py-3">
                  <div className="text-lg font-bold">18</div>
                  <div className="text-muted-foreground">في قائمة الانتظار</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">لماذا مكتبتي؟</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-4 space-y-2">
              <h3 className="font-semibold">تتبع قراءة بسيط وواضح</h3>
              <p className="text-sm text-muted-foreground">
                أضف الكتب، حدّد حالتها بين &quot;أقرأ الآن&quot;، &quot;مكتملة&quot;
                أو &quot;أرغب بقراءتها&quot;، وتابع تقدمك بسهولة.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4 space-y-2">
              <h3 className="font-semibold">إحصائيات شهرية وسنوية</h3>
              <p className="text-sm text-muted-foreground">
                راقب عدد الصفحات والكتب التي تقرأها مع رسوم بيانية بسيطة
                تساعدك على الاستمرار.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4 space-y-2">
              <h3 className="font-semibold">تجربة عربية بالكامل</h3>
              <p className="text-sm text-muted-foreground">
                واجهة عربية، اتجاه من اليمين لليسار، وتجربة مصممة خصيصاً لعشّاق
                الكتب العرب.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Logged-in dashboard
  return (
    <main className="container mx-auto px-4 pt-10 pb-16 space-y-10">
      <section className="flex flex-col gap-3 text-right">
        <p className="text-sm text-muted-foreground">
          أهلاً بك مجدداً،
        </p>
        <h1 className="text-2xl md:text-3xl font-bold leading-relaxed">
          {user.email ?? "قارئ"}، إليك نظرة سريعة على نشاطك في مكتبتي.
        </h1>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            الكتب المقروءة
          </p>
          <p className="text-3xl font-bold">36</p>
          <p className="text-xs text-muted-foreground">
            هذا رقم تجريبي للتصميم فقط.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            قيد القراءة الآن
          </p>
          <p className="text-3xl font-bold">3</p>
          <p className="text-xs text-muted-foreground">
            يمكنك لاحقاً ربطه بجدول حقيقي في قاعدة البيانات.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            هدف هذا الشهر
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-bold">8 / 12</p>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              +2 كتب عن الشهر الماضي
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div className="h-2 w-2/3 rounded-full bg-primary" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">كتب تقرأها حالياً</h2>
            <button className="text-xs text-primary hover:underline">
              عرض الكل
            </button>
          </div>
          <div className="space-y-2 rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">العادات الذرية</p>
                <p className="text-xs text-muted-foreground">
                  جيمس كلير • 220 / 320 صفحة
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                تطوير ذات
              </span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-2/3 rounded-full bg-primary" />
            </div>
          </div>
          <div className="space-y-2 rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">مذكرات قارئ</p>
                <p className="text-xs text-muted-foreground">
                  كاتب تجريبي • 80 / 150 صفحة
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                مذكرات
              </span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-1/2 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">قوائم القراءة</h2>
            <button className="text-xs text-primary hover:underline">
              إنشاء قائمة جديدة
            </button>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border bg-card p-4 space-y-1">
              <p className="text-sm font-medium">قراءات 2026</p>
              <p className="text-xs text-muted-foreground">
                24 كتاباً • هدف سنوي
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4 space-y-1">
              <p className="text-sm font-medium">قبل النوم</p>
              <p className="text-xs text-muted-foreground">
                10 كتب قصيرة للقراءة الخفيفة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
