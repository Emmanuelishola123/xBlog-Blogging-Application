const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouters = require("./routes/authRoutes");
const userRouters = require("./routes/userRoutes");
const postRouters = require("./routes/postRoutes");
const commentRouters = require("./routes/commentRoutes");
const searchRouters = require("./routes/searchRoutes");
const connectDB = require("./services/db");
const multer = require("multer");
const {
  uploadFile,
  uploadMultipleFiles,
} = require("./controllers/uploadControllers");
const v2Routes = require("./routes");


/**
 * @MiddlewaresConfig
 */
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   })
// );
const allowedOrigins = [
  "https://x-blog-view.vercel.app",
  "https://x-blog-view.vercel.app/",
  "http://localhost:3000",
  "http://localhost:3001",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.options("/*", (_, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
  res.sendStatus(200);
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/**
 * @DBConnection
 */
connectDB();

/**
 * @Routes
 */
app.get("/", (_, res) => {
  res.send("Welcome to xBlog Server Entrance");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), uploadFile);
app.post("/upload/multiple", upload.array("files", 4), uploadMultipleFiles);
app.use("/post", postRouters);
app.use("/comment", commentRouters);
app.use("/search", searchRouters)
app.use("/auth", authRouters);
app.use("/user", userRouters);

// Version 2.0 Routes
app.use("/api/v2", v2Routes)

module.exports = app