const cloudinary = require("cloudinary").v2;
const keys = require("../config");

cloudinary.config({
  cloud_name: keys.CLOUDINARY_NAME,
  api_key: keys.CLOUDINARY_API_KEY,
  api_secret: keys.CLOUDINARY_API_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: keys.APP_NAME,
};

module.exports = async (f) =>  {
  const data = await cloudinary.uploader.upload(f, opts);
  return data.secure_url
};
