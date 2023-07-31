import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import User from "./User.model";
import { ImongoUser } from "./types";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) console.log(err);
  else console.log("Database Connected");
});

//Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user: ImongoUser, done: any) {
  done(null, user._id);
});

passport.deserializeUser(function (id: any, done: any) {
  User.findById(id, function (err: Error, user: ImongoUser) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      User.findOne(
        { googleId: profile.id },
        async function (err: Error, user: ImongoUser) {
          if (err) return cb(err, null);
          if (!user) {
            const newUser = new User({
              googleId: profile.id,
              username: {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
              },
              profilePic: profile.photos[0].value,
            });
            await newUser.save();
            console.log(newUser);
            cb(null, newUser);
          }
          console.log(user);
          cb(null, user);
        }
      );
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.get("/logout", (req, res) => {
  if (req.user) {
    req.logout((err: Error) => {
      if (err) console.log(err);
    });
    res.send("done");
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
