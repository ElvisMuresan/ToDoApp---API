const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
