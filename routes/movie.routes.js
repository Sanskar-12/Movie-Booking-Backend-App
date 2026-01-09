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

movieRouter.post("/movies", validateMovieCreateRequest, createMovie);
movieRouter.delete("/movies/:movieId", deleteMovie);
movieRouter.get("/movies/:movieId", isAuthenticated, getMovie);
movieRouter.put("/movies/:movieId", validateMovieUpdateRequest, updateMovie);
movieRouter.get("/movies", getMoviesByName);

export default movieRouter;
