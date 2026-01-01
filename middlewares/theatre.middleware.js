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

  next();
};
