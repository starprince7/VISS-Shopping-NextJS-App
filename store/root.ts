import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productsSlice";

const rootReducer = {
  Products: productReducer,
  // Customers: {},
  // Orders: {},
};

const store = configureStore({ reducer: rootReducer });
export default store;
