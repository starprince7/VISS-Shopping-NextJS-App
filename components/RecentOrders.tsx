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
import { TableLoadingView } from "./skeleton/TableLoadingView";

function createData(
  orderNo: string,
  customer: {},
  status: boolean,
  orderDate: string,
  sumTotal: number,
) {
  return {
    orderNo,
    customer,
    isOrderFulfilled: status,
    orderDate,
    sumTotal,
    orderDetails: [],
  };
}

const rows = [
  createData("1", { fullName: "Jon Snow" }, false, "12-04-22", 40000),
  createData("1", { fullName: "Megan Snow" }, true, "02-05-23", 10000),
  createData("1", { fullName: "Don Pedro" }, true, "21-04-22", 60000),
  createData("1", { fullName: "Don Pedro" }, true, "21-04-22", 60000),
  createData("1", { fullName: "Don Pedro" }, true, "21-04-22", 60000),
];

export default function RecentOrders() {
  const { data, error, fetchStatus } = useFetch(
    "/api/admin/overview/recent_orders",
  );
  console.log("Recent Orders :", data);

  if (fetchStatus !== "succeeded") {
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
