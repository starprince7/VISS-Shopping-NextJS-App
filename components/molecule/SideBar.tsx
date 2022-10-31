import  React, { FC } from 'react';
import { Products, Dashboard, Customers, ClipboardCopy, ClipboardCheck } from "../../assets/icons";

export interface ISideBarProps {
  className: string;
}
interface ILinks {
  to: string;
  text: string;
  icon: FC;
}
const links = [
  {
    to: "/admin/dashboard",
    text: "Dashboard",
    icon: Dashboard,
  },
  {
    to: "/admin/products",
    text: "Products",
    icon: Products,
  },
  {
    to: "/admin/customers",
    text: "Customers",
    icon: Customers,
  },
  {
    to: "/admin/orders",
    text: "Orders",
    icon: ClipboardCopy,
  },
  {
    to: "/admin/fullfilledorders",
    text: "Fullfilled Orders",
    icon: ClipboardCheck,
  }
]
const SideBar: FC<ISideBarProps> = ({ className }) => {
  
  return (
    <section className={`${className}`}>
      SideBar
    </section>
  );
}
export default SideBar;