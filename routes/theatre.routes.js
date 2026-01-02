import express from "express";
import {
  validateCreateTheatreRequest,
  validateUpdateMoviesInTheatreRequest,
  validateUpdateTheatreRequest,
} from "../middlewares/theatre.middleware.js";
import {
  createTheatre,
  deleteTheatre,
  getAllTheatres,
  getMoviesInATheatre,
  getTheatre,
  updateMoviesInTheatre,
  updateTheatre,
} from "../controllers/theatre.controller.js";

const theatreRouter = express.Router();

theatreRouter.post(`/theatres`, validateCreateTheatreRequest, createTheatre);
theatreRouter.get(`/theatres/:theatreId`, getTheatre);
theatreRouter.delete(`/theatres/:theatreId`, deleteTheatre);
theatreRouter.get(`/theatres`, getAllTheatres);
theatreRouter.put(
  `/theatres/:theatreId`,
  validateUpdateTheatreRequest,
  updateTheatre
);
theatreRouter.patch(
  `/theatres/:theatreId`,
  validateUpdateMoviesInTheatreRequest,
  updateMoviesInTheatre
);
theatreRouter.get(`/theatres/:theatreId/movies`, getMoviesInATheatre);

export default theatreRouter;
