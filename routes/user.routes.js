import express from "express";
import { updateUserRoleOrStatus } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.patch(`/user/:userId`, updateUserRoleOrStatus);

export default userRouter;
