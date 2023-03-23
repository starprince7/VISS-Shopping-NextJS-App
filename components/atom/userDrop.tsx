import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, DropDown } from "../../assets/icons";
import {
  fetchAdminAccount,
  initializeAdminState,
} from "../../store/AdminSlice/reducer";
import { selectAdmin } from "../../store/AdminSlice/selector";
import { StorageService } from "../../utils/helpers/storage";

export interface Props {}

const UserDrop: FC<Props> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { admin } = useSelector(selectAdmin);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    StorageService.removeAuthToken();
    StorageService.removeAdminId();
    dispatch(initializeAdminState());
    router.push("/");
  };

  useEffect(() => {
    dispatch(fetchAdminAccount() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <div className="flex items-center gap-4">
      <Avatar />
      <span className="flex flex-col">
        <h4 className="text-xs italic">Administrator</h4>
        <h5 className="text-sm">{admin?.fullName}</h5>
      </span>
      <IconButton onClick={handleClick}>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        open={open}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {/* <DropDown /> */}
    </div>
  );
};
export default UserDrop;
