const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signupRoute = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    console.log(exist)
    if (exist) {
      return res.status(400).json({ error: "Email already taken!!" });
    } else {
      // Hash the password before saving
      const saltRounds = 4;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginRoute = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        jwt.sign(
          { email: user.email, id: user._id, name: user.name },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.status(200).json({ user, token });
          }
        );
      } else {
        return res.status(401).json({ error: "Invalid password!" });
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getProfile = (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json({ user });
    });
  } else {
    res.json(null);
  }
};

const signupWithGoogleRoute = async (req, res) => {
  try {
    const { name, email, googleId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      jwt.sign(
        { email: user.email, id: user._id, googleId: user.googleId ,name:user.name},
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ user, token });
        }
      );
    } else {
      const newUser = new User({ name, email, googleId });
      await newUser.save();
  
      jwt.sign(
        { email: newUser.email, id: newUser._id, googleId: newUser.googleId,name:newUser.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ user: newUser, token });
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signupRoute,
  loginRoute,
  getProfile,
  signupWithGoogleRoute,
};
