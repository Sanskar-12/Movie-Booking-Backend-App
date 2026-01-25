import { Theatre } from "../models/theatre.model.js";
import { STATUS_CODES } from "../utils/constants.js";
import { requiredFieldsForCreateShow } from "../utils/index.js";
import mongoose from "mongoose";

export const validateCreateShowRequest = async (req, res, next) => {
  for (const field in requiredFieldsForCreateShow) {
    if (
      !req.body[field] ||
      (Array.isArray(req.body[field]) && req.body[field].length === 0)
    ) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: requiredFieldsForCreateShow[field],
      });
    }
  }

  // valid id fields
  if (!mongoose.Types.ObjectId.isValid(req.body.theatreId)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Invalid Theatre Id provided",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Invalid Movie Id provided",
    });
  }

  // Checking if the ids exists
  const theatre = await Theatre.findById(req.body.theatreId);
  if (!theatre) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      success: false,
      message: "Theatre Not found",
    });
  }

  next();
};

export const validateGetAllShowOfMovieInATheatreRequest = async (
  req,
  res,
  next,
) => {
  // valid id fields
  if (req.query.theatreId) {
    if (!mongoose.Types.ObjectId.isValid(req.query.theatreId)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Invalid Theatre Id provided",
      });
    }
  }

  if (req.query.movieId) {
    if (!mongoose.Types.ObjectId.isValid(req.query.movieId)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Invalid Movie Id provided",
      });
    }
  }

  let theatre = {};

  // Checking if the ids exists
  if (req.query.theatreId) {
    theatre = await Theatre.findById(req.query.theatreId);
    if (!theatre) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Theatre Not found",
      });
    }
  }

  // Find movie exists in that theatre
  if (req.query.movieId) {
    if (!theatre.movies.includes(req.query.movieId)) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Movie is not available inside the theatre",
      });
    }
  }
  next();
};

export const validateUpdateShowRequest = async (req, res, next) => {
  if (req.body.theatreId || req.body.movieId) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "We cannot update theatre or movie for an already existing show",
    });
  }

  next();
};
