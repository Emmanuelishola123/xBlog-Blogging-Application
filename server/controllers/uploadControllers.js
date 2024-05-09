const cloudinary = require("cloudinary").v2;
const keys = require("../config");
const response = require("../utils/response");
const upload2Cloudinary = require("../services/upload2Cloudinary");

cloudinary.config({
  cloud_name: keys.CLOUDINARY_NAME,
  api_key: keys.CLOUDINARY_API_KEY,
  api_secret: keys.CLOUDINARY_API_SECRET,
});

const uploadFile = async (req, res) => {
  try {
    const imageUrl = await upload2Cloudinary(req.file.path);
    return response(req, res, 201, false, imageUrl, "File url generated");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

const uploadMultipleFiles = async (req, res) => {
  try {
    let files = [];
    let imgUrl = null;
    for (let i = 0; i < req.files.length; i++) {
      imgUrl = await upload2Cloudinary(req.files[i].path);
      files.push(imgUrl);
    }
    return response(req, res, 201, false, files, "Files url generated");
  } catch (error) {
    return response(req, res, 500, true, false, error.message);
  }
};

module.exports = { uploadFile, uploadMultipleFiles };
