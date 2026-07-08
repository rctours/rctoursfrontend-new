"use client";

import { useEffect, useMemo, useState } from "react";

export default function ReportsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
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

  // ================= CALCULATIONS =================

  const totalRevenue = useMemo(
    () => bookings.reduce((a, b) => a + (b.totalFare || 0), 0),
    [bookings]
  );

  const totalAdvance = useMemo(
    () => bookings.reduce((a, b) => a + (b.advancePaid || 0), 0),
    [bookings]
  );

  const totalPending = useMemo(
    () => bookings.reduce((a, b) => a + (b.remainingAmount || 0), 0),
    [bookings]
  );

  const totalBookings = bookings.length;

  const fullyPaid = bookings.filter((b) =>
    (b.paymentStatus || "").toLowerCase().includes("full")
  ).length;

  const advancePaid = bookings.filter((b) =>
    (b.paymentStatus || "").toLowerCase().includes("advance")
  ).length;

  const pending = bookings.filter((b) =>
    !b.paymentStatus ||
    b.paymentStatus.toLowerCase().includes("pending") ||
    b.paymentStatus.toLowerCase().includes("not")
  ).length;

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading Reports...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold">📊 Reports Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Business overview for RC Tours & Travels
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
          <h2 className="text-2xl font-bold">₹{totalPending}</h2>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <h2 className="text-2xl font-bold">{totalBookings}</h2>
        </div>

      </div>

      {/* STATUS BREAKDOWN */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold mb-4">Payment Breakdown</h2>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Fully Paid</span>
            <span className="font-bold text-green-600">{fullyPaid}</span>
          </div>

          <div className="flex justify-between">
            <span>Advance Paid</span>
            <span className="font-bold text-blue-600">{advancePaid}</span>
          </div>

          <div className="flex justify-between">
            <span>Pending</span>
            <span className="font-bold text-red-600">{pending}</span>
          </div>

        </div>

      </div>

      {/* SIMPLE TABLE SUMMARY */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">Booking ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Advance</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.slice(0, 10).map((b) => (
              <tr key={b._id} className="border-b">

                <td className="p-4">{b.bookingId}</td>
                <td className="p-4">{b.name}</td>
                <td className="p-4">₹{b.totalFare || 0}</td>
                <td className="p-4">₹{b.advancePaid || 0}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      (b.paymentStatus || "").toLowerCase().includes("full")
                        ? "bg-green-100 text-green-700"
                        : (b.paymentStatus || "").toLowerCase().includes("advance")
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.paymentStatus || "Pending"}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}