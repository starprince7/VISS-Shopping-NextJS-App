import  React, { FC } from 'react';

export interface ISideBarProps {
  className: string;
}

const SideBar: FC<ISideBarProps> = ({className}) => {
  return (
    <section className={`${className}`}>
      SideBar
    </section>
  );
}
export default SideBar;