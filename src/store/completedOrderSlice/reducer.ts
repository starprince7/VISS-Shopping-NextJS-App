import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "../../helpers/getOrders";
import toastService from "../../src/services/toast-notification";
import { Order, OrderStatus } from "../../types";

export interface StateProps {
  error: string;
  completedOrders: Order[];
  page: number;
  hasMore: boolean;
  totalCount: number;
  ordersRequestStatus: "idle" | "loading" | "succeeded" | "failed";
}

type AsyncActionArgs = {
  page: number;
  status: OrderStatus;
};

const initialState: StateProps = {
  error: "",
  completedOrders: [],
  page: 0,
  hasMore: false,
  totalCount: 0,
  ordersRequestStatus: "idle",
};

export const fetchCompletedOrders = createAsyncThunk<any, AsyncActionArgs>(
  "completedOrders/fetchCompletedOrders",
  async ({ page, status }) => {
    const result = await getOrders({ page, status });
    return result.data;
  },
);

const completedOrdersSlice = createSlice({
  name: "completedOrders",
  initialState,
  reducers: {
    removeCompletedOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.completedOrders = state.completedOrders.filter(
        (order) => order._id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompletedOrders.pending, (state) => {
      state.ordersRequestStatus = "loading";
    });
    builder.addCase(fetchCompletedOrders.rejected, (state, action) => {
      state.ordersRequestStatus = "failed";
      state.error = action.error.message as string;
      toastService.showErrorMessage(action.error.message as string);
    });
    builder.addCase(fetchCompletedOrders.fulfilled, (state, action) => {
      state.ordersRequestStatus = "succeeded";
      state.completedOrders =
        action.payload.page === 1
          ? action.payload.orders
          : [...state.completedOrders, ...action.payload.orders];
      state.page = action.payload.page;
      state.totalCount = action.payload.totalCount;
      state.hasMore = state.completedOrders?.length < action.payload.totalCount;
    });
  },
});

export const { removeCompletedOrder } = completedOrdersSlice.actions;
export default completedOrdersSlice.reducer;
