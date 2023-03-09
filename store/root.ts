import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsSlice/reducer";
import customerReducer from "./customersSlice/reducer";

export const rootReducer = {
  Products: productReducer,
  Customers: customerReducer,
  // Orders: {},
};

const store = configureStore({ reducer: rootReducer });
export default store;
