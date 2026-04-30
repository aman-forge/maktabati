"use client";

import { CheckIcon, TagIcon } from "@phosphor-icons/react";
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "group gap-1",
              selected.length !== 0 && "text-primary! hover:text-foreground!",
            )}
            aria-expanded={open}
          >
            <TagIcon className="size-4 shrink-0 opacity-50 group-hover:opacity-100" />
            {selected.length === 0 ? (
              <span className="text-muted-foreground group-hover:text-foreground">التصنيفات</span>
            ) : selected.length === 1 ? (
              <span className="truncate">{selected[0].label}</span>
            ) : (
              <span className="truncate">{selected.length} تصنيفات</span>
            )}
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
              {[...BOOK_GENRES]
                .sort((a, b) => a.label.localeCompare(b.label, "ar"))
                .map((genre) => {
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
      </PopoverContent>
    </Popover>
  );
}
