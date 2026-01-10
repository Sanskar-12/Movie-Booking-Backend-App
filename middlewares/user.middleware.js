export const validateUpdateUserRequest = (req, res, next) => {
  if (!(req.body.userRole || req.body.userStatus)) {
    return res.status(400).json({
      success: false,
      message: "User Role or User Status is required",
    });
  }

  next();
};
