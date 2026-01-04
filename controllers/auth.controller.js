import { User } from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, userRole, userStatus } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      userRole,
      userStatus,
    });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Error in signUp", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
      });
    }
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)[0].message;
      return res.status(400).json({
        success: false,
        message,
      });
    }
    return res.status(500).json({
      success: false,
      message: `signUp Error: ${error}`,
    });
  }
};
