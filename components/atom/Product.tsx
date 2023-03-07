import { useState } from "react";
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

export const Product = (props: ProductType & { _id: string }) => {
  const { productNumber, _id, image, title, price, category, countInStock } =
    props;

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
    try {
      const { data } = await apiClient.delete(
        `/api/admin/product/delete/${productNumber || _id}`,
      );
      if (data.error) {
        toastService.showErrorMessage(data.error);
        return;
      }

      if (data.msg) {
        toastService.showSuccessMessage(data.msg);
      }
    } catch (e) {
      console.log(e);
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
