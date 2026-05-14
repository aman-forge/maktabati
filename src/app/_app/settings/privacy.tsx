import { createFileRoute } from "@tanstack/react-router";

import {
	EyeIcon,
	EyeSlashIcon,
	GlobeIcon,
	LockIcon,
	MagnifyingGlassIcon,
	UserCircleIcon,
	UsersIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Label } from "@shadcn/label";
import { RadioGroup, RadioGroupItem } from "@shadcn/radio-group";
import { Switch } from "@shadcn/switch";
import { useState } from "react";
import {
	SectionWrapper,
	SettingCard,
	SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/privacy")({
	component: PrivacySection,
});

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

	const togglePrivacy = (key: keyof typeof privacy) => {
		setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<SectionWrapper
			title="الخصوصية"
			description="تحكم في من يمكنه رؤية نشاطك ومعلوماتك."
		>
			<SettingCard
				title="ظهور الملف الشخصي"
				description="اختر من يمكنه عرض ملفك الشخصي ونشاطك."
			>
				<RadioGroup
					value={profileVisibility}
					onValueChange={setProfileVisibility}
					className="grid gap-3"
				>
					<div>
						<RadioGroupItem
							value="public"
							id="public"
							className="peer sr-only"
						/>
						<Label
							htmlFor="public"
							className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
								<GlobeIcon className="h-5 w-5 text-primary" weight="fill" />
							</div>
							<div className="flex-1">
								<p className="text-sm font-medium text-foreground">عام</p>
								<p className="text-xs text-muted-foreground">
									يمكن لأي شخص عرض ملفك الشخصي ومراجعاتك
								</p>
							</div>
							{profileVisibility === "public" && (
								<Badge className="bg-primary text-primary-foreground">
									نشط
								</Badge>
							)}
						</Label>
					</div>

					<div>
						<RadioGroupItem
							value="friends"
							id="friends"
							className="peer sr-only"
						/>
						<Label
							htmlFor="friends"
							className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
								<UsersIcon className="h-5 w-5 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<p className="text-sm font-medium text-foreground">
									الأصدقاء فقط
								</p>
								<p className="text-xs text-muted-foreground">
									فقط الأشخاص الذين تتابعهم بالمثل يمكنهم رؤية ملفك الشخصي
								</p>
							</div>
							{profileVisibility === "friends" && (
								<Badge className="bg-primary text-primary-foreground">
									نشط
								</Badge>
							)}
						</Label>
					</div>

					<div>
						<RadioGroupItem
							value="private"
							id="private"
							className="peer sr-only"
						/>
						<Label
							htmlFor="private"
							className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
								<LockIcon className="h-5 w-5 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<p className="text-sm font-medium text-foreground">خاص</p>
								<p className="text-xs text-muted-foreground">
									ملفك الشخصي مخفي عن الجميع
								</p>
							</div>
							{profileVisibility === "private" && (
								<Badge className="bg-primary text-primary-foreground">
									نشط
								</Badge>
							)}
						</Label>
					</div>
				</RadioGroup>
			</SettingCard>

			<SettingCard
				title="نشاط القراءة"
				description="إدارة ما يراه الآخرون عن قراءتك."
			>
				<div className="divide-y divide-border">
					<SettingRow
						label="عرض نشاط القراءة"
						description="عرض الكتب التي قرأتها وراجعتها"
					>
						<div className="flex items-center gap-3">
							{privacy.showReadingActivity ? (
								<EyeIcon className="h-5 w-5 text-muted-foreground" />
							) : (
								<EyeSlashIcon className="h-5 w-5 text-muted-foreground" />
							)}
							<Switch
								checked={privacy.showReadingActivity}
								onCheckedChange={() => togglePrivacy("showReadingActivity")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="عرض القراءة الحالية"
						description="السماح للآخرين برؤية ما تقرأه الآن"
					>
						<Switch
							checked={privacy.showCurrentlyReading}
							onCheckedChange={() => togglePrivacy("showCurrentlyReading")}
						/>
					</SettingRow>
					<SettingRow
						label="عرض إحصائيات القراءة"
						description="عرض سرعة قراءتك وعدد الكتب"
					>
						<Switch
							checked={privacy.showReadingStats}
							onCheckedChange={() => togglePrivacy("showReadingStats")}
						/>
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="الخصوصية الاجتماعية"
				description="تحكم في كيفية تفاعل الآخرين معك."
			>
				<div className="divide-y divide-border">
					<SettingRow
						label="السماح بالإشارة"
						description="السماح للآخرين بالإشارة إليك في قوائم القراءة والمراجعات"
					>
						<div className="flex items-center gap-3">
							<UserCircleIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={privacy.allowTagging}
								onCheckedChange={() => togglePrivacy("allowTagging")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="الظهور في البحث"
						description="السماح لملفك الشخصي بالظهور في نتائج البحث"
					>
						<div className="flex items-center gap-3">
							<MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={privacy.showInSearch}
								onCheckedChange={() => togglePrivacy("showInSearch")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="عرض قائمة المتابعين"
						description="عرض قوائم المتابعين والمتابَعين علناً"
					>
						<Switch
							checked={privacy.showFollowers}
							onCheckedChange={() => togglePrivacy("showFollowers")}
						/>
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="المستخدمون المحظورون"
				description="إدارة المستخدمين الذين قمت بحظرهم."
			>
				<div className="space-y-3">
					<p className="text-sm text-muted-foreground">
						لم تقم بحظر أي مستخدمين بعد.
					</p>
					<Button variant="secondary" size="sm">
						إدارة المستخدمين المحظورين
					</Button>
				</div>
			</SettingCard>
		</SectionWrapper>
	);
}
