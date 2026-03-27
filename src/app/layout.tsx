import "@/ui/style/globals.css";
import LayoutProvider from "@components/layout";
import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";

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
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;
