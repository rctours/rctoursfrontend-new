"use client";

import { generateInvoicePDF } from "@/lib/invoice";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Phone, Mail, ShieldCheck, Ticket, ArrowRight, Award } from "lucide-react";

export default function TrackBookingPage() {
  const [bookingId, setBookingId] = useState("");
  const [mobile, setMobile] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loyalty, setLoyalty] = useState(null);
  const bookingResultRef = useRef(null);

  useEffect(() => {
  if (selectedBooking && bookingResultRef.current) {
    bookingResultRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  }, [selectedBooking]);

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
    if (!selectedBooking || selectedBooking.remainingAmount <= 0) return;

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
          bookingId: selectedBooking.bookingId,
          amount: selectedBooking.remainingAmount,
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
                bookingId: selectedBooking.bookingId,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                amount: selectedBooking.remainingAmount,
              }),
            });

            const data = await res.json();

            if (data.success) {
              alert("Payment Successful ✅ Booking Updated");

              setSelectedBooking({
                ...selectedBooking,
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
        bookingId: bookingId.trim(),
        mobile: mobile.trim().replace(/\s/g, ""),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Booking not found");
        setBookings([]);
        setSelectedBooking(null);
        setLoyalty(null);
        return;
      }

      setBookings(data.bookings || []);

      if (data.bookings?.length > 0) {
      setSelectedBooking(data.bookings[0]);
      }
      setLoyalty(data.loyalty);

      localStorage.setItem(
      "customer",
      JSON.stringify({
      name: data.bookings[0].name,
      mobile: data.bookings[0].mobile,
      loyalty: data.loyalty,
      })
    );

      window.dispatchEvent(new Event("customerLogin"));

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/30 to-slate-200/50 pt-28 sm:pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10 transition-all">

          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-3">
              <ShieldCheck size={14} /> Secure Access
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Track Booking
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Enter your registered Mobile Number and Email Address to view and manage your travel bookings.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Booking ID *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Ticket size={18} />
                </span>
                <input
                  type="booking ID"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="Enter Booking ID"
                  className="w-full h-13 sm:h-14 bg-slate-50/50 border border-slate-200 rounded-2xl pl-11 pr-4 text-slate-900 text-sm sm:text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile Number *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter Mobile Number"
                  className="w-full h-13 sm:h-14 bg-slate-50/50 border border-slate-200 rounded-2xl pl-11 pr-4 text-slate-900 text-sm sm:text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Searching...
              </span>
            ) : (
              <>
                <Search size={20} /> Track Your Booking
              </>
            )}
          </button>

          {/* Bookings Selection List (if multiple) */}
          {selectedBooking && (
            <div ref={bookingResultRef}>
              {bookings.length > 1 && (
                <div className="mt-8 mb-6 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                  <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Ticket size={18} className="text-blue-600" /> Your Bookings ({bookings.length})
                  </h2>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {bookings.map((item) => (
                      <div
                        key={item.bookingId}
                        onClick={() => setSelectedBooking(item)}
                        className={`cursor-pointer rounded-xl border p-3.5 transition-all flex items-center justify-between ${
                          selectedBooking?.bookingId === item.bookingId
                            ? "border-blue-600 bg-blue-50/80 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-slate-900 text-sm sm:text-base">
                            {item.bookingId}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate max-w-[220px] sm:max-w-md">
                            {item.pickup} → {item.drop}
                          </p>
                        </div>

                        <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-lg flex items-center gap-1 ${
                          selectedBooking?.bookingId === item.bookingId
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          View <ArrowRight size={14} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Booking Details View */}
              <div className="mt-8 bg-gradient-to-br from-green-50/80 to-emerald-50/50 border border-green-200/80 shadow-lg rounded-3xl p-5 sm:p-8 backdrop-blur-sm">

                <div className="flex items-center justify-between border-b border-green-200/60 pb-4 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    Booking Found <span className="text-2xl">✅</span>
                  </h2>
                </div>

                <div className="space-y-6">

                  {/* Booking Information Grid */}
                  <div className="bg-white/80 border border-gray-100 shadow-sm rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <p className="text-gray-600 text-sm sm:text-base">
                        <strong className="text-gray-900 font-semibold">Booking ID:</strong> <span className="font-mono text-gray-800">{selectedBooking.bookingId}</span>
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <strong className="text-gray-900 font-semibold">Name:</strong> {selectedBooking.name}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <strong className="text-gray-900 font-semibold">Mobile:</strong> {selectedBooking.mobile}
                      </p>
                    </div>

                    <div className="space-y-3 sm:border-l sm:border-gray-100 sm:pl-4">
                      <p className="text-gray-600 text-sm sm:text-base">
                        <strong className="text-gray-900 font-semibold">Pickup:</strong> {selectedBooking.pickup}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <strong className="text-gray-900 font-semibold">Drop:</strong> {selectedBooking.drop}
                      </p>
                    </div>
                  </div>

                  {/* Fare Summary Box */}
                  <div className="bg-white/80 border border-gray-100 shadow-sm rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <strong className="text-gray-700">Total Fare:</strong> 
                      <span className="font-bold text-gray-900 text-lg">₹{selectedBooking.totalFare}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <strong className="text-gray-700">Advance Paid:</strong> 
                      <span className="font-bold text-green-600">₹{selectedBooking.advancePaid}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base border-t border-gray-100 pt-2">
                      <strong className="text-gray-700">Remaining Amount:</strong> 
                      <span className="font-extrabold text-orange-600 text-lg">₹{selectedBooking.remainingAmount}</span>
                    </div>
                  </div>

{/* Booking Status Timeline */}
<div className="bg-white border border-green-200 rounded-2xl p-5 shadow-sm">

  <h3 className="text-xl font-bold text-slate-900 mb-5">
    📍 Booking Status
  </h3>

  <div className="space-y-5">

    {/* Booking Received */}
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
        ✓
      </div>

      <div>
        <h4 className="font-bold text-green-700">
          Booking Received
        </h4>

        <p className="text-sm text-gray-500">
          Your booking request has been received successfully.
        </p>
      </div>
    </div>

    {/* Booking Confirmed */}
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          selectedBooking.bookingStatus === "Confirmed"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        ✓
      </div>

      <div>
        <h4
          className={`font-bold ${
            selectedBooking.bookingStatus === "Confirmed"
              ? "text-green-700"
              : "text-gray-500"
          }`}
        >
          Booking Confirmed
        </h4>

        <p className="text-sm text-gray-500">
          {selectedBooking.bookingStatus === "Confirmed"
            ? "Your booking has been confirmed by RC Tours & Travels."
            : "Waiting for booking confirmation."}
        </p>
      </div>
    </div>

    {/* Driver Assigned */}
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          selectedBooking.driverName
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        🚖
      </div>

      <div>
        <h4
          className={`font-bold ${
            selectedBooking.driverName
              ? "text-green-700"
              : "text-gray-500"
          }`}
        >
          Driver Assigned
        </h4>

        {selectedBooking.driverName ? (
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <strong>Driver:</strong> {selectedBooking.driverName}
            </p>

            {selectedBooking.driverMobile && (
              <p>
                <strong>Mobile:</strong> {selectedBooking.driverMobile}
              </p>
            )}

            {selectedBooking.vehicleName && (
              <p>
                <strong>Vehicle:</strong> {selectedBooking.vehicleName}
              </p>
            )}

            {selectedBooking.vehicleNumber && (
              <p>
                <strong>Vehicle No:</strong> {selectedBooking.vehicleNumber}
              </p>
            )}

            <p className="text-green-600 font-medium">
              Driver & vehicle assigned successfully.
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Driver will be assigned before pickup.
          </p>
        )}
      </div>
    </div>

    {/* Trip Started */}
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          selectedBooking.tripStatus === "Running" ||
          selectedBooking.tripStatus === "Completed"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        🚗
      </div>

      <div>
        <h4
          className={`font-bold ${
            selectedBooking.tripStatus === "Running" ||
            selectedBooking.tripStatus === "Completed"
              ? "text-green-700"
              : "text-gray-500"
          }`}
        >
          Trip Started
        </h4>

        <p className="text-sm text-gray-500">
          {selectedBooking.tripStatus === "Completed"
            ? "Your journey has been completed successfully."
            : selectedBooking.tripStatus === "Running"
            ? "Your journey is currently in progress."
            : "Trip has not started yet."}
        </p>
      </div>
    </div>

    {/* Trip Completed */}
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          selectedBooking.tripStatus === "Completed"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        🏁
      </div>

      <div>
        <h4
          className={`font-bold ${
            selectedBooking.tripStatus === "Completed"
              ? "text-green-700"
              : "text-gray-500"
          }`}
        >
          Trip Completed
        </h4>

        <p className="text-sm text-gray-500">
          {selectedBooking.tripStatus === "Completed"
            ? "Thank you for travelling with RC Tours & Travels."
            : "Trip is not completed yet."}
        </p>
      </div>
    </div>

  </div>

</div>

                  {/* Action Button & Status */}
                  <div className="space-y-4">
                    {selectedBooking.remainingAmount > 0 && (
                      <button
                        onClick={handlePayRemaining}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3.5 px-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] cursor-pointer"
                      >
                        Pay Remaining ₹{selectedBooking.remainingAmount}
                      </button>
                    )}

                    <div className="bg-white/60 border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <strong className="text-gray-700 text-sm sm:text-base">Payment Status:</strong>
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold w-fit ${
                          selectedBooking.remainingAmount > 0
                            ? "bg-orange-50 text-orange-700 border border-orange-200"
                            : "bg-green-50 text-green-700 border border-green-200"
                        }`}
                      >
                        {selectedBooking.remainingAmount > 0
                          ? "Partially Paid (Advance Received 🟠)"
                          : "Fully Paid 🟢"}
                      </span>
                    </div>

                    {
                      selectedBooking.tripStatus === "Completed" &&
                      selectedBooking.remainingAmount === 0 && (

                      <button
                        onClick={() => generateInvoicePDF(selectedBooking)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3.5 px-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] cursor-pointer"
                      >
                        📄 Download Invoice
                      </button>

                    )}
                  </div>

                  {/* Loyalty Rewards Section */}
                  {loyalty && (
                    <div className="mt-6 pt-6 border-t border-green-200/60 space-y-5">
                      <div className="p-5 bg-gradient-to-br from-amber-50/80 to-yellow-50/50 border border-yellow-200 shadow-sm rounded-2xl">

                        <h3 className="font-bold text-xl text-amber-900 mb-4 flex items-center gap-2">
                          ⭐ Loyalty Rewards
                        </h3>

                        {selectedBooking.tripStatus !== "Completed" && (
                          <div className="mb-5 rounded-2xl bg-white border border-blue-200 shadow-sm p-4 md:p-5">
                            <h3 className="text-lg md:text-xl font-bold text-blue-700 leading-tight">
                              🎉 Booking Confirmed
                            </h3>

                            <p className="mt-1.5 text-gray-600 text-sm sm:text-base">
                              Your booking has been confirmed successfully.
                            </p>

                            <div className="mt-4 bg-blue-50/60 border border-blue-100 rounded-xl p-4 w-full">
                              <p className="font-semibold text-blue-900 text-sm sm:text-base">
                                Pending Loyalty Reward
                              </p>

                              <p className="text-3xl md:text-4xl font-extrabold text-green-600 mt-2 break-words">
                                +{
                                  selectedBooking.tripType === "Local Rental"
                                  ? 50
                                  : 100
                                }
                              </p>

                              <p className="text-xs sm:text-sm text-gray-600 mt-1.5">
                                These points will be credited automatically after your trip is completed.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Reward Progress Bar */}
                        <div className="mb-5 bg-white border border-yellow-100 rounded-2xl p-4 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 mb-2">
                            <span className="font-semibold text-gray-700 text-sm sm:text-base">
                              Reward Progress
                            </span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              {selectedBooking.tripStatus === "Completed"
                              ? loyalty.points
                              : loyalty.points +
                              (selectedBooking.tripType === "Local Rental"
                              ? 50
                              : 100)
                              }
                              /300 Points
                            </span>
                          </div>

                          <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-gray-200">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  ((selectedBooking.tripStatus === "Completed"
                                  ? loyalty.points
                                  : loyalty.points +
                                  (selectedBooking.tripType === "Local Rental"
                                  ? 50
                                  : 100)) / 300) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 mt-2.5 font-medium">
                            {(
                            selectedBooking.tripStatus === "Completed"
                            ? loyalty.points
                            : loyalty.points +
                            (selectedBooking.tripType === "Local Rental" ? 50 : 100)
                            ) >= 300
                            ? "🎉 Congratulations! Coupon Unlocked."
                            : `Only ${
                            300 -
                            (
                            selectedBooking.tripStatus === "Completed"
                            ? loyalty.points
                            : loyalty.points +
                            (selectedBooking.tripType === "Local Rental" ? 50 : 100)
                            )
                            } more points to unlock ₹300 Coupon.`}
                          </p>
                        </div>

                        {/* User Loyalty Meta Information */}
                        <div className="bg-white border border-yellow-100 rounded-2xl p-4 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                          <div className="p-2">
                            <p className="text-xs text-gray-500 uppercase font-semibold">Points</p>
                            <p className="font-bold text-gray-900 text-lg mt-1">
                              {selectedBooking.tripStatus === "Completed"
                              ? loyalty.points
                              : loyalty.points +
                                (selectedBooking.tripType === "Local Rental" ? 50 : 100)}
                            </p>
                          </div>
                          <div className="p-2 border-l border-gray-100">
                            <p className="text-xs text-gray-500 uppercase font-semibold">Bookings</p>
                            <p className="font-bold text-gray-900 text-lg mt-1">{loyalty.totalBookings}</p>
                          </div>
                          <div className="p-2 border-l border-gray-100">
                            <p className="text-xs text-gray-500 uppercase font-semibold">Total Spent</p>
                            <p className="font-bold text-gray-900 text-lg mt-1">₹{loyalty.totalSpent}</p>
                          </div>
                          <div className="p-2 border-l border-gray-100">
                            <p className="text-xs text-gray-500 uppercase font-semibold">Status</p>
                            <p className="font-bold text-emerald-600 text-lg mt-1 truncate">{loyalty.membership}</p>
                          </div>
                        </div>

                        {/* Membership Status Detailed Card */}
                        <div className="mt-4 p-5 bg-white rounded-2xl border border-yellow-100 shadow-sm">
                          <h4 className="text-base sm:text-lg font-bold text-blue-700 flex items-center gap-2">
                            🏅 Membership Status
                          </h4>

                          <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">
                            {loyalty.membership}
                          </p>

                          <p className="text-gray-600 text-sm mt-1">
                            {loyalty.membership === "Bronze" &&
                              "Complete more trips to become Silver Member."}

                            {loyalty.membership === "Silver" &&
                              "Great! Keep travelling to unlock Gold Member."}

                            {loyalty.membership === "Gold" &&
                              "Awesome! You are one of our Premium Customers."}

                            {loyalty.membership === "Platinum" &&
                              "❤️ Thank you for being our VIP Customer."}
                          </p>
                        </div>

                        {/* Coupon Available */}
                        {loyalty.couponCode && !loyalty.couponUsed && (
                          <div className="mt-4 p-5 bg-emerald-50/80 border border-emerald-300 rounded-2xl shadow-sm">
                            <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                              🎁 Reward Coupon Available
                            </p>

                            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/80 p-4 rounded-xl border border-emerald-200">
                              <div>
                                <p className="text-xl sm:text-2xl font-extrabold text-gray-900 font-mono tracking-wide">
                                  {loyalty.couponCode}
                                </p>
                                <p className="text-emerald-700 text-sm font-semibold mt-0.5">
                                  ₹{loyalty.couponDiscount} Discount
                                </p>
                              </div>

                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(loyalty.couponCode);
                                  alert("Coupon copied");
                                }}
                                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm transition-all duration-150 active:scale-95 w-full sm:w-auto cursor-pointer"
                              >
                                Copy Coupon
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Coupon Not Available */}
                        {!loyalty.couponCode && (
                          <div className="mt-4 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
                            <p className="font-bold text-gray-800 flex items-center gap-1.5">
                              🎁 Coupon Status
                            </p>

                            <p className="mt-1.5 text-gray-600 text-sm">
                              You don't have any reward coupon yet.
                            </p>

                            <p className="mt-2 text-green-700 font-medium text-sm leading-relaxed bg-green-50/60 p-3 rounded-xl border border-green-100">
                              Complete more trips and earn
                              <strong className="font-bold"> 300 Loyalty Points </strong>
                              to unlock your
                              <strong className="font-bold"> ₹300 Discount Coupon.</strong>
                            </p>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          )}

          {/* Important Notice Box */}
          <div className="mt-8 bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 sm:p-6">
            <h3 className="font-bold text-blue-900 text-base mb-2 flex items-center gap-2">
              ℹ️ Important Notes
            </h3>
            <ul className="space-y-2 text-slate-600 text-xs sm:text-sm">
              <li className="flex items-start gap-2">• <span>Booking details are strictly secure and only visible to authorized customers.</span></li>
              <li className="flex items-start gap-2">• <span>Both mobile number and email address must match our system records.</span></li>
              <li className="flex items-start gap-2">• <span>Any remaining payment updates will reflect instantly after completion.</span></li>
              <li className="flex items-start gap-2">• <span>Keep your booking information confidential for reference.</span></li>
            </ul>
          </div>

        </div>

      </div>
    </main>
  );
}