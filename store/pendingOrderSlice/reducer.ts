import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "../../helpers/getOrders";
import toastService from "../../services/toast-notification";
import { Order, OrderStatus } from "../../types";

export interface StateProps {
  error: string;
  pendingOrders: Order[];
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
  pendingOrders: [],
  page: 0,
  hasMore: false,
  totalCount: 0,
  ordersRequestStatus: "idle",
};

export const fetchPendingOrders = createAsyncThunk<any, AsyncActionArgs>(
  "pendingOrders/fetchPendingOrders",
  async ({ page, status }) => {
    const result = await getOrders({ page, status });
    return result.data;
  },
);

const pendingOrdersSlice = createSlice({
  name: "pendingOrders",
  initialState,
  reducers: {
    removePendingOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.pendingOrders = state.pendingOrders.filter(
        (order) => order._id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPendingOrders.pending, (state) => {
      state.ordersRequestStatus = "loading";
    });
    builder.addCase(fetchPendingOrders.rejected, (state, action) => {
      state.ordersRequestStatus = "failed";
      state.error = action.error.message as string;
      toastService.showErrorMessage(action.error.message as string);
    });
    builder.addCase(fetchPendingOrders.fulfilled, (state, action) => {
      state.ordersRequestStatus = "succeeded";
      state.pendingOrders =
        action.payload.page === 1
          ? action.payload.orders
          : [...state.pendingOrders, ...action.payload.orders];
      state.page = action.payload.page;
      state.totalCount = action.payload.totalCount;
      state.hasMore = state.pendingOrders?.length < action.payload.totalCount;
    });
  },
});

export const { removePendingOrder } = pendingOrdersSlice.actions;
export default pendingOrdersSlice.reducer;
