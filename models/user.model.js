import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { USER_ROLE } from "../utils/constants.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    userRole: {
      type: String,
      required: true,
      enum: {
        values: [USER_ROLE.admin, USER_ROLE.client, USER_ROLE.customer],
        message: "Invalid user role given",
      },
      default: USER_ROLE.customer,
    },
    userStatus: {
      type: String,
      required: true,
      default: "APPROVED",
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, 10);
});

export const User = mongoose.model("User", schema);
