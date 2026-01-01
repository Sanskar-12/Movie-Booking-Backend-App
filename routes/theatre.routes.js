import express from "express";
import { validateCreateTheatreRequest } from "../middlewares/theatre.middleware.js";
import {
  createTheatre,
  deleteTheatre,
  getAllTheatres,
  getTheatre,
} from "../controllers/theatre.controller.js";

const theatreRouter = express.Router();

theatreRouter.post(`/theatres`, validateCreateTheatreRequest, createTheatre);
theatreRouter.get(`/theatres/:theatreId`, getTheatre);
theatreRouter.delete(`/theatres/:theatreId`, deleteTheatre);
theatreRouter.get(`/theatres`, getAllTheatres);

export default theatreRouter;
