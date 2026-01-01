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

export const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find({});

    if (!theatres) {
      return res.status(404).json({
        success: false,
        message: "Theatres not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: theatres,
    });
  } catch (error) {
    console.log("Error in getAllTheatres", error);
    return res.status(500).json({
      success: false,
      message: `getAllTheatres Error: ${error}`,
    });
  }
};

export const updateTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const { name, description, city, pincode, address } = req.body;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    if (name) {
      theatre.name = name;
    }
    if (description) {
      theatre.description = description;
    }
    if (city) {
      theatre.city = city;
    }
    if (pincode) {
      theatre.pincode = pincode;
    }
    if (address) {
      theatre.address = address;
    }

    await theatre.save();

    return res.status(200).json({
      success: true,
      data: theatre,
      message: "Theatre Updated Successfully",
    });
  } catch (error) {
    console.log("Error in updateTheatre", error);
    return res.status(500).json({
      success: false,
      message: `updateTheatre Error: ${error}`,
    });
  }
};
