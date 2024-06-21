
import { CartItem } from "./cart-item";
import { ShippingInfo } from "./customer";
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
  paymentStatus: string;
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


type CustomerType = {
  inviteCode: string;
  wallet: number;
  customerId: string;
  _id: string;
  name: { firstname: string; lastname: string };
  fullName: string;
  email: string | { unique: object };
  password: string;
  cart: CartItem[];
  orderHistory: Order[];
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  date_registered: string;
  verification_code: string | number;
  shippingInfo: ShippingInfo[];
};