import React, { FC, ReactNode } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <section className="min-h-screen bg-white layout">
      <Header className="header" />
      <SideBar className="sidebar" />
      <main className="body" {...props}>
        {children}
      </main>
    </section>
  );
};
export default Layout;
