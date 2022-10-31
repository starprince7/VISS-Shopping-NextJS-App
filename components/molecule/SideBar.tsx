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
  className: string;
}
interface ILinks {
  to: string;
  text: string;
  Icon: FC;
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
  <section className={`${className}`}>
    {links.map(({ text, Icon, to }) => (
      <SideLink {...{ text, to }}>
        <Icon />
      </SideLink>
    ))}
  </section>
);
export default SideBar;
