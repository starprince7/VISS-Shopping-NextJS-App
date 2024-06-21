import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import productReducer from "./productsSlice/reducer";
import customerReducer from "./customersSlice/reducer";
import pendingOrderReducer from "./pendingOrderSlice/reducer";
import failedOrderReducer from "./failedOrderSlice/reducer";
import completedOrderReducer from "./completedOrderSlice/reducer";
import administratorReducer from "./AdminSlice/reducer";
import cartSliceOrReducer from "./cartSlice";

export const rootReducer = {
  Products: productReducer,
  Customers: customerReducer,
  PendingOrders: pendingOrderReducer,
  FailedOrders: failedOrderReducer,
  CompletedOrders: completedOrderReducer,
  Administrator: administratorReducer,
  Cart: cartSliceOrReducer,
};
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
const persistor = persistStore(store);
export { store, persistor };
