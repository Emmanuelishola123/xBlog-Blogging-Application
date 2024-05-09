// const express = require("express");
// const multer = require("multer");


// const upload2vRoutes = express.Router()

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// upload2vRoutes.post("/", upload.single("file"), uploadFile);
// upload2vRoutes.post("/multiple", upload.array("files", 4), uploadMultipleFiles);

// module.exports = upload2vRoutes;
