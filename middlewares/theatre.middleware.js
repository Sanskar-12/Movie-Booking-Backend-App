import { STATUS_CODES } from "../utils/constants.js";
import { requiredFieldsForTheatre } from "../utils/index.js";

export const validateCreateTheatreRequest = (req, res, next) => {
  for (const field in requiredFieldsForTheatre) {
    if (!req.body[field]) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: requiredFieldsForTheatre[field],
      });
    }
  }

  if (req.body.name.length <= 5) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Name should be of minlength 5`,
    });
  }

  next();
};

export const validateUpdateTheatreRequest = (req, res, next) => {
  if (req.body.name.length <= 5) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Name should be of minlength 5`,
    });
  }

  next();
};

export const validateUpdateMoviesInTheatreRequest = (req, res, next) => {
  if (req.body.insert === undefined) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "insert parameter is required",
    });
  }
  if (!req.body.movieIds) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "movieIds parameter is required",
    });
  }
  if (!(req.body.movieIds instanceof Array)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Expected array of movies but found something else",
    });
  }
  if (req.body.movieIds.length <= 0) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "No movies present in the Movie Array provided",
    });
  }

  next();
};
