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
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  SectionWrapper,
  SettingCard,
  SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/social")({
  component: SocialSection,
});

const suggestedFriends = [
  {
    name: "محمد علي",
    username: "mohamed_reads",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    mutualBooks: 12,
  },
  {
    name: "سارة أحمد",
    username: "sara_books",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    mutualBooks: 8,
  },
  {
    name: "خالد محمود",
    username: "khaled_reads",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    mutualBooks: 15,
  },
];

const bookClubs = [
  {
    name: "نادي قراء الخيال",
    members: 128,
    nextMeeting: "15 ديسمبر",
    active: true,
  },
  {
    name: "محبي الأدب العربي",
    members: 56,
    nextMeeting: "20 ديسمبر",
    active: false,
  },
];

function SocialSection() {
  const [social, setSocial] = useState({
    autoFollow: false,
    showOnline: true,
    allowMessages: true,
    shareToSocial: false,
    bookClubNotifications: true,
  });

  const toggle = (key: keyof typeof social) =>
    setSocial((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SectionWrapper
      title="الأصدقاء والتواصل"
      description="إدارة اتصالاتك الاجتماعية وتفاعلاتك مع مجتمع القراء."
    >
      {/* Friend Suggestions */}
      <SettingCard
        title="اقتراحات الأصدقاء"
        description="قراء قد تعرفهم بناءً على كتب مشتركة."
        icon={<UserPlusIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="space-y-3">
          <div className="relative">
            <MagnifyingGlassIcon className="text-muted-foreground absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="البحث عن قراء..." className="bg-muted/30 h-9 pe-9 text-sm" />
          </div>
          <div className="space-y-2">
            {suggestedFriends.map((friend) => (
              <div
                key={friend.username}
                className="border-border/60 bg-muted/20 hover:bg-muted/30 flex items-center justify-between rounded-xl border px-3 py-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="ring-border/40 h-9 w-9 ring-2">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="bg-muted text-xs">
                      {friend.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground text-sm font-semibold">{friend.name}</p>
                    <p className="text-muted-foreground text-[11px]">
                      @{friend.username} • {friend.mutualBooks} كتاب مشترك
                    </p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="h-7 gap-1 text-xs">
                  <UserPlusIcon className="h-3.5 w-3.5" />
                  متابعة
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-primary/5 w-full text-xs"
          >
            عرض المزيد من المقترحين
          </Button>
        </div>
      </SettingCard>

      {/* Connection Settings */}
      <SettingCard
        title="إعدادات الاتصال"
        description="تحكم في كيفية تفاعل الآخرين معك."
        icon={<UsersIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="divide-border/40 divide-y">
          {[
            {
              key: "autoFollow" as const,
              label: "المتابعة التلقائية",
              desc: "متابعة المستخدمين الذين يتابعونك تلقائياً",
              icon: <HandshakeIcon className="h-4 w-4" />,
            },
            {
              key: "showOnline" as const,
              label: "إظهار حالة الاتصال",
              desc: "السماح للآخرين برؤية متى تكون نشطاً",
              icon: <UsersIcon className="h-4 w-4" />,
            },
            {
              key: "allowMessages" as const,
              label: "السماح بالرسائل المباشرة",
              desc: "السماح للمتابعين بإرسال رسائل خاصة لك",
              icon: <ChatCircleDotsIcon className="h-4 w-4" />,
            },
          ].map((item) => (
            <SettingRow key={item.key} label={item.label} description={item.desc}>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{item.icon}</span>
                <Switch checked={social[item.key]} onCheckedChange={() => toggle(item.key)} />
              </div>
            </SettingRow>
          ))}
        </div>
      </SettingCard>

      {/* Sharing */}
      <SettingCard
        title="المشاركة التلقائية"
        description="نشر إنجازاتك ومراجعاتك على المنصات المتصلة."
        icon={<ShareNetworkIcon className="h-4 w-4" weight="fill" />}
      >
        <SettingRow
          label="المشاركة على وسائل التواصل"
          description="نشر المراجعات والإنجازات تلقائياً على حساباتك المرتبطة"
        >
          <div className="flex items-center gap-3">
            <ShareNetworkIcon className="text-muted-foreground h-4 w-4" />
            <Switch
              checked={social.shareToSocial}
              onCheckedChange={() => toggle("shareToSocial")}
            />
          </div>
        </SettingRow>
      </SettingCard>

      {/* Book Clubs */}
      <SettingCard
        title="نوادي الكتب"
        description="إدارة عضوياتك في نوادي القراءة."
        icon={<UsersIcon className="h-4 w-4" weight="fill" />}
        action={
          <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]">2 نشط</Badge>
        }
      >
        <div className="space-y-2">
          {bookClubs.map((club) => (
            <div
              key={club.name}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                club.active ? "border-primary/30 bg-primary/5" : "border-border/60 bg-muted/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${club.active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}
                >
                  <UsersIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-semibold">{club.name}</p>
                  <p className="text-muted-foreground text-[11px]">
                    {club.members} عضو • اللقاء القادم: {club.nextMeeting}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-7 w-7 p-0"
              >
                <BellIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="secondary" size="sm" className="mt-1 w-full text-xs">
            البحث عن نوادي كتب
          </Button>
        </div>
      </SettingCard>

      {/* Club Notifications */}
      <SettingCard title="إشعارات نوادي الكتب">
        <SettingRow
          label="تنبيهات نشاط النادي"
          description="الإشعار بالنقاشات الجديدة والاجتماعات القادمة"
        >
          <Switch
            checked={social.bookClubNotifications}
            onCheckedChange={() => toggle("bookClubNotifications")}
          />
        </SettingRow>
      </SettingCard>
    </SectionWrapper>
  );
}
