import mongoose, { Model } from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import moment from "moment";

type ShippingInfo = {
  phoneNumber: string;
  homeAddress: string;
  country: string;
  state: string;
  zipcode: number;
  city: string;
};

export type CustomerType = {
  _id: string;
  name: { firstname: string; lastname: string };
  email: string | { unique: object };
  password: string;
  cart: {}[];
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  date_registered: string;
  verification_code: string | number;
  shippingInfo: ShippingInfo[];
}

interface CustomerModel extends Model<CustomerType> {
  logIn(): CustomerType;
}

const customerSchema = new mongoose.Schema<CustomerType, CustomerModel>(
  {
    name: {
      firstname: {
        type: String,
        required: [true, "Please enter a first name"],
      },
      lastname: { type: String, required: [true, "Please enter a last name"] },
    },
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
    cart: { type: [{}], default: [{}] },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    date_registered: { type: String },
    verification_code: { type: Number, default: null },
    shippingInfo: [
      {
        phoneNumber: String,
        homeAddress: String,
        country: String,
        state: String,
        zipcode: String,
        city: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

/*  @ Internal Utility Func. */
customerSchema.pre("save", async function (next) {
  // @ Password hashing, before saving to database.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // @ creating formatted date-time.
  this.date_registered = moment().format("MMMM Do YYYY, h:mm:ss a");
  next();
});

/*  @ Internal Utility Func. */
customerSchema.static('logIn', async function logIn(email, password) {
  const user: CustomerType = await this.findOne({ email });

  // check for user, No user found.
  if (!user) throw new Error("This email address is not registered");
  else {
    // Here user found, compare passwords
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) return user;
    // Here passwords do not match.
    else throw new Error("You entered an incorrect password");
  }
})

const Customer =
  mongoose.models.Customer || mongoose.model<CustomerType>("Customer", customerSchema);

export default Customer;
