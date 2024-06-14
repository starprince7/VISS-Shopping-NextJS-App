
import { uniq } from "lodash";
import { CartItem } from "../types";

export const addItemToCart = (
  cart: CartItem[],
  newItem: CartItem,
) => {
  const itemExits = cart.findIndex((cItem) => cItem.productNumber === newItem.productNumber);
  console.log("The item exist  in cart:", itemExits)
  if (itemExits !== -1) {
    cart[itemExits] = {
      ...cart[itemExits],
      quantity: cart[itemExits].quantity + newItem.quantity
    };
  } else {
    // item not found in cart
    // add the item to the cart
    return [...cart, newItem];
  }
};

export const removeItemFromCart = (cart: CartItem[], productNumber: number) => {
  const index = cart.findIndex((cItem) => cItem.productNumber === productNumber);
  const nwCartCopy = [...cart];

  if (index !== -1) {
    nwCartCopy.splice(index, 1);
  }

  return nwCartCopy;
};

export function mergeArrays<T>(array1: T[], array2: T[]): T[] {
  // Concatenate the two arrays
  const mergedArray = array1.concat(array2);

  // Use Set to remove duplicate elements
  // const uniqueArray = [...new Set(mergedArray)];
  const uniqueArray = uniq(mergedArray);

  // Convert Set back to array and return
  return uniqueArray;
}
