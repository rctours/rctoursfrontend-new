"use client";

import { useEffect, useState, useMemo } from "react";

export default function PaymentsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTERED DATA =================
  const filteredBookings = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return bookings
      .filter((b) => {
        return (
          String(b.bookingId || "").toLowerCase().includes(searchValue) ||
          String(b.name || "").toLowerCase().includes(searchValue) ||
          String(b.mobile || "").includes(searchValue)
        );
      })
      .filter((b) => {
        const status = String(b.paymentStatus || "")
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();

        if (filter === "ALL") return true;

        if (filter === "FULL") {
          return status.includes("full") || status.includes("paid");
        }

        if (filter === "ADVANCE") {
          return (
            status.includes("advance") ||
            status.includes("partial") ||
            status.includes("part")
          );
        }

        if (filter === "PENDING") {
          return (
            !status ||
            status.includes("pending") ||
            status.includes("not") ||
            status.includes("unpaid")
          );
        }

        return true;
      });
  }, [bookings, search, filter]);

  // ================= SUMMARY =================
  const totalRevenue = useMemo(
    () => bookings.reduce((a, b) => a + (b.totalFare || 0), 0),
    [bookings]
  );

  const totalAdvance = useMemo(
    () => bookings.reduce((a, b) => a + (b.advancePaid || 0), 0),
    [bookings]
  );

  const pendingAmount = useMemo(
    () => bookings.reduce((a, b) => a + (b.remainingAmount || 0), 0),
    [bookings]
  );

  const pendingCount = useMemo(
    () =>
      bookings.filter((b) => {
        const status = String(b.paymentStatus || "")
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();

        return !status.includes("full");
      }).length,
    [bookings]
  );

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading Payments Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold">💰 Payments Dashboard</h1>
        <p className="text-gray-500 mt-2">
          RC Tours & Travels - Payment Management System
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-green-100 p-5 rounded-xl">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <h2 className="text-2xl font-bold">₹{totalRevenue}</h2>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl">
          <p className="text-sm text-gray-600">Advance Received</p>
          <h2 className="text-2xl font-bold">₹{totalAdvance}</h2>
        </div>

        <div className="bg-red-100 p-5 rounded-xl">
          <p className="text-sm text-gray-600">Pending Amount</p>
          <h2 className="text-2xl font-bold">₹{pendingAmount}</h2>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl">
          <p className="text-sm text-gray-600">Pending Bookings</p>
          <h2 className="text-2xl font-bold">{pendingCount}</h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">

        <input
          type="text"
          placeholder="Search Booking ID / Name / Mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg outline-none"
        />

        <div className="flex flex-wrap gap-2">

          {["ALL", "FULL", "ADVANCE", "PENDING"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded font-medium ${
                filter === type
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {type === "ALL"
                ? "All"
                : type === "FULL"
                ? "Fully Paid"
                : type === "ADVANCE"
                ? "Advance Paid"
                : "Pending"}
            </button>
          ))}

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">Booking ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Mobile</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Advance</th>
              <th className="p-4 text-left">Remaining</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => {
              const status = String(b.paymentStatus || "")
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();

              return (
                <tr key={b._id} className="border-b hover:bg-gray-50">

                  <td className="p-4 font-bold">{b.bookingId}</td>
                  <td className="p-4">{b.name}</td>
                  <td className="p-4">{b.mobile}</td>
                  <td className="p-4">₹{b.totalFare || 0}</td>
                  <td className="p-4">₹{b.advancePaid || 0}</td>
                  <td className="p-4">₹{b.remainingAmount || 0}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        status.includes("full")
                          ? "bg-green-100 text-green-700"
                          : status.includes("advance") ||
                            status.includes("partial")
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.paymentStatus || "Pending"}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">

                    <a
                      href={`tel:${b.mobile}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Call
                    </a>

                    <a
                      href={`https://wa.me/91${b.mobile}?text=${encodeURIComponent(
                        `Hello ${b.name},

Your booking (${b.bookingId}) payment status is: ${b.paymentStatus || "Pending"}.

Thank you,
RC Tours & Travels`
                      )}`}
                      target="_blank"
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      WhatsApp
                    </a>
                    

                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>

        {filteredBookings.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No payment records found
          </div>
        )}

      </div>

    </div>
  );
}