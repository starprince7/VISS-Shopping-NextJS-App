import React, { FC, ReactNode } from 'react';
import Header from "./Header";
import SideBar from "./SideBar";

export interface ILayoutProps {
  children: ReactNode,
  className?: string;
}

const Layout: FC<ILayoutProps> = ({ children, ...props }) => {
  return (
    <section className="min-h-screen bg-white layout">
      <Header className="header" />
      <SideBar className="sidebar" />
      <main className="body" {...props}>
        {children}
      </main>
    </section>
  );
}
export default Layout;