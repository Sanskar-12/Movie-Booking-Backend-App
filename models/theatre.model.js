import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
    },
    description: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movies: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Theatre = mongoose.model("Theatre", schema);
