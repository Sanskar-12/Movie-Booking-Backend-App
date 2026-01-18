import { Theatre } from "../models/theatre.model.js";
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
