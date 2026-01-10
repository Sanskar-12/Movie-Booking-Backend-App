import express from "express";
import {
  validateCreateTheatreRequest,
  validateUpdateMoviesInTheatreRequest,
  validateUpdateTheatreRequest,
} from "../middlewares/theatre.middleware.js";
import {
  checkMovieInTheatre,
  createTheatre,
  deleteTheatre,
  getAllTheatres,
  getMoviesInATheatre,
  getTheatre,
  updateMoviesInTheatre,
  updateTheatre,
} from "../controllers/theatre.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const theatreRouter = express.Router();

theatreRouter.post(
  `/theatres`,
  validateCreateTheatreRequest,
  isAuthenticated,
  createTheatre
);
theatreRouter.get(`/theatres/:theatreId`, getTheatre);
theatreRouter.delete(`/theatres/:theatreId`, isAuthenticated, deleteTheatre);
theatreRouter.get(`/theatres`, getAllTheatres);
theatreRouter.put(
  `/theatres/:theatreId`,
  validateUpdateTheatreRequest,
  isAuthenticated,
  updateTheatre
);
theatreRouter.patch(
  `/theatres/:theatreId`,
  validateUpdateMoviesInTheatreRequest,
  isAuthenticated,
  updateMoviesInTheatre
);
theatreRouter.get(`/theatres/:theatreId/movies`, getMoviesInATheatre);
theatreRouter.get(`/theatres/:theatreId/movie/:movieId`, checkMovieInTheatre);

export default theatreRouter;
