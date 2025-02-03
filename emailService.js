const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mau0295@gmail.com", // Cambia a tu correo
      pass: "rpil leed ecqz xmor", // Usa una contraseña de aplicación
    },
  });

  const mailOptions = {
    from: '"Boda Mau y Kary" <mau0295@gmail.com>',
    to,
    subject,
    html: htmlContent,
    attachments,
  };

  // Enviar correo
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
    return info;
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw new Error("Error al enviar el correo");
  }
};

module.exports = sendEmail;
