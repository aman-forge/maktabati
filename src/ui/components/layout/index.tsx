import { ThemeProvider } from "@components/layout/theme-provider";
import { DirectionProvider } from "@components/ui/direction";
import { Toaster } from "@components/ui/sonner";
import type { ReactNode } from "react";
import AuthProvider from "@/features/auth/provider";
import { BookTrackingProvider } from "@/features/books/context/book-tracking-context";
import { TooltipProvider } from "../ui/tooltip";
import BottomBar from "./bottom-bar";
import Header from "./header";

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
              <Header />
              <main className="md:pt-14 md:pb-0 pb-16">{children}</main>
              <BottomBar />
              <Toaster richColors />
            </TooltipProvider>
          </BookTrackingProvider>
        </ThemeProvider>
      </DirectionProvider>
    </AuthProvider>
  );
};

export default Providers;
