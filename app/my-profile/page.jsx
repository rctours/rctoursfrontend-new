"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Phone, Mail, Award, ArrowRight, Ticket, Search, ShieldCheck } from "lucide-react";
import { generateInvoicePDF } from "@/lib/invoice";

export default function MyProfilePage() {
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  const downloadInvoice = async (bookingId) => {
  try {
    const res = await fetch(`/api/invoice/${bookingId}`);

    const data = await res.json();

    if (!data.success) {
      alert("Invoice not found");
      return;
    }

    await generateInvoicePDF(data.booking);

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  useEffect(() => {
    const loadProfile = async () => {
      console.log("STEP 1");

      const data = localStorage.getItem("customer");

      console.log("Local Storage :", data);

      if (!data) {
        setLoading(false);
        return;
      }

      const customerData = JSON.parse(data);

      console.log("STEP 2 :", customerData);

      try {
        const res = await fetch("/api/my-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: customerData.mobile,
          }),
        });

        console.log("STEP 3 Status :", res.status);

        const result = await res.json();

        console.log("MY PROFILE RESULT :", result);

        if (result.success) {

        console.log("BOOKINGS :", result.bookings);

        setCustomer(result.customer);
        setBookings(result.bookings);
        setFilteredBookings(result.bookings);

        } else {

        console.log("API FAILED :", result);

        setCustomer(customerData);

        }

        } catch (err) {
        console.log("ERROR :", err);
        setCustomer(customerData);
        }

      setLoading(false);
        };

        loadProfile();
    }, []);

    if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/30 to-slate-200/50 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-slate-100 text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-bold text-slate-800">
            Loading Profile...
          </h2>
        </div>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/30 to-slate-200/50 flex items-center justify-center px-4 pt-28 pb-12">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 max-w-md w-full text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100 mb-4">
            <ShieldCheck size={14} /> Authentication Required
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Customer Login Required
          </h2>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
            Please track your booking first to securely access your customer profile and rewards.
          </p>

          <Link
            href="/profile-login"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold text-base shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.99]"
          >
            Track Booking <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/30 to-slate-200/50 pt-28 sm:pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-3">
                <User size={14} /> Account Dashboard
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                My Profile
              </h1>
              <p className="text-slate-500 text-sm sm:text-base mt-1">
                Welcome back to RC Tours & Travels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Customer Information Card */}
            <div className="lg:col-span-2 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="text-blue-600" size={22} /> Customer Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Full Name</p>
                  <p className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    {customer.name}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Mobile Number</p>
                  <p className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Phone size={16} className="text-slate-400" /> {customer.mobile}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Email Address</p>
                  <p className="font-bold text-slate-900 text-base truncate flex items-center gap-2">
                    <Mail size={16} className="text-slate-400 shrink-0" /> {customer.email || "-"}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Membership</p>
                  <p className="font-extrabold text-emerald-600 text-lg flex items-center gap-2">
                    <Award size={18} className="text-emerald-500" /> {customer.loyalty?.membership}
                  </p>
                </div>

              </div>
            </div>

            {/* Loyalty Rewards Card */}
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-15">
                <Award size={160} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-amber-100">
                  Loyalty Rewards
                </p>
                <h2 className="text-5xl sm:text-6xl font-black mt-3 tracking-tight">
                  {customer.loyalty?.points}
                </h2>
                <p className="text-amber-100 text-sm font-medium mt-1">
                  Total Reward Points Earned
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-xs uppercase tracking-widest font-semibold text-amber-100">
                  Current Tier
                </p>
                <p className="text-2xl font-extrabold mt-1 tracking-wide">
                  {customer.loyalty?.membership} Member
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Booking History Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Ticket className="text-blue-600" size={28} /> Booking History
            </h2>

            <div className="relative w-full sm:w-80">
            <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
            type="text"
            placeholder="Search Booking..."
            value={search}
            onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            const filtered = bookings.filter((booking) => {
            return (
            booking.bookingId?.toLowerCase().includes(value.toLowerCase()) ||
            booking.pickup?.toLowerCase().includes(value.toLowerCase()) ||
            booking.drop?.toLowerCase().includes(value.toLowerCase()) ||
            booking.vehicle?.toLowerCase().includes(value.toLowerCase())
            );
        });

        setFilteredBookings(filtered);
        }}
        className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-600"
        />
        </div>
          </div>

          {bookings.length === 0 ? (
            <div className="border border-dashed border-slate-200 rounded-3xl p-10 text-center bg-slate-50/50">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Ticket size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No Booking Found
              </h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Your past and upcoming booking history will appear here once you make a reservation.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (

  <div className="border border-dashed border-gray-300 rounded-2xl py-14 text-center">

    <Search
      size={55}
      className="mx-auto text-gray-300 mb-4"
    />

    <h3 className="text-2xl font-bold text-gray-800">
      No Booking Found
    </h3>

    <p className="text-gray-500 mt-2">
      No booking matches your search.
    </p>

    <button
      onClick={() => {
        setSearch("");
        setFilteredBookings(bookings);
      }}
      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer"
    >
      Clear Search
    </button>

  </div>

) : (

  filteredBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900 text-base sm:text-lg bg-slate-100 px-3 py-1 rounded-xl">
                          {booking.bookingId}
                        </span>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-lg ${
                            booking.tripStatus === "Completed"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {booking.tripStatus}
                        </span>
                      </div>

                      <p className="text-slate-700 font-semibold text-sm sm:text-base flex items-center gap-2 pt-1">
                        <span>🚖</span> {booking.pickup} <span className="text-slate-400">→</span> {booking.drop}
                      </p>

                      <p className="text-slate-500 text-xs sm:text-sm">
                        📅 Journey Date: <span className="font-medium text-slate-700">{booking.journeyDate}</span>
                      </p>
                    </div>

                    <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 gap-2">
                      <p className="font-extrabold text-xl sm:text-2xl text-slate-900">
                        ₹{booking.totalFare}
                      </p>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">Payment:</span>
                        <span
                          className={`font-bold px-2.5 py-0.5 rounded-md text-xs sm:text-sm ${
                            booking.remainingAmount > 0
                              ? "bg-orange-50 text-orange-700 border border-orange-200"
                              : "bg-green-50 text-green-700 border border-green-200"
                          }`}
                        >
                          {booking.remainingAmount > 0 ? "Partially Paid" : "Fully Paid"}
                        </span>
                      </div>

                    {/* Booking Actions */}

                    <div className="mt-3 flex flex-col gap-2 w-full">

                    {/* Completed Booking */}
                {booking.tripStatus === "Completed" &&
                booking.remainingAmount === 0 && (

                <button
                onClick={() => downloadInvoice(booking.bookingId)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold text-sm transition"
                >
                📄 Download Invoice
                </button>

                )}

                {/* Pending Booking */}

                {booking.tripStatus !== "Completed" && (

                <Link
                href={`/track-booking?bookingId=${booking.bookingId}`}
                className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2"
                >
                🚖 Track Booking
                </Link>

                )}

                </div>
                

                    </div>
                    

                  </div>
                </div>
                ))
            )}

          </div>

        )}

      </div>

      </div>
    </main>
  );
}