const fs = require("fs");
const removeBg = require("remove.bg");

// Use your actual Remove.bg API key
const apiKey = "x5KbW1VFKzStYa5J9BJRGrXr";

removeBg
  .removeBackgroundFromImageFile({
    path: "./public/mypic.jpg", // Path to your image
    apiKey: apiKey, // API key
    size: "auto", // Adjust size as needed
    type: "auto", // Adjust type as needed
  })
  .then((result) => {
    console.log(result); // Log the entire result object
    if (result.base64) {
      // Check if base64 data is present
      fs.writeFileSync("output.png", result.base64, "base64"); // Save the output
      console.log("Background removed successfully!");
    } else {
      console.error("No base64 data found in the result:", result);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    // Log additional error information if available
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    }
  });
