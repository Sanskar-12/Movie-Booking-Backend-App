import express from "express";
import { signUp } from "../controllers/auth.controller.js";
import { validateUserCreateRequest } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(`/auth/signup`, validateUserCreateRequest, signUp);

export default authRouter;
