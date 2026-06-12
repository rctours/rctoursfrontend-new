"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingSuccessPage() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");

    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 pt-24 pb-16 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl shadow-xl p-8 md:p-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Booking Confirmed ✅
              </h1>

              <p className="mt-3 text-lg text-green-100">
                Thank you for choosing RC Tours & Travels.
              </p>

              <p className="mt-2 text-green-100">
                Your booking has been successfully confirmed.
              </p>
            </div>

            <div className="text-8xl">
              🚖
            </div>

          </div>

        </div>

        {/* Booking ID */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

          <p className="text-blue-600 font-semibold">
            Booking ID
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {bookingData?.bookingId || "RCT000000"}
          </h2>

          <div className="mt-4 inline-flex bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Booking Status: Confirmed
          </div>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mt-6">

  <h3 className="text-2xl font-bold text-blue-700 mb-4">
    Booking Confirmation
  </h3>

  <div className="space-y-2 text-lg">

    <p>
      <strong>Booking ID:</strong> {bookingData?.bookingId}
    </p>

    <p>
      <strong>Vehicle:</strong> {bookingData?.vehicle}
    </p>

    <p>
      <strong>Journey Date:</strong> {bookingData?.pickupDate}
    </p>

    <p>
      <strong>Total Fare:</strong> ₹{bookingData?.totalFare}
    </p>

    <p>
      <strong>Advance Paid:</strong> ₹{bookingData?.advancePaid}
    </p>

    <p>
      <strong>Remaining Amount:</strong> ₹{bookingData?.remainingAmount}
    </p>

    <p>
      <strong>RC Tours & Travels:</strong> 9172271464
    </p>

  </div>

</div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          {/* Passenger Details */}
          <div className="bg-white rounded-3xl shadow-lg p-6">

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
          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h3 className="text-2xl font-bold mb-5">
              Trip Details
            </h3>

            <div className="space-y-5">

              <div>
                <p className="text-gray-500 text-sm">
                  Pickup Location
                </p>

                <p className="font-semibold text-lg">
                  {bookingData?.pickup || "-"}
                </p>
              </div>

              <div className="text-center text-3xl text-blue-600">
                ↓
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Drop Location
                </p>

                <p className="font-semibold text-lg">
                  {bookingData?.drop || "-"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

          <h3 className="text-2xl font-bold mb-6">
            Payment Summary
          </h3>

          <div className="bg-slate-50 rounded-2xl p-5 space-y-4">

            <div className="flex justify-between">
              <span>Total Fare</span>

              <span className="font-semibold">
                ₹{bookingData?.totalFare || 0}
              </span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Amount Paid</span>

              <span className="font-semibold">
                ₹{bookingData?.advancePaid || 0}
              </span>
            </div>

            <div className="flex justify-between border-t pt-4 font-bold text-red-600">
              <span>Remaining Amount</span>

              <span>
                ₹{bookingData?.remainingAmount || 0}
              </span>
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
      <li>Directly to the driver after trip completion</li>
      <li>Online using the future Pay Remaining Amount option</li>
    </ul>

  </div>

) : (

  <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mt-6">

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

        {/* Driver Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mt-6">

          <h3 className="text-xl font-bold text-blue-700 mb-2">
            Driver Information
          </h3>

          <p className="text-blue-700">
            Driver details will be shared with you before pickup via
            call or WhatsApp.
          </p>

        </div>

        {/* Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 mt-6">

          <h3 className="font-bold text-yellow-700 text-lg">
            Important Notice
          </h3>

          <p className="mt-2 text-yellow-700">
            Remaining amount can be paid directly to the driver
            or online later using your Booking ID.
          </p>

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
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

        <h3 className="text-2xl font-bold mb-5">
        Need Help?
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

        <a
        href="tel:+919172271464"
        className="bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-2xl font-bold transition"
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
        className="bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-2xl font-bold transition"
      >
      💬 WhatsApp Support
    </a>

  </div>

</div>

        {/* Home Button */}
        <div className="text-center mt-8">

          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition"
          >
            Back To Home
          </Link>

        </div>

      </div>

    </main>
  );
}