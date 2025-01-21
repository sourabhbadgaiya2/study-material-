require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const passport = require("passport");
const session = require("express-session");

const app = express();
const port = 3000;

require("./config/passport");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", require("./routes/authRoutes"));

// Start the server
app.listen(port, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${port}`);
});
