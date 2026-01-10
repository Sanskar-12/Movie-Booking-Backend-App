import { User } from "../models/user.model.js";

export const updateUserRoleOrStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userRole, userStatus } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userRole) {
      user.userRole = userRole;
    }
    if (userStatus) {
      user.userStatus = userStatus;
    }

    await user.save();

    // remove password from user json
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      data: userWithoutPassword,
      message: "User details Updated successfully",
    });
  } catch (error) {
    console.log("Error in updateUserRoleOrStatus", error);
    return res.status(500).json({
      success: false,
      message: `updateUserRoleOrStatus Error: ${error}`,
    });
  }
};
