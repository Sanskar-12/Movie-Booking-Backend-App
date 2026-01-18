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

export const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, timing, noOfSeats } = req.body;

    const existingBooking = await Booking.findById(bookingId);

    if (!existingBooking) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    if (status) {
      existingBooking.status = status;
    }
    if (timing) {
      existingBooking.timing = timing;
    }
    if (noOfSeats) {
      existingBooking.noOfSeats = noOfSeats;
    }

    await existingBooking.save();

    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Booking Updated successfully",
      existingBooking,
    });
  } catch (error) {
    console.log("Error in updateBooking", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `updateBooking Error: ${error}`,
    });
  }
};
