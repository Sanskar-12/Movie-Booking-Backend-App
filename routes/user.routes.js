import express from "express";
import { updateUserRoleOrStatus } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import { validateUpdateUserRequest } from "../middlewares/user.middleware.js";

const userRouter = express.Router();

userRouter.patch(
  `/user/:userId`,
  isAuthenticated,
  isAdmin,
  validateUpdateUserRequest,
  updateUserRoleOrStatus
);

export default userRouter;
