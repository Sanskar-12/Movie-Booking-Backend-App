import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsOfCurrUser,
  updateBooking,
} from "../controllers/booking.controller.js";
import {
  canChangeStatus,
  validateBookingCreateRequest,
} from "../middlewares/booking.middleware.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

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
bookingRouter.get(`/bookings/all`, isAuthenticated, isAdmin, getAllBookings);
bookingRouter.get(`/bookings/:bookingId`, isAuthenticated, getBookingById);

export default bookingRouter;
