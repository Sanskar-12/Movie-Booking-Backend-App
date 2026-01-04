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
    return res.status(500).json({
      success: false,
      message: `signUp Error: ${error}`,
    });
  }
};
