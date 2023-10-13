const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");

const routes = require("./routes/ToDoRoute");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => debug(`Connected to MongoDB...`))
  .catch((err) => debug(err));

app.use(routes);

app.use(morgan("tiny"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
