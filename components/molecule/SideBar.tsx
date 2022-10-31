import React, { FC } from 'react';

import {
  Products,
  Dashboard,
  Customers,
  ClipboardCopy,
  ClipboardCheck,
} from '../../assets/icons';
import { SideLink } from '../atom';

export interface ISideBarProps {
  className: string
}
interface ILinks {
  to: string
  text: string
  Icon: FC
}
const links: ILinks[] = [
  {
    to: '/admin/dashboard',
    text: 'Dashboard',
    Icon: Dashboard,
  },
  {
    to: '/admin/products',
    text: 'Products',
    Icon: Products,
  },
  {
    to: '/admin/customers',
    text: 'Customers',
    Icon: Customers,
  },
  {
    to: '/admin/orders',
    text: 'Orders',
    Icon: ClipboardCopy,
  },
  {
    to: '/admin/fullfilledorders',
    text: 'Fullfilled Orders',
    Icon: ClipboardCheck,
  },
];
const SideBar: FC<ISideBarProps> = ({ className }) => (
  <section className={`${className} h-full gap-3 flex flex-col px-6`}>
    {links.map((props) => (
      <SideLink {...props} />
    ))}
  </section>
);
export default SideBar;
