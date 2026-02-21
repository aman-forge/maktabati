"use client";

import { DirectionProvider } from "@radix-ui/react-direction";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { type User } from "@supabase/supabase-js";
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
    <DirectionProvider dir="rtl">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header user={user} />
        <main>{children}</main>
        <BottomBar />
        <Toaster />
      </ThemeProvider>
    </DirectionProvider>
  );
};

export default LayoutProvider;
