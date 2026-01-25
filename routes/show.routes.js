import express from "express";
import {
  createShow,
  deleteShow,
  getAllShowsOfMovieInATheatre,
} from "../controllers/show.controller.js";
import {
  validateCreateShowRequest,
  validateGetAllShowOfMovieInATheatreRequest,
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

export default showRouter;
