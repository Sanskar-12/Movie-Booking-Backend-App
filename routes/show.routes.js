import express from "express";
import { createShow } from "../controllers/show.controller.js";
import { validateCreateShowRequest } from "../middlewares/show.middleware.js";
import {
  isAdminOrClient,
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

const showRouter = express.Router();

showRouter.post(
  `/shows`,
  isAuthenticated,
  isAdminOrClient,
  validateCreateShowRequest,
  createShow,
);

export default showRouter;
