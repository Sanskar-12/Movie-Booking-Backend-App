import { Theatre } from "../models/theatre.model.js";
import mongoose from "mongoose";
import { STATUS_CODES } from "../utils/constants.js";

export const createTheatre = async (req, res) => {
  try {
    const { name, description, city, pincode, address } = req.body;

    const theatre = await Theatre.create({
      name,
      description,
      city,
      pincode,
      address,
    });

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: theatre,
      message: "Theatre Created Successfully",
    });
  } catch (error) {
    console.log("Error in createTheatre", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `createTheatre Error: ${error}`,
    });
  }
};

export const deleteTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Theatre not found",
      });
    }

    await theatre.deleteOne();

    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Theatre deleted Successfully",
    });
  } catch (error) {
    console.log("Error in deleteTheatre", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `deleteTheatre Error: ${error}`,
    });
  }
};

export const getTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Theatre not found",
      });
    }

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: theatre,
    });
  } catch (error) {
    console.log("Error in getTheatre", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getTheatre Error: ${error}`,
    });
  }
};

export const getAllTheatres = async (req, res) => {
  try {
    const { city, name, pincode, movieId, page = 1, limit = 10 } = req.query;

    let query = {};

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }
    if (pincode) {
      query.pincode = Number(pincode);
    }
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (movieId) {
      query.movies = { $in: [new mongoose.Types.ObjectId(movieId)] };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const theatres = await Theatre.find(query).skip(skip).limit(Number(limit));

    if (!theatres) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Theatres not found",
      });
    }

    const total = await Theatre.countDocuments(query);

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: theatres,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log("Error in getAllTheatres", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getAllTheatres Error: ${error}`,
    });
  }
};

export const updateTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const { name, description, city, pincode, address } = req.body;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Theatre not found",
      });
    }

    if (name) {
      theatre.name = name;
    }
    if (description) {
      theatre.description = description;
    }
    if (city) {
      theatre.city = city;
    }
    if (pincode) {
      theatre.pincode = pincode;
    }
    if (address) {
      theatre.address = address;
    }

    await theatre.save();

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: theatre,
      message: "Theatre Updated Successfully",
    });
  } catch (error) {
    console.log("Error in updateTheatre", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `updateTheatre Error: ${error}`,
    });
  }
};

export const updateMoviesInTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const { movieIds, insert } = req.body;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Theatre not found",
      });
    }

    if (insert) {
      // we need to add the movieIds
      movieIds.forEach((movieId) => {
        if (!theatre.movies.includes(movieId)) {
          theatre.movies.push(movieId);
        }
      });
    } else {
      // we need to remove the movieIds
      movieIds.forEach((movieId) => {
        theatre.movies = theatre.movies.filter((id) => id != movieId);
      });
    }

    await theatre.save();

    await theatre.populate("movies");

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: theatre,
      message: "Movies Updated Successfully in Theatre",
    });
  } catch (error) {
    console.log("Error in updateMoviesInTheatre", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `updateMoviesInTheatre Error: ${error}`,
    });
  }
};

export const getMoviesInATheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findById(theatreId)
      .select("name movies address")
      .populate("movies");

    if (!theatre) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Theatre not found",
      });
    }

    return res.status(STATUS_CODES.OK).json({
      success: true,
      data: theatre,
    });
  } catch (error) {
    console.log("Error in getMoviesInATheatre", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `getMoviesInATheatre Error: ${error}`,
    });
  }
};

export const checkMovieInTheatre = async (req, res) => {
  try {
    const { theatreId, movieId } = req.params;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Theatre Not Found",
      });
    }

    const check = theatre.movies.includes(movieId);

    if (check) {
      return res.status(STATUS_CODES.OK).json({
        success: true,
        message: "Movie is present inside this theatre",
      });
    } else {
      return res.status(STATUS_CODES.OK).json({
        success: true,
        message: "Movie is not present inside this theatre",
      });
    }
  } catch (error) {
    console.log("Error in checkMovieInTheatre", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `checkMovieInTheatre Error: ${error}`,
    });
  }
};
