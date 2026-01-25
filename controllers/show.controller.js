import { Show } from "../models/show.model.js";
import { STATUS_CODES } from "../utils/constants.js";

export const createShow = async (req, res) => {
  try {
    const { theatreId, movieId, timing, noOfSeats, price, format } = req.body;

    const show = await Show.create({
      theatreId,
      movieId,
      timing,
      noOfSeats,
      price,
      format,
    });

    return res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Show Created successfully",
      show,
    });
  } catch (error) {
    console.log("Error in createShow", error.errors);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `createShow Error: ${error}`,
    });
  }
};

export const getAllShowsOfMovieInATheatre = async (req, res) => {
  try {
    const filter = {};

    const { theatreId, movieId } = req.query;

    if (theatreId) {
      filter.theatreId = theatreId;
    }
    if (movieId) {
      filter.movieId = movieId;
    }

    const shows = await Show.find(filter);

    return res.status(STATUS_CODES.OK).json({
      success: true,
      shows,
    });
  } catch (error) {
    console.log("Error in getAllShowsOfMovieInATheatre", error.errors);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getAllShowsOfMovieInATheatre Error: ${error}`,
    });
  }
};
