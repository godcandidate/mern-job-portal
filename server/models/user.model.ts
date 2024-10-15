import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import "dotenv/config";

//email regex checker
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  jobs: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

//User Schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter username"],
    },
    email: {
      type: String,
      required: [true, "Enter username"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    jobs: [
      {
        jobId: String,
      },
    ],
  },
  { timestamps: true }
);

// sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

// Hash Password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
