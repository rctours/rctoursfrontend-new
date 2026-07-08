"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingSuccessPage() {
  const [bookingData, setBookingData] = useState(null);

  const [showSuccessPopup, setShowSuccessPopup] = useState(true);

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowSuccessPopup(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    }, 4000);

    return () => clearTimeout(timer);
    }, []);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");

    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  const copyBookingId = async () => {
  if (!bookingData?.bookingId) return;

  await navigator.clipboard.writeText(
    bookingData.bookingId
  );

  alert("Booking ID Copied Successfully");
};

  return (
    <main className="min-h-screen bg-slate-100 pt-28 md:pt-24 pb-10 md:pb-16 px-3 md:px-4">

      {showSuccessPopup && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">

    <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-pulse">

      <div className="text-7xl mb-4">
        🎉
      </div>

      <h2 className="text-3xl font-bold text-green-600">
        Payment Successful
      </h2>

      <p className="mt-3 text-gray-600">
        Your booking has been confirmed successfully.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-5">

        <p className="text-sm text-gray-500">
          Booking ID
        </p>

        <p className="font-bold text-xl">
          {bookingData?.bookingId}
        </p>

        <p className="mt-2 text-gray-600">
        Thank You {bookingData?.name}
        </p>

      </div>

      <div className="mt-4 bg-blue-50 rounded-2xl p-4">

        <p className="font-semibold">
          {bookingData?.paymentType === "partial"
            ? `₹${bookingData?.advancePaid} Advance Paid`
            : `₹${bookingData?.totalFare} Paid Successfully`}
        </p>

      </div>

      <p className="mt-3 text-green-600 font-semibold">
      Our team will contact you shortly on WhatsApp.
      </p>

      <button
        onClick={() => setShowSuccessPopup(false)}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-bold"
      >
        View Booking Details
      </button>

    </div>

  </div>
)}

      <div className="max-w-5xl mx-auto">

        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl shadow-xl p-5 md:p-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <h1 className="text-2xl md:text-5xl font-bold">
                Booking Confirmed ✅
              </h1>

              <p className="mt-3 text-lg text-green-100">
                Thank you for choosing RC Tours & Travels.
              </p>

              <p className="mt-2 text-green-100">
                Your booking has been successfully confirmed.
              </p>
            </div>

            <div className="text-5xl md:text-8xl">
              🚖
            </div>

          </div>

        </div>

        {/* Booking ID */}
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 mt-4 md:mt-6">

          <p className="text-blue-600 font-semibold">
            Booking ID
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {bookingData?.bookingId || "RCT000000"}
          </h2>

          <button
          onClick={copyBookingId}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold"
          >
          📋 Copy Booking ID
          </button>

          <div className="mt-4 inline-flex bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Booking Status: Confirmed
          </div>

          <div
          className={`mt-3 inline-flex px-4 py-2 rounded-full font-semibold ${
          bookingData?.paymentType === "partial"
          ? "bg-orange-100 text-orange-700"
          : "bg-green-100 text-green-700"
          }`}
          >
          {bookingData?.paymentType === "partial"
          ? "Advance Paid"
          : "Payment Successful"}
          </div>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-4 md:p-6 mt-4 md:mt-6">

  <h3 className="text-2xl font-bold text-blue-700 mb-4">
    Booking Confirmation
  </h3>

  <div className="space-y-2 text-lg">

    <div className="grid md:grid-cols-2 gap-4">

  <div className="bg-white rounded-2xl p-4">
    <p className="text-sm text-gray-500">
      Vehicle
    </p>

    <p className="font-bold text-lg">
      {bookingData?.vehicle}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-4">
    <p className="text-sm text-gray-500">
      Journey Date
    </p>

    <p className="font-bold text-lg">
      {bookingData?.pickupDate}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-4">
    <p className="text-sm text-gray-500">
      Total Fare
    </p>

    <p className="font-bold text-lg">
      ₹{bookingData?.totalFare}
    </p>
  </div>

  <div className="bg-white rounded-2xl p-4">
    <p className="text-sm text-gray-500">
      Paid Amount
    </p>

    <p className="font-bold text-green-600 text-lg">
      ₹{bookingData?.advancePaid}
    </p>
  </div>

</div>

<div className="mt-4 bg-white rounded-2xl p-4">

  <div className="flex justify-between items-center">
    <span className="font-semibold">
      Remaining Amount
    </span>

    <span className="font-bold text-red-600 text-xl">
      ₹{bookingData?.remainingAmount}
    </span>
  </div>

</div>

<div className="mt-4 bg-green-100 text-green-700 rounded-2xl p-4">

  📞 RC Tours & Travels Support: +91 9172271464

