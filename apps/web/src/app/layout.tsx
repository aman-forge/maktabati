import type { Metadata } from "next";
import LayoutProvider from "@/components/layout";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";
import { UserProvider } from "@/context/user-context";
import { getCurrentUser } from "@/actions/auth";

const fontSans = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Maktabati",
  description: "",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={fontSans.variable}
    >
      <body className={`antialiased`}>
        <UserProvider initialUser={user}>
          <LayoutProvider>{children}</LayoutProvider>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
