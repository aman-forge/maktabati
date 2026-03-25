import "@/ui/style/globals.css";
import type { Metadata } from "next";
import LayoutProvider from "@components/layout";
import { Noto_Sans_Arabic } from "next/font/google";
import { UserProvider } from "@features/auth/user-context";

const fontSans = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Maktabati",
  description: "",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={fontSans.variable}
    >
      <body className={`antialiased pb-18 md:p-0`}>
        <UserProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
