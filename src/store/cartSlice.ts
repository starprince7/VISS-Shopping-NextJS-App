import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "../types";
import { addItemToCart, removeItemFromCart } from "../utils/cart-utils";


export type StateProps = CartItem[]


const initialState: StateProps = []
const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
            return removeItemFromCart(state, action.payload.productId)
        },
        addToCart: (state, action: PayloadAction<CartItem>) => {
            return addItemToCart(state, action.payload)
        },
        clearCart: (state) => {
            return []
        }
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCart = (store) => store.Cart as CartItem[]
