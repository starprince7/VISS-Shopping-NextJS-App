import mongoose from "mongoose";
import moment from "moment"
import { Product } from "../../types";

const productSchema = new mongoose.Schema<Product>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: Number, default: 165 },
    description: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    category: { type: String, default: "watch" },
    reviews: { type: Number, default: 0 },
    date_created: { type: String },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", brand: "text"})

// @ Internal utility func.
productSchema.pre("save", function (next) {
  // @ creating formatted date-time.
  this.date_created = moment().format('MMMM Do YYYY, h:mm:ss a')
  next();
});

const Product =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);

export default Product;
