import { StateProps } from "./reducer";

export const selectOrders = (store) => store.CompletedOrders as StateProps;
