const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { signupUser, loginUser } = require("../controller/auth");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "process.env.JWT_SECRET",
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      await User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
          return done(null, false);
        });
    })
  );
};

//       await User.findById(payload.user._id)
//         .then(async (user) => {
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch((error) => {
//           return done(null, false);
//         });
//     })
//   );
// };

// exports.auth = (req, res, next) => {
//   try {
//     if (req.header.authorization) {
//       const token = req.header.authorization.split("")[1];
//       const isCustomAuth = token.length < 500;

//       let decodeData;
//       if (token && isCustomAuth) {
//         decodeData = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decodeData || {};
//         console.log(decodeData);
//       } else {
//         decodeData = jwt.decode(token);
//         req.userId = decodeData?.sub;
//       }
//     }
//   } catch (error) {
//     res.status(400).json({ message: "Authorization required" });
//   }
//   next();
// };

// exports.userMiddleware = (req, res, next) => {
//   try {
//     if (!req.userId.role === "user") {
//       return res.status(400).json({ message: "Access denied" });
//     }
//     next();
//   } catch (e) {
//     console.log(e);
//     // return res.status(500).json({ message: "An error has occured" });
//   }
// };

// exports.adminMiddleware = (req, res, next) => {
//   try {
//     if (!req.userId.role === "admin") {
//       return res.status(400).json({ message: "Access denied" });
//     }
//     next();
//   } catch (e) {
//     console.log(e);
//     // return res.status(500).json({ message: "An error has occured" });
//   }
// };
