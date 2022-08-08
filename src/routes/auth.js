const express = require("express");
const router = express.Router();
const { userAuth, signupUser, loginUser } = require("../controller/auth");
const passport = require("passport");

//login route
router.get("/login", async (req, res) => {
  await loginUser(req.body, "user", res);
});

//signup route
router.post("/signup", async (req, res) => {
  await signupUser(req.body, "user", res);
});

module.exports = router;
