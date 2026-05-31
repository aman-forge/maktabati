import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/_marketing/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-background min-h-screen" dir="rtl">
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <p className="text-muted-foreground mb-3 text-sm">آخر تحديث: 31 مايو 2026</p>
          <h1 className="text-foreground text-3xl font-bold">عن مكتبتي</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-8">
            مكتبتي مساحة عربية لاكتشاف الكتب، تنظيم القراءة، وحفظ التقدم الشخصي بطريقة هادئة وواضحة.
            نركز في هذه المرحلة على تجربة بحث وتتبع موثوقة قبل إضافة أي خصائص اجتماعية واسعة.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid max-w-4xl gap-4 px-4 py-10 md:grid-cols-3">
        {[
          {
            title: "اكتشاف أفضل",
            body: "فهارس للكتب والمؤلفين ودور النشر مع تصفية وبحث مناسبين للقارئ العربي.",
          },
          {
            title: "تتبع صادق",
            body: "حفظ حالة القراءة والتقدم والملاحظات الخاصة دون اختلاق نشاط غير موجود.",
          },
          {
            title: "بناء تدريجي",
            body: "نضيف الخصائص عندما تصبح مدعومة ببيانات حقيقية وتجربة قابلة للاعتماد.",
          },
        ].map((item) => (
          <article key={item.title} className="bg-card rounded-xl border p-5">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-7">{item.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
