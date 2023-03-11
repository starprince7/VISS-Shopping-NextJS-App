import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsSlice/reducer";
import customerReducer from "./customersSlice/reducer";
import orderReducer from "./orderSlice/reducer";

export const rootReducer = {
  Products: productReducer,
  Customers: customerReducer,
  Orders: orderReducer,
};

const store = configureStore({ reducer: rootReducer });
export default store;
