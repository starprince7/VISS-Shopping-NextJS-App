import React, { FC } from "react";
import ErrorIcon from "@mui/icons-material/Error";

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
    to: "/admin/dashboard/pending_orders",
    text: "Pending Orders",
    Icon: ClipboardCopy,
  },
  {
    to: "/admin/dashboard/completed_orders",
    text: "Completed Orders",
    Icon: ClipboardCheck,
  },
  {
    to: "/admin/dashboard/failed_orders",
    text: "Failed Orders",
    Icon: ErrorIcon,
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
