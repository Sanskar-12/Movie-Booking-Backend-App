import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} from "../controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.post("/movies", createMovie);
movieRouter.delete("/movies/:movieId", deleteMovie);
movieRouter.get("/movies/:movieId", getMovie);
movieRouter.put("/movies/:movieId", updateMovie);

export default movieRouter;
