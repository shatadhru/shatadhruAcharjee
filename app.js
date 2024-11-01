const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const User = require("./models/db"); // Ensure you have the User model defined
const Contact = require("./models/contact"); // Ensure you have the Contact model defined

const app = express();
const PORT = 3000;


// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure you have a views directory


// Route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Ensure you have index.html in public
});


// Route to handle form submission for user data
app.post("/userdata", async (req, res) => {
  try {
    const formData = req.body;
    console.log("Form data received:", formData);

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

// Route to display user data
app.get("/userdata", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.render("data", { users }); // Render the EJS template with user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Failed to fetch user data.");
  }
});

// Route to handle contact form submission
app.post("/contactdata", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const contactEntry = new Contact({
    name,
    email,
    phone,
    message,
  });

  try {
    // Save contact data to the database
    await contactEntry.save();
    res.send("<h1>Successfully Saved</h1>");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save contact information." });
  }
});

// Route to display contact details
app.get("/contactdetails", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render("contactdata", { contacts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve contact information." });
  }
});

// Database connection
const dbURL = process.env.MONGODB_URL; // Ensure you have this in your .env file

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connected to Modhus Server");
  })
  .catch((err) => {
    console.error("Failed to connect to Modhus Server", err);
    process.exit(1); // Exit process on DB failure
  });


module.exports = app ;