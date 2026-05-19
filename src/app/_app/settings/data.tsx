import {
	ArrowClockwiseIcon,
	CheckCircleIcon,
	ClockIcon,
	DownloadSimpleIcon,
	FileTextIcon,
	FileZipIcon,
	TrashIcon,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";
import { Switch } from "@shadcn/switch";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
	SectionWrapper,
	SettingCard,
	SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/data")({
	component: DataSection,
});

function DataSection() {
	const [exportFormat, setExportFormat] = useState("json");

	const dataStats = {
		books: 347,
		reviews: 89,
		lists: 12,
		notes: 234,
		totalSize: "24.5 MB",
	};

	return (
		<SectionWrapper
			title="البيانات والتصدير"
			description="إدارة بياناتك، وتصديرها، وحذف الحساب."
		>
			<SettingCard
				title="نظرة عامة على بياناتك"
				description="ملخص لجميع بيانات مكتبتي."
			>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
					<div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
						<p className="text-2xl font-bold text-foreground">
							{dataStats.books}
						</p>
						<p className="text-xs text-muted-foreground">الكتب</p>
					</div>
					<div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
						<p className="text-2xl font-bold text-foreground">
							{dataStats.reviews}
						</p>
						<p className="text-xs text-muted-foreground">المراجعات</p>
					</div>
					<div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
						<p className="text-2xl font-bold text-foreground">
							{dataStats.lists}
						</p>
						<p className="text-xs text-muted-foreground">القوائم</p>
					</div>
					<div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
						<p className="text-2xl font-bold text-foreground">
							{dataStats.notes}
						</p>
						<p className="text-xs text-muted-foreground">الملاحظات</p>
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between rounded-lg bg-secondary p-4">
					<div>
						<p className="text-sm font-medium text-foreground">
							إجمالي حجم البيانات
						</p>
						<p className="text-xs text-muted-foreground">
							جميع كتبك ومراجعاتك ونشاطك
						</p>
					</div>
					<Badge variant="outline" className="border-border text-foreground">
						{dataStats.totalSize}
					</Badge>
				</div>
			</SettingCard>

			<SettingCard
				title="تصدير البيانات"
				description="تنزيل نسخة من جميع بياناتك."
			>
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<div className="flex-1">
							<label
								htmlFor="export-format"
								className="text-sm font-medium text-foreground"
							>
								صيغة التصدير
							</label>
							<Select
								value={exportFormat}
								onValueChange={(val) => setExportFormat(val as string)}
							>
								<SelectTrigger
									id="export-format"
									className="mt-2 bg-secondary text-foreground"
								>
									<SelectValue />
								</SelectTrigger>
								<SelectContent className="bg-popover">
									<SelectItem value="json">
										<div className="flex items-center gap-2">
											<FileTextIcon className="h-4 w-4 text-popover-foreground" />
											<span className="text-popover-foreground">
												JSON (موصى به)
											</span>
										</div>
									</SelectItem>
									<SelectItem value="csv">
										<div className="flex items-center gap-2">
											<FileTextIcon className="h-4 w-4 text-popover-foreground" />
											<span className="text-popover-foreground">CSV</span>
										</div>
									</SelectItem>
									<SelectItem value="zip">
										<div className="flex items-center gap-2">
											<FileZipIcon className="h-4 w-4 text-popover-foreground" />
											<span className="text-popover-foreground">
												أرشيف ZIP
											</span>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="space-y-2">
						<p className="text-sm font-medium text-foreground">
							تضمين في التصدير:
						</p>
						<div className="space-y-2">
							<SettingRow
								label="سجل القراءة"
								description="جميع الكتب التي قرأتها"
							>
								<Switch defaultChecked />
							</SettingRow>
							<SettingRow
								label="المراجعات والتقييمات"
								description="مراجعات الكتب الخاصة بك"
							>
								<Switch defaultChecked />
							</SettingRow>
							<SettingRow
								label="قوائم القراءة"
								description="القوائم المخصصة التي أنشأتها"
							>
								<Switch defaultChecked />
							</SettingRow>
							<SettingRow
								label="الملاحظات والتمييزات"
								description="تعليقات الكتب"
							>
								<Switch defaultChecked />
							</SettingRow>
							<SettingRow
								label="التواصل الاجتماعي"
								description="المتابعون ومن تتابعهم"
							>
								<Switch />
							</SettingRow>
						</div>
					</div>

					<Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
						<DownloadSimpleIcon className="h-5 w-5" />
						تصدير بياناتي
					</Button>
				</div>
			</SettingCard>

			<SettingCard
				title="عمليات التصدير السابقة"
				description="تنزيل عمليات تصدير البيانات السابقة."
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
								<FileZipIcon className="h-5 w-5 text-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">
									bookshelf_export_dec_2024.zip
								</p>
								<p className="text-xs text-muted-foreground">
									<ClockIcon className="mr-1 inline h-3 w-3" />
									تم الإنشاء في 1 ديسمبر 2024 • 18.2 MB
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Badge className="gap-1 bg-primary/20 text-primary">
								<CheckCircleIcon className="h-3 w-3" weight="fill" />
								جاهز
							</Badge>
							<Button variant="ghost" size="sm" className="text-primary">
								<DownloadSimpleIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
								<FileZipIcon className="h-5 w-5 text-muted-foreground" />
							</div>
							<div>
								<p className="text-sm font-medium text-foreground">
									bookshelf_export_nov_2024.zip
								</p>
								<p className="text-xs text-muted-foreground">
									<ClockIcon className="mr-1 inline h-3 w-3" />
									تم الإنشاء في 15 نوفمبر 2024 • 16.8 MB
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								className="border-border text-muted-foreground"
							>
								منتهي الصلاحية
							</Badge>
							<Button
								variant="ghost"
								size="sm"
								disabled
								className="text-muted-foreground"
							>
								<DownloadSimpleIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
				<p className="mt-3 text-xs text-muted-foreground">
					ملفات التصدير متاحة لمدة 30 يومًا بعد إنشائها.
				</p>
			</SettingCard>

			<SettingCard
				title="استيراد البيانات"
				description="استيراد البيانات من منصات أخرى."
			>
				<div className="space-y-4">
					<div className="rounded-lg border-2 border-dashed border-border bg-secondary/30 p-8 text-center">
						<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
							<ArrowClockwiseIcon className="h-6 w-6 text-muted-foreground" />
						</div>
						<p className="text-sm font-medium text-foreground">
							أفلت ملف التصدير هنا
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							يدعم JSON و CSV من Goodreads و LibraryThing والمزيد
						</p>
						<Button variant="secondary" size="sm" className="mt-4">
							اختر ملفاً
						</Button>
					</div>
				</div>
			</SettingCard>

			<SettingCard
				title="مسح البيانات"
				description="إزالة أنواع معينة من البيانات من حسابك."
				className="border-destructive/30"
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div>
							<p className="text-sm font-medium text-foreground">
								مسح سجل القراءة
							</p>
							<p className="text-xs text-muted-foreground">
								إزالة جميع الكتب المحددة كمقروءة
							</p>
						</div>
						<Dialog>
							<DialogTrigger
								render={
									<Button
										variant="ghost"
										size="sm"
										className="text-destructive hover:text-destructive"
									>
										مسح
									</Button>
								}
							/>

							<DialogContent className="bg-card">
								<DialogHeader>
									<DialogTitle className="text-card-foreground">
										مسح سجل القراءة؟
									</DialogTitle>
									<DialogDescription>
										سيؤدي هذا إلى إزالة جميع الكتب من سجل القراءة الخاص بك. سيتم
										الحفاظ على مراجعاتك وتقييماتك.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button variant="ghost" className="text-muted-foreground">
										إلغاء
									</Button>
									<Button variant="destructive">مسح السجل</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div>
							<p className="text-sm font-medium text-foreground">
								مسح جميع المراجعات
							</p>
							<p className="text-xs text-muted-foreground">
								حذف جميع مراجعاتك وتقييماتك
							</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive"
						>
							مسح
						</Button>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
						<div>
							<p className="text-sm font-medium text-foreground">
								مسح الملاحظات والتمييزات
							</p>
							<p className="text-xs text-muted-foreground">
								إزالة جميع تعليقات الكتب الخاصة بك
							</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive"
						>
							مسح
						</Button>
					</div>
				</div>
			</SettingCard>

			<SettingCard
				title="حذف كل شيء"
				description="حذف حسابك بالكامل نهائياً."
				className="border-destructive/30"
			>
				<div className="flex items-center gap-4 rounded-lg bg-destructive/10 p-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
						<WarningIcon className="h-6 w-6 text-destructive" weight="fill" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium text-foreground">
							هذا الإجراء لا يمكن التراجع عنه
						</p>
						<p className="text-xs text-muted-foreground">
							سيتم حذف جميع بياناتك ومراجعاتك وقوائم القراءة والتواصل الاجتماعي
							نهائياً.
						</p>
					</div>
					<Dialog>
						<DialogTrigger
							render={
								<Button variant="destructive" size="sm">
									<TrashIcon className="mr-2 h-4 w-4" />
									حذف الحساب
								</Button>
							}
						/>
						<DialogContent className="bg-card">
							<DialogHeader>
								<DialogTitle className="text-card-foreground">
									حذف حسابك؟
								</DialogTitle>
								<DialogDescription>
									سيؤدي هذا إلى حذف حسابك وجميع البيانات المرتبطة به نهائياً. لا
									يمكن التراجع عن هذا الإجراء.
								</DialogDescription>
							</DialogHeader>
							<div className="my-4 space-y-2">
								<p className="text-sm text-muted-foreground">
									اكتب{" "}
									<strong className="text-foreground">حذف حسابي</strong>{" "}
									للتأكيد:
								</p>
								<input
									type="text"
									placeholder="حذف حسابي"
									className="w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
								/>
							</div>
							<DialogFooter>
								<Button variant="ghost" className="text-muted-foreground">
									إلغاء
								</Button>
								<Button variant="destructive">حذف نهائي</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</SettingCard>
		</SectionWrapper>
	);
}
