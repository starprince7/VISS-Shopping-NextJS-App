import mongoose, { Model } from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import moment from "moment"

interface User {
  name: { firstname: string; lastname: string };
  email: string | { unique: object };
  password: string;
  cart: {}[];
  isVerified: boolean;
  date_registered: string;
  verification_code: string | number;
  address: string;
  country: string;
  zipcode: number; 
  city: string;
}

const customerSchema = new mongoose.Schema<User>(
  {
    name: {
      firstname: { type: String, required: [true, 'Please enter a first name'] },
      lastname: { type: String, required: [true, 'Please enter a last name'] },
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: true,
      lowercase: true,
      validate_registered: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    cart: { type: [{}], default: [{}] },
    isVerified: { type: Boolean, default: false },
    date_registered: { type: String },
    verification_code: { type: Number, default: null },
    address: { type: String, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    zipcode: { type: Number, default: null },
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
  this.date_registered = moment().format('MMMM Do YYYY, h:mm:ss a')
  next();
});

/*  @ Internal Utility Func. */
customerSchema.statics.logIn = async function (email, password): Promise<User> {
  const user: User = await this.findOne({ email }).select('-password')
  
  // check for user, No user found.
  if (!user)
    throw new Error('This email address is not registered')
  else {
    // Here user found, compare passwords
    const passwordMatched = await bcrypt.compare(password, user.password)
    if (passwordMatched) return user
    // Here passwords do not match.
    else throw new Error('You entered an incorrect password')
  }
}

const Customer =
  mongoose.models.Customer || mongoose.model<User>("Customer", customerSchema);

export default Customer;
