export function QuoteSection() {
  return (
    <section className="relative py-16 px-6 lg:px-12 overflow-hidden container mx-auto rounded-xl bg-secondary">
      {/* العلامة الزخرفية الكبيرة للاقتباس */}
      <div
        className="pointer-events-none absolute -top-6 left-8 text-[160px] leading-none font-serif select-none text-primary"
        style={{
          opacity: 0.12,
          fontFamily: "var(--font-display)",
        }}
        aria-hidden="true"
      >
        {"„"}{" "}
        {/* استخدمت علامة اقتباس عربية أنيقة (بديل شائع في التصميم العربي) */}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
        <blockquote
          className="text-2xl lg:text-3xl font-medium leading-relaxed text-balance italic"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--foreground)",
          }}
        >
          "يعيش القارئ ألف حياة قبل أن يموت. أما الإنسان الذي لا يقرأ فإنه يعيش
          حياة واحدة فقط."
        </blockquote>

        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-semibold text-primary-foreground">
            جورج ر. ر. مارتن
          </span>
          <span className="text-xs text-muted-foreground">
            رقصة مع التنانين
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <div className="h-px w-16 bg-border" />
          <span className="text-xs uppercase tracking-widest">فوليو</span>
          <div className="h-px w-16 bg-border" />
        </div>
      </div>
    </section>
  );
}
