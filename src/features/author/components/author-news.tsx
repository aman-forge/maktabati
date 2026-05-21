import type { AuthorType } from "@features/author/server/get-author";
import { MapPinIcon, NewspaperIcon, TelevisionIcon } from "@phosphor-icons/react";

const MOCK_NEWS = [
  {
    id: "1",
    source: "الأهرام",
    title: "إصدار طبعة جديدة منقحة من الثلاثية بمناسبة مرور ثلاثين عاماً على نوبل",
    date: "مارس 2025",
    icon: "newspaper",
  },
  {
    id: "2",
    source: "نتفليكس عربي",
    title: "الإعلان عن تحويل رواية «أولاد حارتنا» إلى مسلسل تلفزيوني",
    date: "يناير 2025",
    icon: "tv",
  },
  {
    id: "3",
    source: "معرض القاهرة للكتاب",
    title: "افتتاح متحف نجيب محفوظ في الجمالية بحضور وزير الثقافة",
    date: "ديسمبر 2024",
    icon: "library",
  },
];

const MOCK_EVENTS = [
  {
    id: "1",
    day: "15",
    month: "يونيو",
    title: 'ندوة "نجيب محفوظ والتراث"',
    location: "مكتبة الإسكندرية، مصر",
    type: "ندوة",
  },
  {
    id: "2",
    day: "3",
    month: "أغسطس",
    title: "ذكرى رحيله الـ19",
    location: "مقهى ريش، القاهرة",
    type: "تأبين",
  },
];

const ICON_MAP = {
  newspaper: NewspaperIcon,
  tv: TelevisionIcon,
  // library: BuildingLibraryIcon,
};

export function AuthorNews({ author: _author }: { author: AuthorType }) {
  return (
    <div className="flex flex-col gap-8" dir="rtl">
      {/* News */}
      <section>
        <SectionTitle>أخبار</SectionTitle>
        <div className="flex flex-col gap-3">
          {MOCK_NEWS.map((item) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? NewspaperIcon;
            return (
              <div
                key={item.id}
                className="flex gap-3 items-start rounded-xl border border-border bg-card p-4"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-primary mb-1">{item.source}</p>
                  <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Events */}
      <section>
        <SectionTitle>فعاليات قادمة</SectionTitle>
        <div className="flex flex-col gap-3">
          {MOCK_EVENTS.map((event) => (
            <div
              key={event.id}
              className="grid grid-cols-[52px_1fr_auto] gap-3 items-center rounded-xl border border-border bg-card p-4"
            >
              <div className="text-center">
                <p className="text-xl font-semibold leading-none text-primary">{event.day}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">
                  {event.month}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                  <MapPinIcon className="size-3 shrink-0" />
                  {event.location}
                </p>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="font-serif text-lg font-normal text-foreground whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
