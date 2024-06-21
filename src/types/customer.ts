import { Model } from "mongoose";

import { CartItem } from "./cart-item";
import { Product } from "./product";

export type ShippingInfo = {
  phoneNumber: string;
  homeAddress: string;
  country: string;
  state: string;
  zipcode: number;
  city: string;
};

export type CustomerType = {
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

export interface CustomerModel extends Model<CustomerType> {
  logIn(): CustomerType;
}

interface Order {
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

type OrderStatus =
  | "PENDING"
  | "DELIVERED"
  | "CANCELED"
  | "REFUNDED"
  | "RETURNED";
