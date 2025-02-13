const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const router = express.Router();

// CORS middleware lagane ka sahi tareeka (Express app pe lagana hota hai, router pe nahi)
router.use(cors());

// ✅ Register API
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await userModel.create({ name, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Logged in successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Logout API (Improved)
router.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Protected Route: Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ email: decoded.email });

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({
        name: user.name,
        email: user.email,
      });

    } catch (err) {
      return res.status(400).json({ message: "Invalid token" });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
