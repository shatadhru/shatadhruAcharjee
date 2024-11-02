const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Usermodel");

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Send a response (you could also add JWT here)
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/userlogingdata", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.render("userlogingdata", { users }); // Render EJS file and pass user data
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

module.exports = router;
