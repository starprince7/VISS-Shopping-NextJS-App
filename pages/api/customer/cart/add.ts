import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../database/connection/dbConnection";
import { CartItem, CustomerType } from "../../../../types";
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
   * Make sure the quantity variable is a number.
   * Receives a productId from a customer and add it to customer's cart;
   * if cart already contains productId just increment the quantity by 1
   * - collect customer id
   * - collect product information.
   */

  // Check for the existence of customerId and productId fields
  const { customerId, productId, productNumber, quantity } =
    req.body as CartItem & { customerId };

  if (!customerId)
    return res.status(400).json({ error: "Missing `customerId` field." });
  if (!productId)
    return res.status(400).json({ error: "Missing `productId` field." });

  // Make sure quantity is a number, default to 1 if not provided
  const parsedQuantity = typeof quantity === "number" ? quantity : 1;

  const filter = { _id: customerId };

  try {
    /**
     * 1. Find the customers first
     * 2. Check in the customers cart if this product does not already exits before inserting it in.
     * Logic Control: Yes or No
     * No*: Does not exits >
     *  Push product into the cart it is new.
     * Yes*: Product exits inside cart >
     *  Just increment the product's quantity.
     */
    const customer = (await Customer.findById(customerId)) as CustomerType;
    const itemExitsIndex = customer.cart.findIndex(
      (item) => item.productId === productId,
    );

    if (!customer) {
      return res.status(404).json({ msg: "Customer not found", error: false });
    }

    // Item does not exits
    if (itemExitsIndex === -1) {
      const cartInsertQuery = {
        $push: { cart: { productId, productNumber, quantity: parsedQuantity } },
      };
      await Customer.findOneAndUpdate(filter, cartInsertQuery);

      return res
        .status(200)
        .json({ msg: "Product added to cart successfully" });
    }
    /**
     * ELSE
     * Product exits inside cart. Hence update products quantity.
     */
    const cartItemQuantityIncrementQuery: any = {
      $inc: { "cart.$[item].quantity": parsedQuantity },
    };

    const options = {
      arrayFilters: [{ "item.productId": productId }],
      new: true, // Return the updated document after update
      upsert: true, // Create a new document if the filter doesn't match any documents
    };

    await Customer.findOneAndUpdate(
      filter,
      cartItemQuantityIncrementQuery,
      options,
    );

    return res.status(200).json({ msg: "Cart updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
