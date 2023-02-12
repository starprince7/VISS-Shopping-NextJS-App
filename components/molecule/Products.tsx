import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";

import { useFetch } from "../../hooks";
import { TableLoadingView } from "../skeleton/TableLoadingView";
import { Product } from "../atom";
import { fetchProducts, selectProductsState } from "../../store";

export default function Products() {
  const dispatch = useDispatch();
  const { products, productsRequestStatus } = useSelector(selectProductsState);

  React.useEffect(() => {
    dispatch(fetchProducts() as unknown as AnyAction);
  }, [dispatch]);

  if (productsRequestStatus !== "succeeded") {
    return <TableLoadingView />;
  }

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
    </TableContainer>
  );
}
