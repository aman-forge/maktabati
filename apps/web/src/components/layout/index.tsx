"use client";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import BottomBar from "./bottom-bar";
import Header from "./header";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DirectionProvider direction="rtl">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Header />
          <main>{children}</main>
          <BottomBar />
          <Toaster richColors />
        </TooltipProvider>
      </ThemeProvider>
    </DirectionProvider>
  );
};

export default LayoutProvider;
