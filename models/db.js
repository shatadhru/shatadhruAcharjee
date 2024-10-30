const mongoose = require("mongoose");

// Define the user schema without `re_password`
const UserSchema = new mongoose.Schema({
  websiteName: String,
  websiteLogo: String,
  websiteColor: String,
  colorFormats: [String],
  readymadeDesign: String,
  phoneNumber: String,
  email: String,
  address: String,
  additionalInfo: String,
});

// Export the model
const User = mongoose.model("User", UserSchema);
module.exports = User;
