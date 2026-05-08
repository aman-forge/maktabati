import type { ReactNode } from "react";
import BottomBar from "./bottom-bar";
import Header from "./header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="md:pt-14 md:pb-0 pb-16">{children}</main>
      <BottomBar />
    </>
  );
};

export default MainLayout;
