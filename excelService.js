const xlsx = require("xlsx");

const generateGuestExcel = (guests) => {
  const workbook = xlsx.utils.book_new();
  const data = guests.map((guest) => ({
    Name: guest.name,
    Email: guest.email,
    Attendees: guest.attendees?.map((a) => `${a.name} (${a.isConfirmed ? "Confirmed" : "Pending"})`).join(", ") || "None",
    ConfirmationStatus: guest.confirmation_status || "Pending",
  }));
  const worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, "Guests");

  return xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
};

module.exports = generateGuestExcel;
