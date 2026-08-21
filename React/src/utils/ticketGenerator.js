import jsPDF from "jspdf";

export const downloadTicket = async (booking, qrImage) => {
  const doc = new jsPDF("portrait", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();

  // ===== Ticket Border =====
  doc.setDrawColor(250, 204, 21);
  doc.setLineWidth(1.2);
  doc.roundedRect(12, 12, 186, 270, 5, 5);

  // ===== Header =====
  doc.setFillColor(250, 204, 21);
  doc.roundedRect(12, 12, 186, 28, 5, 5, "F");

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("TIKITO", pageWidth / 2, 24, {
    align: "center",
  });

  doc.setFontSize(12);
  doc.text("Movie Ticket Confirmation", pageWidth / 2, 33, {
    align: "center",
  });

  // ===== Movie =====
  doc.setTextColor(40, 40, 40);

  doc.setFontSize(10);
  doc.text("MOVIE", 20, 55);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(booking.eventName, 20, 64);

  // ===== Theatre =====
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("THEATRE", 20, 78);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(booking.venueName, 20, 86);

  // ===== Divider =====
  doc.setDrawColor(220);
  doc.line(20, 94, 190, 94);

  // ===== Details =====

  doc.setFont("helvetica", "bold");

  doc.text("Booking ID", 20, 108);
  doc.text("Date", 20, 122);
  doc.text("Time", 20, 136);
  doc.text("Seats", 20, 150);
  doc.text("Amount", 20, 164);
  doc.text("Payment", 20, 178);
  doc.text("Status", 20, 192);

  doc.setFont("helvetica", "normal");

  doc.text(`#${booking.bookingId}`, 70, 108);

  doc.text(booking.showDate, 70, 122);

  doc.text(booking.showStartTime.substring(0, 5), 70, 136);

  doc.text(booking.seatNums.join(", "), 70, 150);

  doc.text(`₹${booking.totalAmt}`, 70, 164);

  doc.text(booking.paymentStatus, 70, 178);

  doc.text(booking.bookingStatus, 70, 192);

  // ===== QR =====

  if (qrImage) {
    doc.addImage(qrImage, "PNG", 132, 102, 48, 48);
  }

  doc.setFontSize(9);

  doc.text("Scan this QR code at the theatre entrance", 156, 156, {
    align: "center",
  });

  // ===== Perforation =====

  for (let i = 20; i <= 190; i += 6) {
    doc.line(i, 214, i + 3, 214);
  }

  // ===== Instructions =====

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");

  doc.text("Important Instructions", 20, 228);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text("• Please arrive 15 minutes before showtime.", 24, 240);

  doc.text("• Carry a valid ID proof.", 24, 248);

  doc.text("• Outside food is not permitted.", 24, 256);

  doc.text("• Show this ticket at the entrance.", 24, 264);

  // ===== Footer =====

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");

  doc.text("Thank you for choosing Tikito!", pageWidth / 2, 276, {
    align: "center",
  });

  doc.save(`Tikito_Ticket_${booking.bookingId}.pdf`);
};
