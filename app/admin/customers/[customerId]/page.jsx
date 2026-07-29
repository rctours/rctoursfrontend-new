"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CustomerDetailsPage() {
  const { customerId } = useParams();

  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  async function updatePoints(action) {

  const value = prompt(
    action === "add"
      ? "Enter points to ADD"
      : "Enter points to REMOVE"
  );

  if (!value) return;

  const points = Number(value);

  if (isNaN(points) || points <= 0) {
    alert("Invalid points");
    return;
  }

  try {

    const res = await fetch(
      `/api/admin/customers/${customerId}/points`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          action,
          points,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {

      alert(data.message);

      loadCustomer();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

  }

}

async function generateCoupon() {

  try {

    const res = await fetch(
      `/api/admin/customers/${customerId}/coupon`,
      {
        method: "POST",
      }
    );

    const data = await res.json();

    if (data.success) {

      alert(data.message);

      loadCustomer();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

  }

}

  useEffect(() => {
    if (customerId) {
      loadCustomer();
    }
  }, [customerId]);

  async function loadCustomer() {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/customers/${customerId}`);
      const data = await res.json();

      if (data.success) {
        setCustomer(data.customer);
        setBookings(data.bookings || []);
        setStats(data.stats);
      }

      const historyRes = await fetch(
    `/api/admin/customers/${customerId}/history`
    );

    const historyData = await historyRes.json();

    if (historyData.success) {
    setHistory(historyData.history || []);
    }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function membershipColor(level) {
    switch (level) {
      case "Silver":
        return "bg-gray-200 text-gray-700";

      case "Gold":
        return "bg-yellow-100 text-yellow-700";

      case "Platinum":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-orange-100 text-orange-700";
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-xl font-semibold">
        Loading Customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6 text-red-600">
        Customer not found.
      </div>
    );
  }

  const latestBooking = bookings[0];

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center">

          <div>

            <h1 className="text-3xl font-bold">
              {customer.name}
            </h1>

            <p className="text-gray-500 mt-2">
              📱 {customer.mobile}
            </p>

            <p className="text-gray-500">
              📧 {latestBooking?.email || "No Email"}
            </p>

          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">

            <span
              className={`px-4 py-2 rounded-full font-semibold ${membershipColor(
                customer.membership
              )}`}
            >
              {customer.membership}
            </span>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
              ⭐ {customer.loyaltyPoints} Points
            </span>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500 text-sm">
            Total Bookings
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {customer.totalBookings}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500 text-sm">
            Lifetime Spend
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{customer.totalSpent}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500 text-sm">
            Completed Trips
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.completedTrips}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500 text-sm">
            Pending Trips
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.pendingTrips}
          </h2>

        </div>

      </div>

            {/* Loyalty & Rewards */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* Loyalty Card */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Loyalty & Membership
          </h2>

<div className="space-y-5">

  <div className="flex justify-between items-center">

    <span className="text-gray-500">
      Current Membership
    </span>

    <span className="font-bold text-lg">
      {customer.membership}
    </span>

  </div>

  <div className="flex justify-between items-center">

    <span className="text-gray-500">
      Available Points
    </span>

    <span className="font-bold text-blue-600 text-lg">
      {customer.loyaltyPoints}
    </span>

  </div>

  <div>

    <div className="flex justify-between mb-2">

      <span className="text-gray-500">
        Reward Progress
      </span>

      <span className="font-semibold">

        {customer.loyaltyPoints}/300

      </span>

    </div>

    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

      <div
        className="h-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(
            (customer.loyaltyPoints / 300) * 100,
            100
          )}%`,
        }}
      />

    </div>

  </div>

  <div className="bg-blue-50 rounded-xl p-3 flex justify-between">

    <span className="font-medium">
      Next Reward
    </span>

    <span className="font-bold text-blue-700">

      {Math.max(
        300 - customer.loyaltyPoints,
        0
      )} Points Left

    </span>

  </div>

</div>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
            onClick={() => updatePoints("add")}
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-4
            py-2
            rounded-lg
            font-semibold
            "
            >
            + Add Points
            </button>

            <button
            onClick={() => updatePoints("remove")}
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            py-2
            rounded-lg
            font-semibold
            "
            >
            - Remove Points
            </button>

          </div>

        </div>

{/* Coupon Card */}

<div className="bg-white rounded-2xl shadow-lg p-6">

  <h2 className="text-xl font-bold mb-5">
    Coupon Status
  </h2>

  {customer.couponCode ? (

    <div className="space-y-5">

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">

        <p className="font-semibold text-green-700">
          ✅ Active Coupon
        </p>

        <p className="mt-3">
          <strong>Coupon Code:</strong>{" "}
          {customer.couponCode}
        </p>

        <p className="mt-2">
          <strong>Discount:</strong>{" "}
          ₹{customer.couponDiscount}
        </p>

      </div>

      <div
        className={`rounded-xl p-4 font-semibold ${
          customer.couponUsed
            ? "bg-red-50 text-red-700"
            : "bg-green-50 text-green-700"
        }`}
      >
        Status : {customer.couponUsed ? "Used" : "Active"}
      </div>

    </div>

  ) : (

    <div className="space-y-5">

      <div className="bg-red-50 border border-red-200 rounded-xl p-4">

        <p className="font-semibold text-red-700">
          ❌ No Active Coupon
        </p>

        <p className="text-gray-600 mt-2">
          Coupon will be generated automatically
          after reaching
          <strong> 300 Loyalty Points</strong>.
        </p>

      </div>

      <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">

        <span className="font-medium">
          Remaining Points
        </span>

        <span className="font-bold text-blue-700">

          {Math.max(
            300 - customer.loyaltyPoints,
            0
          )} Points

        </span>

      </div>

      <button
    onClick={generateCoupon}
    className="
    w-full
    bg-indigo-600
    hover:bg-indigo-700
    text-white
    py-3
    rounded-xl
    font-semibold
    "
    >
    Generate Coupon
    </button>

    </div>

  )}

</div>

      </div>

      {/* Customer Summary */}

<div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">

  <h2 className="text-2xl font-bold mb-6">
    Customer Summary
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div>
      <p className="text-white/80 text-sm">
        First Booking
      </p>

      <h3 className="text-lg font-bold mt-2">
        {bookings.length
          ? new Date(
              bookings[bookings.length - 1].createdAt
            ).toLocaleDateString()
          : "-"}
      </h3>
    </div>

    <div>
      <p className="text-white/80 text-sm">
        Latest Booking
      </p>

      <h3 className="text-lg font-bold mt-2">
        {bookings.length
          ? new Date(
              bookings[0].createdAt
            ).toLocaleDateString()
          : "-"}
      </h3>
    </div>

    <div>
      <p className="text-white/80 text-sm">
        Average Booking Value
      </p>

      <h3 className="text-lg font-bold mt-2">
        ₹
        {customer.totalBookings
          ? Math.round(
              customer.totalSpent /
                customer.totalBookings
            )
          : 0}
      </h3>
    </div>

    <div>
      <p className="text-white/80 text-sm">
        Customer Status
      </p>

      <h3 className="text-lg font-bold mt-2">
        {customer.membership} Member
      </h3>
    </div>

  </div>

</div>

            {/* Booking History */}

      <div className="bg-white rounded-2xl shadow-lg">

        <div className="border-b px-6 py-4">

          <h2 className="text-2xl font-bold">
            Booking History
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            All bookings made by this customer
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Booking ID
                </th>

                <th className="p-4 text-left">
                  Route
                </th>

                <th className="p-4 text-left">
                  Vehicle
                </th>

                <th className="p-4 text-center">
                  Fare
                </th>

                <th className="p-4 text-center">
                Date
                </th>

                <th className="p-4 text-center">
                  Payment
                </th>

                <th className="p-4 text-center">
                  Trip
                </th>

                <th className="p-4 text-center">
                Coupon
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {bookings.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center p-8"
                  >
                    No Bookings Found
                  </td>

                </tr>

              ) : (

                bookings.map((booking) => (

                  <tr
                    key={booking._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4 font-semibold">
                      {booking.bookingId}
                    </td>

                    <td className="p-4">

                      <div className="font-semibold">
                      {booking.pickup}
                      </div>

                      <div className="text-indigo-600 font-bold py-1">
                       →
                      </div>

                      <div className="font-semibold">
                      {booking.drop}
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                      {booking.tripType}
                      </p>

                    </td>

                    <td className="p-4">

                    <span className="bg-slate-100 px-3 py-1 rounded-full font-semibold text-sm">

                    {booking.vehicleName || booking.vehicle}

                    </span>

                    </td>

                    <td className="p-4 text-center font-bold">
                      ₹{booking.totalFare}
                    </td>

                    <td className="p-4 text-center">

                    <div className="text-sm font-semibold">
                    {booking.journeyDate || "-"}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                    {booking.journeyTime || ""}
                    </div>

                    </td>

                    <td className="p-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.paymentStatus === "Fully Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>

                    </td>

                    <td className="p-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.tripStatus === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {booking.tripStatus}
                      </span>

                    </td>

                    <td className="p-4 text-center">

                    {booking.couponApplied ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{booking.discountAmount}
                    </span>

                    ) : (

                    <span className="text-gray-400">
                    —
                    </span>

                    )}

                    </td>

                    <td className="p-4 text-center">

                      <a
                        href={`/admin/bookings/${booking.bookingId}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        View Booking
                      </a>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Loyalty History */}

<div className="bg-white rounded-2xl shadow-lg mt-6">

  <div className="border-b px-6 py-4">

    <h2 className="text-2xl font-bold">
      Loyalty History
    </h2>

    <p className="text-gray-500 text-sm mt-1">
      All loyalty point activities
    </p>

  </div>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-gray-100">

        <tr>

          <th className="p-4 text-left">
            Date
          </th>

          <th className="p-4 text-left">
            Action
          </th>

          <th className="p-4 text-center">
            Points
          </th>

          <th className="p-4 text-left">
            Reason
          </th>

          <th className="p-4 text-center">
            Balance
          </th>

        </tr>

      </thead>

      <tbody>

        {history.length === 0 ? (

          <tr>

            <td
              colSpan={5}
              className="text-center p-8 text-gray-500"
            >
              No loyalty history available.
            </td>

          </tr>

        ) : (

          history.map((item) => (

            <tr
              key={item._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>

              <td className="p-4 font-semibold">
                {item.action}
              </td>

              <td className="p-4 text-center font-bold">

                {item.action.includes("Removed")
                  ? (
                    <span className="text-red-600">
                      -{item.points}
                    </span>
                  )
                  : (
                    <span className="text-green-600">
                      +{item.points}
                    </span>
                  )}

              </td>

              <td className="p-4">
                {item.reason}
              </td>

              <td className="p-4 text-center font-semibold">
                {item.balancePoints}
              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>

    </div>
    
  );
}