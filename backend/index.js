const express = require("express");
const cors = require("cors");
const connection = require("./db/config");
require("dotenv").config();
const authRoute = require("./routes/authRoutes");
const empolyeeRoute = require("./routes/empolyeeRoute");
const todoRoute = require("./routes/todoRoutes");
const mongoose = require("mongoose");
const port = 8199;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("base route");
});
app.use("/", todoRoute);
app.use("/", authRoute);
app.use("/", empolyeeRoute);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

async function connectToDatabase() {
  try {
    await connection;
    console.log("database connected successfully");
  } catch (error) {
    console.log("error connecting to the database");
    console.log(error);
  }
}

connectToDatabase();
