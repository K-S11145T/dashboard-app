const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
require("dotenv").config(); 
const db = require("./config/db"); 

const app = express();

const corsOptions = {
  origin: 'https://dashboard-app-beige-nu.vercel.app',  
  methods: 'GET,POST,PUT,DELETE',  
  credentials: true,  
};

app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("API Running...");
});


app.use("/api/users", userRoutes);


app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT} 🔥`));
