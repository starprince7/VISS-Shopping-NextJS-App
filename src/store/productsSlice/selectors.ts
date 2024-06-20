import productsSlice, { StateProps as ProductsState } from "./reducer";

export const selectProductsState = (store) => store.Products as ProductsState;
