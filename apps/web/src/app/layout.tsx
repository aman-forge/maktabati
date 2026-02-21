import type { Metadata } from "next";
import LayoutProvider from "@/components/layout";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";

const notoSans = Noto_Sans_Arabic({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
});

import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
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
      className={notoSans.variable}
    >
      <body className={`antialiased`}>
        <LayoutProvider user={user}>{children}</LayoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;
