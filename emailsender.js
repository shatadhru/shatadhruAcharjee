const nodemailer = require("nodemailer");

// Create a transporter using your SMTP credentials
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Brevo SMTP server
  port: 587, // Common SMTP port
  auth: {
    user: "7ef094002@smtp-brevo.com", // Your Brevo SMTP email
    pass: "H1tGTV6b3M5CZ89I", // Your Brevo SMTP password
  },
});

// Function to send email
const sendEmail = async () => {
  const mailOptions = {
    from: "7ef094002@smtp-brevo.com", // Sender address
    to: "ssnmggs@gmail.com", // Recipient's email address
    subject: "Hello from Node.js", // Email subject
    html: "<h1>This is a test email!</h1>", // Email content (HTML)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Call the sendEmail function
sendEmail();
