import {
	BookOpenIcon,
	ClockIcon,
	ListBulletsIcon,
	SparkleIcon,
	StarIcon,
	TargetIcon,
	TranslateIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Label } from "@shadcn/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shadcn/select";
import { Slider } from "@shadcn/slider";
import { Switch } from "@shadcn/switch";
import { useState } from "react";
import { SectionWrapper, SettingCard, SettingRow } from "./section-wrapper";

export function ReadingPreferencesSection() {
	const [readingGoal, setReadingGoal] = useState(52);
	const [preferences, setPreferences] = useState({
		showPageCount: true,
		trackReadingTime: true,
		showProgress: true,
		autoMarkComplete: false,
	});

	const selectedGenres = [
		"خيال",
		"أدب تاريخي",
		"غموض",
		"خيال علمي",
		"أدب روائي",
	];

	const togglePreference = (key: keyof typeof preferences) => {
		setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<SectionWrapper
			title="تفضيلات القراءة"
			description="خصص تجربة القراءة وأهدافك."
		>
			<SettingCard
				title="تحدي القراءة"
				description="حدد هدف القراءة السنوي."
				action={
					<Badge
						variant="outline"
						className="gap-1 border-primary/30 text-primary"
					>
						<TargetIcon className="h-3 w-3" weight="fill" />
						12/52 كتاب
					</Badge>
				}
			>
				<div className="space-y-6">
					<div className="flex items-center gap-4 rounded-lg bg-secondary p-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
							<BookOpenIcon className="h-6 w-6 text-primary" weight="fill" />
						</div>
						<div className="flex-1">
							<p className="text-2xl font-bold text-foreground">
								{readingGoal}
							</p>
							<p className="text-sm text-muted-foreground">كتاب في السنة</p>
						</div>
					</div>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Label className="text-foreground">تعديل الهدف</Label>
							<span className="text-sm text-muted-foreground">
								{readingGoal} كتاب
							</span>
						</div>
						<Slider
							value={[readingGoal]}
							onValueChange={(value) => setReadingGoal(typeof value === 'number' ? value : value[0])}
							max={100}
							min={1}
							step={1}
							className="**:[[role=slider]]:bg-primary"
						/>
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>كتاب واحد</span>
							<span>100 كتاب</span>
						</div>
					</div>
					<Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
						تحديث هدف القراءة
					</Button>
				</div>
			</SettingCard>

			<SettingCard
				title="الأنواع المفضلة"
				description="اختر الأنواع التي تستمتع بقراءتها."
			>
				<div className="space-y-4">
					<div className="flex flex-wrap gap-2">
						{[
							"خيال",
							"أدب تاريخي",
							"غموض",
							"خيال علمي",
							"أدب روائي",
							"رومانسية",
							"إثارة",
							"رعب",
							"غير خيالي",
							"سيرة ذاتية",
							"تطوير الذات",
							"شعر",
							"رواية مصورة",
							"أدب الشباب",
							"أدب الأطفال",
						].map((genre) => (
							<Badge
								key={genre}
								variant={selectedGenres.includes(genre) ? "default" : "outline"}
								className={
									selectedGenres.includes(genre)
										? "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
										: "cursor-pointer border-border text-muted-foreground hover:border-primary hover:text-primary"
								}
							>
								{genre}
							</Badge>
						))}
					</div>
					<p className="text-xs text-muted-foreground">
						{selectedGenres.length}/5 أنواع محددة. تساعدنا هذه في التوصية
						بالكتب.
					</p>
				</div>
			</SettingCard>

			<SettingCard
				title="تفضيلات تنسيق الكتب"
				description="تنسيقات القراءة المفضلة لديك."
			>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{[
						{ label: "ورقي", selected: true },
						{ label: "إلكتروني", selected: true },
						{ label: "صوتي", selected: false },
						{ label: "PDF", selected: false },
					].map((format) => (
						<button
							type="button"
							key={format.label}
							className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
								format.selected
									? "border-primary bg-primary/10 text-primary"
									: "border-border bg-secondary text-muted-foreground hover:border-primary/50"
							}`}
						>
							{format.label}
						</button>
					))}
				</div>
			</SettingCard>

			<SettingCard title="عرض القراءة" description="خصص كيفية عرض تقدم قراءتك.">
				<div className="divide-y divide-border">
					<SettingRow
						label="عرض عدد الصفحات"
						description="عرض إجمالي الصفحات على بطاقات الكتب"
					>
						<div className="flex items-center gap-3">
							<ListBulletsIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={preferences.showPageCount}
								onCheckedChange={() => togglePreference("showPageCount")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="تتبع وقت القراءة"
						description="تسجيل الوقت المستغرق في كل جلسة قراءة"
					>
						<div className="flex items-center gap-3">
							<ClockIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={preferences.trackReadingTime}
								onCheckedChange={() => togglePreference("trackReadingTime")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="عرض نسبة التقدم"
						description="عرض نسبة الإكمال على الكتب"
					>
						<Switch
							checked={preferences.showProgress}
							onCheckedChange={() => togglePreference("showProgress")}
						/>
					</SettingRow>
					<SettingRow
						label="التحديد التلقائي كمكتمل"
						description="تحديد الكتب تلقائياً كمنتهية عند 100%"
					>
						<Switch
							checked={preferences.autoMarkComplete}
							onCheckedChange={() => togglePreference("autoMarkComplete")}
						/>
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="مقياس التقييم الافتراضي"
				description="اختر نظام التقييم المفضل لديك."
			>
				<Select defaultValue="5-star">
					<SelectTrigger className="w-full bg-secondary text-foreground">
						<SelectValue placeholder="اختر مقياس التقييم" />
					</SelectTrigger>
					<SelectContent className="bg-popover">
						<SelectItem value="5-star">
							<div className="flex items-center gap-2">
								<StarIcon className="h-4 w-4 text-primary" weight="fill" />
								<span className="text-popover-foreground">مقياس 5 نجوم</span>
							</div>
						</SelectItem>
						<SelectItem value="10-point">
							<span className="text-popover-foreground">مقياس 10 نقاط</span>
						</SelectItem>
						<SelectItem value="letter">
							<span className="text-popover-foreground">درجة حرفية (أ-هـ)</span>
						</SelectItem>
					</SelectContent>
				</Select>
			</SettingCard>

			<SettingCard title="اللغة والمنطقة" description="حدد لغتك المفضلة للكتب.">
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="language" className="text-foreground">
							اللغة المفضلة
						</Label>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
								<TranslateIcon className="h-5 w-5 text-muted-foreground" />
							</div>
							<Select defaultValue="ar">
								<SelectTrigger className="flex-1 bg-secondary text-foreground">
									<SelectValue />
								</SelectTrigger>
								<SelectContent className="bg-popover">
									<SelectItem value="ar">
										<span className="text-popover-foreground">العربية</span>
									</SelectItem>
									<SelectItem value="en">
										<span className="text-popover-foreground">الإنجليزية</span>
									</SelectItem>
									<SelectItem value="fr">
										<span className="text-popover-foreground">الفرنسية</span>
									</SelectItem>
									<SelectItem value="es">
										<span className="text-popover-foreground">الإسبانية</span>
									</SelectItem>
									<SelectItem value="de">
										<span className="text-popover-foreground">الألمانية</span>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<SettingRow
						label="عرض العناوين الأصلية"
						description="عرض عناوين الكتب بلغتها الأصلية"
					>
						<Switch defaultChecked />
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="توصيات الذكاء الاصطناعي"
				description="اقتراحات مخصصة مدعومة بالذكاء الاصطناعي."
			>
				<div className="flex items-center gap-4 rounded-lg bg-gradient-to-l from-primary/20 to-primary/5 p-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/30">
						<SparkleIcon className="h-6 w-6 text-primary" weight="fill" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium text-foreground">
							توصيات مدعومة بالذكاء الاصطناعي
						</p>
						<p className="text-xs text-muted-foreground">
							احصل على اقتراحات كتب مخصصة بناءً على تاريخ قراءتك
						</p>
					</div>
					<Switch defaultChecked />
				</div>
			</SettingCard>
		</SectionWrapper>
	);
}