</div>

  </div>

</div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">

          {/* Passenger Details */}
          <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">

            <h3 className="text-2xl font-bold mb-5">
              Passenger Details
            </h3>

            <div className="space-y-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <p className="font-semibold text-lg">
                  {bookingData?.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Mobile Number
                </p>

                <p className="font-semibold text-lg">
                  {bookingData?.mobile || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="font-semibold text-lg">
                  {bookingData?.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Gender
                </p>

                <p className="font-semibold text-lg">
                  {bookingData?.gender || "-"}
                </p>
              </div>

            </div>

          </div>

          {/* Trip Details */}
          <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">

          <h3 className="text-2xl font-bold mb-5">
          Trip Details
           </h3>

        <div className="bg-slate-50 rounded-2xl p-5">

        <div className="flex gap-4">

      <div className="flex flex-col items-center flex-shrink-0">

        <div className="w-4 h-4 rounded-full bg-green-500"></div>

        <div className="w-1 h-20 bg-blue-300"></div>

        <div className="w-4 h-4 rounded-full bg-red-500"></div>

      </div>

      <div className="flex-1 min-w-0">

        <div>
          <p className="text-gray-500 text-sm">
            Pickup Location
          </p>

          <p className="font-semibold text-lg break-words">
            {bookingData?.pickup || "-"}
          </p>
        </div>

        <div className="h-12"></div>

        <div>
          <p className="text-gray-500 text-sm">
            Drop Location
          </p>

          <p className="font-semibold text-lg break-words">
            {bookingData?.drop || "-"}
          </p>
        </div>

      </div>

    </div>

  </div>

  <div className="grid grid-cols-2 gap-3 mt-5">

    <div className="bg-blue-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">
        Journey Date
      </p>

      <p className="font-bold">
        {bookingData?.pickupDate || "-"}
      </p>
    </div>

    <div className="bg-green-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">
        Vehicle
      </p>

      <p className="font-bold">
        {bookingData?.vehicle || "-"}
      </p>
    </div>

  </div>

</div>

        </div>

        {/* Journey Information */}
<div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 mt-4 md:mt-6">

  <h3 className="text-2xl font-bold mb-5">
    Journey Information
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

    <div className="bg-blue-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">
        Booking ID
      </p>

      <p className="font-bold break-all">
        {bookingData?.bookingId || "-"}
      </p>
    </div>

    <div className="bg-green-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">
        Payment Status
      </p>

      <p className="font-bold text-green-600">
        Confirmed
      </p>
    </div>

    <div className="bg-yellow-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">
        Passengers
      </p>

      <p className="font-bold">
        {bookingData?.passengers || "1"}
      </p>
    </div>

    <div className="bg-purple-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">
        Trip Type
      </p>

      <p className="font-bold">
        {bookingData?.tripType || "-"}
      </p>
    </div>

  </div>

</div>

{/* Payment Summary */}
<div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 mt-4 md:mt-6">

  <h3 className="text-2xl font-bold mb-6">
    Payment Summary
  </h3>

  <div className="bg-slate-50 rounded-2xl p-5 space-y-4">

    <div className="flex justify-between items-center">
      <span className="text-gray-600">
        Total Fare
      </span>

      <span className="font-bold text-lg">
        ₹{bookingData?.totalFare || 0}
      </span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-green-600">
        Amount Paid
      </span>

      <span className="font-bold text-lg text-green-600">
        ₹{bookingData?.advancePaid || 0}
      </span>
    </div>

    <div className="border-t pt-4 flex justify-between items-center">

      <span className="font-bold text-red-600">
        Remaining Amount
      </span>

      <span className="font-bold text-xl text-red-600">
        ₹{bookingData?.remainingAmount || 0}
      </span>

    </div>

  </div>

  <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4">

    <div className="flex items-center gap-3">

      <div className="text-2xl">
        ✅
      </div>

      <div>

        <p className="font-bold text-green-700">
          Payment Recorded Successfully
        </p>

        <p className="text-sm text-green-600">
          Booking has been confirmed and saved.
        </p>

      </div>

    </div>

  </div>

</div>

        {bookingData?.paymentType === "partial" ? (

  <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mt-6">

    <h3 className="text-xl font-bold text-green-700 mb-3">
      Advance Payment Confirmed
    </h3>

    <p className="text-green-700">
      ₹{bookingData?.advancePaid} received successfully.
    </p>

    <p className="text-green-700 mt-2">
      Remaining Amount: ₹{bookingData?.remainingAmount}
    </p>

    <p className="text-green-700 mt-2">
      You can pay the remaining amount:
    </p>

    <ul className="list-disc ml-6 mt-2 text-green-700">
  <li>Contact RC Tours & Travels after trip completion for remaining payment</li>
  <li>Call: 9172271464 or visit www.rctoursandtravels.in</li>
  </ul>

  </div>

) : (

  <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mt-10 md:mt-6">

    <h3 className="text-xl font-bold text-blue-700 mb-3">
      Full Payment Confirmed
    </h3>

    <p className="text-blue-700">
      ₹{bookingData?.totalFare} received successfully.
    </p>

    <p className="font-bold text-green-600 mt-3">
      ✅ No payment is pending.
    </p>

  </div>

)}

<div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

  <h3 className="text-2xl font-bold mb-5">
    What Happens Next?
  </h3>

  <div className="space-y-4">

    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
  <p className="font-semibold text-green-700">
    ✅ Booking request received successfully.
  </p>

  <p className="text-sm text-green-600 mt-1">
    Our team is reviewing your booking details.
  </p>
  </div>

    <div className="flex items-center gap-3">
      <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
        2
      </div>
      <p>Our Team Will Verify Your Booking</p>
    </div>

    <div className="flex items-center gap-3">
      <div className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
        3
      </div>
      <p>Driver Details Will Be Shared On WhatsApp</p>
    </div>

    <div className="flex items-center gap-3">
      <div className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
        4
      </div>
      <p>Enjoy Your Trip With RC Tours & Travels</p>
    </div>

  </div>

</div>

<div className="bg-gradient-to-r from-blue-50 to-green-50 border rounded-3xl p-6 mt-6">

  <h3 className="text-2xl font-bold mb-4">
    Driver & Trip Updates
  </h3>

  <div className="space-y-3">

    <div className="flex gap-3">
      <span>🚖</span>
      <p>
        Driver details will be shared before pickup via
        WhatsApp or Phone Call.
      </p>
    </div>

    <div className="flex gap-3">
      <span>📞</span>
      <p>
        For any booking changes contact RC Tours & Travels.
      </p>
    </div>

    <div className="flex gap-3">
  <span>💳</span>
  <p>
    Remaining amount must be paid online or by contacting RC Tours & Travels after trip completion.
  </p>
  </div>

  </div>

</div>

        <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mt-6">

      <h3 className="text-xl font-bold text-green-700 mb-4">
      Share Booking Details
      </h3>

    <a
    href={`https://wa.me/?text=${encodeURIComponent(
    `RC Tours & Travels Booking Confirmation

    Booking ID: ${bookingData?.bookingId}
    Name: ${bookingData?.name}
    Mobile: ${bookingData?.mobile}

    Pickup: ${bookingData?.pickup}
    Drop: ${bookingData?.drop}

    Total Fare: ₹${bookingData?.totalFare}
    Paid Amount: ₹${bookingData?.advancePaid}
    Remaining Amount: ₹${bookingData?.remainingAmount}

    Contact: 9172271464
    Website: www.rctoursandtravels.in`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-bold"
    >
    📲 Share Booking On WhatsApp
    </a>

    </div>

{/* Support */}
<div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-3xl shadow-md p-6 mt-6">

  <h3 className="text-2xl font-bold mb-2 text-gray-800">
    Need Help? 🤝
  </h3>

  <p className="text-gray-600 text-sm mb-5">
    RC Tours & Travels support team is available 24x7 for your assistance.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <a
      href="tel:+919172271464"
      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition shadow"
    >
      📞 Call Now
    </a>

<a
  href={`https://wa.me/919172271464?text=${encodeURIComponent(
    `Hello RC Tours & Travels

Booking ID: ${bookingData?.bookingId}
Name: ${bookingData?.name}
Mobile: ${bookingData?.mobile}
Pickup: ${bookingData?.pickup}
Drop: ${bookingData?.drop}

I need assistance regarding my booking.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold transition-all shadow-md active:scale-95"
>
  <span className="text-xl">💬</span>
  <span>Chat on WhatsApp</span>
</a>
  </div>

  <div className="mt-4 text-center text-xs text-gray-500">
    📍 RC Tours & Travels • Nagpur • 24x7 Support Available
  </div>

</div>

    {/* Action Buttons */}
    <div className="text-center mt-8 flex flex-col md:flex-row gap-3 justify-center">

    <Link
    href="/track-booking"
    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition"
    >
    🔍 Track Booking
    </Link>

    <Link
    href="/"
    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition"
    >
    🏠 Back To Home
    </Link>

  </div>

      </div>

    </main>
  );
}