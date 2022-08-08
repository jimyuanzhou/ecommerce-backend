const express = require("express");
const router = express.Router();
const { userAuth, signupUser, loginUser } = require("../controller/auth");
const { addCategory, getCategories } = require("../controller/category");

router.get("/category/getcategory", userAuth, async (req, res) => {
  return res.json("hello");
});

router.post("/category/create", addCategory);

module.exports = router;
