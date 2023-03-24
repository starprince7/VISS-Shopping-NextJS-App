import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import { useDispatch, useSelector } from "react-redux";
import { Button, TablePagination, Typography } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";

import { useFetch } from "../../hooks";
import { TableLoadingView } from "../skeleton/TableLoadingView";
import { Customer } from "../atom";
import { FlexRow } from "../FlexRow";
import { selectCustomers } from "../../store/customersSlice/selector";
import { fetchCustomers } from "../../store/customersSlice/reducer";

export default function Customers() {
  const dispatch = useDispatch();
  const {
    customers = [],
    customersRequestStatus,
    page,
    totalCount,
    hasMore,
  } = useSelector(selectCustomers);

  const loadCustomers = React.useCallback(
    (page: number = 0) => {
      dispatch(fetchCustomers({ page: page + 1 }) as unknown as AnyAction);
    },
    [dispatch],
  );

  // const loadPreviousCustomers = () => {
  //   dispatch(fetchCustomers({ page: page + 1 }) as unknown as AnyAction);
  // };

  React.useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ mx: "auto", maxHeight: "77vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="left">State</TableCell>
              <TableCell align="center">Number of Transactions</TableCell>
              <TableCell align="center">Cart Items</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers?.map((customer, index) => (
              // @ts-ignore
              <Customer key={customer._id} {...customer} />
            ))}
          </TableBody>
        </Table>
        {customersRequestStatus === "loading" && <TableLoadingView />}
      </TableContainer>
      <FlexRow sx={{ px: 1, justifyContent: "center", alignItems: "center" }}>
        {hasMore && (
          <Button onClick={() => loadCustomers(page)} endIcon={<RedoIcon />}>
            <Typography>Next</Typography>
          </Button>
        )}
      </FlexRow>
      {/* <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalCount}
        rowsPerPage={products.length}
        page={page}
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
