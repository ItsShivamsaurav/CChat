const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { sendOtpEmail, generateOtp } = require("../services/otp");
const OtpModel = require("../models/otp");

router.post("/register", async (req, res) => {
  // console.log("Registering new user");
  const { name, userName, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      userName,
      email,
      password,
    });
    // console.log("User created", user);
    return res.status(200).json({ message: "User registered successfully!" });
  } catch (e) {
    // console.log("Error in creating user", e);
    return res
      .status(400)
      .json({ message: "User already exists or invalid data." });
  }
});

router.post("/login", async (req, res) => {
  // console.log("Logging....");
  try {
    const { email, password } = req.body;
    // console.log("Login attempt for user:", email);
    const token = await User.matchPasswordAndGenerateToken(email, password);
    const user = await User.findOne({ email }).select(
      "-password -salt -email -_id -__v"
    );
    // console.log(user);
    return res.json({ token, user });
  } catch (e) {
    // console.log("Error in login", e);
    return res.send("Inncorect email or password");
  }
});

router.post("/sendotp", async (req, res) => {
  // console.log("Sending OTP....");
  const { email } = req.body;
  try {
    const otp = generateOtp();
    // console.log("Generated OTP:", otp);
    await sendOtpEmail(email, otp);
    await OtpModel.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true } // Create new if not exists updating if exists  && new:ture - return the updated document
    );
    return res.status(200).json({ message: "OTP sent successfully!" });
  } catch (e) {
    // console.log("Error in sending OTP", e);
    return res.status(500).json({ message: "Failed to send OTP." });
  }
});

router.post("/verifyotp", async (req, res) => {
  // console.log("Verifying OTP....");
  const { email, otp } = req.body;
  try {
    const record = await OtpModel.findOne({ email }).sort({ createdAt: -1 }); // Get the latest OTP record
    // console.log("OTP record found:", record);
    if (!record) {
      // console.log("No OTP record found for email:", email);
      return res
        .status(400)
        .json({ message: "No OTP request found for this email." });
    }
    if (record.otp !== otp) {
      // console.log("Invalid OTP for email:", email);
      return res.status(400).json({ message: "Invalid OTP." });
    }
    // OTP is valid and not expired
    await OtpModel.findOneAndDelete({ email }); // Remove OTP record after successful verification
    // console.log("OTP verified for email:", email);
    return res.status(200).json({ message: "OTP verified successfully!" });
  } catch (e) {
    console.log("Error in verifying OTP", e);
    return res.status(500).json({ message: "Failed to verify OTP." });
  }
});

module.exports = router;
