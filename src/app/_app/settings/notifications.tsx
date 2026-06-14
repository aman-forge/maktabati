import {
  BellIcon,
  BooksIcon,
  ChatCircleIcon,
  DeviceMobileIcon,
  EnvelopeSimpleIcon,
  HeartIcon,
  MegaphoneIcon,
  TrophyIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
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

export const Route = createFileRoute("/_app/settings/notifications")({
  component: NotificationsSection,
});

const digestOptions = [
  { value: "instant", label: "فوري", desc: "على الفور" },
  { value: "daily", label: "يومي", desc: "ملخص يومي" },
  { value: "weekly", label: "أسبوعي", desc: "ملخص أسبوعي" },
  { value: "never", label: "أبداً", desc: "لا بريد" },
];

function NotificationsSection() {
  const [emailDigest, setEmailDigest] = useState("daily");
  const [notifications, setNotifications] = useState({
    newFollower: true,
    bookRecommendation: true,
    reviewComment: true,
    reviewLike: false,
    friendActivity: true,
    readingGoal: true,
    newRelease: true,
    marketing: false,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SectionWrapper
      title="الإشعارات"
      description="اختر كيف ومتى تريد أن يتم إشعارك عن النشاط في المجتمع."
    >
      {/* Email Digest */}
      <SettingCard
        title="ملخص البريد الإلكتروني"
        description="اختر مدى تكرار إرسال ملخص الإشعارات إلى بريدك."
        icon={<EnvelopeSimpleIcon className="h-4 w-4" weight="fill" />}
      >
        <RadioGroup
          value={emailDigest}
          onValueChange={setEmailDigest}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {digestOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={`digest-${option.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`digest-${option.value}`}
                className="bg-muted/30 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 transition-all duration-150"
              >
                <span className="text-foreground peer-data-[state=checked]:text-primary text-sm font-semibold">
                  {option.label}
                </span>
                <span className="text-muted-foreground text-[10px]">{option.desc}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </SettingCard>

      {/* Push Notifications */}
      <SettingCard
        title="الإشعارات الفورية"
        description="تنبيهات تصلك مباشرةً على جهازك."
        icon={<DeviceMobileIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="bg-primary/5 ring-primary/20 flex items-center justify-between rounded-xl px-4 py-3.5 ring-1">
          <div className="flex items-center gap-3">
            <BellIcon className="text-primary h-5 w-5" weight="fill" />
            <div>
              <p className="text-foreground text-sm font-medium">إشعارات هذا الجهاز</p>
              <p className="text-muted-foreground text-[11px]">
                ستتلقى تنبيهات فورية على هذا الجهاز
              </p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>
      </SettingCard>

      {/* Social */}
      <SettingCard
        title="النشاط الاجتماعي"
        description="إشعارات حول تفاعلات المجتمع معك."
        icon={<UserPlusIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="divide-border/40 divide-y">
          {[
            {
              key: "newFollower" as const,
              label: "متابعون جدد",
              desc: "عندما يتابع شخص ما ملفك الشخصي",
              icon: <UserPlusIcon className="h-4 w-4" />,
            },
            {
              key: "reviewComment" as const,
              label: "تعليقات المراجعات",
              desc: "عندما يعلق شخص على مراجعاتك",
              icon: <ChatCircleIcon className="h-4 w-4" />,
            },
            {
              key: "reviewLike" as const,
              label: "إعجابات المراجعات",
              desc: "عندما يُعجب أحد بمراجعاتك",
              icon: <HeartIcon className="h-4 w-4" />,
            },
            {
              key: "friendActivity" as const,
              label: "نشاط الأصدقاء",
              desc: "عندما ينهي أصدقاؤك كتباً أو يكتبون مراجعات",
              icon: <BooksIcon className="h-4 w-4" />,
            },
          ].map((item) => (
            <SettingRow key={item.key} label={item.label} description={item.desc}>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{item.icon}</span>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={() => toggle(item.key)}
                />
              </div>
            </SettingRow>
          ))}
        </div>
      </SettingCard>

      {/* Reading */}
      <SettingCard
        title="نشاط القراءة"
        description="ابقَ على اطلاع برحلة قراءتك وتوصياتك."
        icon={<BooksIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="divide-border/40 divide-y">
          {[
            {
              key: "bookRecommendation" as const,
              label: "توصيات الكتب",
              desc: "اقتراحات مخصصة بناءً على ذوقك",
            },
            {
              key: "readingGoal" as const,
              label: "تقدم هدف القراءة",
              desc: "تحديثات أسبوعية عن تحدي القراءة",
              icon: <TrophyIcon className="h-4 w-4" />,
            },
            {
              key: "newRelease" as const,
              label: "الإصدارات الجديدة",
              desc: "من المؤلفين الذين تتابعهم أو قائمة رغباتك",
            },
          ].map((item) => (
            <SettingRow key={item.key} label={item.label} description={item.desc}>
              <Switch checked={notifications[item.key]} onCheckedChange={() => toggle(item.key)} />
            </SettingRow>
          ))}
        </div>
      </SettingCard>

      {/* Marketing */}
      <SettingCard
        title="التسويق والإعلانات"
        description="المحتوى الترويجي والنشرات الإخبارية من مكتبتي."
        icon={<MegaphoneIcon className="h-4 w-4" weight="fill" />}
      >
        <SettingRow label="رسائل التسويق" description="أخبار وتحديثات وعروض خاصة من مكتبتي">
          <Switch checked={notifications.marketing} onCheckedChange={() => toggle("marketing")} />
        </SettingRow>
      </SettingCard>
    </SectionWrapper>
  );
}
