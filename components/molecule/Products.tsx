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
import { AnyAction } from "@reduxjs/toolkit";
import InfiniteScroller from "react-infinite-scroller";

import { useFetch } from "../../hooks";
import { TableLoadingView } from "../skeleton/TableLoadingView";
import { Product } from "../atom";
import { fetchProducts, selectProductsState } from "../../store";
import { Button, Typography } from "@mui/material";
import { FlexRow } from "../FlexRow";

export default function Products() {
  const dispatch = useDispatch();
  const { products, productsRequestStatus, page, totalCount, hasMore } =
    useSelector(selectProductsState);

  const loadProducts = () => {
    dispatch(fetchProducts({ page: page + 1 }) as unknown as AnyAction);
  };

  const loadPreviousProducts = () => {
    dispatch(fetchProducts({ page: page + 1 }) as unknown as AnyAction);
  };

  React.useEffect(() => {
    loadProducts();
  }, [fetchProducts, dispatch]);

  return (
    <TableContainer component={Paper} sx={{ mx: "auto" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="left">ID</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products?.map((product, index) => (
            // @ts-ignore
            <Product key={index} {...product} />
          ))}
        </TableBody>
      </Table>
      {productsRequestStatus === "loading" && <TableLoadingView />}
      <FlexRow sx={{ px: 1, justifyContent: "center", alignItems: "center" }}>
        {/* {page > 1 && (
          <Button onClick={loadPreviousProducts} startIcon={<UndoIcon />}>
            <Typography>Previous</Typography>
          </Button>
        )} */}
        {hasMore && (
          <Button onClick={loadProducts} endIcon={<RedoIcon />}>
            <Typography>Next</Typography>
          </Button>
        )}
      </FlexRow>
    </TableContainer>
  );
}
