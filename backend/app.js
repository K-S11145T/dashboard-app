const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
require("dotenv").config();  // ✅ Pehle load kar raha hu taaki env variables available ho
const db = require("./config/db"); // ✅ DB connection properly load kar raha hu

const app = express();

// ✅ CORS fix (Agar cookies ya authentication use karega toh important hai)

const corsOptions = {
  origin: 'https://dashboard-app-beige-nu.vercel.app',  // Allow frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  credentials: true,  // Allow cookies if needed
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ Default API route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ User Routes
app.use("/api/users", userRoutes);

// ✅ Server start message thoda better kiya
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT} 🔥`));
