import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface ISideLinkProps {
  Icon: FC<{ className: string }>
  to: string
  text: string
}

const SideLink: FC<ISideLinkProps> = ({ to, text, Icon }) => {
  const router = useRouter();
  return (
    <Link href={to}>
      <div className={`${router.pathname === to ? 'bg-linkBg text-primary' : 'text-gray'} hover:text-primary hover:bg-linkBg transition-colors ease-in duration-500 flex gap-4 items-center py-4 px-3 rounded-md cursor-pointer group`}>
        <Icon className={`group-hover:fill-primary  ${router.pathname === to ? 'fill-primary' : 'fill-gray'} transition-colors ease-in duration-500`} />
        <span className="text-base font-medium">{text}</span>
      </div>
    </Link>
  );
};
export default SideLink;
