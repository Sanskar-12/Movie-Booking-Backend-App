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

export const deleteTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    await theatre.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Theatre deleted Successfully",
    });
  } catch (error) {
    console.log("Error in deleteTheatre", error);
    return res.status(500).json({
      success: false,
      message: `deleteTheatre Error: ${error}`,
    });
  }
};

export const getTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: theatre,
    });
  } catch (error) {
    console.log("Error in getTheatre", error);
    return res.status(500).json({
      success: false,
      message: `getTheatre Error: ${error}`,
    });
  }
};
