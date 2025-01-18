const { createTransport } = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: false,
    tls: {
      ciphers: "SSLv3",
    },
  });
  // Define email options

  const mailOptions = {
    from: "Prateek Savanur <mymail@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // Send email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
