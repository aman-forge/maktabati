import {
	CameraIcon,
	GoodreadsLogoIcon,
	InstagramLogoIcon,
	LinkIcon,
	TwitterLogoIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Textarea } from "@shadcn/textarea";
import { useState } from "react";
import { SectionWrapper, SettingCard } from "./section-wrapper";

export function ProfileSection() {
	const [displayName, setDisplayName] = useState("أحمد محمد");
	const [username, setUsername] = useState("ahmed_reads");
	const [bio, setBio] = useState(
		"قارئ نهم، محب للقهوة، وكاتب طموح. أستكشف حالياً عوالم الخيال والأدب التاريخي.",
	);
	const [location, setLocation] = useState("الرياض، السعودية");
	const [website, setWebsite] = useState("https://ahmedreads.blog");

	return (
		<SectionWrapper
			title="الملف الشخصي"
			description="إدارة معلومات ملفك الشخصي العامة المرئية للقراء الآخرين."
		>
			<SettingCard
				title="صورة الملف الشخصي"
				description="ستظهر هذه الصورة في ملفك الشخصي ومراجعاتك."
			>
				<div className="flex items-center gap-6">
					<div className="relative">
						<Avatar className="h-24 w-24 border-2 border-border">
							<AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" />
							<AvatarFallback className="bg-secondary text-2xl text-secondary-foreground">
								أم
							</AvatarFallback>
						</Avatar>
						<button type="button" className="absolute bottom-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105">
							<CameraIcon className="h-4 w-4" weight="fill" />
						</button>
					</div>
					<div className="space-y-2">
						<div className="flex gap-2">
							<Button variant="secondary" size="sm">
								رفع صورة جديدة
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="text-muted-foreground"
							>
								إزالة
							</Button>
						</div>
						<p className="text-xs text-muted-foreground">
							الموصى به: صورة مربعة، 400×400 بكسل على الأقل
						</p>
					</div>
				</div>
			</SettingCard>

			<SettingCard title="المعلومات الأساسية">
				<div className="grid gap-5">
					<div className="grid gap-2">
						<Label htmlFor="displayName" className="text-foreground">
							الاسم المعروض
						</Label>
						<Input
							id="displayName"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							className="bg-secondary text-foreground"
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="username" className="text-foreground">
							اسم المستخدم
						</Label>
						<div className="flex items-center">
							<span className="flex h-9 items-center rounded-s-md border border-e-0 border-input bg-muted px-3 text-sm text-muted-foreground">
								bookshelf.app/
							</span>
							<Input
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="rounded-s-none bg-secondary text-foreground"
							/>
						</div>
						<p className="text-xs text-muted-foreground">
							رابطك الفريد: bookshelf.app/{username}
						</p>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="bio" className="text-foreground">
							نبذة عني
						</Label>
						<Textarea
							id="bio"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="min-h-24 resize-none bg-secondary text-foreground"
							placeholder="أخبر القراء الآخرين عن نفسك..."
						/>
						<p className="text-xs text-muted-foreground">
							{bio.length}/300 حرف
						</p>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="location" className="text-foreground">
							الموقع
						</Label>
						<Input
							id="location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							placeholder="المدينة، البلد"
							className="bg-secondary text-foreground"
						/>
					</div>
				</div>
			</SettingCard>

			<SettingCard
				title="الأنواع المفضلة"
				description="اختر حتى 5 أنواع لعرضها في ملفك الشخصي."
			>
				<div className="flex flex-wrap gap-2">
					{[
						"خيال",
						"أدب تاريخي",
						"غموض",
						"خيال علمي",
						"أدب روائي",
						"رومانسية",
						"إثارة",
						"غير خيالي",
						"سيرة ذاتية",
						"تطوير الذات",
					].map((genre) => (
						<Badge
							key={genre}
							variant={
								["خيال", "أدب تاريخي", "غموض"].includes(genre)
									? "default"
									: "outline"
							}
							className={
								["خيال", "أدب تاريخي", "غموض"].includes(genre)
									? "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
									: "cursor-pointer border-border text-muted-foreground hover:border-primary hover:text-primary"
							}
						>
							{genre}
						</Badge>
					))}
				</div>
			</SettingCard>

			<SettingCard
				title="روابط التواصل الاجتماعي"
				description="ربط حساباتك الاجتماعية."
			>
				<div className="grid gap-4">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
							<LinkIcon className="h-5 w-5 text-muted-foreground" />
						</div>
						<Input
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
							placeholder="https://yourwebsite.com"
							className="flex-1 bg-secondary text-foreground"
						/>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
							<TwitterLogoIcon
								className="h-5 w-5 text-muted-foreground"
								weight="fill"
							/>
						</div>
						<Input
							placeholder="@اسم_المستخدم"
							className="flex-1 bg-secondary text-foreground"
						/>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
							<InstagramLogoIcon
								className="h-5 w-5 text-muted-foreground"
								weight="fill"
							/>
						</div>
						<Input
							placeholder="@اسم_المستخدم"
							className="flex-1 bg-secondary text-foreground"
						/>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
							<GoodreadsLogoIcon
								className="h-5 w-5 text-muted-foreground"
								weight="fill"
							/>
						</div>
						<Input
							placeholder="رابط ملف Goodreads"
							className="flex-1 bg-secondary text-foreground"
						/>
					</div>
				</div>
			</SettingCard>

			<div className="flex justify-start gap-3 pt-4">
				<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
					حفظ التغييرات
				</Button>
				<Button variant="ghost" className="text-muted-foreground">
					إلغاء
				</Button>
			</div>
		</SectionWrapper>
	);
}
