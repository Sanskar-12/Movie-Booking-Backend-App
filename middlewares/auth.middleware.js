import {
  requiredFieldsForResetPassword,
  requiredFieldsForUser,
  requiredFieldsForUserSignIn,
} from "../utils/index.js";
import jwt from "jsonwebtoken";

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

export const validateUserSigninRequest = (req, res, next) => {
  for (const field in requiredFieldsForUserSignIn) {
    if (
      !req.body[field] ||
      (Array.isArray(req.body[field]) && req.body[field].length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message: requiredFieldsForUserSignIn[field],
      });
    }
  }

  next();
};

export const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        success: true,
        message: "User doesn't have token",
      });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (!verify) {
      return res.status(400).json({ message: "Token is invalid" });
    }

    req.user = verify;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `isAuth error ${error}`,
    });
  }
};

export const validateResetPasswordRequest = async (req, res, next) => {
  for (const field in requiredFieldsForResetPassword) {
    if (!req.body[field]) {
      return res.status(400).json({
        success: false,
        message: requiredFieldsForResetPassword[field],
      });
    }
  }

  next();
};
