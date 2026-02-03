import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { validateCreatePaymentRequest } from "../middlewares/payment.middleware.js";
import {
  createPayment,
  getAllPaymentsOfUser,
  getPaymentById,
} from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post(
  `/payment/:bookingId`,
  isAuthenticated,
  validateCreatePaymentRequest,
  createPayment,
);
paymentRouter.get(`/payment/:paymentId`, isAuthenticated, getPaymentById);
paymentRouter.get(`/my/payment`, isAuthenticated, getAllPaymentsOfUser);

export default paymentRouter;
