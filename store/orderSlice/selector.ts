import { StateProps } from "./reducer";

export const selectOrders = (store) => store.Orders as StateProps;
