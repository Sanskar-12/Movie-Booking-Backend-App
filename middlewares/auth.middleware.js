import { requiredFieldsForUser } from "../utils/index.js";

export const validateUserCreateRequest = (req, res, next) => {
  for (const field in requiredFieldsForUser) {
    if (
      !req.body[field] ||
      (Array.isArray(req.body[field]) && req.body[field].length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message: requiredFieldsForUser[field],
      });
    }
  }

  next();
};
