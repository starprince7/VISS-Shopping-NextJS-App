import React, { FC, ReactNode } from "react";

import SideBar from "../molecule/SideBar";

import Header from "./Header-Admin";

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
