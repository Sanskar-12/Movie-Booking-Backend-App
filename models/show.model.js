import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    theatreId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    timing: {
      type: String,
      required: true,
    },
    noOfSeats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Show = mongoose.model("Show", schema);
