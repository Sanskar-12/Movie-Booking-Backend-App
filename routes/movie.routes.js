import express from "express";
import { createMovie } from "../controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.post("/movies", createMovie);

export default movieRouter;
