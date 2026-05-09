import {
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
import { useState } from "react";
import { SectionWrapper, SettingCard, SettingRow } from "./section-wrapper";

export function NotificationsSection() {
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

	const toggleNotification = (key: keyof typeof notifications) => {
		setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<SectionWrapper
			title="الإشعارات"
			description="اختر كيف ومتى تريد أن يتم إشعارك."
		>
			<SettingCard
				title="إشعارات البريد الإلكتروني"
				description="إدارة تكرار ونوع الرسائل البريدية."
			>
				<div className="space-y-4">
					<div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
						<EnvelopeSimpleIcon className="h-5 w-5 text-primary" weight="fill" />
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">
								ملخص البريد الإلكتروني
							</p>
							<p className="text-xs text-muted-foreground">
								احصل على ملخص لإشعاراتك
							</p>
						</div>
					</div>
					<RadioGroup
						value={emailDigest}
						onValueChange={setEmailDigest}
						className="grid grid-cols-2 gap-3 sm:grid-cols-4"
					>
						{[
							{ value: "instant", label: "فوري" },
							{ value: "daily", label: "يومي" },
							{ value: "weekly", label: "أسبوعي" },
							{ value: "never", label: "أبداً" },
						].map((option) => (
							<div key={option.value}>
								<RadioGroupItem
									value={option.value}
									id={option.value}
									className="peer sr-only"
								/>
								<Label
									htmlFor={option.value}
									className="flex cursor-pointer items-center justify-center rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
								>
									{option.label}
								</Label>
							</div>
						))}
					</RadioGroup>
				</div>
			</SettingCard>

			<SettingCard
				title="الإشعارات الفورية"
				description="تنبيهات فورية على جهازك."
			>
				<div className="flex items-center gap-3 rounded-lg bg-primary/10 p-4">
					<DeviceMobileIcon className="h-5 w-5 text-primary" weight="fill" />
					<div className="flex-1">
						<p className="text-sm font-medium text-primary">
							الإشعارات الفورية مفعلة
						</p>
						<p className="text-xs text-primary/70">
							ستتلقى تنبيهات على هذا الجهاز
						</p>
					</div>
					<Switch defaultChecked />
				</div>
			</SettingCard>

			<SettingCard
				title="النشاط الاجتماعي"
				description="إشعارات حول تفاعلاتك الاجتماعية."
			>
				<div className="divide-y divide-border">
					<SettingRow
						label="متابعون جدد"
						description="عندما يتابع شخص ما ملفك الشخصي"
					>
						<div className="flex items-center gap-3">
							<UserPlusIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={notifications.newFollower}
								onCheckedChange={() => toggleNotification("newFollower")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="تعليقات المراجعات"
						description="عندما يعلق شخص ما على مراجعاتك"
					>
						<div className="flex items-center gap-3">
							<ChatCircleIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={notifications.reviewComment}
								onCheckedChange={() => toggleNotification("reviewComment")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="إعجابات المراجعات"
						description="عندما يعجب شخص ما بمراجعاتك"
					>
						<div className="flex items-center gap-3">
							<HeartIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={notifications.reviewLike}
								onCheckedChange={() => toggleNotification("reviewLike")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="نشاط الأصدقاء"
						description="عندما ينهي الأصدقاء كتباً أو يكتبون مراجعات"
					>
						<div className="flex items-center gap-3">
							<BooksIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={notifications.friendActivity}
								onCheckedChange={() => toggleNotification("friendActivity")}
							/>
						</div>
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="نشاط القراءة"
				description="ابق على اطلاع برحلة قراءتك."
			>
				<div className="divide-y divide-border">
					<SettingRow
						label="توصيات الكتب"
						description="اقتراحات كتب مخصصة بناءً على ذوقك"
					>
						<Switch
							checked={notifications.bookRecommendation}
							onCheckedChange={() => toggleNotification("bookRecommendation")}
						/>
					</SettingRow>
					<SettingRow
						label="تقدم هدف القراءة"
						description="تحديثات أسبوعية عن تحدي القراءة الخاص بك"
					>
						<div className="flex items-center gap-3">
							<TrophyIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={notifications.readingGoal}
								onCheckedChange={() => toggleNotification("readingGoal")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="الإصدارات الجديدة"
						description="من المؤلفين الذين تتابعهم أو الكتب في قائمة رغباتك"
					>
						<Switch
							checked={notifications.newRelease}
							onCheckedChange={() => toggleNotification("newRelease")}
						/>
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="التسويق"
				description="المحتوى الترويجي والنشرات الإخبارية."
			>
				<SettingRow
					label="رسائل التسويق"
					description="الأخبار والتحديثات والعروض الخاصة من رف الكتب"
				>
					<div className="flex items-center gap-3">
						<MegaphoneIcon className="h-5 w-5 text-muted-foreground" />
						<Switch
							checked={notifications.marketing}
							onCheckedChange={() => toggleNotification("marketing")}
						/>
					</div>
				</SettingRow>
			</SettingCard>
		</SectionWrapper>
	);
}
