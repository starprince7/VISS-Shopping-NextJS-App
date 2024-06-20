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
import { Alert, Button, Typography } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";

import { OrderRow } from "../OrderRow";
import { useFetch } from "../../hooks";
import { TableLoadingView } from "../Skeleton/TableLoadingView";
import toastService from "../../services/toast-notification";
import { fetchCompletedOrders } from "../../store/completedOrderSlice/reducer"; /* From completed Order silce folder */
import { selectOrders } from "../../store/completedOrderSlice/selector"; /* From completed Order silce folder */
import { FlexRow } from "../FlexRow";
import { OrderStatus } from "../../types";

type Props = {
  trackStatus: OrderStatus;
};

export default function CompletedOrders({ trackStatus = "DELIVERED" }: Props) {
  const dispatch = useDispatch();
  const {
    hasMore,
    completedOrders = [],
    ordersRequestStatus,
    page,
    totalCount,
  } = useSelector(selectOrders);

  const loadOrders = React.useCallback(() => {
    dispatch(
      fetchCompletedOrders({
        page: page + 1,
        status: trackStatus,
      }) as unknown as AnyAction,
    );
  }, [page, dispatch]);

  React.useEffect(() => {
    if (completedOrders.length) return;
    loadOrders();
  }, [completedOrders]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {totalCount > 0 ? (
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
              {completedOrders.map((order) => (
                // @ts-ignore
                <OrderRow key={order.orderNo} {...order} />
              ))}
            </TableBody>
          </Table>
          {ordersRequestStatus === "loading" && <TableLoadingView />}
        </TableContainer>
      ) : (
        <Alert severity="info">
          There are no completed orders logged in the system.
        </Alert>
      )}
      <FlexRow sx={{ px: 1, justifyContent: "center", alignItems: "center" }}>
        {hasMore && (
          <Button onClick={loadOrders} endIcon={<RedoIcon />}>
            <Typography>Next</Typography>
          </Button>
        )}
      </FlexRow>
    </Paper>
  );
}
