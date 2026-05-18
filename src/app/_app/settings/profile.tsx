import {
  CameraIcon,
  CheckIcon,
  GoodreadsLogoIcon,
  InstagramLogoIcon,
  LinkIcon,
  MapPinIcon,
  PencilSimpleIcon,
  TwitterLogoIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Textarea } from "@shadcn/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionWrapper, SettingCard } from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/profile")({
  component: ProfileSection,
});

const allGenres = [
  "خيال",
  "أدب تاريخي",
  "غموض",
  "خيال علمي",
  "أدب روائي",
  "رومانسية",
  "إثارة",
  "غير خيالي",
  "سيرة ذاتية",
  "تطوير الذات",
  "فلسفة",
  "تاريخ",
];

function ProfileSection() {
  const [displayName, setDisplayName] = useState("أحمد محمد");
  const [username, setUsername] = useState("ahmed_reads");
  const [bio, setBio] = useState(
    "قارئ نهم، محب للقهوة، وكاتب طموح. أستكشف حالياً عوالم الخيال والأدب التاريخي.",
  );
  const [location, setLocation] = useState("الرياض، السعودية");
  const [website, setWebsite] = useState("https://ahmedreads.blog");
  const [selectedGenres, setSelectedGenres] = useState(["خيال", "أدب تاريخي", "غموض"]);
  const [saved, setSaved] = useState(false);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 5) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrapper
      title="الملف الشخصي"
      description="إدارة معلوماتك العامة المرئية للقراء الآخرين في المجتمع."
    >
      {/* Avatar Card */}
      <SettingCard
        title="الصورة الشخصية"
        description="ستظهر هذه الصورة في ملفك الشخصي ومراجعاتك."
        icon={<UserIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <Avatar className="h-20 w-20 ring-4 ring-border/50">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" />
              <AvatarFallback className="bg-emerald-600 text-xl font-bold text-white">
                أح
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-2 ring-background transition-transform hover:scale-110"
            >
              <CameraIcon className="h-3.5 w-3.5" weight="fill" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">أحمد محمد</p>
            <p className="mt-0.5 text-xs text-muted-foreground">@ahmed_reads</p>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" size="sm" className="h-8 text-xs">
                <PencilSimpleIcon className="me-1.5 h-3.5 w-3.5" />
                رفع صورة
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-muted-foreground hover:text-destructive"
              >
                إزالة
              </Button>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              PNG أو JPG • 400×400 بكسل على الأقل
            </p>
          </div>
        </div>
      </SettingCard>

      {/* Basic Info */}
      <SettingCard
        title="المعلومات الأساسية"
        icon={<PencilSimpleIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="displayName" className="text-xs font-semibold text-foreground">
              الاسم المعروض
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="h-9 bg-muted/30 text-sm"
              placeholder="اسمك الكامل"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="username" className="text-xs font-semibold text-foreground">
              اسم المستخدم
            </Label>
            <div className="flex items-center overflow-hidden rounded-md border border-input">
              <span className="flex h-9 items-center border-e border-input bg-muted px-3 text-xs text-muted-foreground">
                مكتبتي.app/
              </span>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-9 flex-1 bg-muted/30 px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="ahmed_reads"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">رابطك الفريد: مكتبتي.app/{username}</p>
          </div>

          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="bio" className="text-xs font-semibold text-foreground">
                نبذة عني
              </Label>
              <span
                className={`text-[11px] ${bio.length > 280 ? "text-destructive" : "text-muted-foreground"}`}
              >
                {bio.length}/300
              </span>
            </div>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-20 resize-none bg-muted/30 text-sm leading-relaxed"
              placeholder="أخبر القراء الآخرين عن نفسك وعن أذواقك في القراءة..."
              maxLength={300}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="location" className="text-xs font-semibold text-foreground">
              الموقع
            </Label>
            <div className="relative">
              <MapPinIcon className="absolute inset-e-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="المدينة، البلد"
                className="h-9 bg-muted/30 pe-9 text-sm"
              />
            </div>
          </div>
        </div>
      </SettingCard>

      {/* Favorite Genres */}
      <SettingCard
        title="الأنواع المفضلة"
        description={`اختر حتى 5 أنواع • المحدد: ${selectedGenres.length}/5`}
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
                className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : isDisabled
                      ? "cursor-not-allowed border border-border/40 text-muted-foreground/40"
                      : "border border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary"
                }`}
              >
                {isSelected && <CheckIcon className="h-3 w-3" weight="bold" />}
                {genre}
              </button>
            );
          })}
        </div>
      </SettingCard>

      {/* Social Links */}
      <SettingCard
        title="روابط التواصل الاجتماعي"
        description="اربط حساباتك الاجتماعية لتُعرَض في ملفك."
        icon={<LinkIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="grid gap-3">
          {[
            {
              icon: <LinkIcon className="h-4 w-4" />,
              placeholder: "https://موقعك.com",
              value: website,
              onChange: (v: string) => setWebsite(v),
              label: "الموقع الشخصي",
            },
            {
              icon: <TwitterLogoIcon className="h-4 w-4" weight="fill" />,
              placeholder: "@اسم_المستخدم",
              label: "تويتر / X",
            },
            {
              icon: <InstagramLogoIcon className="h-4 w-4" weight="fill" />,
              placeholder: "@اسم_المستخدم",
              label: "إنستغرام",
            },
            {
              icon: <GoodreadsLogoIcon className="h-4 w-4" weight="fill" />,
              placeholder: "رابط ملفك في Goodreads",
              label: "Goodreads",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[11px] font-medium text-muted-foreground">{item.label}</p>
                <Input
                  value={item.value ?? ""}
                  onChange={(e) => item.onChange?.(e.target.value)}
                  placeholder={item.placeholder}
                  className="h-8 bg-muted/30 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </SettingCard>

      {/* Save Actions */}
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
        <p className="text-xs text-muted-foreground">التغييرات ستظهر فوراً في ملفك الشخصي</p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
            إلغاء
          </Button>
          <Button
            size="sm"
            className={`h-8 min-w-24 text-xs transition-all ${saved ? "bg-emerald-600 hover:bg-emerald-600" : "bg-primary"}`}
            onClick={handleSave}
          >
            {saved ? (
              <span className="flex items-center gap-1.5">
                <CheckIcon className="h-3.5 w-3.5" weight="bold" />
                تم الحفظ
              </span>
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
