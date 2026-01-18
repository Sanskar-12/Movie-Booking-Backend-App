import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsOfCurrUser,
  updateBooking,
} from "../controllers/booking.controller.js";
import {
  canChangeStatus,
  validateBookingCreateRequest,
} from "../middlewares/booking.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const bookingRouter = express.Router();

bookingRouter.post(
  `/bookings`,
  isAuthenticated,
  validateBookingCreateRequest,
  createBooking,
);
bookingRouter.patch(
  `/bookings/:bookingId`,
  isAuthenticated,
  canChangeStatus,
  updateBooking,
);
bookingRouter.get(`/bookings`, isAuthenticated, getBookingsOfCurrUser);
bookingRouter.get(`/bookings/all`, isAuthenticated, getAllBookings);

export default bookingRouter;
