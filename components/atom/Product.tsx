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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Product } from "../../types";
import { formatToCurrency } from "../../utils/currencyFormatter";
import { SetOrderStatus } from "../SetOrderStatus";
import { FlexRow } from "../FlexRow";

export const OrderRow = (props: Product & { _id: string }) => {
  const { _id, image, title, price, category, countInStock } = props;

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        <FlexRow alignItems="center" className="space-x-4">
          <Avatar variant="square" src={image} />
          <Typography>{title}</Typography>
        </FlexRow>
      </TableCell>
      <TableCell align="left">#12345</TableCell>
      <TableCell align="center">{formatToCurrency(price, "NGN")}</TableCell>
      <TableCell align="center">
        <Typography>{countInStock}</Typography>
      </TableCell>
      <TableCell align="center">{category}</TableCell>
      <TableCell align="right">
        <Button>Dosome Action</Button>
      </TableCell>
    </TableRow>
  );
};
