export function QuoteSection() {
  return (
    <section className="bg-secondary relative container mx-auto overflow-hidden rounded-xl px-6 py-16 lg:px-12">
      {/* العلامة الزخرفية الكبيرة للاقتباس */}
      <div
        className="text-primary pointer-events-none absolute -top-6 left-8 font-serif text-[160px] leading-none select-none"
        style={{
          opacity: 0.12,
          fontFamily: "var(--font-display)",
        }}
        aria-hidden="true"
      >
        {"„"} {/* استخدمت علامة اقتباس عربية أنيقة (بديل شائع في التصميم العربي) */}
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <blockquote
          className="text-2xl leading-relaxed font-medium text-balance italic lg:text-3xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--foreground)",
          }}
        >
          "يعيش القارئ ألف حياة قبل أن يموت. أما الإنسان الذي لا يقرأ فإنه يعيش حياة واحدة فقط."
        </blockquote>

        <div className="flex flex-col items-center gap-1">
          <span className="text-foreground text-sm font-semibold">جورج ر. ر. مارتن</span>
          <span className="text-muted-foreground text-xs">رقصة مع التنانين</span>
        </div>

        <div className="text-muted-foreground flex items-center justify-center gap-3">
          <div className="bg-border h-px w-16" />
          <span className="text-xs tracking-widest uppercase">فوليو</span>
          <div className="bg-border h-px w-16" />
        </div>
      </div>
    </section>
  );
}
