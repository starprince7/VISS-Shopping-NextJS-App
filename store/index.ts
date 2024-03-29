import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsSlice/reducer";
import customerReducer from "./customersSlice/reducer";
import pendingOrderReducer from "./pendingOrderSlice/reducer";
import failedOrderReducer from "./failedOrderSlice/reducer";
import completedOrderReducer from "./completedOrderSlice/reducer";
import administratorReducer from "./AdminSlice/reducer";

export const rootReducer = {
  Products: productReducer,
  Customers: customerReducer,
  PendingOrders: pendingOrderReducer,
  FailedOrders: failedOrderReducer,
  CompletedOrders: completedOrderReducer,
  Administrator: administratorReducer,
};

const store = configureStore({ reducer: rootReducer });
export default store;
