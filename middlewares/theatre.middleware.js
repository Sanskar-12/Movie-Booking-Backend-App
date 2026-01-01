import { requiredFieldsForTheatre } from "../utils/index.js";

export const validateCreateTheatreRequest = (req, res, next) => {
  for (const field in requiredFieldsForTheatre) {
    if (!req.body[field]) {
      return res.status(400).json({
        success: false,
        message: requiredFieldsForTheatre[field],
      });
    }
  }

  if (req.body.name.length <= 5) {
    return res.status(500).json({
      success: false,
      message: `Name should be of minlength 5`,
    });
  }

  next();
};

export const validateUpdateTheatreRequest = (req, res, next) => {
  if (req.body.name.length <= 5) {
    return res.status(500).json({
      success: false,
      message: `Name should be of minlength 5`,
    });
  }

  next();
};
