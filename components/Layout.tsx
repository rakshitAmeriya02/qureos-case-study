import React from "react";
import HeaderBar from "./HeaderBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <HeaderBar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default Layout;