"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TrackBookingPage() {
  const [bookingId, setBookingId] = useState("");
  const [mobile, setMobile] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;

  script.onload = () => {
    setRazorpayLoaded(true);
    console.log("Razorpay Loaded");
  };

  script.onerror = () => {
    console.log("Razorpay failed to load");
  };

  document.body.appendChild(script);
}, []);

  const handlePayRemaining = async () => {
  if (!booking || booking.remainingAmount <= 0) return;

  // ✅ Razorpay ready check
  if (!window.Razorpay) {
  alert("Payment system loading... 2 seconds wait karo aur try karo");
  return;
  }

  try {
    const res = await fetch("/api/create-remaining-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: booking.bookingId,
        amount: booking.remainingAmount,
      }),
    });

    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderId,
      name: "RC Tours & Travels",
      description: "Remaining Payment",

      handler: async function (response) {
  try {
    const res = await fetch("/api/verify-remaining-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: booking.bookingId,
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        amount: booking.remainingAmount,
      }),
      });

      const data = await res.json();

      if (data.success) {
      alert("Payment Successful ✅ Booking Updated");

      // UI update (IMPORTANT)
      setBooking({
        ...booking,
        remainingAmount: 0,
      });
      } else {
      alert("Payment verification failed");
      }
    } catch (error) {
    console.log(error);
    alert("Payment done but update failed");
    }
  },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    } catch (error) {
    console.log(error);
    alert("Something went wrong");
    }
  };

  const handleSearch = async () => {
  if (!bookingId || !mobile) {
    alert("Please enter Booking ID and Mobile Number");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("/api/track-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: bookingId.trim().toUpperCase(),
        mobile: mobile.trim().replace(/\s/g, ""),
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Booking not found");
      setBooking(null);
      return;
    }

    setBooking(data.booking);

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
  };

  return (
    <main className="min-h-screen bg-slate-100 pt-32 px-4 pb-20">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">

          <h1 className="text-4xl font-bold text-center mb-3">
            Track Booking
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Enter your Booking ID and Mobile Number to view booking details.
          </p>

          <div className="space-y-5">

            <div>
              <label className="block font-semibold mb-2">
                Booking ID *
              </label>

              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="Example: RCT12345678"
                className="w-full h-14 border rounded-xl px-4 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Mobile Number *
              </label>

              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter Mobile Number"
                className="w-full h-14 border rounded-xl px-4 outline-none focus:border-blue-500"
              />
            </div>

          </div>

          <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition disabled:opacity-50"
          >
          {loading ? "Searching..." : "Search Booking"}
          </button>

          {booking && (
  <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">

    <h2 className="text-2xl font-bold mb-4">
      Booking Found ✅
    </h2>

    <div className="space-y-2">

      <p>
        <strong>Booking ID:</strong> {booking.bookingId}
      </p>

      <p>
        <strong>Name:</strong> {booking.name}
      </p>

      <p>
        <strong>Mobile:</strong> {booking.mobile}
      </p>

      <p>
        <strong>Pickup:</strong> {booking.pickup}
      </p>

      <p>
        <strong>Drop:</strong> {booking.drop}
      </p>

      <p>
        <strong>Total Fare:</strong> ₹{booking.totalFare}
      </p>

      <p>
        <strong>Advance Paid:</strong> ₹{booking.advancePaid}
      </p>

      <p>
      <strong>Remaining Amount:</strong> ₹{booking.remainingAmount}
      </p>

      {booking.remainingAmount > 0 && (
      <button
      onClick={handlePayRemaining}
      className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold"
      >
      Pay Remaining ₹{booking.remainingAmount}
      </button>
      )}

      <p>
      <strong>Payment Status:</strong>{" "}

      <span
      className={`font-bold ${
    booking.remainingAmount > 0
      ? "text-orange-600"
      : "text-green-600"
      }`}
      >
      {booking.remainingAmount > 0
      ? "Partially Paid (Advance Received 🟠)"
      : "Fully Paid 🟢"}
      </span>
      </p>

    </div>

  </div>
)}

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">

            <h3 className="font-bold text-blue-700 mb-2">
              Important
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>• Booking details are only visible to the customer.</li>
              <li>• Booking ID and Mobile Number must match.</li>
              <li>• Future payment updates will be available here.</li>
              <li>• Keep your Booking ID safe for future reference.</li>
            </ul>

          </div>

        </div>

      </div>
    </main>
  );
}