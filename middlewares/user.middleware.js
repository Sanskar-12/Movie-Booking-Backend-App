import { STATUS_CODES } from "../utils/constants.js";

export const validateUpdateUserRequest = (req, res, next) => {
  if (!(req.body.userRole || req.body.userStatus)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "User Role or User Status is required",
    });
  }

  next();
};
