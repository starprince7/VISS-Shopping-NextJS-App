import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCustomers } from "../../helpers/getCustomers";
import toastService from "../../services/toast-notification";
import { CustomerType } from "../../types";

export type StateProps = {
  error: string;
  customers: CustomerType[];
  page: number;
  hasMore: boolean;
  totalCount: number;
  customersRequestStatus: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: StateProps = {
  error: "",
  customers: [],
  page: 0,
  hasMore: false,
  totalCount: 0,
  customersRequestStatus: "idle",
};

type FetchCustomerArgs = {
  page: number;
  customers?: CustomerType[];
  totalCount?: number;
};

export const fetchCustomers = createAsyncThunk<any, FetchCustomerArgs>(
  "customers/fetchCustomers",
  async ({ page }) => {
    const result = await getCustomers(page);
    return result.data;
  },
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    removeCustomer: (state, action: PayloadAction<{ id: string }>) => {
      state.customers = state.customers.filter(
        (customer) => customer._id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.customersRequestStatus = "loading";
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.customersRequestStatus = "failed";
      toastService.showErrorMessage(action.error.message as string);
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.customers = action.payload.customers;
      state.page = action.payload.page;
      state.hasMore = state.customers.length < action.payload.totalCount;
      state.totalCount = action.payload.totalCount;
      state.customersRequestStatus = "succeeded";
    });
  },
});

export const { removeCustomer } = customersSlice.actions;
export default customersSlice.reducer;
