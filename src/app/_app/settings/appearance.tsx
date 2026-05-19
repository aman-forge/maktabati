import {
  CheckIcon,
  DesktopIcon,
  GridFourIcon,
  LayoutIcon,
  MoonIcon,
  PaintBrushIcon,
  RowsIcon,
  SunIcon,
  TextAaIcon,
} from "@phosphor-icons/react";
import { Label } from "@shadcn/label";
import { RadioGroup, RadioGroupItem } from "@shadcn/radio-group";
import { Slider } from "@shadcn/slider";
import { Switch } from "@shadcn/switch";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  SectionWrapper,
  SettingCard,
  SettingRow,
} from "@/features/settings/components/section-wrapper";

export const Route = createFileRoute("/_app/settings/appearance")({
  component: AppearanceSection,
});

const themeOptions = [
  { value: "light", label: "فاتح", icon: SunIcon, desc: "مشرق ونقي" },
  { value: "dark", label: "داكن", icon: MoonIcon, desc: "مريح للعيون" },
  { value: "system", label: "النظام", icon: DesktopIcon, desc: "تلقائي" },
];

const colors = [
  { id: "green", bg: "bg-emerald-500", ring: "ring-emerald-500", label: "زمردي" },
  { id: "blue", bg: "bg-blue-500", ring: "ring-blue-500", label: "أزرق" },
  { id: "purple", bg: "bg-violet-500", ring: "ring-violet-500", label: "بنفسجي" },
  { id: "orange", bg: "bg-orange-500", ring: "ring-orange-500", label: "برتقالي" },
  { id: "pink", bg: "bg-pink-500", ring: "ring-pink-500", label: "وردي" },
  { id: "red", bg: "bg-red-500", ring: "ring-red-500", label: "أحمر" },
  { id: "teal", bg: "bg-teal-500", ring: "ring-teal-500", label: "مائي" },
  { id: "amber", bg: "bg-amber-500", ring: "ring-amber-500", label: "عنبري" },
];

