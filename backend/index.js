const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/authRoutes"));
const MONGOOSE_URL = "mongodb://localhost:27017/mern-auth";

mongoose
  .connect(MONGOOSE_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database connected and Server is running at port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
