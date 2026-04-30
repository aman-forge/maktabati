"use client";

import { CaretUpDownIcon, CheckIcon, FunnelIcon, StarIcon, XIcon } from "@phosphor-icons/react";
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
import { BOOK_TOPICS, PUBLISHERS } from "@/db/constants/books";
import { cn } from "@/ui/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

interface StatusType {
  value: string;
  label: string;
}
const READING_STATUS: StatusType[] = [
  { value: "Unread", label: "غير مقروء" },
  { value: "Reading", label: "يُقرأ الآن" },
  { value: "Completed", label: "مكتمل" },
  { value: "On Hold", label: "متوقف" },
  { value: "Dropped", label: "متروك" },
] as const;

const YEAR_MIN = 700;
const YEAR_MAX = 2026;
const PAGE_MIN = 0;
const PAGE_MAX = 5000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FilterState {
  yearRange: [number, number];
  pageRange: [number, number];
  ratingMin: number;
  publishers: string[];
  topics: string[];
  readingStatus: string[];
}

interface FilterDialogProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

type ArrayFilterKey = "publishers" | "topics" | "readingStatus";
type RangeValue = [number, number];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FilterDialog({ filters, onFiltersChange, onReset }: FilterDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);
  const [publisherOpen, setPublisherOpen] = React.useState(false);
  const [topicSearch, setTopicSearch] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setLocalFilters(filters);
      setTopicSearch("");
      setPublisherOpen(false);
    }
  }, [open, filters]);

  const handleApply = React.useCallback(() => {
    onFiltersChange(localFilters);
    setOpen(false);
  }, [localFilters, onFiltersChange]);

  const handleReset = React.useCallback(() => {
    onReset();
    setOpen(false);
  }, [onReset]);

  const toggleArrayFilter = React.useCallback((key: ArrayFilterKey, value: string) => {
    setLocalFilters((prev) => {
      const exists = prev[key].includes(value);

      return {
        ...prev,
        [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value],
      };
    });
  }, []);

  const setRangeValue = React.useCallback(
    (key: "yearRange" | "pageRange", value: number | readonly number[]) => {
      if (!Array.isArray(value) || value.length < 2) return;

      const nextValue: RangeValue = [value[0] ?? 0, value[1] ?? 0];

      setLocalFilters((prev) => ({
        ...prev,
        [key]: nextValue,
      }));
    },
    [],
  );

  const activeFiltersCount = React.useMemo(() => {
    let count = 0;
    if (filters.yearRange[0] !== YEAR_MIN || filters.yearRange[1] !== YEAR_MAX) count++;
    if (filters.pageRange[0] !== PAGE_MIN || filters.pageRange[1] !== PAGE_MAX) count++;
    if (filters.ratingMin > 0) count++;
    if (filters.publishers.length > 0) count++;
    if (filters.topics.length > 0) count++;
    if (filters.readingStatus.length > 0) count++;
    return count;
  }, [filters]);

  const filteredTopics = React.useMemo(() => {
    if (!topicSearch) return BOOK_TOPICS;

    const q = topicSearch.toLowerCase();

    return BOOK_TOPICS.filter(
      (topic) => topic.label.toLowerCase().includes(q) || topic.value.toLowerCase().includes(q),
    );
  }, [topicSearch]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "h-9 gap-1 relative",
              activeFiltersCount > 0 && "text-primary border-primary/30",
            )}
          >
            <FunnelIcon weight="bold" className="w-4 h-4" />
            <span className="hidden sm:inline">تصفية</span>

            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 p-0 text-[10px] justify-center">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        }
      />

      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col rounded-2xl m-4 max-h-[calc(100vh-2rem)] overflow-hidden"
        dir="rtl"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <SheetTitle>تصفية متقدمة</SheetTitle>
          <SheetDescription>حسّن بحثك باستخدام فلاتر دقيقة</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 max-h-[calc(100vh-11rem)]">
          <div className="px-6 pt-5 space-y-7">
            <RangeSection
              label="سنة النشر"
              value={localFilters.yearRange}
              min={YEAR_MIN}
              max={YEAR_MAX}
              step={1}
              suffix="م"
              onChange={(v) => setRangeValue("yearRange", v)}
            />

            <RangeSection
              label="عدد الصفحات"
              value={localFilters.pageRange}
              min={PAGE_MIN}
              max={PAGE_MAX}
              step={50}
              suffix="+"
              onChange={(v) => setRangeValue("pageRange", v)}
            />

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

            <div className="space-y-3">
              <Label>الناشر</Label>

              <Popover open={publisherOpen} onOpenChange={setPublisherOpen}>
                <PopoverTrigger
                  render={
                    <Button variant="outline" className="w-full justify-between">
                      {localFilters.publishers.length > 0
                        ? `${localFilters.publishers.length} محدد`
                        : "اختر الناشرين..."}
                      <CaretUpDownIcon className="w-4 h-4 opacity-50" />
                    </Button>
                  }
                />
                <PopoverContent align="center" dir="rtl" side="left" className="p-0">
                  <Command>
                    <CommandInput placeholder="ابحث..." />
                    <CommandList>
                      <CommandEmpty>لا يوجد</CommandEmpty>
                      <CommandGroup>
                        {PUBLISHERS.map((publisher) => {
                          const isSelected = localFilters.publishers.includes(publisher);

                          return (
                            <CommandItem
                              key={publisher}
                              value={publisher}
                              onSelect={() => toggleArrayFilter("publishers", publisher)}
                              className="cursor-pointer rounded-2xl px-0"
                            >
                              <div
                                className={cn(
                                  "mr-2 flex size-5 items-center justify-center rounded-md border transition-colors",
                                  isSelected
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "border-muted-foreground/30",
                                )}
                              >
                                {isSelected && <CheckIcon className="size-3" />}
                              </div>
                              {publisher}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {localFilters.publishers.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {localFilters.publishers.map((publisher) => (
                    <Badge
                      key={publisher}
                      onClick={() => toggleArrayFilter("publishers", publisher)}
                      className="cursor-pointer"
                    >
                      {publisher}
                      <XIcon className="w-3 h-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <ChipSection
              label="حالة القراءة"
              items={READING_STATUS}
              selected={localFilters.readingStatus}
              onToggle={(v) => toggleArrayFilter("readingStatus", v)}
            />

            <div className="space-y-3">
              <Label>الوسوم</Label>

              <Input
                placeholder="ابحث..."
                value={topicSearch}
                onChange={(e) => setTopicSearch(e.target.value)}
              />

              <div className="flex flex-wrap gap-2 max-h-48 pb-2 overflow-y-scroll">
                {filteredTopics.map((tag) => (
                  <button
                    type="button"
                    key={tag.value}
                    onClick={() => toggleArrayFilter("topics", tag.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-colors",
                      localFilters.topics.includes(tag.value)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80",
                    )}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="flex gap-2 p-2 border-t h-13 flex-row shrink-0">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            إعادة تعيين
          </Button>
          <Button onClick={handleApply} className="flex-1">
            تطبيق
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ---------------------------------------------------------------------------
// Small reusable components
// ---------------------------------------------------------------------------

function RangeSection({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string;
  value: [number, number];
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number | readonly number[]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-xs text-primary font-medium tabular-nums bg-primary/10 px-2 py-1 rounded-md">
          {value[0]} - {value[1]}
          {suffix}
        </span>
      </div>

      <Slider value={value} onValueChange={onChange} min={min} max={max} step={step} />

      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{min}</span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}

function ChipSection({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string;
  items: StatusType[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            type="button"
            key={item.value}
            onClick={() => onToggle(item.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm transition-colors",
              selected.includes(item.value) ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
