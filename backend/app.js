const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");

dotenv.config();

require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
  cors({
    origin: "https://dashboard-app-beige-nu.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 API Running");
});

app.use("/api/users", userRoutes);


app.listen(process.env.PORT || 3000);
