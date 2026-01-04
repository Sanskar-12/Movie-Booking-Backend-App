import mongoose from "mongoose";

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
      default: "CUSTOMER",
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

export const User = mongoose.model("User", schema);
