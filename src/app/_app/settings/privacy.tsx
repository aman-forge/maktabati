import {
  EyeIcon,
  EyeSlashIcon,
  GlobeIcon,
  LockIcon,
  MagnifyingGlassIcon,
  ShieldIcon,
  UserCircleIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Label } from "@shadcn/label";
import { RadioGroup, RadioGroupItem } from "@shadcn/radio-group";
import { Switch } from "@shadcn/switch";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  SectionWrapper,
  SettingCard,
  SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/privacy")({
  component: PrivacySection,
});

const visibilityOptions = [
  {
    value: "public",
    label: "عام",
    desc: "يمكن لأي شخص عرض ملفك ومراجعاتك",
    icon: GlobeIcon,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    value: "friends",
    label: "الأصدقاء فقط",
    desc: "فقط من تتابعهم بالمثل يمكنهم رؤية ملفك",
    icon: UsersIcon,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    value: "private",
    label: "خاص",
    desc: "ملفك الشخصي مخفي عن الجميع",
    icon: LockIcon,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

function PrivacySection() {
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [privacy, setPrivacy] = useState({
    showReadingActivity: true,
    showCurrentlyReading: true,
    showReadingStats: false,
    allowTagging: true,
    showInSearch: true,
    showFollowers: true,
  });

  const toggle = (key: keyof typeof privacy) =>
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SectionWrapper
      title="الخصوصية"
      description="تحكم في من يمكنه رؤية نشاطك ومعلوماتك على مكتبتي."
    >
      {/* Profile Visibility */}
      <SettingCard
        title="ظهور الملف الشخصي"
        description="من يمكنه عرض ملفك الشخصي ونشاطك في القراءة."
        icon={<ShieldIcon className="h-4 w-4" weight="fill" />}
      >
        <RadioGroup
          value={profileVisibility}
          onValueChange={setProfileVisibility}
          className="grid gap-2"
        >
          {visibilityOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = profileVisibility === opt.value;
            return (
              <div key={opt.value}>
                <RadioGroupItem
                  value={opt.value}
                  id={`vis-${opt.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`vis-${opt.value}`}
                  className="bg-muted/20 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-4 rounded-xl border-2 px-4 py-3.5 transition-all duration-150"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isSelected ? opt.bg : "bg-muted"}`}
                  >
                    <Icon
                      className={`h-5 w-5 ${isSelected ? opt.color : "text-muted-foreground"}`}
                      weight="fill"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-sm font-semibold">{opt.label}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">{opt.desc}</p>
                  </div>
                  {isSelected && (
                    <Badge className="bg-primary/15 text-primary border-primary/30 shrink-0 text-[10px]">
                      نشط
                    </Badge>
                  )}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </SettingCard>

      {/* Reading Activity */}
      <SettingCard
        title="نشاط القراءة"
        description="إدارة ما يراه الآخرون عن عادات قراءتك."
        icon={
          privacy.showReadingActivity ? (
            <EyeIcon className="h-4 w-4" weight="fill" />
          ) : (
            <EyeSlashIcon className="h-4 w-4" weight="fill" />
          )
        }
      >
        <div className="divide-border/40 divide-y">
          {[
            {
              key: "showReadingActivity" as const,
              label: "عرض نشاط القراءة",
              desc: "عرض الكتب التي قرأتها وراجعتها",
            },
            {
              key: "showCurrentlyReading" as const,
              label: "عرض القراءة الحالية",
              desc: "السماح للآخرين برؤية ما تقرأه الآن",
            },
            {
              key: "showReadingStats" as const,
              label: "عرض إحصائيات القراءة",
              desc: "عرض سرعة قراءتك وعدد الكتب المنجزة",
            },
          ].map((item) => (
            <SettingRow key={item.key} label={item.label} description={item.desc}>
              <Switch checked={privacy[item.key]} onCheckedChange={() => toggle(item.key)} />
            </SettingRow>
          ))}
        </div>
      </SettingCard>

      {/* Social Privacy */}
      <SettingCard
        title="الخصوصية الاجتماعية"
        description="تحكم في كيفية تفاعل الآخرين معك في المجتمع."
        icon={<UsersIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="divide-border/40 divide-y">
          {[
            {
              key: "allowTagging" as const,
              label: "السماح بالإشارة إليك",
              desc: "السماح للآخرين بذكرك في قوائم القراءة والمراجعات",
              icon: <UserCircleIcon className="text-muted-foreground h-4 w-4" />,
            },
            {
              key: "showInSearch" as const,
              label: "الظهور في البحث",
              desc: "السماح لملفك الشخصي بالظهور في نتائج البحث",
              icon: <MagnifyingGlassIcon className="text-muted-foreground h-4 w-4" />,
            },
            {
              key: "showFollowers" as const,
              label: "عرض قائمة المتابعين",
              desc: "عرض قوائم المتابعين والمتابَعين لأي شخص",
              icon: <UsersIcon className="text-muted-foreground h-4 w-4" />,
            },
          ].map((item) => (
            <SettingRow key={item.key} label={item.label} description={item.desc}>
              <div className="flex items-center gap-3">
                {item.icon}
                <Switch checked={privacy[item.key]} onCheckedChange={() => toggle(item.key)} />
              </div>
            </SettingRow>
          ))}
        </div>
      </SettingCard>

      {/* Blocked Users */}
      <SettingCard
        title="المستخدمون المحظورون"
        description="إدارة قائمة المستخدمين الذين قمت بحظرهم."
        icon={<EyeSlashIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="bg-muted/30 flex items-center justify-between rounded-xl px-4 py-3.5">
          <div>
            <p className="text-muted-foreground text-sm">لم تقم بحظر أي مستخدمين بعد.</p>
          </div>
          <Button variant="secondary" size="sm" className="h-8 text-xs">
            إدارة القائمة
          </Button>
        </div>
      </SettingCard>
    </SectionWrapper>
  );
}
