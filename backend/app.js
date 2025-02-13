const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
require("dotenv").config(); 
const db = require("./config/db"); 

const app = express();

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

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://dashboard-app-beige-nu.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("API Running...");
});


app.use("/api/users", userRoutes);


app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT} 🔥`));
