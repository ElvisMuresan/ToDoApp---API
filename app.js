const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const routes = require("./routes/ToDoRoute");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => debug(`Connected to MongoDB...`))
  .catch((err) => debug(err));

app.use(routes);

app.use(morgan("tiny"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
