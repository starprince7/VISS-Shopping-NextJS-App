import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getProducts } from "../../helpers";
import toastService from "../../services/toast-notification";
import { Product } from "../../types";

export type StateProps = {
  error: string;
  products: Product[];
  page: number;
  hasMore: boolean;
  totalCount: number;
  productsRequestStatus: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: StateProps = {
  error: "",
  products: [],
  page: 0,
  hasMore: false,
  totalCount: 0,
  productsRequestStatus: "idle",
};

type FetchProductsArgs = {
  page: number;
  products?: Product[];
  totalCount?: number;
};

export const fetchProducts = createAsyncThunk<any, FetchProductsArgs>(
  "products/fetchProducts",
  async ({ page }) => {
    const result = await getProducts(page);
    return result.data;
  },
);

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<{ id: string }>) => {
      state.products = state.products.filter(
        (product) =>
          // product.productNumber !== action.payload.id ||
          product._id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsRequestStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products =
          action.payload.page === 1
            ? action.payload.products
            : [...state.products, ...action.payload.products];
        state.page = action.payload.page;
        state.hasMore = state.products.length < action.payload.totalCount;
        state.totalCount = action.payload.totalCount;
        state.productsRequestStatus = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.productsRequestStatus = "failed";
        toastService.showErrorMessage(action.error.message as string);
      });
  },
});

export const { removeProduct } = products.actions;
export default products.reducer;
