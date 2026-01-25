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
      data: show,
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
    let filter = {};

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
      data: shows,
    });
  } catch (error) {
    console.log("Error in getAllShowsOfMovieInATheatre", error.errors);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getAllShowsOfMovieInATheatre Error: ${error}`,
    });
  }
};

export const deleteShow = async (req, res) => {
  try {
    const { showId } = req.params;

    const show = await Show.findById(showId);

    if (!show) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Show not found",
      });
    }

    await show.deleteOne();

    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Show deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteShow", error.errors);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `deleteShow Error: ${error}`,
    });
  }
};

export const updateShow = async (req, res) => {
  try {
    const { timing, noOfSeats, price } = req.body;

    const { showId } = req.params;

    const show = await Show.findById(showId);

    if (!show) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Show not found",
      });
    }

    if (timing) {
      show.timing = timing;
    }
    if (noOfSeats) {
      show.noOfSeats = noOfSeats;
    }
    if (price) {
      show.price = price;
    }

    await show.save();

    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Show updated successfully",
      data: show,
    });
  } catch (error) {
    console.log("Error in updateShow", error.errors);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `updateShow Error: ${error}`,
    });
  }
};
