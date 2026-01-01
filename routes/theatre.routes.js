import express from "express";
import { validateCreateTheatreRequest } from "../middlewares/theatre.middleware.js";
import { createTheatre } from "../controllers/theatre.controller.js";

const theatreRouter = express.Router();

theatreRouter.post(`/theatres`, validateCreateTheatreRequest, createTheatre);

export default theatreRouter;
