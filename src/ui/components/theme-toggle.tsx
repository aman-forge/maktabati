"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { Button } from "@components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="size-9 hidden sm:flex"
    >
      <HugeiconsIcon
        icon={Sun03Icon}
        className="size-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration"
      />
      <HugeiconsIcon
        icon={Moon02Icon}
        className="absolute size-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration"
      />
      <span className="sr-only">تبديل السمة</span>
    </Button>
  );
}
