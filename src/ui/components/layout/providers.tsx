import { ThemeProvider } from "@components/layout/theme-provider";
import { DirectionProvider } from "@components/ui/direction";
import { Toaster } from "@components/ui/sonner";
import type { ReactNode } from "react";
import AuthProvider from "@/features/auth/components/provider";
import { BookTrackingProvider } from "@/features/books/context/book-tracking-context";
import { TooltipProvider } from "../ui/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <DirectionProvider direction="rtl">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BookTrackingProvider>
            <TooltipProvider>
              {children}
              <Toaster richColors />
            </TooltipProvider>
          </BookTrackingProvider>
        </ThemeProvider>
      </DirectionProvider>
    </AuthProvider>
  );
};

export default Providers;
