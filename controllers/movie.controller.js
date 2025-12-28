import { Movie } from "../models/movie.model.js";
import { requiredFields } from "../utils/index.js";

export const createMovie = async (req, res) => {
  try {
    const {
      name,
      description,
      casts,
      trailerUrl,
      lang,
      releaseDate,
      director,
      releaseStatus,
    } = req.body;

    for (const field in requiredFields) {
      if (
        !req.body[field] ||
        (Array.isArray(req.body[field]) && req.body[field].length === 0)
      ) {
        return res.status(400).json({
          success: false,
          message: requiredFields[field],
        });
      }
    }

    if (name.length <= 2 && description.length <= 5) {
      return res.status(500).json({
        success: false,
        message: `Name should be of minlength 2 and Description should be of minlength 5`,
      });
    } else if (name.length <= 2) {
      return res.status(500).json({
        success: false,
        message: `Name should be of minlength 2`,
      });
    } else if (description.length <= 5) {
      return res.status(500).json({
        success: false,
        message: `Description should be of minlength 5`,
      });
    }

    const movie = await Movie.create({
      name,
      description,
      casts,
      trailerUrl,
      lang,
      releaseDate,
      director,
      releaseStatus,
    });

    return res.status(200).json({
      success: true,
      data: movie,
      message: "Created New Movie Successfully",
    });
  } catch (error) {
    console.log("Error in createMovie", error.errors);

    return res.status(500).json({
      success: false,
      message: `create Movie Error: ${error}`,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    await movie.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Movie deleted Successfully",
    });
  } catch (error) {
    console.log("Error in deleteMovie", error);
    return res.status(500).json({
      success: false,
      message: `deleteMovie Error: ${error}`,
    });
  }
};

export const getMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    console.log("Error in getMovie", error);
    return res.status(500).json({
      success: false,
      message: `getMovie Error: ${error}`,
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const {
      name,
      description,
      casts,
      trailerUrl,
      lang,
      releaseDate,
      director,
      releaseStatus,
    } = req.body;

    if (name && description && name.length <= 2 && description.length <= 5) {
      return res.status(500).json({
        success: false,
        message: `Name should be of minlength 2 and Description should be of minlength 5`,
      });
    } else if (name && name.length <= 2) {
      return res.status(500).json({
        success: false,
        message: `Name should be of minlength 2`,
      });
    } else if (description && description.length <= 5) {
      return res.status(500).json({
        success: false,
        message: `Description should be of minlength 5`,
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    if (name) movie.name = name;
    if (description) movie.description = description;
    if (casts) movie.casts = casts;
    if (trailerUrl) movie.trailerUrl = trailerUrl;
    if (lang) movie.lang = lang;
    if (releaseDate) movie.releaseDate = releaseDate;
    if (director) movie.director = director;
    if (releaseStatus) movie.releaseStatus = releaseStatus;

    await movie.save();

    return res.status(200).json({
      success: true,
      movie,
      message: "Movie Updated Successfully",
    });
  } catch (error) {
    console.log("Error in updateMovie", error);
    return res.status(500).json({
      success: false,
      message: `updateMovie Error: ${error}`,
    });
  }
};
