const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/ToDoRoute");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./controllers/models/UserModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

debug.enabled = true;

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "755798293757-6rpa8382regso8ocfdgiv7h4g0n1kju5.apps.googleusercontent.com",
      clientSecret: "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",
      // callbackURL: "https://elvistodoapp.netlify.app/auth/google",
      callbackURL: "http://127.0.0.1:5501/auth/google",
    },
    (accessToken, refreshToken, email, done) => {
      const verifyCallback = async () => {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
          return done(null, existingUser);
        } else {
          const newUser = new UserModel({
            email,
          });

          await newUser.save();

          return done(null, newUser);
        }
      };
      verifyCallback().catch((error) => {
        return done(error);
      });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user || user.comparePassword(password)) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
app.use(passport.initialize());
app.use(passport.session());

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
