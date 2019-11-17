const nodemailer = require('nodemailer');

const sendEmail = options => {
  // 1) Create a transporter
  //GMAIL
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user
    }
  });

  // 2) Define email options

  // 3) Actually send the email
};
