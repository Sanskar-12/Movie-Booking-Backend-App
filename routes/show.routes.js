import express from "express";
import {
  createShow,
  deleteShow,
  getAllShowsOfMovieInATheatre,
  updateShow,
} from "../controllers/show.controller.js";
import {
  validateCreateShowRequest,
  validateGetAllShowOfMovieInATheatreRequest,
  validateUpdateShowRequest,
} from "../middlewares/show.middleware.js";
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
showRouter.get(
  `/shows`,
  isAuthenticated,
  validateGetAllShowOfMovieInATheatreRequest,
  getAllShowsOfMovieInATheatre,
);
showRouter.delete(
  `/shows/:showId`,
  isAuthenticated,
  isAdminOrClient,
  deleteShow,
);
showRouter.patch(
  `/shows/:showId`,
  isAuthenticated,
  isAdminOrClient,
  validateUpdateShowRequest,
  updateShow,
);

export default showRouter;
