import { ThemeProvider } from "@components/layout/theme-provider";
import { DirectionProvider } from "@components/ui/direction";
import { Toaster } from "@components/ui/sonner";
import { TooltipProvider } from "@shadcn/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import AuthProvider from "@/features/auth/components/provider";
import { BookTrackingProvider } from "@/features/books/context/book-tracking-context";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <DirectionProvider direction="rtl">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <BookTrackingProvider>
              <TooltipProvider>
                {children}
                <Toaster richColors />
              </TooltipProvider>
            </BookTrackingProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </DirectionProvider>
    </AuthProvider>
  );
};

export default Providers;
