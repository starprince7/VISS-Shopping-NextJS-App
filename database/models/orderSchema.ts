import moment from "moment";
import mongoose from "mongoose";

interface Order {
  orderNo: number;
  orderDate: string;
  orderDetails: OrderDetails[];
  paidAmount: number;
  payableAmount: number;
  customerDetails: CustomerDetails;
  isOrderFulfilled: boolean;
};

type OrderDetails = {
  _id: string;
  quantity: number;
  title: string;
  image: string;
  brand: string;
  price: number;
  description: string;
  countInStock: number;
  category: string;
  reviews: number;
  date_created: string;
};

type CustomerDetails = {
  name: { firstName: string; lastName: string };
  email: string;
  phoneNumber: string;
  homeAddress: string;
  country: string;
  state: string;
  zipcode: number;
  city: string;
};

const orderSchema = new mongoose.Schema<Order>(
  {
    orderNo: Number,
    orderDate: String,
    orderDetails: Array,
    paidAmount: Number,
    payableAmount: Number,
    customerDetails: Object,
    isOrderFulfilled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// @ Internal utility func.
orderSchema.pre("save", function (next) {
  // @ creating formatted date-time.
  this.orderDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  next();
});

const Orders =
  mongoose.models.Orders || mongoose.model<Order>("Orders", orderSchema);

export default Orders;
