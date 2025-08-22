const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  console.log("Registering new user");
  const { name, userName, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      userName,
      email,
      password,
    });
    console.log("User created", user);
    return res.status(200).json({ message: "User registered successfully!" });
  } catch (e) {
    console.log("Error in creating user", e);
    return res
      .status(400)
      .json({ message: "User already exists or invalid data." });
  }
});

router.post("/login", async (req, res) => {
  console.log("Logging....");
  try {
    const { email, password } = req.body;
    console.log("Login attempt for user:", email);
    const token = await User.matchPasswordAndGenerateToken(email, password);
    const user = await User.findOne({ email }).select(
      "-password -salt -email -_id -__v"
    );
    // console.log(user);
    return res.json({ token, user });
  } catch (e) {
    console.log("Error in login", e);
    return res.send("Inncorect email or password");
  }
});

module.exports = router;
