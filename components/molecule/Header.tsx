import  React, { FC } from 'react';
import Logo from "../../assets/icons/Logo";

export interface IHeaderProps {
  className: string;
}

const Header: FC<IHeaderProps> = ({className}) => {
  return (
    <section className={`${className} w-full flex justify-between px-12 bg-bls`}>
      <Logo />
      Header
    </section>
  );
}
export default Header;