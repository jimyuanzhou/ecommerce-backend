const express = require("express");
const env = require("dotenv");
const { response } = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminauth");
const categoryRoutes = require("./routes/category");

//enviorment variables
env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require("./middleware/auth")(passport);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.h28xczp.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.use("/api", authRoutes);
    app.listen(process.env.PORT, () => {
      console.log("Server has started on port!", process.env.PORT);
    });
  })
  .catch(() => {
    throw new Error("Connection error");
  });

app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
