import { CustomerType } from "./customer";
import { Product } from "./product";

export interface Order {
  orderNo: string;
  orderDate: string;
  orderDetails: Product[];
  orderTotal: number;
  sumTotal: number;
  amount: number;
  processingFee: number;
  shippingFee: number;
  customer: CustomerType;
  paymentStatus: String;
  transactionRef: string;
  isOrderFulfilled: boolean;
}
