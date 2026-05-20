import {
  BooksIcon,
  CalendarBlankIcon,
  FlaskIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

import { Badge } from "@/ui/components/ui/badge";
import { Separator } from "@/ui/components/ui/separator";
import { cn } from "@/ui/lib/utils";

type ReleaseStatus = "alpha" | "beta" | "stable";
type ReleaseGroup = {
  title: string;
  description: string;
  icon: React.ElementType;
  items: string[];
};

interface Release {
  version: string;
  label: string;
  date: Date;
  status: ReleaseStatus;
  summary: string;
  groups: ReleaseGroup[];
}

const RELEASES: Release[] = [
  {
    version: "v0.1.0-alpha.1",
    label: "الإصدار التأسيسي الأول",
    date: new Date(2026, 6, 1),
    status: "alpha",
    summary:
      "أول نسخة ألفا تجمع الأساس الحقيقي لمكتبتي: بناء بنية صحيحة لقواعد البيانات عربي، ملفات كتب ومؤلفين، مكتبة شخصية، وتتبع قراءة مبني فوق قاعدة بيانات واضحة وقابلة للنمو.",
    groups: [
      {
        title: "تجربة المنتج",
        description: "الشكل الأول للمنصة كما سيشعر بها القارئ.",
        icon: SparkleIcon,
        items: [
          "واجهة عربية باتجاه RTL مع صفحات عامة وتسويق أولي للمنصة.",
          "هيكل تنقل يغطي الاكتشاف، المجتمع، المكتبة، الحساب، والإعدادات.",
          "تصميم معاصر وبسيط للموقع مع دعم للوضع الداكن.",
        ],
      },
      {
        title: "الكتب والاكتشاف",
        description: "النواة التي تسمح ببناء قواعد بيانات عربية قوية.",
        icon: BooksIcon,
        items: [
          "نمذجة الكتب، المؤلفين، المترجمين، المحررين، دور النشر، والسلاسل.",
          "دعم الكتب العربية الأصلية والكتب المترجمة إلى العربية.",
          "صفحات أولية للكتاب، المؤلف، الناشر، وقوائم الكتب.",
        ],
      },
      {
        title: "مكتبتي وتتبع القراءة",
        description: "الجزء الشخصي الذي يحول قواعد البيانات إلى رف قراءة.",
        icon: UserCircleIcon,
        items: [
          "حالات قراءة أساسية: أريد قراءته، أقرأه حالياً، مكتمل، متوقف، ومتروك.",
          "تتبع الصفحات، تواريخ البداية والنهاية، وملاحظات خاصة لا تظهر للعامة.",
          "صفحة مكتبة مبدئية تعرض كتب المستخدم حسب بيانات التتبع.",
        ],
      },
      {
        title: "المجتمع والهوية",
        description: "أساس اجتماعي قابل للتوسع دون استعجال الميزات.",
        icon: ShieldCheckIcon,
        items: [
          "ملفات شخصية تتضمن اسم مستخدم، نبذة، روابط اجتماعية، وموقعاً اختيارياً.",
          "نظام مراجعات وتقييمات من 1 إلى 5 مع دعم مراجعات نصية أو تقييم فقط.",
          "بدايات واضحة لصفحات الخصوصية، الحساب، الإشعارات، والتفضيلات.",
        ],
      },
    ],
  },
];

const STATUS_CONFIG: Record<ReleaseStatus, { label: string; description?: string }> = {
  alpha: {
    label: "Alpha",
    // description: "نسخة مبكرة قابلة للتجربة وليست وعداً بالثبات النهائي.",
  },
  beta: {
    label: "Beta",
    // description: "نسخة اختبار أوسع بعد اكتمال معظم مسارات MVP.",
  },
  stable: {
    label: "Stable",
    // description: "نسخة مستقرة للاستخدام العام.",
  },
};

export const Route = createFileRoute("/_public/_marketing/changelog")({
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <main className="bg-background min-h-svh" dir="rtl">
      <section className="border-border/60 border-b">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
          <div className="flex max-w-3xl flex-col gap-5">
            <Badge variant="outline" className="w-fit gap-1.5 rounded-full px-3 py-1">
              <FlaskIcon weight="fill" className="text-primary" data-icon="inline-start" />
              سجل الإصدارات
            </Badge>

            <div className="flex flex-col gap-4">
              <h1 className="text-foreground text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
                ما الذي تغيّر في مكتبتي؟
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base leading-8 md:text-lg">
                توثيق مختصر وواضح لكل نسخة مهمة من المنصة، مع التركيز على ما أصبح جاهزاً فعلاً وما لا
                يزال في طور التجربة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8">
          {RELEASES.map((release) => (
            <ReleaseArticle key={release.version} release={release} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ReleaseArticle({ release }: { release: Release }) {
  const status = STATUS_CONFIG[release.status];

  return (
    <article className="border-border/70 bg-card rounded-lg border">
      <header className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[220px_1fr] lg:p-8">
        <aside className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1.5 rounded-full px-3 py-1">
              <SparkleIcon weight="fill" data-icon="inline-start" />
              الأحدث
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 py-1 font-mono uppercase">
              {status.label}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              {release.version}
            </h2>
            <p className="text-muted-foreground text-sm leading-6">{status.description}</p>
          </div>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <CalendarBlankIcon className="shrink-0" />
            <time dateTime={release.date.toISOString()}>
              {format(release.date, "d MMMM yyyy", { locale: ar })}
            </time>
          </div>
        </aside>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm font-medium">{release.label}</p>
            <p className="text-foreground max-w-3xl text-lg leading-9">{release.summary}</p>
          </div>
        </div>
      </header>

      <Separator />

      <div className="grid gap-0 lg:grid-cols-2">
        {release.groups.map((group, index) => (
          <ReleaseGroupCard
            key={group.title}
            group={group}
            className={cn(
              "border-border/70 border-b p-5 sm:p-6 lg:p-8",
              index % 2 === 0 ? "lg:border-e" : "",
              index >= release.groups.length - 2 ? "lg:border-b-0" : "",
            )}
          />
        ))}
      </div>
    </article>
  );
}

function ReleaseGroupCard({ group, className }: { group: ReleaseGroup; className?: string }) {
  const Icon = group.icon;

  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary border-primary/10 grid size-10 shrink-0 place-items-center rounded-md border">
          <Icon weight="duotone" className="size-7" />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-foreground text-base font-semibold">{group.title}</h3>
          <p className="text-muted-foreground text-sm leading-6">{group.description}</p>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {group.items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7">
            <span className="bg-primary mt-3 size-1.5 shrink-0 rounded-full" />
            <span className="text-foreground/90">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
