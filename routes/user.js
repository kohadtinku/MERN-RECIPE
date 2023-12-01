// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const userModal = require("../model/Users"); // Adjust the path based on your project structure
// const jwt = require("jsonwebtoken");
// // Registration route
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if the user already exists
//     const existingUser = await userModal.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new userModal({ username, password: hashedPassword });

//     // Save the new user to the database
//     await newUser.save();

//     // Send a success response
//     res.status(201).json({ msg: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// });

// // Login route
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if the user exists
//     const user = await userModal.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ msg: "Invalid credentials" });
//     }

//     // Compare the provided password with the stored hashed password
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ msg: "Invalid credentials" });
//     }

//     // Generate and send a token as part of the response
//     const token = jwt.sign({ id: user._id }, "secret");
//     res.json({ token, userID: user._id, msg: "Login successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// });

// module.exports = router;

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     jwt.verify(token, "secret", (err) => {
//       if (err) return res.sendStatus(403);
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
// module.exports = verifyToken;



//new code==============

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const UserModel = require("../model/Users");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
    }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

module.exports = router;

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     jwt.verify(token, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// module.exports = verifyToken;
