import express from "express";
import { createBooking } from "../controllers/booking.controller.js";
import { validateBookingCreateRequest } from "../middlewares/booking.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const bookingRouter = express.Router();

bookingRouter.post(
  `/bookings`,
  isAuthenticated,
  validateBookingCreateRequest,
  createBooking
);

export default bookingRouter;
