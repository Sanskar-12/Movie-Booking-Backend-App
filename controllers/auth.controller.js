import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/genToken.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, userRole, userStatus } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    user = await User.create({
      name,
      email,
      password,
      userRole,
      userStatus,
    });

    // remove password from user json
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      data: user,
      message: "User Signed up Successfully",
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

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or Password is invalid",
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or Password is invalid",
      });
    }

    const token = generateToken(user);

    // remove password from user json
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      data: userWithoutPassword,
      message: "User Signed in Successfully",
    });
  } catch (error) {
    console.log("Error in signIn", error);
    return res.status(500).json({
      success: false,
      message: `signIn Error: ${error}`,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    let isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password is invalid",
      });
    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
      message: "Reset password successful",
    });
  } catch (error) {
    console.log("Error in resetPassword", error);
    return res.status(500).json({
      success: false,
      message: `resetPassword Error: ${error}`,
    });
  }
};
