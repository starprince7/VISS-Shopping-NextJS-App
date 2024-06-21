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


export const removeItemFromCart = (cart: CartItem[], productId: string) => {
  return cart.reduce((acc, item) => {
    if (item.productId === productId) {
      if (item.quantity > 1) {
        // Decrease quantity and add to accumulator
        acc.push({ ...item, quantity: item.quantity - 1 });
      }
      // If quantity is 1, do not add to accumulator, effectively removing it
    } else {
      // Add other items to accumulator unchanged
      acc.push(item);
    }
    return acc;
  }, [] as CartItem[]);
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