function AppearanceSection() {
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState([16]);
  const [bookView, setBookView] = useState("grid");
  const [accentColor, setAccentColor] = useState("green");

  const fontSizeLabel =
    fontSize[0] <= 13
      ? "صغير"
      : fontSize[0] <= 16
        ? "متوسط"
        : fontSize[0] <= 19
          ? "كبير"
          : "كبير جداً";

  return (
    <SectionWrapper title="المظهر" description="خصّص شكل ومظهر مكتبتي ليناسب تفضيلاتك.">
      {/* Theme */}
      <SettingCard
        title="سمة التطبيق"
        description="اختر نظام الألوان المفضل لديك."
        icon={<MoonIcon className="h-4 w-4" weight="fill" />}
      >
        <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-2.5">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.value}>
                <RadioGroupItem value={opt.value} id={opt.value} className="peer sr-only" />
                <Label
                  htmlFor={opt.value}
                  className="bg-muted/30 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-150"
                >
                  <div className="bg-muted peer-data-[state=checked]:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="text-foreground h-5 w-5" weight="fill" />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground text-sm font-semibold">{opt.label}</p>
                    <p className="text-muted-foreground text-[10px]">{opt.desc}</p>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </SettingCard>

      {/* Accent Color */}
      <SettingCard
        title="لون التمييز"
        description="اختر لونك المفضل لعناصر التطبيق."
        icon={<PaintBrushIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="grid grid-cols-8 gap-2">
          {colors.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setAccentColor(c.id)}
              title={c.label}
              className={`group relative flex h-10 w-full items-center justify-center rounded-xl transition-all duration-150 ${c.bg} ${
                accentColor === c.id
                  ? `ring-offset-background ring-2 ring-offset-2 ${c.ring} scale-110`
                  : "opacity-60 hover:scale-105 hover:opacity-90"
              }`}
            >
              {accentColor === c.id && <CheckIcon className="h-4 w-4 text-white" weight="bold" />}
            </button>
          ))}
        </div>
        <p className="text-muted-foreground mt-3 text-xs">
          المحدد: {colors.find((c) => c.id === accentColor)?.label}
        </p>
      </SettingCard>

      {/* Font Size */}
      <SettingCard
        title="حجم الخط"
        description="اضبط حجم النص للقراءة المريحة."
        icon={<TextAaIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="space-y-5">
          {/* Preview */}
          <div className="border-border/60 bg-muted/20 rounded-xl border p-4">
            <p className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wider uppercase">
              معاينة
            </p>
            <p className="text-foreground leading-relaxed" style={{ fontSize: `${fontSize[0]}px` }}>
              "في البداية كانت الكلمة، وبها ابتدأت كل القصص."
            </p>
            <p className="text-muted-foreground mt-2 text-[11px]">
              {fontSize[0]} بكسل • {fontSizeLabel}
            </p>
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span className="text-[10px]">أ صغير</span>
              <span className="text-foreground font-medium">{fontSize[0]} بكسل</span>
              <span className="text-base font-bold">أ كبير</span>
            </div>
            <Slider
              value={fontSize}
              onValueChange={(val) => setFontSize(typeof val === "number" ? [val] : [...val])}
              max={24}
              min={12}
              step={1}
              className="**:[[role=slider]]:bg-primary"
            />
            <div className="text-muted-foreground flex justify-between text-[10px]">
              <span>12</span>
              <span>14</span>
              <span>16</span>
              <span>18</span>
              <span>20</span>
              <span>22</span>
              <span>24</span>
            </div>
          </div>
        </div>
      </SettingCard>

      {/* Book View */}
      <SettingCard
        title="عرض الكتب"
        description="اختر كيفية ظهور الكتب في مكتبتك."
        icon={<GridFourIcon className="h-4 w-4" weight="fill" />}
      >
        <RadioGroup
          value={bookView}
          onValueChange={setBookView}
          className="grid grid-cols-2 gap-2.5"
        >
          {[
            {
              value: "grid",
              label: "عرض شبكي",
              desc: "أغلفة الكتب",
              icon: GridFourIcon,
            },
            {
              value: "list",
              label: "عرض قائمة",
              desc: "معلومات تفصيلية",
              icon: RowsIcon,
            },
          ].map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.value}>
                <RadioGroupItem
                  value={opt.value}
                  id={`view-${opt.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`view-${opt.value}`}
                  className="bg-muted/30 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-150"
                >
                  <Icon
                    className="text-muted-foreground peer-data-[state=checked]:text-primary h-6 w-6 shrink-0"
                    weight="fill"
                  />
                  <div>
                    <p className="text-foreground text-sm font-semibold">{opt.label}</p>
                    <p className="text-muted-foreground text-[11px]">{opt.desc}</p>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </SettingCard>

      {/* Display Options */}
      <SettingCard
        title="خيارات العرض"
        description="تفضيلات إضافية لتخصيص تجربتك."
        icon={<LayoutIcon className="h-4 w-4" weight="fill" />}
      >
        <div className="divide-border/40 divide-y">
          {[
            {
              label: "الوضع المضغوط",
              desc: "استخدام مساحة أقل بين العناصر",
              defaultChecked: false,
            },
            { label: "عرض أغلفة الكتب", desc: "عرض صور الغلاف في القوائم", defaultChecked: true },
            {
              label: "تحريك الانتقالات",
              desc: "تفعيل الحركات السلسة والمصقولة",
              defaultChecked: true,
            },
            {
              label: "تقليل الحركة",
              desc: "لإمكانية الوصول وتقليل الإرهاق البصري",
              defaultChecked: false,
            },
          ].map((item) => (
            <SettingRow key={item.label} label={item.label} description={item.desc}>
              <Switch defaultChecked={item.defaultChecked} />
            </SettingRow>
          ))}
        </div>
      </SettingCard>
    </SectionWrapper>
  );
}
