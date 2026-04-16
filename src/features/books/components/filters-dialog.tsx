"use client";

import {
  CaretUpDownIcon,
  CheckIcon,
  FadersIcon,
  MagnifyingGlassIcon,
  StarIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@shadcn/command";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";
import { ScrollArea } from "@shadcn/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@shadcn/sheet";
import { Slider } from "@shadcn/slider";
import * as React from "react";
import { cn } from "@/ui/lib/utils";

const FORMATS = [
  { value: "Hardcover", label: "غلاف صلب" },
  { value: "Paperback", label: "غلاف ورقي" },
  { value: "Manuscript", label: "مخطوطة" },
  { value: "Digital", label: "رقمي" },
] as const;

const PUBLISHERS = [
  "دار الكتب العلمية",
  "دار الفكر",
  "دار السلام",
  "دار ابن حزم",
  "دار المنهاج",
  "دار التقوى",
  "دار الحديث",
  "مؤسسة الرسالة",
  "دار المعارف",
  "دار القلم",
];

const TAGS = [
  "كلاسيكي",
  "قراءة أساسية",
  "مناسب للمبتدئين",
  "متقدم",
  "علمي",
  "شرح",
  "مختصر",
  "كامل",
  "موثق",
  "نادر",
  "شائع",
  "موصى به",
  "إضافة جديدة",
  "متاح صوتياً",
  "محشّى",
  "مترجم",
  "أصلي",
  "متعدد الأجزاء",
];

const READING_STATUS = [
  { value: "Unread", label: "غير مقروء" },
  { value: "Reading", label: "يُقرأ الآن" },
  { value: "Completed", label: "مكتمل" },
  { value: "On Hold", label: "متوقف" },
  { value: "Dropped", label: "متروك" },
] as const;

const AVAILABILITY_OPTIONS = [
  { value: null, label: "الكل" },
  { value: true, label: "نسخة رقمية" },
  { value: false, label: "ورقي فقط" },
] as const;

export interface FilterState {
  yearRange: [number, number];
  pageRange: [number, number];
  ratingMin: number;
  formats: string[];
  publishers: string[];
  tags: string[];
  readingStatus: string[];
  hasDigitalVersion: boolean | null;
  sortBy: string;
}

interface FilterDialogProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

type ArrayFilterKey = "formats" | "publishers" | "tags" | "readingStatus";

export function FilterDialog({ filters, onFiltersChange, onReset }: FilterDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);
  const [publisherOpen, setPublisherOpen] = React.useState(false);
  const [tagSearch, setTagSearch] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setLocalFilters(filters);
      setTagSearch("");
    }
  }, [open, filters]);

  const handleApply = () => {
    onFiltersChange(localFilters);
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  const toggleArrayFilter = React.useCallback((key: ArrayFilterKey, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  }, []);

  const activeFiltersCount = React.useMemo(() => {
    let count = 0;
    if (filters.yearRange[0] !== 700 || filters.yearRange[1] !== 2026) count++;
    if (filters.pageRange[0] !== 0 || filters.pageRange[1] !== 5000) count++;
    if (filters.ratingMin > 0) count++;
    if (filters.formats.length > 0) count++;
    if (filters.publishers.length > 0) count++;
    if (filters.tags.length > 0) count++;
    if (filters.readingStatus.length > 0) count++;
    if (filters.hasDigitalVersion !== null) count++;
    return count;
  }, [filters]);

  const filteredTags = React.useMemo(
    () => (tagSearch ? TAGS.filter((tag) => tag.includes(tagSearch)) : TAGS),
    [tagSearch],
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "h-10 gap-2 relative bg-muted/50 border-transparent hover:bg-muted",
              activeFiltersCount > 0 && "text-primary border-primary/30",
            )}
          >
            <FadersIcon weight="bold" className="w-4 h-4" />
            <span className="hidden sm:inline">تصفية</span>
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 p-0 text-[10px] justify-center bg-primary text-primary-foreground">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        }
      />

      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col rounded-2xl m-4 max-h-[calc(100vh-2rem)]"
        dir="rtl"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <SheetTitle className="text-lg">تصفية متقدمة</SheetTitle>
          <SheetDescription>حسّن بحثك باستخدام فلاتر تفصيلية</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 max-h-[calc(100vh-11.25rem)]">
          <div className="px-6 py-5 space-y-7">
            {/* Year range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">سنة النشر</Label>
                <span className="text-xs text-primary font-medium tabular-nums bg-primary/10 px-2 py-1 rounded-md">
                  {localFilters.yearRange[0]} - {localFilters.yearRange[1]} هـ/م
                </span>
              </div>
              <Slider
                value={localFilters.yearRange}
                onValueChange={(value) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    yearRange: value as [number, number],
                  }))
                }
                min={700}
                max={2026}
                step={1}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>700</span>
                <span>2026</span>
              </div>
            </div>

            {/* Page range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">عدد الصفحات</Label>
                <span className="text-xs text-primary font-medium tabular-nums bg-primary/10 px-2 py-1 rounded-md">
                  {localFilters.pageRange[0]} - {localFilters.pageRange[1]}+
                </span>
              </div>
              <Slider
                value={localFilters.pageRange}
                onValueChange={(value) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    pageRange: value as [number, number],
                  }))
                }
                min={0}
                max={5000}
                step={50}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0</span>
                <span>5000+</span>
              </div>
            </div>

            {/* Minimum rating */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">الحد الأدنى للتقييم</Label>
                {localFilters.ratingMin > 0 ? (
                  <span className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-md">
                    <StarIcon weight="fill" className="w-3 h-3 text-amber-400" />
                    {localFilters.ratingMin}+
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">أي تقييم</span>
                )}
              </div>
              <Slider
                value={[localFilters.ratingMin]}
                onValueChange={([v]) => setLocalFilters((prev) => ({ ...prev, ratingMin: v ?? 0 }))}
                min={0}
                max={5}
                step={0.5}
              />
            </div>

            {/* Publisher */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">الناشر</Label>
              <Popover open={publisherOpen} onOpenChange={setPublisherOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={publisherOpen}
                      className="w-full justify-between h-10 bg-muted/50 border-border/50 hover:bg-muted font-normal"
                    >
                      {localFilters.publishers.length > 0
                        ? `${localFilters.publishers.length} محدد`
                        : "اختر الناشرين..."}
                      <CaretUpDownIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  }
                />
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="ابحث عن ناشر..." />
                    <CommandList>
                      <CommandEmpty>لا يوجد ناشر.</CommandEmpty>
                      <CommandGroup>
                        {PUBLISHERS.map((publisher) => (
                          <CommandItem
                            key={publisher}
                            value={publisher}
                            onSelect={() => toggleArrayFilter("publishers", publisher)}
                          >
                            <CheckIcon
                              className={cn(
                                "ml-2 h-4 w-4",
                                localFilters.publishers.includes(publisher)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {publisher}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {localFilters.publishers.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {localFilters.publishers.map((pub) => (
                    <Badge
                      key={pub}
                      variant="secondary"
                      className="gap-1 text-xs bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                      onClick={() => toggleArrayFilter("publishers", pub)}
                    >
                      {pub}
                      <XIcon className="w-3 h-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Format */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">التنسيق</Label>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleArrayFilter("formats", value)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-all duration-150",
                      localFilters.formats.includes(value)
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted hover:bg-muted/80 text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading status */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">حالة القراءة</Label>
              <div className="flex flex-wrap gap-2">
                {READING_STATUS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleArrayFilter("readingStatus", value)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-all duration-150",
                      localFilters.readingStatus.includes(value)
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted hover:bg-muted/80 text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">التوفر</Label>
              <div className="flex flex-wrap gap-2">
                {AVAILABILITY_OPTIONS.map(({ value, label }) => (
                  <button
                    key={String(value)}
                    type="button"
                    onClick={() =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        hasDigitalVersion: value,
                      }))
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-all duration-150",
                      localFilters.hasDigitalVersion === value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted hover:bg-muted/80 text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">الوسوم</Label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="ابحث عن وسم..."
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  className="pr-9 h-9 bg-muted/50 border-border/50"
                />
                {tagSearch && (
                  <button
                    type="button"
                    onClick={() => setTagSearch("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 max-h-45 overflow-y-auto pl-1">
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleArrayFilter("tags", tag)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-all duration-150",
                        localFilters.tags.includes(tag)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted hover:bg-muted/80 text-foreground",
                      )}
                    >
                      {tag}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-2">
                    لا توجد وسوم لـ &quot;{tagSearch}&quot;
                  </p>
                )}
              </div>
              {localFilters.tags.length > 0 && (
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">
                    الوسوم المختارة ({localFilters.tags.length}):
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {localFilters.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 text-xs bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                        onClick={() => toggleArrayFilter("tags", tag)}
                      >
                        {tag}
                        <XIcon className="w-3 h-3" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="flex-row gap-1 p-2 border-t shrink-0">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            إعادة تعيين
          </Button>
          <Button onClick={handleApply} className="flex-1">
            تطبيق التصفية
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
