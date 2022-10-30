import  React, { FC } from 'react';
import { Avatar, DropDown } from "../../assets/icons";

export interface IuserDropProps {
}

const UserDrop: FC<IuserDropProps> = (props) => {
  return (
    <div>
      <Avatar />
      <div>
        <span>
          <h4>Administrator</h4>
          <h5>John Doe</h5>
        </span>
        <DropDown />
      </div>
    </div>
  );
}
export default UserDrop;