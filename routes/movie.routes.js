import express from "express";
import { createMovie, deleteMovie } from "../controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.post("/movies", createMovie);
movieRouter.delete("/movies/:movieId", deleteMovie);

export default movieRouter;
