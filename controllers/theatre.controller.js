import { Theatre } from "../models/theatre.model.js";

export const createTheatre = async (req, res) => {
  try {
    const { name, description, city, pincode, address } = req.body;

    const theatre = await Theatre.create({
      name,
      description,
      city,
      pincode,
      address,
    });

    return res.status(200).json({
      success: true,
      data: theatre,
      message: "Theatre Created Successfully",
    });
  } catch (error) {
    console.log("Error in createTheatre", error);
    return res.status(500).json({
      success: false,
      message: `createTheatre Error: ${error}`,
    });
  }
};
