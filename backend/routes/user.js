const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await userModel.create({ name, email, password: hashedPassword });


    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });


    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/logout", (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email })
      .select("-password -__v");
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching user data",
      error: err.message 
    });
  }
});


module.exports = router;
