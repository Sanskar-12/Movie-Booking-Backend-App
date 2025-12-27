import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
    },
    casts: {
      type: [String],
      required: true,
    },
    trailerUrl: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
      default: "English",
    },
    releaseDate: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseStatus: {
      type: String,
      required: true,
      default: "RELEASED",
    },
  },
  {
    timestamps: true,
  }
);

export const Movie = mongoose.model("Movie", schema);
