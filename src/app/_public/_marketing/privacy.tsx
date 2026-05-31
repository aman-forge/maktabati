import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/_marketing/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="bg-background min-h-screen" dir="rtl">
      <article className="container mx-auto max-w-3xl px-4 py-12">
        <p className="text-muted-foreground mb-3 text-sm">آخر تحديث: 31 مايو 2026</p>
        <h1 className="text-foreground text-3xl font-bold">معلومات الخصوصية</h1>
        <p className="text-muted-foreground mt-4 leading-8">
          هذه صفحة معلومات منتج أولية وليست سياسة قانونية نهائية. هدفها توضيح طريقة تعامل التطبيق
          الحالية مع بيانات الحساب والقراءة إلى أن تُعتمد نسخة قانونية مكتملة.
        </p>

        <div className="mt-8 grid gap-5">
          {[
            {
              title: "بيانات الحساب",
              body: "يعتمد تسجيل الدخول على Neon Auth. يحتفظ التطبيق بملف عام مختصر في جدول profiles مثل الاسم المعروض والصورة والنبذة عند توفرها.",
            },
            {
              title: "بيانات القراءة",
              body: "حالات الكتب، التقدم، والملاحظات الخاصة تخزن في جداول التطبيق وتعرض لصاحب الحساب حسب قواعد الوصول الحالية.",
            },
            {
              title: "البيانات الاجتماعية",
              body: "لا يعرض التطبيق نشاطًا اجتماعيًا حقيقيًا قبل وجود الجداول والخدمات الداعمة له.",
            },
          ].map((section) => (
            <section key={section.title} className="bg-card rounded-xl border p-5">
              <h2 className="font-semibold">{section.title}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-7">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
