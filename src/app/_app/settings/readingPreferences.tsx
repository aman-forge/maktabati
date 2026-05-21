import {
  BookOpenIcon,
  CheckIcon,
  ClockIcon,
  ListBulletsIcon,
  SparkleIcon,
  StarIcon,
  TargetIcon,
  TranslateIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Label } from "@shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/select";
import { Slider } from "@shadcn/slider";
import { Switch } from "@shadcn/switch";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  SectionWrapper,
  SettingCard,
  SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/readingPreferences")({
  component: ReadingPreferencesSection,
});

const allGenres = [
  "خيال",
  "أدب تاريخي",
  "غموض",
  "خيال علمي",
  "أدب روائي",
  "رومانسية",
  "إثارة",
  "رعب",
  "غير خيالي",
  "سيرة ذاتية",
  "تطوير الذات",
  "شعر",
  "رواية مصورة",
  "أدب الشباب",
];

const bookFormats = [
  { label: "📖 ورقي", key: "print" },
  { label: "📱 إلكتروني", key: "ebook" },
  { label: "🎧 صوتي", key: "audio" },
  { label: "📄 PDF", key: "pdf" },
];

function ReadingPreferencesSection() {
  const [readingGoal, setReadingGoal] = useState(52);
  const [selectedGenres, setSelectedGenres] = useState([
    "خيال",
    "أدب تاريخي",
    "غموض",
    "خيال علمي",
    "أدب روائي",
  ]);
  const [selectedFormats, setSelectedFormats] = useState(["print", "ebook"]);
  const [preferences, setPreferences] = useState({
    showPageCount: true,
    trackReadingTime: true,
    showProgress: true,
    autoMarkComplete: false,
  });

  const togglePref = (key: keyof typeof preferences) =>
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 5) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const toggleFormat = (key: string) => {
    if (selectedFormats.includes(key)) {
      setSelectedFormats(selectedFormats.filter((f) => f !== key));
    } else {
      setSelectedFormats([...selectedFormats, key]);
    }
  };

  const booksRead = 12;
  const progress = Math.round((booksRead / readingGoal) * 100);

  return (
    <SectionWrapper title="تفضيلات القراءة" description="خصّص تجربة القراءة وحدد أهدافك السنوية.">
      {/* Reading Goal */}
      <SettingCard
        title="تحدي القراءة السنوي"
        description="حدد هدفك وتابع تقدمك."
        icon={<TargetIcon className="h-4 w-4" weight="fill" />}
        action={
          <Badge className="bg-primary/15 text-primary border-primary/30 gap-1 text-[11px]">
            <TargetIcon className="h-3 w-3" weight="fill" />
            {booksRead}/{readingGoal} كتاب
          </Badge>
        }
      >
        <div className="space-y-5">
          {/* Goal display */}
          <div className="bg-muted/40 flex items-center gap-4 rounded-xl px-4 py-4">
            <div className="bg-primary/15 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
              <BookOpenIcon className="text-primary h-7 w-7" weight="fill" />
            </div>
            <div className="flex-1">
              <div className="flex items-end gap-1">
                <span className="text-foreground text-3xl font-black">{readingGoal}</span>
                <span className="text-muted-foreground mb-1 text-sm">كتاب / السنة</span>
              </div>
              {/* Progress bar */}
              <div className="mt-2">
                <div className="text-muted-foreground flex items-center justify-between text-[11px]">
                  <span>{booksRead} منجز</span>
                  <span>{progress}%</span>
                </div>
                <div className="bg-muted mt-1 h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <Label className="text-foreground font-semibold">تعديل الهدف</Label>
              <span className="text-muted-foreground">{readingGoal} كتاب</span>
            </div>
            <Slider
              value={[readingGoal]}
              onValueChange={(value) =>
                setReadingGoal(typeof value === "number" ? value : value[0])
              }
              max={100}
              min={1}
              step={1}
              className="**:[[role=slider]]:bg-primary"
            />
            <div className="text-muted-foreground flex justify-between text-[10px]">
              <span>1</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>

          <Button size="sm" className="h-9 w-full text-sm">
            تحديث الهدف
          </Button>
        </div>
      </SettingCard>

      {/* Genres */}
      <SettingCard
        title="الأنواع المفضلة"
        description={`اختر حتى 5 أنواع لتخصيص توصياتك • ${selectedGenres.length}/5`}
        icon={<span className="text-sm">📚</span>}
      >
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            const isDisabled = !isSelected && selectedGenres.length >= 5;
            return (
              <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                disabled={isDisabled}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : isDisabled
                      ? "border-border/40 text-muted-foreground/40 cursor-not-allowed border"
                      : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary border"
                }`}
              >
                {isSelected && <CheckIcon className="h-3 w-3" weight="bold" />}
                {genre}
              </button>
            );
          })}
        </div>
      </SettingCard>

      {/* Formats */}
      <SettingCard
        title="تنسيقات القراءة المفضلة"
        description="حدد أنواع الكتب التي تفضل قراءتها."
        icon={<BookOpenIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {bookFormats.map((format) => {
            const isSelected = selectedFormats.includes(format.key);
            return (
              <button
                key={format.key}
                type="button"
                onClick={() => toggleFormat(format.key)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all duration-150 ${
                  isSelected
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/60 bg-muted/20 text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span className="text-xl">{format.label.split(" ")[0]}</span>
                <span className="text-xs">{format.label.split(" ").slice(1).join(" ")}</span>
              </button>
            );
          })}
        </div>
      </SettingCard>

      {/* Reading Display */}
      <SettingCard
        title="عرض القراءة"
        description="خصّص كيفية عرض تقدم قراءتك."
        icon={<ListBulletsIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="divide-border/40 divide-y">
          {[
            {
              key: "showPageCount" as const,
              label: "عرض عدد الصفحات",
              desc: "عرض إجمالي الصفحات على بطاقات الكتب",
              icon: <ListBulletsIcon className="h-4 w-4" />,
            },
            {
              key: "trackReadingTime" as const,
              label: "تتبع وقت القراءة",
              desc: "تسجيل الوقت المستغرق في كل جلسة",
              icon: <ClockIcon className="h-4 w-4" />,
            },
            {
              key: "showProgress" as const,
              label: "عرض نسبة التقدم",
              desc: "عرض نسبة الإكمال على الكتب",
              icon: null,
            },
            {
              key: "autoMarkComplete" as const,
              label: "التحديد التلقائي كمكتمل",
              desc: "تحديد الكتب كمنتهية عند 100%",
              icon: null,
            },
          ].map((item) => (
            <SettingRow key={item.key} label={item.label} description={item.desc}>
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                <Switch
                  checked={preferences[item.key]}
                  onCheckedChange={() => togglePref(item.key)}
                />
              </div>
            </SettingRow>
          ))}
        </div>
      </SettingCard>

      {/* Rating Scale */}
      <SettingCard
        title="مقياس التقييم"
        description="اختر نظام التقييم المفضل لديك."
        icon={<StarIcon className="h-4 w-4" weight="fill" />}
      >
        <Select defaultValue="5-star">
          <SelectTrigger className="bg-muted/30 h-9 text-sm">
            <SelectValue placeholder="اختر مقياس التقييم" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="5-star">
              <div className="flex items-center gap-2">
                <StarIcon className="h-4 w-4 text-amber-400" weight="fill" />
                <span>مقياس 5 نجوم</span>
              </div>
            </SelectItem>
            <SelectItem value="10-point">مقياس 10 نقاط</SelectItem>
            <SelectItem value="letter">درجة حرفية (أ — هـ)</SelectItem>
          </SelectContent>
        </Select>
      </SettingCard>

      {/* Language */}
      <SettingCard
        title="اللغة والمنطقة"
        description="حدد لغتك المفضلة لتصفح الكتب والتوصيات."
        icon={<TranslateIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="language" className="text-foreground text-xs font-semibold">
              اللغة المفضلة
            </Label>
            <Select defaultValue="ar">
              <SelectTrigger id="language" className="bg-muted/30 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {[
                  { value: "ar", label: "🇸🇦 العربية" },
                  { value: "en", label: "🇬🇧 الإنجليزية" },
                  { value: "fr", label: "🇫🇷 الفرنسية" },
                  { value: "es", label: "🇪🇸 الإسبانية" },
                  { value: "de", label: "🇩🇪 الألمانية" },
                ].map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <SettingRow label="عرض العناوين الأصلية" description="عرض عناوين الكتب بلغتها الأصلية">
            <Switch defaultChecked />
          </SettingRow>
        </div>
      </SettingCard>

      {/* AI Recommendations */}
      <SettingCard
        title="توصيات الذكاء الاصطناعي"
        description="اقتراحات كتب مخصصة مدعومة بالذكاء الاصطناعي."
        icon={<SparkleIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="from-primary/10 ring-primary/20 flex items-center justify-between rounded-xl bg-gradient-to-l to-violet-500/10 px-4 py-4 ring-1">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <SparkleIcon className="text-primary h-5 w-5" weight="fill" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">توصيات ذكية بالذكاء الاصطناعي</p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                اقتراحات مخصصة بناءً على تاريخ قراءتك وذوقك
              </p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>
      </SettingCard>
    </SectionWrapper>
  );
}
