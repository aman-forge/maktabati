import type { Metadata } from "next";
import LayoutProvider from "@/components/layout";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";

const notoSans = Noto_Sans_Arabic({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
});

// const alJazeeraArabic = localFont({
//   src: [
//     {
//       path: "./fonts/Al-Jazeera-Arabic Light.ttf",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "./fonts/Al-Jazeera-Arabic Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/Al-Jazeera-Arabic Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-body",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={notoSans.variable}
    >
      <body className={`antialiased`}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;
