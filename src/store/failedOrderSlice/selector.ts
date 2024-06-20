import { StateProps } from "./reducer";

export const selectOrders = (store) => store.FailedOrders as StateProps;
