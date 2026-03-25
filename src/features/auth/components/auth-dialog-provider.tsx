"use client";

import { Dialog, DialogContent } from "@components/ui/dialog";
// import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

type AuthView = "login" | "register" | null;

interface AuthDialogContextType {
  isOpen: boolean;
  view: AuthView;
  openDialog: (view: AuthView) => void;
  closeDialog: () => void;
  setView: (view: AuthView) => void;
}

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(
  undefined,
);

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>(null);
  // const pathname = usePathname();

  // Close dialog on route change (optional but good practice)
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const openDialog = (newView: AuthView) => {
    setView(newView);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setTimeout(() => setView(null), 150); // clear after animation
  };

  return (
    <AuthDialogContext.Provider
      value={{ isOpen, view, openDialog, closeDialog, setView }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="w-dvw h-dvh sm:h-auto max-w-none sm:max-w-md top-0 inset-s-0 translate-x-0 rtl:translate-x-0 translate-y-0 sm:top-1/2 sm:inset-s-1/2 sm:-translate-x-1/2 sm:rtl:translate-x-1/2 sm:-translate-y-1/2 rounded-none sm:rounded-4xl p-6 md:p-8 flex flex-col justify-center overflow-y-auto"
          showCloseButton={true}
        >
          {view === "login" && <LoginForm />}
          {view === "register" && <RegisterForm />}
        </DialogContent>
      </Dialog>
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (context === undefined) {
    throw new Error("useAuthDialog must be used within an AuthDialogProvider");
  }
  return context;
}
