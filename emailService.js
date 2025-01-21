const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mau0295@gmail.com", // Cambia a tu correo
      pass: "gzk3ngb0YVN!nku!tgb", // Usa una contraseña de aplicación
    },
  });

  const mailOptions = {
    from: '"Boda Mau y Kary" <mau0295@gmail.com>',
    to,
    subject,
    html: htmlContent,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
