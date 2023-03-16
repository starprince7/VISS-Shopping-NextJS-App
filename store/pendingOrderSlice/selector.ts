import { StateProps } from "./reducer";

export const selectOrders = (store) => store.PendingOrders as StateProps;
