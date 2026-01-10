import express from "express";
import { updateUserRoleOrStatus } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.patch(`/user/:userId`, isAuthenticated, updateUserRoleOrStatus);

export default userRouter;
