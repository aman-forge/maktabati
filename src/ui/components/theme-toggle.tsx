import { Button } from "@components/ui/button";
import { useTheme } from "@lonik/themer";
import { MoonIcon, SunDimIcon } from "@phosphor-icons/react";

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
      <MoonIcon className="size-4.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration" />
      <SunDimIcon className="absolute size-4.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration" />
      <span className="sr-only">تبديل السمة</span>
    </Button>
  );
}
