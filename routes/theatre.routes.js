import express from "express";
import {
  validateCreateTheatreRequest,
  validateUpdateTheatreRequest,
} from "../middlewares/theatre.middleware.js";
import {
  createTheatre,
  deleteTheatre,
  getAllTheatres,
  getTheatre,
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

export default theatreRouter;
