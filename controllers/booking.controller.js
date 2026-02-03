import { Booking } from "../models/booking.model.js";
import { Show } from "../models/show.model.js";
import { STATUS_CODES } from "../utils/constants.js";

export const createBooking = async (req, res) => {
  try {
    const { theatreId, movieId, timing, noOfSeats } = req.body;

    const userId = req.user._id;

    const show = await Show.findOne({
      theatreId,
      movieId,
      timing,
    });

    if (noOfSeats > show.noOfSeats) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        success: false,
        message: "Requested seats exceed available seats for this show",
      });
    }

    let totalCosts = 0;

    totalCosts = show.price * noOfSeats;
    show.noOfSeats = show.noOfSeats - noOfSeats;

    const booking = await Booking.create({
      theatreId,
      movieId,
      userId,
      timing,
      noOfSeats,
      totalCosts,
    });

    await show.save();

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

export const getBookingsOfCurrUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const bookings = await Booking.find({
      userId: _id,
    });

    return res.status(STATUS_CODES.OK).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log("Error in getBookingsOfCurrUser", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getBookingsOfCurrUser Error: ${error}`,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    return res.status(STATUS_CODES.OK).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log("Error in getAllBookings", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getAllBookings Error: ${error}`,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId } = req.params;

    const existingBooking = await Booking.findById(bookingId);

    if (!existingBooking) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    if (existingBooking.userId.toString() !== _id) {
      return res.status(STATUS_CODES.UNAUTHORISED).json({
        success: false,
        message: "Not able to access the booking",
      });
    }

    return res.status(STATUS_CODES.OK).json({
      success: true,
      existingBooking,
    });
  } catch (error) {
    console.log("Error in getBookingById", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getBookingById Error: ${error}`,
    });
  }
};
