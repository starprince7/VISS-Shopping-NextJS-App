import moment from "moment";
import mongoose from "mongoose";
import { Order } from "../../types";

const orderSchema = new mongoose.Schema<Order>(
  {
    orderNo: Number,
    orderDate: String,
    orderDetails: Array,
    orderTotal: Number,
    amountPaid: Number,
    customer: Object,
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
