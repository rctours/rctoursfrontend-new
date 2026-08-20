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

    useEffect(() => {
    const data = localStorage.getItem("bookingData");

    if (!data) return;

    try {
      const booking = JSON.parse(data);

      if (!booking?.bookingId) return;

      window.dispatchEvent(
        new CustomEvent("rc_booking_conversion", {
          detail: {
            bookingId: booking.bookingId,
            totalFare: booking.totalFare || 0,
            paymentType: booking.paymentType || "",
          },
        })
      );

      console.log("RC Booking Conversion Tracked:", {
        bookingId: booking.bookingId,
        totalFare: booking.totalFare || 0,
        paymentType: booking.paymentType || "",
      });
    } catch (error) {
      console.error("Booking conversion tracking error:", error);
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
    <main className="min-h-screen bg-gray-50/50 pt-28 md:pt-24 pb-10 md:pb-16 px-3 md:px-4">

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="text-7xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-600">
              Payment Successful
            </h2>
            <p className="mt-3 text-gray-600">
              Your booking has been confirmed successfully.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-5">
              <p className="text-sm text-gray-500 font-semibold uppercase">
                Booking ID
              </p>
              <p className="font-bold text-xl text-gray-900 mt-1">
                {bookingData?.bookingId}
              </p>
              <p className="mt-2 text-gray-600 font-medium">
                Thank You {bookingData?.name}
              </p>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="font-semibold text-blue-700">
                {bookingData?.paymentType === "partial"
                  ? `₹${bookingData?.advancePaid} Advance Paid`
                  : `₹${bookingData?.totalFare} Paid Successfully`}
              </p>
            </div>

            <p className="mt-3 text-green-600 font-semibold text-sm">
              Our team will contact you shortly on WhatsApp.
            </p>

            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-bold transition shadow-lg shadow-green-600/20"
            >
              View Booking Details
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-black">
                Booking Confirmed ✅
              </h1>
              <p className="mt-2 text-green-100 text-base md:text-lg">
                Thank you for choosing RC Tours & Travels.
              </p>
              <p className="mt-1 text-green-100 text-sm">
                Your booking has been successfully confirmed.
              </p>
            </div>
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 backdrop-blur-sm border border-white/20">
              🚖
            </div>
          </div>
        </div>

        {/* Booking ID Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">
            Booking ID
          </p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              {bookingData?.bookingId || "RCT000000"}
            </h2>
            <button
              onClick={copyBookingId}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-sm"
            >
              📋 Copy Booking ID
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <div className="inline-flex bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-xl font-bold text-xs">
              Booking Status: Confirmed
            </div>
            <div
              className={`inline-flex px-3 py-1.5 rounded-xl font-bold text-xs border ${
                bookingData?.paymentType === "partial"
                  ? "bg-orange-50 border-orange-200 text-orange-700"
                  : "bg-green-50 border-green-200 text-green-700"
              }`}
            >
              {bookingData?.paymentType === "partial"
                ? "Advance Paid"
                : "Payment Successful"}
            </div>
          </div>
        </div>

        {/* Booking Confirmation Box */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-5">
            Booking Confirmation
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Vehicle</p>
              <p className="font-bold text-gray-900 text-lg mt-1">
                {bookingData?.vehicle}
              </p>
            </div>

            <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Journey Date</p>
              <p className="font-bold text-gray-900 text-lg mt-1">
                {bookingData?.pickupDate}
              </p>
            </div>

            <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Total Fare</p>
              <p className="font-bold text-gray-900 text-lg mt-1">
                ₹{bookingData?.totalFare}
              </p>
            </div>

            <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Paid Amount</p>
              <p className="font-bold text-green-600 text-lg mt-1">
                ₹{bookingData?.advancePaid}
              </p>
            </div>
          </div>

          <div className="mt-4 bg-gray-50/70 border border-gray-100 rounded-2xl p-4 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Remaining Amount</span>
            <span className="font-black text-red-600 text-xl">
              ₹{bookingData?.remainingAmount}
            </span>
          </div>

          <div className="mt-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 font-semibold text-sm">
            📞 RC Tours & Travels Support: +91 9172271464
          </div>
        </div>

        {/* Grid for Passenger & Trip Details */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Passenger Details */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Passenger Details
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">Name</p>
                  <p className="font-bold text-gray-900 text-base mt-1">
                    {bookingData?.name || "-"}
                  </p>
                </div>

                <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">Mobile Number</p>
                  <p className="font-bold text-gray-900 text-base mt-1">
                    {bookingData?.mobile || "-"}
                  </p>
                </div>

                <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">Email</p>
                  <p className="font-bold text-gray-900 text-base mt-1 break-all">
                    {bookingData?.email || "-"}
                  </p>
                </div>

                <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">Gender</p>
                  <p className="font-bold text-gray-900 text-base mt-1">
                    {bookingData?.gender || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Trip Details
              </h3>

              <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 mb-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center pt-1 flex-shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500 ring-4 ring-green-100"></div>
                    <div className="w-0.5 flex-1 bg-gray-300 my-2"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-red-100"></div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-400">Pickup Location</p>
                      <p className="font-bold text-gray-900 text-sm mt-0.5 break-words">
                        {bookingData?.pickup || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-400">Drop Location</p>
                      <p className="font-bold text-gray-900 text-sm mt-0.5 break-words">
                        {bookingData?.drop || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">Journey Date</p>
                  <p className="font-bold text-gray-900 mt-1">
                    {bookingData?.pickupDate || "-"}
                  </p>
                </div>
                <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-bold uppercase text-gray-400">Vehicle</p>
                  <p className="font-bold text-gray-900 mt-1">
                    {bookingData?.vehicle || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Journey Information */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-5">
            Journey Information
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50/75 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Booking ID</p>
              <p className="font-bold text-gray-900 mt-1 break-all text-sm">
                {bookingData?.bookingId || "-"}
              </p>
            </div>

            <div className="bg-gray-50/75 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Payment Status</p>
              <p className="font-bold text-green-600 mt-1">
                Confirmed
              </p>
            </div>

            <div className="bg-gray-50/75 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Passengers</p>
              <p className="font-bold text-gray-900 mt-1">
                {bookingData?.passengers || "1"}
              </p>
            </div>

            <div className="bg-gray-50/75 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Trip Type</p>
              <p className="font-bold text-gray-900 mt-1">
                {bookingData?.tripType || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-5">
            Payment Summary
          </h3>

          <div className="bg-gray-50/75 border border-gray-100 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Fare</span>
              <span className="font-bold text-gray-900">₹{bookingData?.totalFare || 0}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-green-600 font-medium">Amount Paid</span>
              <span className="font-bold text-green-600">₹{bookingData?.advancePaid || 0}</span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span className="font-bold text-red-600">Remaining Amount</span>
              <span className="font-black text-xl text-red-600">₹{bookingData?.remainingAmount || 0}</span>
            </div>
          </div>

          <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <p className="font-bold text-green-800 text-sm">
                Payment Recorded Successfully
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                Booking has been confirmed and saved.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Type Conditional Box */}
        {bookingData?.paymentType === "partial" ? (
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-green-700 mb-3">
              Advance Payment Confirmed
            </h3>
            <p className="text-gray-700 text-sm">
              ₹{bookingData?.advancePaid} received successfully.
            </p>
            <p className="text-gray-700 text-sm mt-1">
              Remaining Amount: ₹{bookingData?.remainingAmount}
            </p>
            <p className="text-gray-700 text-sm mt-3 font-semibold">
              You can pay the remaining amount:
            </p>
            <ul className="list-disc ml-5 mt-1.5 text-gray-600 text-sm space-y-1">
              <li>Contact RC Tours & Travels after trip completion for remaining payment</li>
              <li>Call: 9172271464 or visit www.rctoursandtravels.in</li>
            </ul>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-blue-700 mb-3">
              Full Payment Confirmed
            </h3>
            <p className="text-gray-700 text-sm">
              ₹{bookingData?.totalFare} received successfully.
            </p>
            <p className="font-bold text-green-600 mt-2 text-sm">
              ✅ No payment is pending.
            </p>
          </div>
        )}

        {/* What Happens Next */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-5">
            What Happens Next?
          </h3>

          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="font-bold text-green-800 text-sm">
                ✅ Booking request received successfully.
              </p>
              <p className="text-xs text-green-600 mt-1">
                Our team is reviewing your booking details.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-gray-50/75 border border-gray-100 p-4 rounded-2xl">
              <div className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                2
              </div>
              <p className="text-sm font-semibold text-gray-800">Our Team Will Verify Your Booking</p>
            </div>

            <div className="flex items-center gap-3 bg-gray-50/75 border border-gray-100 p-4 rounded-2xl">
              <div className="bg-purple-100 text-purple-700 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                3
              </div>
              <p className="text-sm font-semibold text-gray-800">Driver Details Will Be Shared On WhatsApp</p>
            </div>

            <div className="flex items-center gap-3 bg-gray-50/75 border border-gray-100 p-4 rounded-2xl">
              <div className="bg-orange-100 text-orange-700 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                4
              </div>
              <p className="text-sm font-semibold text-gray-800">Enjoy Your Trip With RC Tours & Travels</p>
            </div>
          </div>
        </div>

        {/* Driver & Trip Updates */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Driver & Trip Updates
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3 items-start bg-gray-50/75 border border-gray-100 p-3.5 rounded-2xl">
              <span className="text-lg">🚖</span>
              <p>Driver details will be shared before pickup via WhatsApp or Phone Call.</p>
            </div>

            <div className="flex gap-3 items-start bg-gray-50/75 border border-gray-100 p-3.5 rounded-2xl">
              <span className="text-lg">📞</span>
              <p>For any booking changes contact RC Tours & Travels.</p>
            </div>

            <div className="flex gap-3 items-start bg-gray-50/75 border border-gray-100 p-3.5 rounded-2xl">
              <span className="text-lg">💳</span>
              <p>Remaining amount must be paid online or by contacting RC Tours & Travels after trip completion.</p>
            </div>
          </div>
        </div>

        {/* Share Booking Details */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
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
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-green-600/20"
          >
            📲 Share Booking On WhatsApp
          </a>
        </div>

        {/* Support */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
          <h3 className="text-xl font-bold mb-1 text-gray-900">
            Need Help? 🤝
          </h3>
          <p className="text-gray-500 text-xs mb-5">
            RC Tours & Travels support team is available 24x7 for your assistance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="tel:+919172271464"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow"
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
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow"
            >
              <span className="text-lg">💬</span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="mt-4 text-center text-xs text-gray-400 font-medium">
            📍 RC Tours & Travels • Nagpur • 24x7 Support Available
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center pt-2 flex flex-col md:flex-row gap-3 justify-center">
          <Link
            href="/track-booking"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-indigo-600/20"
          >
            🔍 Track Booking
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-600/20"
          >
            🏠 Back To Home
          </Link>
        </div>

      </div>
    </main>
  );
}