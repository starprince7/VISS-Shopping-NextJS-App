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

import { Product as ProductType } from "../../types";
import { formatToCurrency } from "../../utils/currencyFormatter";
import { SetOrderStatus } from "../SetOrderStatus";
import { FlexRow } from "../FlexRow";
import apiClient from "../../config/apiConfig";
import toastService from "../../services/toast-notification";
import { removeProduct } from "../../store";

export const Product = (props: ProductType & { _id: string }) => {
  const { productNumber, _id, image, title, price, category, countInStock } =
    props;

  const dispatch = useDispatch();
  const deleteButtonRef = useRef<null | HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const open = Boolean(anchorEl);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const okToProceed = confirm(
      "Are you sure you want to delete this product?\nClick 'OK' to continue.",
    );

    if (!okToProceed) return;
    if (!deleteButtonRef.current) return;
    const deleteBtn = deleteButtonRef.current;
    deleteBtn.textContent = "Deleting...";
    deleteBtn.disabled = true;
    try {
      const { data } = await apiClient.delete(
        `/api/admin/product/delete/${_id}`,
      );

      if (data.error) {
        toastService.showErrorMessage(data.error);
        deleteBtn.textContent = "Delete";
        deleteBtn.disabled = false;
        return;
      }

      if (data.msg) {
        toastService.showSuccessMessage(data.msg);
        dispatch(removeProduct({ id: _id }));
        deleteBtn.textContent = "Delete";
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
          <Avatar variant="square" src={image} />
          <Typography>{title}</Typography>
        </FlexRow>
      </TableCell>
      <TableCell align="left">{productNumber || "#12345"}</TableCell>
      <TableCell align="center">{formatToCurrency(price, "NGN")}</TableCell>
      <TableCell align="center">
        <Typography>{countInStock}</Typography>
      </TableCell>
      <TableCell align="center">{category}</TableCell>
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
          <MenuItem
            ref={deleteButtonRef}
            onClick={handleDelete}
            className="text-red-600"
          >
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
