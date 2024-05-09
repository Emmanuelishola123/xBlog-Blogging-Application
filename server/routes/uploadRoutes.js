const express = require("express");
const multer = require("multer");
const {
  uploadMultipleFiles,
  uploadFile,
} = require("../controllers/uploadControllers");


const uploadRoutes = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * @POST
 */
uploadRoutes.post("/", upload.single("file"), uploadFile);
uploadRoutes.post("/multiple", upload.array("files", 4), uploadMultipleFiles);

module.exports = uploadRoutes;
