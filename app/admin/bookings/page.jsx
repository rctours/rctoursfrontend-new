"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  try {
    const res = await fetch("/api/admin/bookings");

    if (!res.ok) {
      throw new Error("API Error");
    }

    const data = await res.json();

    console.log("API Response:", data);

    if (data.success) {
      setBookings(data.bookings || []);
    } else {
      setBookings([]);
    }
  } catch (error) {
    console.log("Fetch Error:", error);
    setBookings([]);
  } finally {
    setLoading(false);
  }
};

    console.log("Bookings Data:", bookings);
    console.log("Search Text:", search);
  
  const filteredBookings = bookings.filter((b) => {
  const bookingId = String(b.bookingId || "").toLowerCase();
  const mobile = String(b.mobile || "");
  const name = String(b.name || "").toLowerCase();

  const searchValue = search.toLowerCase().trim();

  return (
    bookingId.includes(searchValue) ||
    mobile.includes(searchValue) ||
    name.includes(searchValue)
    );
    });

console.log("Filtered Bookings:", filteredBookings);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          🚖 All Bookings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage customer bookings
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <input
          type="text"
          placeholder="Search Booking ID, Customer Name or Mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 outline-none"
        />

        <p className="mt-2 text-red-500">
    Search Value: {search}
  </p>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">
            Loading bookings...
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-[900px] md:min-w-[1100px] w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-4 text-left">Booking ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Mobile</th>
                  <th className="p-4 text-left">Pickup</th>
                  <th className="p-4 text-left">Drop</th>
                  <th className="p-4 text-left">Fare</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">
                      {booking.bookingId}
                    </td>

                    <td className="p-4">
                      {booking.name}
                    </td>

                    <td className="p-4">
                      {booking.mobile}
                    </td>

                    <td className="p-4">
                      {booking.pickup}
                    </td>

                    <td className="p-4">
                      {booking.drop}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{booking.fare || booking.totalFare || 0}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.paymentStatus === "Fully Paid"
                            ? "bg-green-100 text-green-700"
                            : booking.paymentStatus === "Advance Paid"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.paymentStatus || "Pending"}
                      </span>
                    </td>

                    <td className="p-4">
                    <Link
                    href={`/admin/bookings/${booking.bookingId}`}
                    className="text-blue-600 font-semibold hover:underline cursor-pointer"
                    onClick={(e) => {
                    e.stopPropagation();
                    }}
                    >
                    View
                    </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No bookings found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}