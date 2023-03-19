import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  IconButton,
  Button,
  TableCell,
  TableRow,
  Box,
  Collapse,
  Typography,
  TableHead,
  Table,
  TableBody,
  Chip,
  Avatar,
  Modal,
  Menu,
  MenuItem,
} from "@mui/material";
import DotIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { CustomerType } from "../../types";
import { formatToCurrency } from "../../utils/currencyFormatter";
import { SetOrderStatus } from "../SetOrderStatus";
import { FlexRow } from "../FlexRow";
import apiClient from "../../config/apiConfig";
import toastService from "../../services/toast-notification";
import { getColorFromString } from "../../utils/getColorFromString";
import { removeCustomer } from "../../store/customersSlice/reducer";

export const Customer = (props: CustomerType) => {
  const { fullName, name, email, shippingInfo, orderHistory, cart, _id } =
    props;

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const open = Boolean(anchorEl);

  const { phoneNumber, state } = shippingInfo[0];
  const numberOfItemsInCart = cart?.length || 0;
  const ordersPaidFor = orderHistory?.length || 0;
  const initials = name.firstname[0]; /* + name.lastname[0] */

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (e) => {
    const deleteBtn = e.target;
    // eslint-disable-next-line no-alert
    // eslint-disable-next-line no-restricted-globals
    const okToProceed = confirm(
      "Confirm, are you sure you want to delete this Customer?\nClick 'OK' if you wish to continue.",
    );

    if (!okToProceed) return;

    deleteBtn.innerText = "Deleting...";
    deleteBtn.disabled = true;
    try {
      const { data } = await apiClient.delete(
        `/api/admin/customers/delete/${_id}`,
      );

      if (data.error) {
        toastService.showErrorMessage(data.error);
        deleteBtn.innerText = "Delete";
        deleteBtn.disabled = false;
        return;
      }

      if (data.msg) {
        toastService.showSuccessMessage(data.msg);
        dispatch(removeCustomer({ id: _id }));
        deleteBtn.innerText = "Delete";
        deleteBtn.disabled = false;
        closeMenu();
      }
    } catch (e) {
      console.log(e);
      deleteBtn.textContent = "Delete";
      deleteBtn.disabled = false;
    }
    closeMenu();
  };

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        <FlexRow alignItems="center" className="space-x-4">
          <Avatar
            variant="circular"
            sx={{
              bgcolor: getColorFromString(
                fullName || name.lastname || name.firstname,
              ),
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>
          <div className="flex flex-col">
            <Typography className="text-lg">
              {!fullName && name.firstname} {!fullName && name.lastname}{" "}
              {fullName}
            </Typography>
            <Typography variant="subtitle2">{email as string}</Typography>
          </div>
        </FlexRow>
      </TableCell>
      <TableCell align="left">{state}</TableCell>
      <TableCell align="center">{ordersPaidFor}</TableCell>
      <TableCell align="center">{numberOfItemsInCart}</TableCell>
      <TableCell align="center">{phoneNumber}</TableCell>
      <TableCell align="right">
        <IconButton onClick={openMenu}>
          <DotIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleDelete} className="text-red-600">
            Delete
          </MenuItem>
          <MenuItem onClick={closeMenu} className="text-neutral-300" disabled>
            Amend
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};
