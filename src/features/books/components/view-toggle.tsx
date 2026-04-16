"use client";

import { GridFourIcon, RowsIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { ToggleGroup, ToggleGroupItem } from "@shadcn/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shadcn/tooltip";
import { cn } from "@/ui/lib/utils";

const VIEW_OPTIONS = [
  { value: "grid" as const, label: "شبكة البطاقات", Icon: SquaresFourIcon },
  { value: "detailed" as const, label: "تفصيلي", Icon: GridFourIcon },
  { value: "list" as const, label: "قائمة", Icon: RowsIcon },
] as const;

export type ViewMode = "grid" | "detailed" | "list";

interface ViewToggleProps {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
}

export function ViewToggle({ value, onValueChange }: ViewToggleProps) {
  return (
    <TooltipProvider delay={300}>
      <ToggleGroup
        value={[value]}
        onValueChange={(values: string[]) => {
          const newValue = values[0];
          if (newValue) {
            onValueChange(newValue as ViewMode);
          }
        }}
        className="bg-muted/50 rounded-full p-0.5"
      >
        {VIEW_OPTIONS.map(({ value: optionValue, label, Icon }) => (
          <Tooltip key={optionValue}>
            <TooltipTrigger
              render={
                <ToggleGroupItem
                  value={optionValue}
                  aria-label={label}
                  className={cn(
                    "size-8 aspect-square rounded-md",
                    "data-[state=on]:bg-background data-[state=on]:shadow-sm",
                    "transition-all duration-150",
                  )}
                >
                  <Icon
                    weight={value === optionValue ? "fill" : "regular"}
                    className="h-4 w-4"
                  />
                </ToggleGroupItem>
              }
            />
            <TooltipContent side="bottom" className="text-xs">
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>
    </TooltipProvider>
  );
}
