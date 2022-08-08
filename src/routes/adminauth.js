const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controller/adminauth");

//login route
router.post("/admin/login", async (req, res) => {
  await loginUser(req.body, "admin", res);
});

//signup route
router.post("/admin/signup", async (req, res) => {
  await signupUser(req.body, "admin", res);
});

module.exports = router;
