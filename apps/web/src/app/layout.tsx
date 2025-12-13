import React from "react";
import type {Metadata} from "next";
import LayoutProvider from "@/components/layout";
import localFont from "next/font/local";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({variable:'--font-sans'});

const alJazeeraArabic = localFont({
    src: [
        {
            path: "./fonts/Al-Jazeera-Arabic Light.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "./fonts/Al-Jazeera-Arabic Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/Al-Jazeera-Arabic Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-body",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Your App Name",
    description: "Your app description",
};

const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning className={nunitoSans.variable}>
        <body className={`${alJazeeraArabic.variable} font-body antialiased`}>
        <LayoutProvider>{children}</LayoutProvider>
        </body>
        </html>
    );
};

export default RootLayout;