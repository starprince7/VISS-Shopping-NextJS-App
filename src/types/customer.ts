import { Model } from "mongoose";
import { Order } from "./order";
import { CartItem } from "./cart-item";

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
