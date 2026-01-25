import { requiredFieldsForCreateBooking } from "../utils/index.js";
import mongoose from "mongoose";
import { Theatre } from "../models/theatre.model.js";
import { BOOKING_STATUS, STATUS_CODES, USER_ROLE } from "../utils/constants.js";
import { User } from "../models/user.model.js";
import { Show } from "../models/show.model.js";

export const validateBookingCreateRequest = async (req, res, next) => {
  // required fields validations
  for (const field in requiredFieldsForCreateBooking) {
    if (
      !req.body[field] ||
      (Array.isArray(req.body[field]) && req.body[field].length === 0)
    ) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: requiredFieldsForCreateBooking[field],
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

  // Find movie exists in that theatre
  if (!theatre.movies.includes(req.body.movieId)) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      success: false,
      message: "Movie is not available inside the theatre",
    });
  }

  // Find the show exists in that theatre
  const show = await Show.findOne({
    theatreId: theatre._id,
    movieId: req.body.movieId,
    timing: req.body.timing,
  });

  if (!show) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      success: false,
      message: "Show is not available in this theatre",
    });
  }

  next();
};

export const canChangeStatus = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (
    user.userRole === USER_ROLE.customer &&
    req.body.status &&
    req.body.status !== BOOKING_STATUS.cancelled
  ) {
    return res.status(STATUS_CODES.UNAUTHORISED).json({
      success: false,
      message: "You are not allowed to change the booking status",
    });
  }

  next();
};
