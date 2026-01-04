import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import {
  validateUserCreateRequest,
  validateUserSigninRequest,
} from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(`/auth/signup`, validateUserCreateRequest, signUp);
authRouter.post(`/auth/signin`, validateUserSigninRequest, signIn);

export default authRouter;
