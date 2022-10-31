import React, { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';

export interface ISideLinkProps {
  children: ReactNode;
  to: string;
}

const SideLink: FC<ISideLinkProps> = (props) => {
  const router = useRouter();
  return <section>SideLink</section>;
};
export default SideLink;
