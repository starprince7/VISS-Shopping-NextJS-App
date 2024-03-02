import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/connection/dbConnection";
import { CartItem } from "../../../../types";
import Customer from "../../../../database/models/customerSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ msg: "Method not allowed" });
    return;
  }

  // Connect database
  await db.connectDB();

  /**
   * Code must:
   * Receives a productId from a customer and remove it from the customer's cart only if it has a quantity more than 1.
   * But if the product found in the cart has a quantity above 1 just reduce the quantity by 1.
   * - collect customer id
   * - collect product information.
   */

  // Check for the existence of customerId and productId fields
  const { customerId, productId } = req.body as CartItem;

  if (!customerId)
    return res.status(400).json({ error: "Missing `customerId` field." });
  if (!productId)
    return res.status(400).json({ error: "Missing `productId` field." });

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found", error: false });
    }

    const productIndex = customer.cart.findIndex(
      (item) => item.productId === productId,
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ msg: "Product not found in the cart", error: true });
    }

    if (customer.cart[productIndex].quantity > 1) {
      // If the quantity is more than 1, decrement the quantity by 1
      customer.cart[productIndex].quantity -= 1;
    } else {
      // If the quantity is 1, remove the product from the cart
      customer.cart.splice(productIndex, 1);
    }

    // Update the customer directly in the database without using await customer.save()
    await Customer.updateOne({ _id: customerId }, { cart: customer.cart });

    return res
      .status(200)
      .json({ msg: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
