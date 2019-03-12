var nodemailer = require("nodemailer");
var _get = require("lodash.get");

const routeDefault = (req, res) => {
  res.json({
    status: "OK"
  });
};

const sendEmail = (req, res) => {
  const { subject, message, to } = _get(req, "body", {});
  if (!subject || !message || !to) {
    return res.json({
      ErrorMessage: "Forneça o assunto, mensagem e destinatário"
    });
  }
  var transporte = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  var emailConfig = {
    from: process.env.EMAIL_USER,
    to: to || process.env.EMAIL_USER,
    subject,
    html: `Mensagem: <strong>${message}</strong>`
  };

  transporte.sendMail(emailConfig, (error, info) => {
    if (error) {
      res.json({ ErrorMessage: "Problema ao enviar e-mail.", error });
    }
    res.json({
      msg: "E-mail enviado com sucesso",
      message,
      subject,
      info
    });
  });
};

module.exports = {
  sendEmail,
  routeDefault
};
