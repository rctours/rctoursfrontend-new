"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DriverDetailsPage() {
  const { driverId } = useParams();
  const router = useRouter();

  const [driver, setDriver] = useState(null);

  const [bookings, setBookings] = useState([]);
const [totalTrips, setTotalTrips] = useState(0);
const [totalRevenue, setTotalRevenue] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (driverId) {
      loadDriver();
    }
  }, [driverId]);

  async function loadDriver() {
    try {
      const res = await fetch(`/api/admin/drivers/${driverId}`);
      const data = await res.json();

      if (data.success) {

    setDriver(data.driver);

    setBookings(data.bookings || []);

    setTotalTrips(data.totalTrips || 0);

    setTotalRevenue(data.totalRevenue || 0);

    } else {

    alert(data.message);

    }
    } catch (error) {
      console.error(error);
      alert("Failed to load driver.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-2xl font-bold">
        Loading Driver...
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="p-8 text-red-600 text-2xl font-bold">
        Driver Not Found
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-6 space-y-6">

      {/* Back Button */}
      <div>
        <button
          onClick={() => router.push("/admin/drivers")}
          className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl font-semibold"
        >
          ← Back to Drivers
        </button>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          Driver Details
        </span>

        <h1 className="text-3xl font-black mt-4">
          {driver.name}
        </h1>

        <p className="text-gray-500 mt-2">
          Driver ID : {driver.driverId}
        </p>

      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Mobile Number</p>
          <h2 className="text-2xl font-bold mt-2">
            {driver.mobile}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Email</p>
          <h2 className="text-xl font-bold mt-2">
            {driver.email || "-"}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">License Number</p>
          <h2 className="text-xl font-bold mt-2">
            {driver.licenseNumber || "-"}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Assigned Vehicle</p>
          <h2 className="text-xl font-bold mt-2">
            {driver.vehicleAssigned || "Not Assigned"}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Status</p>

          <span
            className={`inline-block mt-2 px-4 py-2 rounded-full font-bold ${
              driver.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {driver.status}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Mongo ID</p>
          <h2 className="text-lg font-bold mt-2 break-all">
            {driver._id}
          </h2>
        </div>

      </div>

            {/* Driver Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Total Trips</p>

          <h2 className="text-3xl font-black mt-2">
            {totalTrips}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Total Revenue</p>

          <h2 className="text-3xl font-black mt-2 text-green-600">
            ₹{totalRevenue}
          </h2>
        </div>

      </div>

      {/* Booking History */}

      <div className="bg-white rounded-3xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Booking History
        </h2>

        {bookings.length === 0 ? (

          <p className="text-gray-500">
            No bookings found.
          </p>

        ) : (

          <div className="space-y-4">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="border rounded-2xl p-4"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold">
                      {booking.bookingId}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {booking.pickup} → {booking.drop}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-green-600">
                      ₹{booking.totalFare}
                    </p>

                    <p className="text-sm text-gray-500">
                      {booking.tripStatus}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}