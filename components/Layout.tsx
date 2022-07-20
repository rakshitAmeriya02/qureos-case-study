import React from "react";
import HeaderBar from "@/components/HeaderBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <HeaderBar />
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
