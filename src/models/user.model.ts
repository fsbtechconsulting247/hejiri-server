import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt.js";

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isVerified: boolean;
  freeze: boolean;
  suspended: boolean;
  role: string;
  device: string;
  avatar: string;
  pinCode: string;
  verification: {
    hasBVN: boolean;
    hasKYC: boolean;
  };
  is2FAActive: boolean;
  country: string;
  reviews: string[];
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  passwordUpdatedAt: Date;
  wallets: {
    NGN: {
      balance: string;
    };
  };
  level: number;
  topUps: {
    settled: number;
    declined: number;
  };

  comparePassword: (val: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
