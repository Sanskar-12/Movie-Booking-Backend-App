import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
} from "../controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.post("/movies", createMovie);
movieRouter.delete("/movies/:movieId", deleteMovie);
movieRouter.get("/movies/:movieId", getMovie);

export default movieRouter;
