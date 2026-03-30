import { ThemeProvider as TanstackThemeProvider } from "@lonik/themer";
import type * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof TanstackThemeProvider>) {
  return (
    <TanstackThemeProvider
      themes={["light", "dark"]}
      defaultTheme="system"
      storage="localStorage"
      {...props}
    >
      {children}
    </TanstackThemeProvider>
  );
}
