import {
	BellRingingIcon,
	BookOpenIcon,
	DatabaseIcon,
	EyeIcon,
	InfoIcon,
	LockIcon,
	PaintBrushIcon,
	PlugsIcon,
	ShieldCheckIcon,
	UserIcon,
	UsersIcon,
	XIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar";
import { Button } from "@shadcn/button";
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

interface SettingsSidebarProps {
	activeSection: SettingsSection;
	onSectionChange: (section: SettingsSection) => void;
}

const sidebarSections = [
	{
		title: "الحساب",
		items: [
			{ id: "profile" as const, label: "الملف الشخصي", icon: UserIcon },
			{ id: "account" as const, label: "الحساب والأمان", icon: LockIcon },
			{ id: "notifications" as const, label: "الإشعارات", icon: BellRingingIcon },
			{ id: "privacy" as const, label: "الخصوصية", icon: EyeIcon },
		],
	},
	{
		title: "التفضيلات",
		items: [
			{ id: "reading" as const, label: "القراءة", icon: BookOpenIcon },
			{ id: "appearance" as const, label: "المظهر", icon: PaintBrushIcon },
		],
	},
	{
		title: "الاتصالات",
		items: [
			{ id: "social" as const, label: "الأصدقاء والتواصل", icon: UsersIcon },
			{ id: "integrations" as const, label: "التكاملات", icon: PlugsIcon },
		],
	},
	{
		title: "البيانات",
		items: [
			{ id: "data" as const, label: "البيانات والتصدير", icon: DatabaseIcon },
		],
	},
];

export function SettingsSidebar({
	activeSection,
	onSectionChange,
}: SettingsSidebarProps) {
	return (
		<aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-s border-border bg-sidebar lg:block">
			<div className="flex h-full flex-col overflow-y-auto">
				{sidebarSections.map((section, sectionIndex) => (
					<div
						key={section.title}
						className={cn(sectionIndex === 0 ? "pt-3" : "pt-4")}
					>
						<div className="px-4 pb-1.5">
							<span className="text-xs font-medium text-muted-foreground">
								{section.title}
							</span>
						</div>
						<nav className="space-y-0.5 px-2">
							{sectionIndex === 0 && section.title === "الحساب" && (
								<button
									type="button"
									onClick={() => onSectionChange("profile")}
									className={cn(
										"group flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-right transition-colors",
										activeSection === "profile"
											? "bg-sidebar-accent text-sidebar-foreground"
											: "text-sidebar-foreground/80 hover:bg-sidebar-accent/50",
									)}
								>
									<Avatar className="h-6 w-6">
										<AvatarImage src="/avatar.jpg" alt="المستخدم" />
										<AvatarFallback className="bg-emerald-600 text-[10px] text-white">
											أح
										</AvatarFallback>
									</Avatar>
									<span className="text-sm">أحمد محمد</span>
								</button>
							)}
							{section.items.map((item) => {
								if (sectionIndex === 0 && item.id === "profile") return null;
								const Icon = item.icon;
								const isActive = activeSection === item.id;

								return (
									<button
										type="button"
										key={item.id}
										onClick={() => onSectionChange(item.id)}
										className={cn(
											"group flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-right transition-colors",
											isActive
												? "bg-sidebar-accent text-sidebar-foreground"
												: "text-sidebar-foreground/80 hover:bg-sidebar-accent/50",
										)}
									>
										<Icon
											className="h-[18px] w-[18px] shrink-0 text-muted-foreground"
											weight={isActive ? "fill" : "regular"}
										/>
										<span className="text-sm">{item.label}</span>
									</button>
								);
							})}
						</nav>
					</div>
				))}

				<div className="mt-auto p-3">
					<div className="relative rounded-lg border border-border bg-sidebar-accent/50 p-3">
						<button
							type="button"
							className="absolute left-2 top-2 text-muted-foreground hover:text-foreground"
						>
							<XIcon className="h-3.5 w-3.5" />
						</button>
						<div className="flex items-start gap-2">
							<ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
							<div className="ps-4">
								<p className="text-sm font-medium text-sidebar-foreground">
									فعّل المصادقة الثنائية
								</p>
								<p className="mt-0.5 text-xs text-muted-foreground">
									قم بإعداد المصادقة الثنائية لتسجيل دخول أكثر أماناً.
								</p>
							</div>
						</div>
						<Button
							size="sm"
							className="mt-3 w-full bg-emerald-600 text-white hover:bg-emerald-700"
						>
							تفعيل المصادقة الثنائية
						</Button>
						<button type="button" className="mt-2 flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
							<InfoIcon className="h-3 w-3" />
							معرفة المزيد
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
}
