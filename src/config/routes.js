var nodemailer = require('nodemailer');

const routeDefault = (req, res) => {
  res.json({
    status: 'OK',
  });
};

const sendEmail = (req, res) => {
  const {
    body: {
      subject,
      message,
      successMessage,
      to,
    }
  } = req;
  var transporte = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  var emailConfig = {
    from: process.env.EMAIL_USER,
    to: to || process.env.EMAIL_USER,
    subject,
    html: `Mensagem: <strong>${message}</strong>`,
  };

  transporte.sendMail(emailConfig, (err, info) => {
    res.json(err ? err : {
      msg: 'E-mail enviado com sucesso',
      successMessage,
      message,
      subject,
      info
    });
  });
};


module.exports = {
  sendEmail,
  routeDefault,
};