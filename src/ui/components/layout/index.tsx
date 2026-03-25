import { ThemeProvider } from "@components/layout/theme-provider";
import { DirectionProvider } from "@components/ui/direction";
import { Toaster } from "@components/ui/sonner";
import { AuthDialogProvider } from "@features/auth/components/auth-dialog-provider";
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
        <AuthDialogProvider>
          <TooltipProvider>
            <Header />
            <main className="pt-14">{children}</main>
            <BottomBar />
            <Toaster richColors />
          </TooltipProvider>
        </AuthDialogProvider>
      </ThemeProvider>
    </DirectionProvider>
  );
};

export default LayoutProvider;
