"use client";

import Header from "./header";
import {DirectionProvider} from "@radix-ui/react-direction";
import {ThemeProvider} from "@/components/layout/theme-provider";

const LayoutProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <DirectionProvider dir="rtl">
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >

                <Header/>
                <main>{children}</main>
            </ThemeProvider>
        </DirectionProvider>
    );
};

export default LayoutProvider;
