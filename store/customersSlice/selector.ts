import { StateProps } from "./reducer";

export const selectCustomers = (store) => store.Customers as StateProps;
