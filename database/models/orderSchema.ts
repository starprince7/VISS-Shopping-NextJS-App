import moment from "moment";
import mongoose from "mongoose";
import getUid from "get-uid";
import { Order } from "../../types";

enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

const orderSchema = new mongoose.Schema<Order>(
  {
    orderNo: String,
    orderDate: String,
    orderDetails: Array,
    orderTotal: Number,
    sumTotal: { type: Number, required: true, default: 0 },
    amount: { type: Number, default: 0 },
    processingFee: Number,
    shippingFee: Number,
    customer: Object,
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    transactionRef: { type: String, unique: true },
    isOrderFulfilled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// @ Internal utility func.
orderSchema.pre("save", function (next) {
  this.orderDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  this.orderNo = getUid(); //1178851014
  next();
});

const Orders =
  mongoose.models.Orders || mongoose.model<Order>("Orders", orderSchema);

export default Orders;
