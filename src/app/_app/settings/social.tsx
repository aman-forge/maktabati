import { createFileRoute } from "@tanstack/react-router";

import {
	BellIcon,
	ChatCircleDotsIcon,
	HandshakeIcon,
	MagnifyingGlassIcon,
	ShareNetworkIcon,
	UserPlusIcon,
	UsersIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Switch } from "@shadcn/switch";
import { useState } from "react";
import {
	SectionWrapper,
	SettingCard,
	SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/social")({
	component: SocialSection,
});
function SocialSection() {
	const [social, setSocial] = useState({
		autoFollow: false,
		showOnline: true,
		allowMessages: true,
		shareToSocial: false,
		bookClubNotifications: true,
	});

	const toggleSocial = (key: keyof typeof social) => {
		setSocial((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const suggestedFriends = [
		{
			name: "محمد علي",
			username: "mohamed_reads",
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
			mutualBooks: 12,
		},
		{
			name: "سارة أحمد",
			username: "sara_books",
			avatar:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
			mutualBooks: 8,
		},
		{
			name: "خالد محمود",
			username: "khaled_reads",
			avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
			mutualBooks: 15,
		},
	];

	return (
		<SectionWrapper
			title="الأصدقاء والتواصل"
			description="إدارة اتصالاتك الاجتماعية وتفاعلاتك."
		>
			<SettingCard
				title="اقتراحات الأصدقاء"
				description="أشخاص قد تعرفهم بناءً على اهتمامات القراءة."
			>
				<div className="space-y-3">
					<div className="relative">
						<MagnifyingGlassIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="البحث عن أصدقاء..."
							className="bg-secondary pe-3 ps-9 text-foreground placeholder:text-muted-foreground"
						/>
					</div>
					<div className="space-y-2">
						{suggestedFriends.map((friend) => (
							<div
								key={friend.username}
								className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
							>
								<div className="flex items-center gap-3">
									<Avatar className="h-10 w-10 border border-border">
										<AvatarImage src={friend.avatar} />
										<AvatarFallback className="bg-muted text-muted-foreground">
											{friend.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm font-medium text-foreground">
											{friend.name}
										</p>
										<p className="text-xs text-muted-foreground">
											@{friend.username} • {friend.mutualBooks} كتاب مشترك
										</p>
									</div>
								</div>
								<Button variant="secondary" size="sm" className="gap-1">
									<UserPlusIcon className="h-4 w-4" />
									متابعة
								</Button>
							</div>
						))}
					</div>
					<Button variant="ghost" className="w-full text-primary">
						عرض المزيد من الاقتراحات
					</Button>
				</div>
			</SettingCard>

			<SettingCard
				title="إعدادات الاتصال"
				description="تحكم في من يمكنه الاتصال بك."
			>
				<div className="divide-y divide-border">
					<SettingRow
						label="المتابعة التلقائية"
						description="متابعة المستخدمين الذين يتابعونك تلقائياً"
					>
						<div className="flex items-center gap-3">
							<HandshakeIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={social.autoFollow}
								onCheckedChange={() => toggleSocial("autoFollow")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="إظهار حالة الاتصال"
						description="السماح للآخرين برؤية متى تكون نشطاً"
					>
						<div className="flex items-center gap-3">
							<UsersIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={social.showOnline}
								onCheckedChange={() => toggleSocial("showOnline")}
							/>
						</div>
					</SettingRow>
					<SettingRow
						label="السماح بالرسائل المباشرة"
						description="السماح للمتابعين بإرسال رسائل خاصة لك"
					>
						<div className="flex items-center gap-3">
							<ChatCircleDotsIcon className="h-5 w-5 text-muted-foreground" />
							<Switch
								checked={social.allowMessages}
								onCheckedChange={() => toggleSocial("allowMessages")}
							/>
						</div>
					</SettingRow>
				</div>
			</SettingCard>

			<SettingCard
				title="المشاركة"
				description="المشاركة التلقائية على المنصات الأخرى."
			>
				<SettingRow
					label="المشاركة على وسائل التواصل"
					description="نشر المراجعات والإنجازات تلقائياً على الحسابات المتصلة"
				>
					<div className="flex items-center gap-3">
						<ShareNetworkIcon className="h-5 w-5 text-muted-foreground" />
						<Switch
							checked={social.shareToSocial}
							onCheckedChange={() => toggleSocial("shareToSocial")}
						/>
					</div>
				</SettingRow>
			</SettingCard>

			<SettingCard
				title="نوادي الكتب"
				description="إدارة عضوياتك في نوادي الكتب."
				action={<Badge className="bg-primary/20 text-primary">2 نشط</Badge>}
			>
				<div className="space-y-3">
					<div className="rounded-lg border border-border bg-secondary/50 p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
									<UsersIcon className="h-5 w-5 text-primary" />
								</div>
								<div>
									<p className="text-sm font-medium text-foreground">
										نادي قراء الخيال
									</p>
									<p className="text-xs text-muted-foreground">
										128 عضو • اللقاء القادم: 15 ديسمبر
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="text-muted-foreground"
							>
								<BellIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div className="rounded-lg border border-border bg-secondary/50 p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
									<UsersIcon className="h-5 w-5 text-muted-foreground" />
								</div>
								<div>
									<p className="text-sm font-medium text-foreground">
										محبي الأدب العربي
									</p>
									<p className="text-xs text-muted-foreground">
										56 عضو • اللقاء القادم: 20 ديسمبر
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="text-muted-foreground"
							>
								<BellIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<Button variant="secondary" className="w-full">
						البحث عن نوادي كتب
					</Button>
				</div>
			</SettingCard>

			<SettingCard title="إشعارات نوادي الكتب">
				<SettingRow
					label="تنبيهات نشاط النادي"
					description="الإشعار بالنقاشات والاجتماعات"
				>
					<Switch
						checked={social.bookClubNotifications}
						onCheckedChange={() => toggleSocial("bookClubNotifications")}
					/>
				</SettingRow>
			</SettingCard>
		</SectionWrapper>
	);
}
