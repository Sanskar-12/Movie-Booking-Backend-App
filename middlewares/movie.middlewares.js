import { STATUS_CODES } from "../utils/constants.js";
import { requiredFields } from "../utils/index.js";

export const validateMovieCreateRequest = (req, res, next) => {
  for (const field in requiredFields) {
    if (
      !req.body[field] ||
      (Array.isArray(req.body[field]) && req.body[field].length === 0)
    ) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: requiredFields[field],
      });
    }
  }

  if (req.body.name.length <= 2 && req.body.description.length <= 5) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Name should be of minlength 2 and Description should be of minlength 5`,
    });
  } else if (req.body.name.length <= 2) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Name should be of minlength 2`,
    });
  } else if (req.body.description.length <= 5) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Description should be of minlength 5`,
    });
  }

  next();
};

export const validateMovieUpdateRequest = (req, res, next) => {
  if (
    req.body.name &&
    req.body.description &&
    req.body.name.length <= 2 &&
    req.body.description.length <= 5
  ) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Name should be of minlength 2 and Description should be of minlength 5`,
    });
  } else if (req.body.name && req.body.name.length <= 2) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Name should be of minlength 2`,
    });
  } else if (req.body.description && req.body.description.length <= 5) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Description should be of minlength 5`,
    });
  }

  next();
};
