const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "mau_02-95@ghotmail.com", // Cambia a tu correo
      pass: "mimamamemima123", // Usa una contraseña de aplicación
    },
  });

  const mailOptions = {
    from: '"Boda Mau y Kary" <mau_02-95@ghotmail.com>',
    to,
    subject,
    html: htmlContent,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
