const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("tiny"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
