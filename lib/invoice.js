import jsPDF from "jspdf";
import QRCode from "qrcode";

const loadLogo = () => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = "/logo.png";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => resolve(null);
  });
};

export const generateInvoicePDF = async (booking) => {
  const doc = new jsPDF("p", "mm", "a4");
  const logo = await loadLogo();

  const invoiceNo =
  "INV-" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 100000);

  const qrData = await QRCode.toDataURL(
  `https://wa.me/9172271464?text=Booking%20ID:%20${booking.bookingId}`
  );

  // BACKGROUND
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");

  // ================= HEADER =================
  doc.setFillColor(30, 58, 138);
  doc.rect(0, 0, 210, 40, "F");

  // White background
doc.setFillColor(255, 255, 255);
doc.roundedRect(8, 7, 26, 26, 3, 3, "F");

// Logo
if (logo) {
  doc.addImage(logo, "PNG", 10, 9, 22, 22);
}

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("RC TOURS & TRAVELS", 38, 16);

  doc.setFontSize(10);
  doc.text("Taxi Service | Tour Packages | Airport Transfers", 38, 24);

  doc.setFontSize(16);
  doc.text("TAX INVOICE", 150, 14);

  doc.setFontSize(10);
  doc.text(`Invoice No: ${invoiceNo}`, 150, 22);
  doc.text(`Booking ID: ${booking.bookingId}`, 150, 29);

  // ================= BOOKING BADGE =================
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(145, 5, 60, 18, 2, 2, "F");

  doc.setTextColor(30, 58, 138);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");

  // RESET COLOR FIRST
doc.setTextColor(30, 58, 138);

// SMALL HEADER TEXT
doc.setFont("helvetica", "bold");
doc.setFontSize(8);
doc.text("INVOICE NO", 148, 12);

// BIG INVOICE NUMBER
doc.setFontSize(14);
doc.text(`INV-${booking.bookingId}`, 148, 18);

  // RESET
  doc.setTextColor(0, 0, 0);

  // ================= BUSINESS BOX =================
  doc.roundedRect(10, 45, 190, 25, 2, 2);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("BUSINESS DETAILS", 14, 53);

  doc.setFont("helvetica", "normal");
  doc.text("RC Tours & Travels", 14, 60);
  doc.text("Dighori, Nagpur - 440034", 14, 66);
  doc.text("Mo: 9172271464", 120, 66);

  // ================= INFO BOX =================
  doc.roundedRect(10, 75, 190, 22, 2, 2);

  doc.setFont("helvetica", "bold");
  doc.text("INVOICE INFO", 14, 83);

  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 90);
  doc.text(`Travel: ${booking.journeyDate || "-"}`, 80, 90);

  const status = booking.paymentStatus || "Pending";

  if (status.toLowerCase() === "paid") {
  doc.setFillColor(34, 197, 94); // GREEN
  } else {
  doc.setFillColor(239, 68, 68); // RED
  }

  // status badge box (right side)
  doc.roundedRect(150, 82, 45, 10, 2, 2, "F");

  // text inside box
  doc.setTextColor(255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");

  doc.text(status.toUpperCase(), 152, 88);

  // reset color
  doc.setTextColor(0);

  doc.saveGraphicsState();
doc.setGState(new doc.GState({ opacity: 0.08 })); // light transparency

doc.setTextColor(200, 200, 200);
doc.setFontSize(50);
doc.setFont("helvetica", "bold");

// center watermark
doc.text("RC TOURS", 105, 170, { align: "center" });

doc.restoreGraphicsState();
doc.setTextColor(0, 0, 0);

  // ================= CUSTOMER + TRIP GRID =================
  doc.roundedRect(10, 100, 95, 45, 2, 2);
  doc.roundedRect(105, 100, 95, 45, 2, 2);

  doc.setFont("helvetica", "bold");
  doc.text("CUSTOMER", 14, 108);

  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${booking.name || "-"}`, 14, 118);
  doc.text(`Mobile: ${booking.mobile || "-"}`, 14, 126);
  doc.text(`Email: ${booking.email || "-"}`, 14, 134);

  doc.setFont("helvetica", "bold");
  doc.text("TRIP DETAILS", 109, 108);

  doc.setFont("helvetica", "normal");
  doc.text(`Pickup: ${booking.pickup || "-"}`, 109, 118);
  doc.text(`Drop: ${booking.drop || "-"}`, 109, 126);
  doc.text(`Vehicle: ${booking.vehicle || "Dzire"}`, 109, 134);

  // ================= DIVIDER =================
  doc.setDrawColor(220);
  doc.line(10, 150, 200, 150);

  // ================= FARE SECTION =================
  const startY = 160;

  doc.setFillColor(30, 58, 138);
  doc.rect(10, startY, 190, 10, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("FARE BREAKDOWN", 14, startY + 7);

  doc.setTextColor(0, 0, 0);

  const row = (label, value, y) => {
  doc.setFont("helvetica", "normal");

  // LEFT SIDE LABEL
  doc.text(label, 14, y);

  // SAFE NUMBER FIX (IMPORTANT)
  const amount = Number(value || 0);

  // RIGHT SIDE AMOUNT (NO SPACING ISSUE)
  doc.text(`Rs. ${amount.toLocaleString("en-IN")}`, 180, y, {
    align: "right",
  });

  // line separator
  doc.setDrawColor(235);
  doc.line(10, y + 2, 200, y + 2);
  };

  row("Base Fare", booking.totalFare || 0, 175);
  row("Toll", booking.toll || 0, 185);
  row("Parking", booking.parking || 0, 195);
  row("State Tax", booking.stateTax || 0, 205);
  row("Driver Allowance", booking.driverAllowance || 0, 215);

  const grandTotal =
    Number(booking.totalFare || 0) +
    Number(booking.toll || 0) +
    Number(booking.parking || 0) +
    Number(booking.stateTax || 0) +
    Number(booking.driverAllowance || 0);

  // ================= TOTAL BOX =================
  doc.setFillColor(34, 197, 94);
  doc.rect(10, 225, 190, 12, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text("GRAND TOTAL", 14, 233);
  doc.text("Rs. " + String(grandTotal), 160, 233);

  doc.addImage(qrData, "PNG", 10, 242, 28, 28);

  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("Scan for WhatsApp Support", 10, 273);

  // ================= FOOTER =================
  doc.setTextColor(120);
  doc.setFontSize(9);

  // ================= DECLARATION SECTION =================
doc.setFontSize(8);
doc.setTextColor(80);

// ================= FOOTER / DECLARATION =================

doc.setFontSize(8);
doc.setTextColor(90);

doc.text(
  "Declaration: This is a computer generated invoice and does not require signature.",
  105,
  258,
  { align: "center" }
);

doc.text(
  "All disputes are subject to Nagpur jurisdiction only.",
  105,
  263,
  { align: "center" }
);

// divider line
doc.setDrawColor(220);
doc.line(10, 278, 200, 278);

// thank you text
doc.setFontSize(9);
doc.setTextColor(120);

doc.text("Thank you for choosing RC Tours & Travels", 105, 283, {
  align: "center",
});

doc.text("www.rctoursandtravels.in | 9172271464", 105, 289, {
  align: "center",
});

// ================= SAVE PDF =================
doc.save(`Invoice_${booking.bookingId}.pdf`);
};