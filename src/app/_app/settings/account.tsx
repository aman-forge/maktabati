import { createFileRoute } from "@tanstack/react-router";
import {
	AppleLogoIcon,
	CheckCircleIcon,
	DeviceMobileIcon,
	EnvelopeIcon,
	GoogleLogoIcon,
	KeyIcon,
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
import { useState } from "react";
import { SectionWrapper, SettingCard, SettingRow } from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/account")({
	component: AccountPage,
});


export function AccountPage() {
	const [email, setEmail] = useState("ahmed@example.com");
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

	return (
		<SectionWrapper
			title="الحساب"
			description="إدارة أمان حسابك وإعدادات المصادقة."
		>
			<SettingCard
				title="البريد الإلكتروني"
				description="بريدك الإلكتروني الأساسي للإشعارات واستعادة الحساب."
				action={
					<Badge
						variant="outline"
						className="gap-1 border-primary/30 text-primary"
					>
						<CheckCircleIcon className="h-3 w-3" weight="fill" />
						موثق
					</Badge>
				}
			>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
						<EnvelopeIcon className="h-5 w-5 text-muted-foreground" />
					</div>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="flex-1 bg-secondary text-foreground"
					/>
					<Button variant="secondary" size="sm">
						تغيير
					</Button>
				</div>
			</SettingCard>

			<SettingCard
				title="كلمة المرور"
				description="قم بتغيير كلمة المرور بانتظام لأمان أفضل."
			>
				<div className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="current" className="text-foreground">
							كلمة المرور الحالية
						</Label>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
								<KeyIcon className="h-5 w-5 text-muted-foreground" />
							</div>
							<Input
								id="current"
								type="password"
								placeholder="أدخل كلمة المرور الحالية"
								className="flex-1 bg-secondary text-foreground"
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="new" className="text-foreground">
							كلمة المرور الجديدة
						</Label>
						<Input
							id="new"
							type="password"
							placeholder="أدخل كلمة المرور الجديدة"
							className="bg-secondary text-foreground"
						/>
						<p className="text-xs text-muted-foreground">
							8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام
						</p>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="confirm" className="text-foreground">
							تأكيد كلمة المرور الجديدة
						</Label>
						<Input
							id="confirm"
							type="password"
							placeholder="تأكيد كلمة المرور الجديدة"
							className="bg-secondary text-foreground"
						/>
					</div>
					<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
						تحديث كلمة المرور
					</Button>
				</div>
			</SettingCard>

			<SettingCard
				title="المصادقة الثنائية"
				description="أضف طبقة أمان إضافية لحسابك."
			>
				<div className="space-y-4">
					<SettingRow
						label="تفعيل المصادقة الثنائية"
						description="استخدم تطبيق المصادقة للتحقق عند تسجيل الدخول"
					>
						<Switch
							checked={twoFactorEnabled}
							onCheckedChange={setTwoFactorEnabled}
						/>
					</SettingRow>
					{twoFactorEnabled && (
						<div className="flex items-center gap-3 rounded-lg bg-primary/10 p-3">
							<ShieldCheckIcon className="h-5 w-5 text-primary" weight="fill" />
							<p className="text-sm text-primary">المصادقة الثنائية مفعلة</p>
						</div>
					)}
					<SettingRow
						label="رموز الاستعادة"
						description="تنزيل رموز احتياطية لاستعادة الحساب"
					>
						<Button variant="secondary" size="sm" disabled={!twoFactorEnabled}>
							إنشاء الرموز
						</Button>
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="الحسابات المتصلة"
				description="تسجيل الدخول بحساباتك الاجتماعية."
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between rounded-lg border border-border p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
								<GoogleLogoIcon
									className="h-5 w-5 text-foreground"
									weight="bold"
								/>
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Google</p>
								<p className="text-xs text-muted-foreground">ahmed@gmail.com</p>
							</div>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive"
						>
							قطع الاتصال
						</Button>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
								<AppleLogoIcon
									className="h-5 w-5 text-foreground"
									weight="fill"
								/>
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">Apple</p>
								<p className="text-xs text-muted-foreground">غير متصل</p>
							</div>
						</div>
						<Button variant="secondary" size="sm">
							اتصال
						</Button>
					</div>
				</div>
			</SettingCard>

			<SettingCard
				title="الجلسات النشطة"
				description="إدارة الأجهزة التي سجلت الدخول منها."
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
								<DeviceMobileIcon className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">
									MacBook Pro • الرياض
								</p>
								<p className="text-xs text-muted-foreground">
									الجلسة الحالية • نشط الآن
								</p>
							</div>
						</div>
						<Badge className="bg-primary/20 text-primary">الحالي</Badge>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
								<DeviceMobileIcon className="h-5 w-5 text-muted-foreground" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">
									iPhone 15 Pro • الرياض
								</p>
								<p className="text-xs text-muted-foreground">
									آخر نشاط منذ ساعتين
								</p>
							</div>
						</div>
						<Button variant="ghost" size="sm" className="text-muted-foreground">
							<SignOutIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
				<Button
					variant="ghost"
					className="mt-4 w-full text-destructive hover:text-destructive"
				>
					تسجيل الخروج من جميع الأجهزة
				</Button>
			</SettingCard>

			<SettingCard
				title="منطقة الخطر"
				description="إجراءات لا رجعة فيها ومدمرة."
				className="border-destructive/30"
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
							<WarningIcon className="h-5 w-5 text-destructive" weight="fill" />
						</div>
						<div>
							<p className="text-sm font-medium text-foreground">حذف الحساب</p>
							<p className="text-xs text-muted-foreground">
								حذف حسابك وجميع بياناتك نهائياً
							</p>
						</div>
					</div>
					<Dialog>
						<DialogTrigger
							render={
								<Button variant="destructive" size="sm">
									حذف الحساب
								</Button>
							}
						/>

						<DialogContent className="bg-card">
							<DialogHeader>
								<DialogTitle className="text-card-foreground">
									هل أنت متأكد تماماً؟
								</DialogTitle>
								<DialogDescription>
									لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائياً
									وإزالة جميع بياناتك بما في ذلك المراجعات وقوائم القراءة
									والاتصالات الاجتماعية.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="flex-row-reverse gap-2">
								<Button variant="ghost" className="text-muted-foreground">
									إلغاء
								</Button>
								<Button variant="destructive">حذف الحساب</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</SettingCard>
		</SectionWrapper>
	);
}
