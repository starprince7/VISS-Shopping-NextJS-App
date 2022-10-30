import  React, { FC } from 'react';
import { Avatar, DropDown } from "../../assets/icons";

export interface IuserDropProps {
}

const UserDrop: FC<IuserDropProps> = (props) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar />
        <span className="flex flex-col">
          <h4 className="text-xs italic">Administrator</h4>
          <h5 className="text-sm">John Doe</h5>
        </span>
      <DropDown />
    </div>
  );
}
export default UserDrop;