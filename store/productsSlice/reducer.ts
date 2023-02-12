import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getProducts } from "../../helpers";
import { Product } from "../../types";

export type StateProps = {
  error: string;
  products: Product[];
  productsRequestStatus: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: StateProps = {
  error: "",
  products: [],
  productsRequestStatus: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const result = await getProducts();
    return result.data;
  },
);

const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsRequestStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.productsRequestStatus = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.productsRequestStatus = "failed";
      });
  },
});

export default products.reducer;
