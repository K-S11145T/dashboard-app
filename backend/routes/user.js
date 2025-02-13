const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const router = express.Router();

const corsOptions = {
  origin: [
    'https://dashboard-app-beige-nu.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  exposedHeaders: ['*', 'Authorization'],
  maxAge: 600
};
router.use(cors(corsOptions));

router.options('*', cors(corsOptions));

require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;


    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


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


router.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Logged out successfully" });
});


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
