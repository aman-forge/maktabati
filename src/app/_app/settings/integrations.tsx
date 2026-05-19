import {
  ArrowRightIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  DeviceMobileIcon,
  PlugsIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Switch } from "@shadcn/switch";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  SectionWrapper,
  SettingCard,
  SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/integrations")({
  component: IntegrationsSection,
});
function IntegrationsSection() {
  const integrations = [
    {
      name: "كيندل",
      description: "مزامنة مكتبة كيندل وتقدم القراءة",
      icon: "📱",
      connected: true,
      lastSync: "منذ ساعتين",
    },
    {
      name: "أوديبل",
      description: "استيراد مكتبة الكتب الصوتية وسجل الاستماع",
      icon: "🎧",
      connected: true,
      lastSync: "منذ يوم واحد",
    },
    {
      name: "Goodreads",
      description: "استيراد مكتبة Goodreads والمراجعات",
      icon: "📚",
      connected: false,
      lastSync: null,
    },
    {
      name: "Libby",
      description: "مزامنة إعارات المكتبة وقوائم القراءة",
      icon: "📖",
      connected: false,
      lastSync: null,
    },
    {
      name: "Kobo",
      description: "ربط مكتبة قارئ Kobo الإلكتروني",
      icon: "📕",
      connected: false,
      lastSync: null,
    },
    {
      name: "Apple Books",
      description: "استيراد الكتب من مكتبة Apple الخاصة بك",
      icon: "🍎",
      connected: false,
      lastSync: null,
    },
  ];

  const [autoSync, setAutoSync] = useState(true);

  return (
    <SectionWrapper
      title="التكاملات"
      description="ربط الخدمات الخارجية ومزامنة بيانات القراءة الخاصة بك."
    >
      <SettingCard
        title="الخدمات المتصلة"
        description="إدارة منصات القراءة المتصلة الخاصة بك."
        action={
          <Badge variant="outline" className="border-primary/30 text-primary gap-1">
            <PlugsIcon className="h-3 w-3" weight="fill" />2 متصلة
          </Badge>
        }
      >
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                integration.connected
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-secondary/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-card flex h-12 w-12 items-center justify-center rounded-lg text-2xl">
                  {integration.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-foreground text-sm font-medium">{integration.name}</p>
                    {integration.connected ? (
                      <CheckCircleIcon className="text-primary h-4 w-4" weight="fill" />
                    ) : (
                      <XCircleIcon className="text-muted-foreground h-4 w-4" weight="fill" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs">{integration.description}</p>
                  {integration.connected && integration.lastSync && (
                    <p className="text-primary mt-1 text-xs">آخر مزامنة: {integration.lastSync}</p>
                  )}
                </div>
              </div>
              {integration.connected ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    مزامنة الآن
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    فصل
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" size="sm" className="gap-1">
                  اتصال
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </SettingCard>

      <SettingCard title="إعدادات المزامنة" description="تكوين كيفية مزامنة بياناتك.">
        <div className="divide-border divide-y">
          <SettingRow label="مزامنة تلقائية" description="مزامنة الخدمات المتصلة تلقائياً يومياً">
            <div className="flex items-center gap-3">
              <CloudArrowUpIcon className="text-muted-foreground h-5 w-5" />
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
          </SettingRow>
          <SettingRow
            label="مزامنة تقدم القراءة"
            description="الحفاظ على أرقام الصفحات والتقدم متزامناً"
          >
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="استيراد المراجعات" description="جلب المراجعات من المنصات المتصلة">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow
            label="مزامنة ثنائية الاتجاه"
            description="إرسال التغييرات مرة أخرى إلى الخدمات المتصلة"
          >
            <Switch />
          </SettingRow>
        </div>
      </SettingCard>

      <SettingCard
        title="تطبيقات الهاتف"
        description="قم بتنزيل تطبيقاتنا للحصول على أفضل تجربة قراءة."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-border bg-secondary/50 flex items-center gap-3 rounded-lg border p-4">
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg">
              <DeviceMobileIcon className="text-foreground h-5 w-5" weight="fill" />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">تطبيق iOS</p>
              <p className="text-muted-foreground text-xs">آيفون وآيباد</p>
            </div>
            <Button variant="secondary" size="sm">
              تنزيل
            </Button>
          </div>
          <div className="border-border bg-secondary/50 flex items-center gap-3 rounded-lg border p-4">
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg">
              <DeviceMobileIcon className="text-foreground h-5 w-5" weight="fill" />
            </div>
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">تطبيق أندرويد</p>
              <p className="text-muted-foreground text-xs">هاتف وتابلت</p>
            </div>
            <Button variant="secondary" size="sm">
              تنزيل
            </Button>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="وصول API" description="للمطورين والمستخدمين المتقدمين.">
        <div className="space-y-4">
          <div className="bg-secondary flex items-center gap-4 rounded-lg p-4">
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">مفتاح API</p>
              <p className="text-muted-foreground font-mono text-xs">bks_••••••••••••••••</p>
            </div>
            <Button variant="secondary" size="sm">
              كشف
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              إعادة إنشاء
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            استخدم مفتاح API الخاص بك لربط مكتبتي مع تطبيقات أخرى.{" "}
            <a href="/" className="text-primary hover:underline">
              عرض التوثيق
            </a>
          </p>
        </div>
      </SettingCard>
    </SectionWrapper>
  );
}
