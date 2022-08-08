const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");


exports.loginUser = async (req, role, res) => {
  const { email, password } = req;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists." });
    }

    if (!user.role === "admin") {
      return res.status(400).json({ message: "User is not admin." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(
      payload,

      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error);
  }
};

exports.signupUser = async (req, role, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Admin already exists." });
    if (!password == confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "admin",
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};

exports.userAuth = passport.authenticate("jwt", { session: false });
