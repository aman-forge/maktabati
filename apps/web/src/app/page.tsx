export default function page() {
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
              أضف الكتب، حدّد حالتها بين &quot;أقرأ الآن&quot;،
              &quot;مكتملة&quot; أو &quot;أرغب بقراءتها&quot;، وتابع تقدمك
              بسهولة.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-4 space-y-2">
            <h3 className="font-semibold">إحصائيات شهرية وسنوية</h3>
            <p className="text-sm text-muted-foreground">
              راقب عدد الصفحات والكتب التي تقرأها مع رسوم بيانية بسيطة تساعدك
              على الاستمرار.
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
