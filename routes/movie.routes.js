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
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const movieRouter = express.Router();

movieRouter.post(
  "/movies",
  validateMovieCreateRequest,
  isAuthenticated,
  createMovie
);
movieRouter.delete("/movies/:movieId", isAuthenticated, deleteMovie);
movieRouter.get("/movies/:movieId", getMovie);
movieRouter.put(
  "/movies/:movieId",
  validateMovieUpdateRequest,
  isAuthenticated,
  updateMovie
);
movieRouter.get("/movies", getMoviesByName);

export default movieRouter;
