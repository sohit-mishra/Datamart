import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const profileImageUpdate = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required"
      });
    }

    const result = await uploadToCloudinary(req.file, "profiles");

    res.json({
      success: true,
      image: result.secure_url
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

