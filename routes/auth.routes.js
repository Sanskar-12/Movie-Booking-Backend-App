import express from "express";
import {
  resetPassword,
  signIn,
  signUp,
} from "../controllers/auth.controller.js";
import {
  isAuthenticated,
  validateUserCreateRequest,
  validateUserSigninRequest,
} from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(`/auth/signup`, validateUserCreateRequest, signUp);
authRouter.post(`/auth/signin`, validateUserSigninRequest, signIn);
authRouter.patch(`/auth/reset/:userId`, isAuthenticated, resetPassword);

export default authRouter;
