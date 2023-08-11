const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  signupRoute,
  loginRoute,
  getProfile,
  signupWithGoogleRoute,
} = require("../controllers/controllers");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/signup", signupRoute);
router.post("/signup/google", signupWithGoogleRoute);
router.post("/login", loginRoute);
router.post("/profile", getProfile);

module.exports = router;
