import {
  AppleLogoIcon,
  CheckCircleIcon,
  DeviceMobileIcon,
  EnvelopeIcon,
  GoogleLogoIcon,
  KeyIcon,
  LockIcon,
  MonitorIcon,
  ShieldCheckIcon,
  SignOutIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcn/dialog";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Switch } from "@shadcn/switch";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  SectionWrapper,
  SettingCard,
  SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/account")({
  component: AccountPage,
});

function AccountPage() {
  const [email, setEmail] = useState("ahmed@example.com");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <SectionWrapper
      title="الحساب والأمان"
      description="إدارة أمان حسابك وإعدادات المصادقة والجلسات النشطة."
    >
      {/* Email */}
      <SettingCard
        title="البريد الإلكتروني"
        description="بريدك الأساسي للإشعارات واستعادة الحساب."
        icon={<EnvelopeIcon className="h-4 w-4" weight="fill" />}
        action={
          <Badge className="gap-1 border-emerald-500/30 bg-emerald-500/15 text-[11px] text-emerald-600 dark:text-emerald-400">
            <CheckCircleIcon className="h-3 w-3" weight="fill" />
            موثق
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted/30 h-9 flex-1 text-sm"
          />
          <Button variant="secondary" size="sm" className="h-9 shrink-0 text-xs">
            تغيير
          </Button>
        </div>
      </SettingCard>

      {/* Password */}
      <SettingCard
        title="كلمة المرور"
        description="قم بتغيير كلمة المرور بانتظام لأمان أفضل."
        icon={<KeyIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="current" className="text-foreground text-xs font-semibold">
              كلمة المرور الحالية
            </Label>
            <Input
              id="current"
              type="password"
              placeholder="••••••••"
              className="bg-muted/30 h-9 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="new" className="text-foreground text-xs font-semibold">
                كلمة المرور الجديدة
              </Label>
              <Input
                id="new"
                type="password"
                placeholder="••••••••"
                className="bg-muted/30 h-9 text-sm"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="confirm" className="text-foreground text-xs font-semibold">
                تأكيد كلمة المرور
              </Label>
              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                className="bg-muted/30 h-9 text-sm"
              />
            </div>
          </div>
          <p className="text-muted-foreground text-[11px]">
            8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام ورموز
          </p>
          <div className="flex justify-end">
            <Button size="sm" className="h-8 text-xs">
              تحديث كلمة المرور
            </Button>
          </div>
        </div>
      </SettingCard>

      {/* 2FA */}
      <SettingCard
        title="المصادقة الثنائية"
        description="أضف طبقة حماية إضافية لحسابك عند تسجيل الدخول."
        icon={<ShieldCheckIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground text-sm font-medium">تفعيل المصادقة الثنائية</p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                استخدم تطبيق المصادقة للتحقق عند كل تسجيل دخول
              </p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3">
              <ShieldCheckIcon className="h-5 w-5 shrink-0 text-emerald-500" weight="fill" />
              <div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  المصادقة الثنائية مفعّلة
                </p>
                <p className="text-muted-foreground text-[11px]">حسابك محمي بطبقة أمان إضافية</p>
              </div>
            </div>
          )}

          <div className="border-border/60 bg-muted/20 divide-border/40 divide-y rounded-xl border">
            <SettingRow
              label="رموز الاستعادة"
              description="رموز احتياطية لاستعادة الحساب في حال فقد جهازك"
              className="px-4"
            >
              <Button
                variant="secondary"
                size="sm"
                disabled={!twoFactorEnabled}
                className="h-7 text-xs"
              >
                إنشاء الرموز
              </Button>
            </SettingRow>
          </div>
        </div>
      </SettingCard>

      {/* Connected Accounts */}
      <SettingCard
        title="الحسابات المتصلة"
        description="تسجيل الدخول السريع عبر حساباتك الأخرى."
        icon={<LockIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="grid gap-2">
          {[
            {
              name: "Google",
              icon: <GoogleLogoIcon className="h-5 w-5" weight="bold" />,
              detail: "ahmed@gmail.com",
              connected: true,
              color: "text-red-500",
            },
            {
              name: "Apple",
              icon: <AppleLogoIcon className="h-5 w-5" weight="fill" />,
              detail: "غير متصل",
              connected: false,
              color: "text-foreground",
            },
          ].map((account) => (
            <div
              key={account.name}
              className="border-border/60 bg-muted/20 flex items-center gap-3 rounded-xl border px-4 py-3"
            >
              <div
                className={`bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${account.color}`}
              >
                {account.icon}
              </div>
              <div className="flex-1">
                <p className="text-foreground text-sm font-medium">{account.name}</p>
                <p className="text-muted-foreground text-[11px]">{account.detail}</p>
              </div>
              {account.connected ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive h-7 text-xs"
                >
                  قطع الاتصال
                </Button>
              ) : (
                <Button variant="secondary" size="sm" className="h-7 text-xs">
                  ربط
                </Button>
              )}
            </div>
          ))}
        </div>
      </SettingCard>

      {/* Active Sessions */}
      <SettingCard
        title="الجلسات النشطة"
        description="الأجهزة التي سجّلت الدخول منها حالياً."
        icon={<MonitorIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="space-y-2">
          {[
            {
              device: "MacBook Pro",
              location: "الرياض، السعودية",
              time: "نشط الآن",
              isCurrent: true,
            },
            {
              device: "iPhone 15 Pro",
              location: "الرياض، السعودية",
              time: "آخر نشاط منذ ساعتين",
              isCurrent: false,
            },
          ].map((session) => (
            <div
              key={session.device}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                session.isCurrent
                  ? "border-primary/30 bg-primary/5"
                  : "border-border/60 bg-muted/20"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${session.isCurrent ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}
              >
                <DeviceMobileIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-foreground text-sm font-medium">
                  {session.device} • {session.location}
                </p>
                <p className="text-muted-foreground text-[11px]">{session.time}</p>
              </div>
              {session.isCurrent ? (
                <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]">
                  الحالي
                </Badge>
              ) : (
                <Button variant="ghost" size="sm" className="text-muted-foreground h-7 w-7 p-0">
                  <SignOutIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive mt-1 w-full text-xs"
          >
            تسجيل الخروج من جميع الأجهزة
          </Button>
        </div>
      </SettingCard>

      {/* Danger Zone */}
      <SettingCard
        title="منطقة الخطر"
        description="إجراءات حساسة لا رجعة فيها — تعامل بحذر."
        className="border-destructive/30"
        icon={<WarningIcon className="text-destructive h-4 w-4" weight="fill" />}
      >
        <div className="bg-destructive/5 flex items-center justify-between rounded-xl px-4 py-3">
          <div>
            <p className="text-foreground text-sm font-semibold">حذف الحساب</p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              حذف حسابك وجميع بياناتك نهائياً بلا رجعة
            </p>
          </div>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="destructive" size="sm" className="h-8 text-xs">
                  حذف الحساب
                </Button>
              }
            />
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">هل أنت متأكد تماماً؟</DialogTitle>
                <DialogDescription>
                  لا يمكن التراجع عن هذا الإجراء. سيُحذف حسابك وجميع بياناتك بما في ذلك المراجعات
                  وقوائم القراءة والاتصالات الاجتماعية.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="ghost" className="text-muted-foreground">
                  إلغاء
                </Button>
                <Button variant="destructive">حذف الحساب نهائياً</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SettingCard>
    </SectionWrapper>
  );
}
