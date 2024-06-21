import moment from "moment";
import mongoose from "mongoose";

import { Category } from "../../types";

const categorySchema = new mongoose.Schema<Category>(
  {
    name: {
      type: String,
      required: [true, "Please enter a name for this category"],
      unique: true,
      lowercase: true,
    },
    type: String,
  },
  { timestamps: true }
);

// @ Internal utility func.
categorySchema.pre("save", function (next) {
  // @ creating formatted date-time.
  this.date = moment().format("MMMM Do YYYY, h:mm:ss a");
  next();
});

const Category =
  mongoose.models.Category ||
  mongoose.model<Category>("Category", categorySchema);

export default Category;
