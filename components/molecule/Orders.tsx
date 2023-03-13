import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RedoIcon from "@mui/icons-material/Redo";
import { Button, Typography } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";

import { OrderRow } from "../OrderRow";
import { useFetch } from "../../hooks";
import { TableLoadingView } from "../skeleton/TableLoadingView";
import toastService from "../../services/toast-notification";
import { selectOrders } from "../../store/orderSlice/selector";
import { fetchOrders } from "../../store/orderSlice/reducer";
import { FlexRow } from "../FlexRow";

export default function Orders() {
  const dispatch = useDispatch();
  const {
    hasMore,
    orders = [],
    ordersRequestStatus,
    page,
    totalCount,
  } = useSelector(selectOrders);

  const loadPendingOrders = React.useCallback(() => {
    dispatch(
      fetchOrders({
        page: page + 1,
        status: "PENDING",
      }) as unknown as AnyAction,
    );
  }, [page, dispatch]);

  React.useEffect(() => {
    loadPendingOrders();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: "76vh" }}>
        <Table stickyHeader aria-label="sticky table">
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
            {orders.map((order) => (
              // @ts-ignore
              <OrderRow key={order.orderNo} {...order} />
            ))}
          </TableBody>
        </Table>
        {ordersRequestStatus === "loading" && <TableLoadingView />}
      </TableContainer>
      <FlexRow sx={{ px: 1, justifyContent: "center", alignItems: "center" }}>
        {hasMore && (
          <Button onClick={loadPendingOrders} endIcon={<RedoIcon />}>
            <Typography>Next</Typography>
          </Button>
        )}
      </FlexRow>
    </Paper>
  );
}
