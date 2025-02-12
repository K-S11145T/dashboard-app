const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
require("dotenv").config();
require("./config/db");
const app = express();

app.use(cors({ origin: "https://dashboard-pivz474dp-tanush-singhs-projects.vercel.app/" }));

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
