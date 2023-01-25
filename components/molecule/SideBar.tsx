import React, { FC } from "react";

import {
  Products,
  Dashboard,
  Customers,
  ClipboardCopy,
  ClipboardCheck,
} from "../../assets/icons";
import { SideLink } from "../atom";

export interface ISideBarProps {
  className: string;
}
interface ILinks {
  to: string;
  text: string;
  Icon: FC;
}
const links: ILinks[] = [
  {
    to: "/admin/dashboard",
    text: "Dashboard",
    Icon: Dashboard,
  },
  {
    to: "/admin/dashboard/products",
    text: "Products",
    Icon: Products,
  },
  {
    to: "/admin/dashboard/customers",
    text: "Customers",
    Icon: Customers,
  },
  {
    to: "/admin/dashboard/orders",
    text: "Orders",
    Icon: ClipboardCopy,
  },
  {
    to: "/admin/dashboard/fullfilledorders",
    text: "Fullfilled Orders",
    Icon: ClipboardCheck,
  },
];
const SideBar: FC<ISideBarProps> = ({ className }) => (
  <section className={`${className} h-full gap-3 flex flex-col px-6`}>
    {links.map((link) => (
      <SideLink {...link} key={link.text} />
    ))}
  </section>
);
export default SideBar;
