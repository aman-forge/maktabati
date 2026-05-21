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
                className="border-border bg-card flex items-start gap-3 rounded-xl border p-4"
              >
                <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-primary size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-primary mb-1 text-xs font-medium">{item.source}</p>
                  <p className="text-foreground text-sm leading-snug font-medium">{item.title}</p>
                  <p className="text-muted-foreground mt-1 text-[11px]">{item.date}</p>
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
              className="border-border bg-card grid grid-cols-[52px_1fr_auto] items-center gap-3 rounded-xl border p-4"
            >
              <div className="text-center">
                <p className="text-primary text-xl leading-none font-semibold">{event.day}</p>
                <p className="text-muted-foreground mt-1 text-[10px] tracking-wide uppercase">
                  {event.month}
                </p>
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">{event.title}</p>
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[11px]">
                  <MapPinIcon className="size-3 shrink-0" />
                  {event.location}
                </p>
              </div>
              <span className="bg-primary/10 text-primary shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium">
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
    <div className="mb-4 flex items-center gap-3">
      <h2 className="text-foreground font-serif text-lg font-normal whitespace-nowrap">
        {children}
      </h2>
      <div className="bg-border h-px flex-1" />
    </div>
  );
}
