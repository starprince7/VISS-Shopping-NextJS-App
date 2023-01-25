import productsSlice, { StateProps } from "./reducer";

export const selectProducts = (state: StateProps) => state.products;
