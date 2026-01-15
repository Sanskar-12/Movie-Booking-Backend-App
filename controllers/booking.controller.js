import { Booking } from "../models/booking.model.js";
import { STATUS_CODES } from "../utils/constants.js";

export const createBooking = async (req, res) => {
  try {
    const { theatreId, movieId, timing, noOfSeats, totalCosts } = req.body;

    const userId = req.user._id;

    const booking = await Booking.create({
      theatreId,
      movieId,
      userId,
      timing,
      noOfSeats,
      totalCosts,
    });

    return res.status(STATUS_CODES.CREATED).json({
      success: true,
      data: booking,
      message: "Movie Booked successfully",
    });
  } catch (error) {
    console.log("Error in createBooking", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `createBooking Error: ${error}`,
    });
  }
};
