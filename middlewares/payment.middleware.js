import { Booking } from "../models/booking.model.js";
import { STATUS_CODES } from "../utils/constants.js";

export const validateCreatePaymentRequest = async (req, res, next) => {
  if (!req.body.amount) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Amount is required",
    });
  }

  const userId = req.user._id;

  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      success: false,
      message: "Booking not found",
    });
  }

  if (booking.userId.toString() !== userId.toString()) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Invalid user",
    });
  }

  next();
};
