import mongoose from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import moment from "moment";
import { Administrator } from "../../types";

const adminSchema = new mongoose.Schema<Administrator>(
  {
    fullName: String,
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    date_registered: { type: String },
    verification_code: { type: Number, default: null },
    isSuperAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

/*  @ Internal Utility Func. */
adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // @ creating formatted date-time.
  this.date_registered = moment().format("MMMM Do YYYY, h:mm:ss a");
  next();
});

/*  @ Internal Utility Func. */
adminSchema.static("logIn", async function logIn(email, password) {
  const user = (await this.findOne({ email })) as Administrator;

  if (!user)
    throw new Error(
      "This email address does not belong to any administrative account.",
    );
  else {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) return user;
    throw new Error("You entered an incorrect password");
  }
});

const Admin =
  mongoose.models.Admin || mongoose.model<Administrator>("Admin", adminSchema);

export default Admin;
