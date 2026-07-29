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

  const invoiceNo = `INV-${booking.bookingId}`;

  const qrData = await QRCode.toDataURL(
    `https://wa.me/919172271464?text=Booking%20ID:%20${booking.bookingId}`
  );

  // -------------------------
  // Background
  // -------------------------

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");

  // -------------------------
  // HEADER
  // -------------------------

  doc.setFillColor(25, 54, 110);
  doc.rect(0, 0, 210, 40, "F");

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(8, 7, 26, 26, 3, 3, "F");

  if (logo) {
    doc.addImage(logo, "PNG", 10, 9, 22, 22);
  }

  doc.setTextColor(255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("RC TOURS & TRAVELS", 38, 16);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Taxi Service | Tour Packages | Airport Transfers", 38, 24);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("TAX INVOICE", 150, 14);

  doc.setFontSize(9);
  doc.text(`Invoice No : ${invoiceNo}`, 150, 22);
  doc.text(`Booking ID : ${booking.bookingId}`, 150, 30);

  // -------------------------
  // Invoice Badge
  // -------------------------

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(145, 5, 60, 18, 2, 2, "F");

  doc.setTextColor(25, 54, 110);

  doc.setFontSize(8);
  doc.text("INVOICE NO", 148, 12);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(invoiceNo, 148, 18);

  doc.setTextColor(0);

  // -------------------------
  // Business Details
  // -------------------------

  doc.roundedRect(10, 45, 190, 25, 2, 2);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("BUSINESS DETAILS", 14, 53);

  doc.setFont("helvetica", "normal");

  doc.text("RC Tours & Travels", 14, 60);
  doc.text("New Narsala Road, Dighori", 14, 66);
  doc.text("Nagpur - 440034", 75, 66);
  doc.text("Mobile : 9172271464", 140, 66);

  // -------------------------
  // Invoice Info
  // -------------------------

  doc.roundedRect(10, 75, 190, 22, 2, 2);

  doc.setFont("helvetica", "bold");
  doc.text("INVOICE INFO", 14, 83);

  doc.setFont("helvetica", "normal");

  doc.text(
    `Date : ${new Date().toLocaleDateString("en-IN")}`,
    14,
    90
  );

  doc.text(
    `Journey : ${booking.journeyDate || "-"}`,
    78,
    90
  );

  const status = booking.paymentStatus || "Pending";

  if (
    status.toLowerCase() === "fully paid" ||
    status.toLowerCase() === "paid"
  ) {
    doc.setFillColor(34, 197, 94);
  } else {
    doc.setFillColor(239, 68, 68);
  }

  doc.roundedRect(150, 82, 45, 10, 2, 2, "F");

  doc.setTextColor(255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(status.toUpperCase(), 152, 88);

  doc.setTextColor(0);

  // -------------------------
  // Watermark
  // -------------------------

  doc.saveGraphicsState();

  doc.setGState(new doc.GState({ opacity: 0.08 }));

  doc.setFont("helvetica", "bold");
  doc.setFontSize(48);

  doc.setTextColor(180);

  doc.text("RC TOURS", 105, 170, {
    align: "center",
  });

  doc.restoreGraphicsState();

  doc.setTextColor(0);

    // ================= CUSTOMER & TRIP =================
  doc.roundedRect(10, 100, 95, 56, 2, 2);
  doc.roundedRect(105, 100, 95, 56, 2, 2);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("CUSTOMER DETAILS", 14, 108);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(`Name : ${booking.name || "-"}`, 14, 118);
  doc.text(`Mobile : ${booking.mobile || "-"}`, 14, 126);
  doc.text(`Email : ${booking.email || "-"}`, 14, 134);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("TRIP DETAILS", 109, 108);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(`Pickup : ${booking.pickup || "-"}`, 109, 118);
  doc.text(`Drop : ${booking.drop || "-"}`, 109, 126);
  doc.text(
    `Vehicle : ${booking.vehicleName || booking.vehicle || "-"}`,
    109,
    134
  );
  doc.text(
    `Vehicle No : ${booking.vehicleNumber || "-"}`,
    109,
    142
  );

  doc.text(
  `Distance : ${booking.distance || 0} KM`,
  109,
  150
);

  // ================= DRIVER DETAILS =================
  doc.roundedRect(10, 168, 190, 28, 2, 2);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("DRIVER DETAILS", 14, 176);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(
  `Driver Name : ${booking.driverName || "-"}`,
  14,
  185
  );

  doc.text(
  `Driver Mobile : ${booking.driverMobile || "-"}`,
  110,
  185
  );

  // ================= FARE =================
  const startY = 206;

  doc.setFillColor(30, 58, 138);
  doc.rect(10, startY, 190, 10, "F");

  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.text("FARE BREAKDOWN", 14, startY + 7);

  doc.setTextColor(0);

  const row = (label, value, y) => {
    const amount = Number(value || 0);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(label, 14, y);

    doc.text(
      `Rs. ${amount.toLocaleString("en-IN")}`,
      190,
      y,
      {
        align: "right",
      }
    );

    doc.setDrawColor(235);
    doc.line(10, y + 2, 200, y + 2);
  };

  row("Base Fare", booking.totalFare, 222);
  row("Toll", booking.toll, 232);
  row("Parking", booking.parking, 242);
  row("State Tax", booking.stateTax, 252);
  row("Driver Allowance", booking.driverAllowance, 262);

  const grandTotal =
    Number(booking.totalFare || 0) +
    Number(booking.toll || 0) +
    Number(booking.parking || 0) +
    Number(booking.stateTax || 0) +
    Number(booking.driverAllowance || 0);

// ================= GRAND TOTAL =================

doc.setFillColor(34, 197, 94);
doc.rect(10, 255, 190, 12, "F");

doc.setTextColor(255);
doc.setFont("helvetica", "bold");
doc.setFontSize(12);

doc.text("GRAND TOTAL", 14, 263);

doc.text(
  `Rs. ${grandTotal.toLocaleString("en-IN")}`,
  190,
  263,
  {
    align: "right",
  }
);

// ================= QR =================

doc.addImage(qrData, "PNG", 10, 272, 18, 18);

doc.setTextColor(100);
doc.setFontSize(7);
doc.text("WhatsApp Support", 10, 293);

// ================= FOOTER =================

doc.setTextColor(80);
doc.setFontSize(7);

doc.text(
  "Declaration: This is a computer generated invoice and does not require signature.",
  105,
  276,
  {
    align: "center",
  }
);

doc.text(
  "All disputes are subject to Nagpur jurisdiction only.",
  105,
  281,
  {
    align: "center",
  }
);

doc.setDrawColor(220);
doc.line(35, 286, 200, 286);

doc.setTextColor(120);
doc.setFontSize(8);

doc.text(
  "Thank you for choosing RC Tours & Travels",
  105,
  291,
  {
    align: "center",
  }
);

doc.text(
  "www.rctoursandtravels.in | 9172271464",
  105,
  295,
  {
    align: "center",
  }
);

doc.save(`Invoice_${booking.bookingId}.pdf`);
};