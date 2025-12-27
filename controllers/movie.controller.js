import { Movie } from "../models/movie.model.js";

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
    console.log("Error in createMovie", error);
    return res.status(500).json({
      success: false,
      message: `createMovie Error: ${error}`,
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
