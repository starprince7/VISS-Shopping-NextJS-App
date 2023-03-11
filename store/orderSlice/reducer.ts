import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "../../helpers/getOrders";
import toastService from "../../services/toast-notification";
import { Order } from "../../types";

export interface StateProps {
  error: string;
  orders: Order[];
  page: number;
  hasMore: boolean;
  totalCount: number;
  ordersRequestStatus: "idle" | "loading" | "succeeded" | "failed";
}

type AsyncActionArgs = {
  page: number;
};

const initialState: StateProps = {
  error: "",
  orders: [],
  page: 0,
  hasMore: false,
  totalCount: 0,
  ordersRequestStatus: "idle",
};

export const fetchOrders = createAsyncThunk<any, AsyncActionArgs>(
  "orders/fetchOrders",
  async ({ page }) => {
    const result = await getOrders(page);
    return result.data;
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    removeOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.ordersRequestStatus = "loading";
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.ordersRequestStatus = "failed";
      state.error = action.error.message as string;
      toastService.showErrorMessage(action.error.message as string);
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.ordersRequestStatus = "succeeded";
      state.orders =
        action.payload.page === 1
          ? action.payload.orders
          : [...state.orders, ...action.payload.orders];
      state.page = action.payload.page;
      state.totalCount = action.payload.totalCount;
      state.hasMore = state.orders?.length < action.payload.totalCount;
    });
  },
});

export const { removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
