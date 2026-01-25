import { Booking } from "../models/booking.model.js";
import { Payment } from "../models/payment.model.js";
import {
  BOOKING_STATUS,
  PAYMENT_STATUS,
  STATUS_CODES,
} from "../utils/constants.js";

export const createPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { amount } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    if (booking.status === BOOKING_STATUS.successful) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        success: false,
        message: "Booking already done, cannot make a new payment against it",
      });
    }

    let bookingTime = booking.createdAt;
    let currentTime = Date.now();

    let diffMs = currentTime - bookingTime;
    let minutesPassed = Math.floor(diffMs / (1000 * 60));

    if (minutesPassed > 5) {
      booking.status = BOOKING_STATUS.expired;
      await booking.save();
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Booking Status Expired",
      });
    }

    const payment = await Payment.create({
      bookingId,
      amount,
    });

    if (payment.amount !== booking.totalCosts) {
      payment.status = PAYMENT_STATUS.failed;
    }
    if (!payment || payment.status === PAYMENT_STATUS.failed) {
      booking.status = BOOKING_STATUS.cancelled;
      await booking.save();
      await payment.save();

      return res.status(STATUS_CODES.FORBIDDEN).json({
        success: false,
        message: "Payment and Booking Cancelled",
      });
    }

    payment.status = PAYMENT_STATUS.success;
    booking.status = BOOKING_STATUS.successful;
    await booking.save();

    await payment.save();

    return res.status(STATUS_CODES.CREATED).json({
      success: false,
      message: "Payment Created Successfully",
      data: payment,
    });
  } catch (error) {
    console.log("Error in createPayment", error.errors);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `createPayment Error: ${error}`,
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId).populate("bookingId");

    if (!payment) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Payment Not Found",
      });
    }

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.log("Error in getPaymentById", error.errors);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getPaymentById Error: ${error}`,
    });
  }
};
