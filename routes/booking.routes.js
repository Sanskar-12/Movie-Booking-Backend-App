import express from "express";
import {
  createBooking,
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

export default bookingRouter;
