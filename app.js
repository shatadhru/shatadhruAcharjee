const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/db");
require("dotenv").config(); // Load environment variables

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Route to handle form submission
app.post("/userdata", async (req, res) => {
  try {
    const formData = req.body;
    console.log("Form data received:", formData);

    // Create a new instance of FormData with the received data
    const newEntry = new User({
      websiteName: formData.websiteName,
      websiteLogo: formData.websiteLogo,
      websiteColor: formData.websiteColor,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      additionalInfo: formData.additionalInfo,
    });

    // Save to the database
    await newEntry.save();
    res.status(200).send("Form data saved successfully.");
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).send("Failed to save form data.");
  }
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure you have a views directory

app.get("/userdata", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.render("data", { users }); // Render the EJS template with user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Failed to fetch user data.");
  }
});

// Database connection
const dbURL = process.env.MONGODB_URL;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connected to Modhus Server");
  })
  .catch((err) => {
    console.error("Failed to connect to Modhus Server", err);
    process.exit(1); // Exit process on DB failure
  });

module.exports = app;
