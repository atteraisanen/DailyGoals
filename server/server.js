const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/card");
const cors = require("cors");

const dotenv = require("dotenv");
require("dotenv/config");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/user", userRoutes);
app.use("/api/cards", cardRoutes);



app.listen(process.env.PORT, () => {
  console.log("Server is running is up and running on port " + process.env.PORT);
});