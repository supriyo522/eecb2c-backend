// const sgMail = require('@sendgrid/mail');
// require('dotenv').config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendMail = async (email, password, objectId) => {
//   const msg = {
//     to: email,
//     from: 'backend@houseofmusa.com',
//     subject: 'Booking Confirmation',
//     html: `
//       <h3>Your Free Session Booking is Confirmed!</h3>
//       <p><strong>Object ID:</strong> ${objectId}</p>
//       <p><strong>Password:</strong> ${password}</p>
//     `
//   };

//   try {
//     await sgMail.send(msg);
//     console.log(`Email sent to ${email}`);
//   } catch (error) {
//     console.error('SendGrid Error:', error.response?.body || error.message);
//   }
// };

// module.exports = sendMail;



// utils/sendEmail.js
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, htmlContent) => {
  const msg = {
    to,
    from: 'backend@houseofmusa.com',
    subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Failed to send email:", error.response?.body || error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
