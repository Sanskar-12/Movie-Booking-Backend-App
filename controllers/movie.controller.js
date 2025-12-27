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
