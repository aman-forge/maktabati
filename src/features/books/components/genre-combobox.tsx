"use client";

import { CaretUpDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";
import * as React from "react";
import { cn } from "@/ui/lib/utils";
import { BOOK_GENRES, type BookGenre } from "../../../db/constants/books";

interface GenreComboboxProps {
  selected: BookGenre[];
  onSelectionChange: (genres: BookGenre[]) => void;
}

export function GenreCombobox({ selected, onSelectionChange }: GenreComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const toggleGenre = (genre: BookGenre) => {
    if (selected.includes(genre)) {
      onSelectionChange(selected.filter((g) => g !== genre));
    } else {
      onSelectionChange([...selected, genre]);
    }
  };

  const removeGenre = (genre: BookGenre, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange(selected.filter((g) => g !== genre));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" role="combobox" aria-expanded={open}>
            {selected.length === 0 ? (
              <span className="text-muted-foreground">التصنيفات</span>
            ) : selected.length === 1 ? (
              <span className="truncate">{selected[0].label}</span>
            ) : (
              <span className="truncate">{selected.length} تصنيفات</span>
            )}
            <CaretUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        }
      />
      <PopoverContent className="w-65 p-0 gap-0!" align="start">
        <Command>
          <CommandInput
            placeholder="عن التصنيفات أبحث..."
            className="placeholder:py-0! placeholder:text-sm!"
          />
          <CommandList className="max-h-70">
            <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
            <CommandGroup>
              {BOOK_GENRES.map((genre) => {
                const isSelected = selected.includes(genre);
                return (
                  <CommandItem
                    key={genre.value}
                    value={`${genre.label} ${genre.value}`}
                    onSelect={() => toggleGenre(genre)}
                    className="cursor-pointer rounded-2xl px-0"
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-4 items-center justify-center rounded-md border transition-colors",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-muted-foreground/30",
                      )}
                    >
                      {isSelected && <CheckIcon className="size-3" />}
                    </div>
                    <span className={cn(isSelected && "font-medium")}>{genre.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
        {selected.length > 0 && (
          <div className="border-t p-1">
            <div className="flex flex-wrap gap-0.5">
              {selected.map((genre) => (
                <Badge
                  key={genre.value}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 gap-1 bg-primary/10 text-primary"
                >
                  {genre.label}
                  <button
                    type="button"
                    onClick={(e) => removeGenre(genre, e)}
                    className="hover:text-destructive transition-colors rounded-full hover:bg-destructive/10 p-0.5"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelectionChange([])}
              className="w-full mt-1 h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              مسح الجميع
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
