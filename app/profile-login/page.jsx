"use client";

import { generateInvoicePDF } from "@/lib/invoice";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Phone, Mail, ShieldCheck, Ticket, ArrowRight } from "lucide-react";

export default function TrackBookingPage() {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loyalty, setLoyalty] = useState(null);

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
    if (!mobile && !email) {
      alert("Please enter Mobile Number and Email");
      return;
    }

    if (!mobile) {
      alert("Please enter Mobile Number");
      return;
    }

    if (!email) {
      alert("Please enter Email Address");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/profile-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobile.trim().replace(/\s/g, ""),
          email: email.trim(),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Booking not found");
        setBookings([]);
        setSelectedBooking(null);
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
          email: email.trim(),
          loyalty: data.loyalty,
        })
      );

      
      window.dispatchEvent(new Event("customerLogin"));
      
      window.location.href = "/my-profile";

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
              Customer Profile Login
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Enter your registered Mobile Number and Email Address to view and manage your travel bookings.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile Number *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Phone size={18} />
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

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
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
                <Search size={20} /> Search Booking
              </>
            )}
          </button>

          {/* Bookings Selection List (if multiple) */}
          {selectedBooking && (
            <>
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
            </>
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