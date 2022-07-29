import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      first: String,
      last: String,
    },
    cart: [{}],
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
