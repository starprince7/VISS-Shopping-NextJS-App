import  React, { FC } from 'react';
import Logo from "../../assets/icons/Logo";
import { UserDrop } from "../atom";

export interface IHeaderProps {
  className: string;
}

const Header: FC<IHeaderProps> = ({className}) => {
  return (
    <section className={`${className} w-full flex justify-between px-12 py-6`}>
      <Logo />
      <UserDrop />
    </section>
  );
}
export default Header;