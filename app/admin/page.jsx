"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const bookingId = b.bookingId?.toLowerCase() || "";
    const mobile = b.mobile || "";
    const name = b.name?.toLowerCase() || "";

    return (
      bookingId.includes(search.toLowerCase()) ||
      mobile.includes(search) ||
      name.includes(search.toLowerCase())
    );
  });

  const totalRevenue = bookings.reduce(
    (acc, booking) => acc + Number(booking.fare || booking.totalFare || 0),
    0
  );

  const totalBookings = bookings.length;

  const fullyPaid = bookings.filter(
    (b) => b.paymentStatus === "Fully Paid"
  ).length;

  const advancePaid = bookings.filter(
    (b) => b.paymentStatus === "Advance Paid"
  ).length;

  const pending = bookings.filter(
    (b) =>
      !b.paymentStatus ||
      b.paymentStatus === "Pending"
  ).length;

  return (
    <main className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  <div>
    <h1 className="text-xl sm:text-2xl md:text-4xl font-bold break-words">
      🚖 RC Tours & Travels Admin
    </h1>

    <p className="text-gray-500 mt-2">
      Manage bookings, payments, customers and revenue
    </p>
  </div>

  <button
   onClick={async () => {
    await fetch("/api/logout", {
    method: "POST",
    });

    router.replace("/admin/login");
    router.refresh();
    }}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold"
  >
    Logout
  </button>

</div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalBookings}
          </h2>
        </div>

        <div className="bg-green-50 rounded-2xl shadow-lg p-4 md:p-5">
          <p className="text-green-700 text-sm">Fully Paid</p>
          <h2 className="text-3xl font-bold mt-2 text-green-700">
            {fullyPaid}
          </h2>
        </div>

        <div className="bg-yellow-50 rounded-2xl shadow-lg p-4 md:p-5">
          <p className="text-yellow-700 text-sm">Advance Paid</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-700">
            {advancePaid}
          </h2>
        </div>

        <div className="bg-red-50 rounded-2xl shadow-lg p-4 md:p-5">
          <p className="text-red-700 text-sm">Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-red-700">
            {pending}
          </h2>
        </div>
      </div>

      {/* Revenue */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-4 md:p-6">
        <p className="text-sm opacity-90">
          Total Revenue
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          ₹{totalRevenue.toLocaleString()}
        </h2>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5">
        <input
          type="text"
          placeholder="Search Booking ID, Customer Name or Mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 md:p-5 border-b">
          <h2 className="font-bold text-lg">
            Recent Bookings
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            Loading bookings...
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-[900px] md:min-w-[1000px] w-full">
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

                    <td className="p-4 max-w-[200px] truncate">
                      {booking.pickup}
                    </td>

                    <td className="p-4 max-w-[200px] truncate">
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
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        View
                      </button>
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
    </main>
  );
}