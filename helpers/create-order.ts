import axios from "axios";
import { CartItem, CustomerType } from "../types";

type CreateOrderParams = {
  transactionRef: string;
  paymentStatus?: string;
  customer: CustomerType;
  orderNo: string;
  amount: number;
  items: CartItem[];
};

export async function createOrder(order: CreateOrderParams) {
  return axios.post("/api/orders/create", order);
}
