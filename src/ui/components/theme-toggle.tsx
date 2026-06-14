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
      className="hidden size-9 rounded-xl sm:flex"
    >
      <MoonIcon className="duration size-4.5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <SunDimIcon className="duration absolute size-4.5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">تبديل السمة</span>
    </Button>
  );
}
