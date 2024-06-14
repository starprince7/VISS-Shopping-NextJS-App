import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { OrderRow } from "./OrderRow";
import { useFetch } from "../hooks";
import { TableLoadingView } from "./Skeleton/TableLoadingView";
import toastService from "../services/toast-notification";

export default function RecentOrders() {
  const { data, error, fetchStatus } = useFetch(
    "/api/admin/overview/recent_orders",
  );

  if (error) {
    toastService.showErrorMessage(error.message);
  }

  if (fetchStatus === "fetching") {
    return <TableLoadingView />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Order No.</TableCell>
            <TableCell align="left">Customer</TableCell>
            <TableCell align="center">Delivery Status</TableCell>
            <TableCell align="center">Items Purchased</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="right">Amount Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            // @ts-ignore
            <OrderRow key={row.orderNo} {...row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
