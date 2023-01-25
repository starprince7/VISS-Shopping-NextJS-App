import { useState } from "react";
import {
  IconButton,
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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Order } from "../types";
import { formatToCurrency } from "../utils/currencyFormatter";

export const OrderRow = (props: Order) => {
  const {
    orderNo,
    orderDate,
    orderDetails,
    isOrderFulfilled,
    customer,
    sumTotal,
    paymentStatus,
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {orderNo}
        </TableCell>
        <TableCell align="left">
          {customer.name.firstname} {customer.name.lastname}
        </TableCell>
        <TableCell align="center">
          {isOrderFulfilled ? (
            <Chip
              label="Delivered"
              sx={{ color: "#1EE0AC", width: 80 }}
              style={{ fontSize: 11 }}
              className="bg-green-100"
            />
          ) : (
            <Chip
              label="Waiting"
              sx={{ color: "#F4BD0E", width: 80 }}
              style={{ fontSize: 11 }}
              className="bg-yellow-100"
            />
          )}
        </TableCell>
        <TableCell
          align="center"
          className="flex justify-center items-center space-x-2"
        >
          <Typography>{orderDetails.length}</Typography>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{orderDate}</TableCell>
        <TableCell
          align="right"
          className={`${
            paymentStatus === "SUCCESS" ? "text-green-500" : "text-gray-400"
          }`}
        >
          <b>{formatToCurrency(sumTotal, "NGN")}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="caption"
                color="secondary"
                gutterBottom
                component="div"
              >
                Cart Item(s)
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Stock left</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.length > 0 &&
                    orderDetails.map((item) => (
                      <TableRow key={item.title}>
                        <TableCell component="th" scope="row">
                          <Avatar variant="square" src={item.image} />
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: "secondary.contrastText",
                            fontWeight: 600,
                          }}
                        >
                          {formatToCurrency(item.price, "NGN")}
                        </TableCell>
                        <TableCell align="right">{item.countInStock}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
