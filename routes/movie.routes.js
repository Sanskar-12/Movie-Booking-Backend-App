import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMoviesByName,
  updateMovie,
} from "../controllers/movie.controller.js";
import {
  validateMovieCreateRequest,
  validateMovieUpdateRequest,
} from "../middlewares/movie.middlewares.js";
import {
  isAdminOrClient,
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

const movieRouter = express.Router();

movieRouter.post(
  "/movies",
  isAuthenticated,
  isAdminOrClient,
  validateMovieCreateRequest,
  createMovie
);
movieRouter.delete(
  "/movies/:movieId",
  isAuthenticated,
  isAdminOrClient,
  deleteMovie
);
movieRouter.get("/movies/:movieId", getMovie);
movieRouter.put(
  "/movies/:movieId",
  isAuthenticated,
  validateMovieUpdateRequest,
  updateMovie
);
movieRouter.get("/movies", getMoviesByName);

export default movieRouter;
