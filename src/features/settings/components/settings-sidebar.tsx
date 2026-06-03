import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/components/ui/sidebar";
import { cn } from "@/ui/lib/utils";
import {
  ArrowLeftIcon,
  BellRingingIcon,
  BookOpenIcon,
  DatabaseIcon,
  EyeIcon,
  GearSixIcon,
  LockIcon,
  PaintBrushIcon,
  PlugsIcon,
  SignOutIcon,
  UserIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Link, useMatchRoute } from "@tanstack/react-router";

const sidebarSections = [
  {
    title: "الحساب الشخصي",
    items: [
      {
        id: "profile" as const,
        label: "الملف الشخصي",
        description: "معلوماتك العامة",
        icon: UserIcon,
      },
      {
        id: "account" as const,
        label: "الحساب والأمان",
        description: "كلمة المرور والمصادقة",
        icon: LockIcon,
      },
      {
        id: "notifications" as const,
        label: "الإشعارات",
        description: "إدارة التنبيهات",
        icon: BellRingingIcon,
      },
      {
        id: "privacy" as const,
        label: "الخصوصية",
        description: "التحكم في بياناتك",
        icon: EyeIcon,
      },
    ],
  },
  {
    title: "التفضيلات",
    items: [
      {
        id: "readingPreferences" as const,
        label: "القراءة",
        description: "عادات وأهداف القراءة",
        icon: BookOpenIcon,
      },
      {
        id: "appearance" as const,
        label: "المظهر",
        description: "الثيمات والألوان",
        icon: PaintBrushIcon,
      },
    ],
  },
  {
    title: "الاتصالات والتكاملات",
    items: [
      {
        id: "social" as const,
        label: "الأصدقاء والتواصل",
        description: "إعدادات المجتمع",
        icon: UsersIcon,
      },
      {
        id: "integrations" as const,
        label: "التكاملات",
        description: "الخدمات الخارجية",
        icon: PlugsIcon,
      },
    ],
  },
  {
    title: "البيانات",
    items: [
      {
        id: "data" as const,
        label: "البيانات والتصدير",
        description: "تصدير وإدارة بياناتك",
        icon: DatabaseIcon,
      },
    ],
  },
];

export function SettingsSidebar() {
  const matchRoute = useMatchRoute();

  return (
    <Sidebar dir="rtl" side="right" variant="floating" className="pt-16 ">
      {/* ── Header ── */}
      <SidebarHeader className="px-4 py-3 border-b border-sidebar-border/40">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
            <GearSixIcon className="h-4 w-4 text-primary" weight="duotone" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight select-none text-foreground">
            الإعدادات
          </span>
        </div>
      </SidebarHeader>

      {/* ── Nav sections ── */}
      <SidebarContent className="py-0 overflow-hidden">
        {sidebarSections.map((section, index) => (
          <SidebarGroup key={index} className="px-2 py-0.5">
            <SidebarGroupLabel className="px-2 mb-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50 select-none">
              {section.title}
            </SidebarGroupLabel>

            <SidebarMenu className="gap-0.5">
              {section.items.map((item) => {
                const routePath = `/settings/${item.id}`;
                const isActive = !!matchRoute({ to: routePath });
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        "group h-auto py-2 px-2.5 rounded-lg transition-all duration-150 select-none",
                        isActive
                          ? "bg-primary/8  border border-primary text-foreground"
                          : "hover:bg-accent/50 text-muted-foreground hover:text-foreground  border-transparent",
                      )}
                      render={
                        <Link to={routePath} className="flex items-center gap-3 w-full">
                          {/* Icon container */}
                          <div
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-colors duration-150",
                              isActive
                                ? "bg-primary/15 text-primary"
                                : "bg-muted/60 text-muted-foreground group-hover:bg-accent group-hover:text-foreground",
                            )}
                          >
                            <Icon className="h-4 w-4" weight={isActive ? "fill" : "regular"} />
                          </div>

                          {/* Label + description */}
                          <div className="flex flex-col min-w-0 text-right">
                            <span
                              className={cn(
                                "text-[13.5px] font-medium leading-tight truncate",
                                isActive ? "text-foreground" : "text-foreground/80",
                              )}
                            >
                              {item.label}
                            </span>
                            <span className="text-[11px] text-muted-foreground/60 leading-tight mt-0.5 truncate">
                              {item.description}
                            </span>
                          </div>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            {/* Section divider — skip after last section */}
            {index < sidebarSections.length - 1 && (
              <div className="mt-2 border-b border-sidebar-border/30" />
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="border-t border-sidebar-border/40 px-3 py-3 flex flex-col gap-1">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-150 select-none"
        >
          <ArrowLeftIcon className="h-4 w-4 shrink-0" />
          <span className="text-[13px]">العودة للتطبيق</span>
        </Link>

        <button className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-colors duration-150 w-full text-right select-none">
          <SignOutIcon className="h-4 w-4 shrink-0" />
          <span className="text-[13px]">تسجيل الخروج</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
