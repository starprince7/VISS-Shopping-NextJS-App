import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "../../helpers/getOrders";
import toastService from "../../services/toast-notification";
import { Order, OrderStatus } from "../../types";

export interface StateProps {
  error: string;
  failedOrders: Order[];
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
  failedOrders: [],
  page: 0,
  hasMore: false,
  totalCount: 0,
  ordersRequestStatus: "idle",
};

export const fetchFailedOrders = createAsyncThunk<any, AsyncActionArgs>(
  "failedOrders/fetchFailedOrders",
  async ({ page, status }) => {
    const result = await getOrders({ page, status });
    return result.data;
  },
);

const failedOrdersSlice = createSlice({
  name: "failedOrders",
  initialState,
  reducers: {
    removeFailedOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.failedOrders = state.failedOrders.filter(
        (order) => order._id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFailedOrders.pending, (state) => {
      state.ordersRequestStatus = "loading";
    });
    builder.addCase(fetchFailedOrders.rejected, (state, action) => {
      state.ordersRequestStatus = "failed";
      state.error = action.error.message as string;
      toastService.showErrorMessage(action.error.message as string);
    });
    builder.addCase(fetchFailedOrders.fulfilled, (state, action) => {
      state.ordersRequestStatus = "succeeded";
      state.failedOrders =
        action.payload.page === 1
          ? action.payload.orders
          : [...state.failedOrders, ...action.payload.orders];
      state.page = action.payload.page;
      state.totalCount = action.payload.totalCount;
      state.hasMore = state.failedOrders?.length < action.payload.totalCount;
    });
  },
});

export const { removeFailedOrder } = failedOrdersSlice.actions;
export default failedOrdersSlice.reducer;
