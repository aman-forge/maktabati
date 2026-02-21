"use client";

import type { User } from "@supabase/supabase-js";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import BottomBar from "./bottom-bar";
import Header from "./header";

const LayoutProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  return (
    <DirectionProvider direction="rtl">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Header user={user} />
          <main>{children}</main>
          <BottomBar />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </DirectionProvider>
  );
};

export default LayoutProvider;
