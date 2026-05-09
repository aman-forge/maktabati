import {
	DesktopIcon,
	GridFourIcon,
	LayoutIcon,
	MoonIcon,
	PaletteIcon,
	RowsIcon,
	SunIcon,
	TextAaIcon,
} from "@phosphor-icons/react";
import { Label } from "@shadcn/label";
import { RadioGroup, RadioGroupItem } from "@shadcn/radio-group";
import { Slider } from "@shadcn/slider";
import { Switch } from "@shadcn/switch";
import { useState } from "react";
import { SectionWrapper, SettingCard, SettingRow } from "./section-wrapper";

export function AppearanceSection() {
	const [theme, setTheme] = useState("dark");
	const [fontSize, setFontSize] = useState([16]);
	const [bookView, setBookView] = useState("grid");
	const [accentColor, setAccentColor] = useState("green");

	const colors = [
		{ id: "green", color: "bg-emerald-500", label: "زمردي" },
		{ id: "blue", color: "bg-blue-500", label: "أزرق" },
		{ id: "purple", color: "bg-violet-500", label: "بنفسجي" },
		{ id: "orange", color: "bg-orange-500", label: "برتقالي" },
		{ id: "pink", color: "bg-pink-500", label: "وردي" },
		{ id: "red", color: "bg-red-500", label: "أحمر" },
	];

	return (
		<SectionWrapper title="المظهر" description="خصص مظهر وشكل رف الكتب.">
			<SettingCard title="السمة" description="اختر نظام الألوان المفضل لديك.">
				<RadioGroup
					value={theme}
					onValueChange={setTheme}
					className="grid grid-cols-3 gap-3"
				>
					<div>
						<RadioGroupItem value="light" id="light" className="peer sr-only" />
						<Label
							htmlFor="light"
							className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
						>
							<SunIcon className="h-6 w-6 text-foreground" weight="fill" />
							<span className="text-sm font-medium text-foreground">فاتح</span>
						</Label>
					</div>
					<div>
						<RadioGroupItem value="dark" id="dark" className="peer sr-only" />
						<Label
							htmlFor="dark"
							className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
						>
							<MoonIcon className="h-6 w-6 text-foreground" weight="fill" />
							<span className="text-sm font-medium text-foreground">داكن</span>
						</Label>
					</div>
					<div>
						<RadioGroupItem
							value="system"
							id="system"
							className="peer sr-only"
						/>
						<Label
							htmlFor="system"
							className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
						>
							<DesktopIcon className="h-6 w-6 text-foreground" weight="fill" />
							<span className="text-sm font-medium text-foreground">
								النظام
							</span>
						</Label>
					</div>
				</RadioGroup>
			</SettingCard>

			<SettingCard
				title="لون التمييز"
				description="اختر لون التمييز المفضل لديك."
			>
				<div className="grid grid-cols-6 gap-3">
					{colors.map((c) => (
						<button
							type="button"
							key={c.id}
							onClick={() => setAccentColor(c.id)}
							className={`flex h-12 w-full items-center justify-center rounded-lg transition-all ${c.color} ${
								accentColor === c.id
									? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
									: "opacity-60 hover:opacity-100"
							}`}
							title={c.label}
						>
							{accentColor === c.id && (
								<PaletteIcon className="h-5 w-5 text-white" weight="fill" />
							)}
						</button>
					))}
				</div>
				<p className="mt-3 text-xs text-muted-foreground">
					المحدد: {colors.find((c) => c.id === accentColor)?.label}
				</p>
			</SettingCard>

			<SettingCard title="الخط" description="ضبط حجم النص للقراءة المريحة.">
				<div className="space-y-6">
					<div className="flex items-center gap-4 rounded-lg bg-secondary p-4">
						<TextAaIcon className="h-6 w-6 text-muted-foreground" />
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">حجم الخط</p>
							<p
								className="mt-1 text-muted-foreground"
								style={{ fontSize: `${fontSize[0]}px` }}
							>
								معاينة النص بحجم {fontSize[0]} بكسل
							</p>
						</div>
					</div>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Label className="text-foreground">ضبط الحجم</Label>
							<span className="text-sm text-muted-foreground">
								{fontSize[0]} بكسل
							</span>
						</div>
						<Slider
							value={fontSize}
							onValueChange={(val) => setFontSize(typeof val === 'number' ? [val] : [...val])}

							max={24}
							min={12}
							step={1}
							className="[&_[role=slider]]:bg-primary"
						/>
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>12 بكسل</span>
							<span>24 بكسل</span>
						</div>
					</div>
				</div>
			</SettingCard>

			<SettingCard
				title="عرض الكتب"
				description="اختر كيفية ظهور الكتب في مكتبتك."
			>
				<RadioGroup
					value={bookView}
					onValueChange={setBookView}
					className="grid grid-cols-2 gap-3"
				>
					<div>
						<RadioGroupItem value="grid" id="grid" className="peer sr-only" />
						<Label
							htmlFor="grid"
							className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
						>
							<GridFourIcon className="h-8 w-8 text-foreground" weight="fill" />
							<div className="text-center">
								<p className="text-sm font-medium text-foreground">عرض شبكي</p>
								<p className="text-xs text-muted-foreground">
									تخطيط يركز على الغلاف
								</p>
							</div>
						</Label>
					</div>
					<div>
						<RadioGroupItem value="list" id="list" className="peer sr-only" />
						<Label
							htmlFor="list"
							className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
						>
							<RowsIcon className="h-8 w-8 text-foreground" weight="fill" />
							<div className="text-center">
								<p className="text-sm font-medium text-foreground">عرض قائمة</p>
								<p className="text-xs text-muted-foreground">معلومات تفصيلية</p>
							</div>
						</Label>
					</div>
				</RadioGroup>
			</SettingCard>

			<SettingCard title="خيارات العرض" description="تفضيلات عرض إضافية.">
				<div className="divide-y divide-border">
					<SettingRow
						label="الوضع المضغوط"
						description="استخدام مساحة أقل بين العناصر"
					>
						<div className="flex items-center gap-3">
							<LayoutIcon className="h-5 w-5 text-muted-foreground" />
							<Switch />
						</div>
					</SettingRow>
					<SettingRow
						label="عرض أغلفة الكتب"
						description="عرض صور الغلاف في القوائم"
					>
						<Switch defaultChecked />
					</SettingRow>
					<SettingRow
						label="تحريك الانتقالات"
						description="تفعيل الحركات السلسة"
					>
						<Switch defaultChecked />
					</SettingRow>
					<SettingRow
						label="تقليل الحركة"
						description="تقليل الحركات لتسهيل الوصول"
					>
						<Switch />
					</SettingRow>
				</div>
			</SettingCard>
		</SectionWrapper>
	);
}
