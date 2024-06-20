import { CustomerType } from "./customer";
import { Product } from "./product";

export interface Order {
  _id: string;
  orderNo: string;
  orderDate: string;
  orderDetails: Product[];
  orderTotal: number;
  sumTotal: number;
  amount: number;
  processingFee: number;
  shippingFee: number;
  customer: CustomerType;
  orderStatus: OrderStatus;
  paymentStatus: String;
  transactionRef: string;
  transactionReference?: string;
  isOrderFulfilled: boolean;
  orderIsFulfilledAt: string;
}

export type OrderStatus =
  | "PENDING"
  | "DELIVERED"
  | "CANCELED"
  | "REFUNDED"
  | "RETURNED";
