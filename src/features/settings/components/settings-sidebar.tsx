import {
  BellRingingIcon,
  BookOpenIcon,
  CaretLeftIcon,
  DatabaseIcon,
  EyeIcon,
  GearIcon,
  LockIcon,
  PaintBrushIcon,
  PlugsIcon,
  ShieldCheckIcon,
  SignOutIcon,
  UserIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar";
import { Button } from "@shadcn/button";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { cn } from "@/ui/lib/utils";

export type SettingsSection =
  | "profile"
  | "account"
  | "notifications"
  | "privacy"
  | "reading"
  | "social"
  | "appearance"
  | "integrations"
  | "data";

const sidebarSections = [
  {
    title: "الحساب الشخصي",
    items: [
      { id: "profile" as const, label: "الملف الشخصي", icon: UserIcon, description: "معلوماتك العامة" },
      { id: "account" as const, label: "الحساب والأمان", icon: LockIcon, description: "كلمة المرور والمصادقة" },
      { id: "notifications" as const, label: "الإشعارات", icon: BellRingingIcon, description: "إدارة التنبيهات" },
      { id: "privacy" as const, label: "الخصوصية", icon: EyeIcon, description: "التحكم في بيانات" },
    ],
  },
  {
    title: "التفضيلات",
    items: [
      { id: "reading" as const, label: "القراءة", icon: BookOpenIcon, description: "عادات القراءة" },
      { id: "appearance" as const, label: "المظهر", icon: PaintBrushIcon, description: "الثيمات والألوان" },
    ],
  },
  {
    title: "الاتصالات والتكاملات",
    items: [
      { id: "social" as const, label: "الأصدقاء والتواصل", icon: UsersIcon, description: "إعدادات المجتمع" },
      { id: "integrations" as const, label: "التكاملات", icon: PlugsIcon, description: "الخدمات الخارجية" },
    ],
  },
  {
    title: "البيانات",
    items: [
      { id: "data" as const, label: "البيانات والتصدير", icon: DatabaseIcon, description: "تصدير وإدارة البيانات" },
    ],
  },
];

export function SettingsSidebar() {
  const matchRoute = useMatchRoute();

  return (
    <aside className="sticky top-0 hidden h-[calc(100vh-64px)] w-72 shrink-0 border-e border-border/60 bg-sidebar lg:flex lg:flex-col">
      {/* Header */}
      <div className="border-b border-border/60 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <GearIcon className="h-4 w-4 text-primary" weight="fill" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">الإعدادات</p>
            <p className="text-xs text-muted-foreground">إدارة حسابك</p>
          </div>
        </div>
      </div>

      {/* User Profile Quick Link */}
      <div className="border-b border-border/60 px-4 py-3">
        <Link
          to="/settings/profile"
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl p-2.5 transition-all duration-150",
            matchRoute({ to: "/settings/profile" })
              ? "bg-primary/10 ring-1 ring-primary/20"
              : "hover:bg-muted/60",
          )}
        >
          <Avatar className="h-9 w-9 ring-2 ring-border">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="المستخدم" />
            <AvatarFallback className="bg-emerald-600 text-xs font-bold text-white">
              أح
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 text-start">
            <p className={cn(
              "truncate text-sm font-semibold transition-colors",
              matchRoute({ to: "/settings/profile" }) ? "text-primary" : "text-foreground"
            )}>
              أحمد محمد
            </p>
            <p className="truncate text-xs text-muted-foreground">ahmed_reads</p>
          </div>
          <CaretLeftIcon className={cn(
            "h-3.5 w-3.5 shrink-0 transition-all",
            matchRoute({ to: "/settings/profile" }) ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"
          )} />
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {sidebarSections.map((section, sectionIndex) => (
          <div key={section.title} className={cn(sectionIndex > 0 && "mt-5")}>
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const routePath = `/settings/${item.id}`;
                const isActive = matchRoute({ to: routePath });

                return (
                  <Link
                    key={item.id}
                    to={routePath}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right transition-all duration-150",
                      isActive
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-sidebar-foreground/80 hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "bg-muted/40 text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                    )}>
                      <Icon
                        className="h-4 w-4"
                        weight={isActive ? "fill" : "regular"}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        "text-sm font-medium leading-none",
                        isActive ? "text-primary" : ""
                      )}>
                        {item.label}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground/70">
                        {item.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer — 2FA Prompt */}
      <div className="border-t border-border/60 p-4">
        <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-4">
          <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-emerald-500/10 blur-xl" />
          <div className="relative">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                <ShieldCheckIcon className="h-4 w-4 text-emerald-500" weight="fill" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">فعّل الحماية الثنائية</p>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  اجعل حسابك أكثر أماناً
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="mt-3 h-7 w-full bg-emerald-600 text-xs text-white hover:bg-emerald-700"
            >
              تفعيل الآن
            </Button>
          </div>
        </div>

        {/* Sign Out */}
        <button
          type="button"
          className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <SignOutIcon className="h-4 w-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
