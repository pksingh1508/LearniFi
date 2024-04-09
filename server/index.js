const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

// database connect
require("./config/database").dbConnect();
// middleware
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     credentials: true,
//   })
// );
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// cloudinary connect
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// default routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// activate the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
