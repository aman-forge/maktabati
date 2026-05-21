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
  BellRingingIcon,
  BookOpenIcon,
  DatabaseIcon,
  EyeIcon,
  GearIcon,
  LockIcon,
  PaintBrushIcon,
  PlugsIcon,
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
        icon: UserIcon,
        description: "معلوماتك العامة",
      },
      {
        id: "account" as const,
        label: "الحساب والأمان",
        icon: LockIcon,
        description: "كلمة المرور والمصادقة",
      },
      {
        id: "notifications" as const,
        label: "الإشعارات",
        icon: BellRingingIcon,
        description: "إدارة التنبيهات",
      },
      { id: "privacy" as const, label: "الخصوصية", icon: EyeIcon, description: "التحكم في بيانات" },
    ],
  },
  {
    title: "التفضيلات",
    items: [
      {
        id: "readingPreferences" as const,
        label: "القراءة",
        icon: BookOpenIcon,
        description: "عادات القراءة",
      },
      {
        id: "appearance" as const,
        label: "المظهر",
        icon: PaintBrushIcon,
        description: "الثيمات والألوان",
      },
    ],
  },
  {
    title: "الاتصالات والتكاملات",
    items: [
      {
        id: "social" as const,
        label: "الأصدقاء والتواصل",
        icon: UsersIcon,
        description: "إعدادات المجتمع",
      },
      {
        id: "integrations" as const,
        label: "التكاملات",
        icon: PlugsIcon,
        description: "الخدمات الخارجية",
      },
    ],
  },
  {
    title: "البيانات",
    items: [
      {
        id: "data" as const,
        label: "البيانات والتصدير",
        icon: DatabaseIcon,
        description: "تصدير وإدارة البيانات",
      },
    ],
  },
];

export function SettingsSidebar() {
  const matchRoute = useMatchRoute();
  return (
    <Sidebar dir="rtl" side="right" variant="floating" className="pt-16">
      <SidebarHeader className="flex flex-row items-center gap-2 px-4 py-3 border-b border-sidebar-border/50">
        <GearIcon className="h-5 w-5 text-muted-foreground" />

        <SidebarGroupLabel className="text-base px-0.5 font-semibold tracking-tight select-none">
          الإعدادات
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        {sidebarSections.map((s, index) => {
          return (
            <>
              <SidebarGroup key={index}>
                <SidebarGroupLabel className=" text-muted-foreground/70">
                  {s.title}
                </SidebarGroupLabel>
                <SidebarMenu>
                  {s.items.map((i) => {
                    const routePath = `/settings/${i.id}`;
                    const isActive = !!matchRoute({ to: routePath });
                    const Icon = i.icon;
                    return (
                      <SidebarMenuItem className="py-0" key={i.id}>
                        <SidebarMenuButton
                          isActive={isActive}
                          className={cn(
                            " transition-colors duration-200 select-none ",
                            isActive
                              ? "border border-primary"
                              : " hover:bg-accent/40 hover:text-foreground",
                          )}
                          render={
                            <Link className=" " to={routePath}>
                              <Icon className="h-4 w-4" weight={isActive ? "fill" : "regular"} />
                              <span>{i.label}</span>
                            </Link>
                          }
                        />
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            </>
          );
        })}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
