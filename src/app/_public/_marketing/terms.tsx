import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/_marketing/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="bg-background min-h-screen" dir="rtl">
      <article className="container mx-auto max-w-3xl px-4 py-12">
        <p className="text-muted-foreground mb-3 text-sm">آخر تحديث: 31 مايو 2026</p>
        <h1 className="text-foreground text-3xl font-bold">شروط الاستخدام</h1>
        <p className="text-muted-foreground mt-4 leading-8">
          هذه مسودة معلوماتية غير نهائية لشروط استخدام مكتبتي. ستُستبدل بنسخة قانونية كاملة قبل أي
          إطلاق عام يعتمد عليها.
        </p>

        <div className="mt-8 grid gap-5">
          {[
            {
              title: "الاستخدام المقبول",
              body: "استخدم التطبيق لتنظيم القراءة واكتشاف الكتب، وتجنب إدخال محتوى مضلل أو مخالف للحقوق.",
            },
            {
              title: "المحتوى والملكية",
              body: "بيانات الكتب والأغلفة والمراجعات تخضع لمصادرها وحقوق أصحابها، ويجب التعامل معها باحترام.",
            },
            {
              title: "حالة المنتج",
              body: "بعض الخصائص ما زالت قيد التطوير، ولن تظهر في الواجهة إلا عندما تكون مدعومة ببيانات حقيقية.",
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
