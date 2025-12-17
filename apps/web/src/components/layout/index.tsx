"use client";

import { DirectionProvider } from "@radix-ui/react-direction";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import BottomBar from "./bottom-bar";
import Header from "./header";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DirectionProvider dir="rtl">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <main>{children}</main>
        <BottomBar />
        <Toaster />
      </ThemeProvider>
    </DirectionProvider>
  );
};

export default LayoutProvider;
