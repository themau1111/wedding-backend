const sendEmail = require("../emailService");
const generateGuestExcel = require("../excelService");

export default async (req, res) => {
  // Manejo de preflight OPTIONS para CORS
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const { guests, updatedGuest } = req.body;

    console.log("Recibiendo datos en notify.js:", req.body); // Para depuración

    // Generar el archivo Excel
    const excelBuffer = generateGuestExcel(guests);

    const subject = `Actualización de Confirmación: ${updatedGuest.name}`;
    const htmlContent = `
      <p>Hola Mau y Kary,</p>
      <p>${updatedGuest.name} ha actualizado su confirmación:</p>
      <ul>
        <li><b>Estado:</b> ${updatedGuest.confirmation_status}</li>
        <li><b>Acompañantes:</b> ${
          updatedGuest.attendees
            ?.map(
              (a) => `${a.name} (${a.isConfirmed ? "Confirmado" : "Pendiente"})`
            )
            .join(", ") || "Ninguno"
        }</li>
      </ul>
      <p>Adjuntamos la lista completa de invitados en Excel.</p>
    `;

    await sendEmail(
      ["mau_02-95@hotmail.com", "soliskarina17@gmail.com"],
      subject,
      htmlContent,
      [{ filename: "Invitados.xlsx", content: excelBuffer }]
    );

    return res.status(200).json({ message: "Notificación enviada con éxito" });
  } catch (error) {
    console.error("Error al enviar notificación:", error);
    return res
      .status(500)
      .json({ message: "Error interno al enviar la notificación" });
  }
};
