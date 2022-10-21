import { CustomerType } from "./customer";
import { Product } from "./product";

export interface Order {
  orderNo: number;
  orderDate: string;
  orderDetails: Product[];
  orderTotal: number;
  amountPaid: number;
  customer: CustomerType;
  isOrderFulfilled: boolean;
}
