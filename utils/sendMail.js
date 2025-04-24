const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const sendMail = async (email, password, objectId) => {
  const msg = {
    to: email,
    from: 'backend@houseofmusa.com',
    subject: 'Booking Confirmation',
    html: `
      <h3>Your Free Session Booking is Confirmed!</h3>
      <p><strong>Object ID:</strong> ${objectId}</p>
      <p><strong>Password:</strong> ${password}</p>
    `
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('SendGrid Error:', error.response?.body || error.message);
  }
};

module.exports = sendMail;
