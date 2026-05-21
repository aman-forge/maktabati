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
import type { ReadingStatus } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

interface StatusType {
  value: ReadingStatus;
  label: string;
}
const READING_STATUS: StatusType[] = [
  { value: "want_to_read", label: "أخطط لقراءته" },
  { value: "currently_reading", label: "قيد القراءة" },
  { value: "completed", label: "مكتمل" },
  { value: "on_hold", label: "متوقف" },
  { value: "dropped", label: "متروك" },
] as const;

const YEAR_MIN = 700;
const YEAR_MAX = 2026;
const PAGE_MIN = 0;
const PAGE_MAX = 1000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FilterState {
  yearRange: [number, number];
  pageRange: [number, number];
  ratingMin: number;
  publishers: string[];
  topics: string[];
  readingStatus: ReadingStatus[];
}

interface FilterDialogProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  showReadingStatus?: boolean;
}

type ArrayFilterKey = "publishers" | "topics";
type RangeValue = [number, number];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FilterDialog({
  filters,
  onFiltersChange,
  onReset,
  showReadingStatus = true,
}: FilterDialogProps) {
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

  const toggleReadingStatus = React.useCallback((value: ReadingStatus) => {
    setLocalFilters((prev) => {
      const exists = prev.readingStatus.includes(value);

      return {
        ...prev,
        readingStatus: exists
          ? prev.readingStatus.filter((status) => status !== value)
          : [...prev.readingStatus, value],
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
    if (showReadingStatus && filters.readingStatus.length > 0) count++;
    return count;
  }, [filters, showReadingStatus]);

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
            <FunnelIcon weight="bold" className="h-4 w-4" />
            <span className="hidden sm:inline">تصفية</span>

            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 justify-center p-0 text-[10px]">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        }
      />

      <SheetContent
        side="right"
        className="m-4 flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden rounded-2xl p-0 sm:max-w-md"
        dir="rtl"
      >
        <SheetHeader className="shrink-0 border-b px-6 pt-6 pb-4">
          <SheetTitle>تصفية متقدمة</SheetTitle>
          <SheetDescription>حسّن بحثك باستخدام فلاتر دقيقة</SheetDescription>
        </SheetHeader>

        <ScrollArea className="max-h-[calc(100vh-11rem)] flex-1">
          <div className="space-y-7 px-6 pt-5">
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
                  <span className="text-primary bg-primary/10 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium">
                    <StarIcon weight="fill" className="h-3 w-3 text-amber-400" />
                    {localFilters.ratingMin}+
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xs">أي تقييم</span>
                )}
              </div>
              <Slider
                value={[localFilters.ratingMin]}
                onValueChange={(value) => {
                  if (!Array.isArray(value)) return;
                  setLocalFilters((prev) => ({ ...prev, ratingMin: value[0] ?? 0 }));
                }}
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
                      <CaretUpDownIcon className="h-4 w-4 opacity-50" />
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
                      <XIcon className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {showReadingStatus && (
              <ChipSection
                label="حالة القراءة"
                items={READING_STATUS}
                selected={localFilters.readingStatus}
                onToggle={toggleReadingStatus}
              />
            )}

            <div className="space-y-3">
              <Label>الوسوم</Label>

              <Input
                placeholder="ابحث..."
                value={topicSearch}
                onChange={(e) => setTopicSearch(e.target.value)}
              />

              <div className="flex max-h-48 flex-wrap gap-2 overflow-y-scroll pb-2">
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

        <SheetFooter className="flex h-13 shrink-0 flex-row gap-2 border-t p-2">
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
        <span className="text-primary bg-primary/10 rounded-md px-2 py-1 text-xs font-medium tabular-nums">
          {value[0]} - {value[1]}
          {suffix}
        </span>
      </div>

      <Slider value={value} onValueChange={onChange} min={min} max={max} step={step} />

      <div className="text-muted-foreground flex justify-between text-[10px]">
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
  selected: ReadingStatus[];
  onToggle: (v: ReadingStatus) => void;
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
