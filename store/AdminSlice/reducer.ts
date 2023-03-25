import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Router } from "next/router";
import { getAdminAccount } from "../../helpers/getAdmin";
import { getCustomers } from "../../helpers/getCustomers";
import { navigateTo } from "../../hooks";
import toastService from "../../services/toast-notification";
import { Administrator } from "../../types";
import { StorageService } from "../../utils/helpers/storage";

export type StateProps = {
  error: string;
  admin: Administrator | null;
  adminRequestStatus: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: StateProps = {
  error: "",
  admin: null,
  adminRequestStatus: "idle",
};

export const fetchAdminAccount = createAsyncThunk(
  "admin/fetchAdminAccount",
  async () => {
    const id = StorageService.getAdminId();
    if (!id) {
      StorageService.removeAuthToken();
      window.location.assign("/");
      return;
    }
    const result = id && (await getAdminAccount(id as string));
    return result.data;
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logOutAction: (state) => {
      state = {
        error: "",
        admin: null,
        adminRequestStatus: "idle",
      };
      StorageService.removeAuthToken();
      StorageService.removeAdminId();
      setTimeout(() => {
        window.location.assign("/");
      }, 500);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminAccount.pending, (state) => {
      state.adminRequestStatus = "loading";
    });
    builder.addCase(fetchAdminAccount.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.adminRequestStatus = "failed";
      toastService.showErrorMessage(action.error.message as string);
    });
    builder.addCase(fetchAdminAccount.fulfilled, (state, action) => {
      state.admin = action.payload;
      state.adminRequestStatus = "succeeded";
    });
  },
});

export const { logOutAction } = adminSlice.actions;
export default adminSlice.reducer;
