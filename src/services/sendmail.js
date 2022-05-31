// import nodemailer from "nodemailer";
// import { config } from "dotenv";

// config();

const sendMail = (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });
  const options = {
    from: process.env.ADMIN_EMAIL,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  transporter.sendMail();
  return transporter.sendMail(options);
};

module.exports = {
  sendMail,
};
