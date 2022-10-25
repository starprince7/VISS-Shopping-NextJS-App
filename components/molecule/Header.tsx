import  React, { FC } from 'react';

export interface IHeaderProps {
  className: string;
}

const Header: FC<IHeaderProps> = ({className}) => {
  return (
    <section className={`${className} w-full`}>
      Header
    </section>
  );
}
export default Header;