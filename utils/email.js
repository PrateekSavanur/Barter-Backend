const { createTransport } = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  // Define email options

  const mailOptions = {
    from: "prateek7802@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
