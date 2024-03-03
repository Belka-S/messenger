const nm = require('nodemailer');
const sg = require('@sendgrid/mail');

const { HttpError } = require('./HttpError');

const { SENDGRID_API_KEY, NODEMAILER_HOST, NODEMAILER_USER, NODEMAILER_PASS } = process.env;

// SendGrid service
sg.setApiKey(SENDGRID_API_KEY);

const sendgrid = async msg => {
  try {
    await sg.send(msg); // console.log(`Email sent to ${email}`);
  } catch (error) {
    throw HttpError(500, error.message);
  }
};

// Nodemailer service
const transporter = nm.createTransport({
  host: NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: { user: NODEMAILER_USER, pass: NODEMAILER_PASS },
});

const nodemailer = async msg => {
  try {
    await transporter.sendMail(msg); // console.log(`Email sent to ${email}`);
  } catch (error) {
    throw HttpError(500, error.message);
  }
};

module.exports = { sendgrid, nodemailer };
