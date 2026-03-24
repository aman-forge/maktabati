import type { Metadata } from "next";
import LayoutProvider from "@/components/layout";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";
import { UserProvider } from "@/context/user-context";
import { createClient } from "@/utils/supabase/server";

const fontSans = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Maktabati",
  description: "",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={fontSans.variable}
    >
      <body className={`antialiased pb-18 md:p-0`}>
        <UserProvider initialUser={user}>
          <LayoutProvider>{children}</LayoutProvider>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
