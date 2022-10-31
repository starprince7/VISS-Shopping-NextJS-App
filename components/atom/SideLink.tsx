import { useRouter } from "next/router";
import  React, { FC } from 'react';

export interface ISideLinkProps {
  children: string;
  to: string;
}

const SideLink: FC<ISideLinkProps> = (props) => {
  const router = useRouter();
  return (
    <section>
      SideLink
    </section>
  );
}
export default SideLink;