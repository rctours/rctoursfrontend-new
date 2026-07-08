"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { generateInvoicePDF } from "@/lib/invoice";

export default function BookingDetailsPage() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);

  const [toll, setToll] = useState(0);
  const [parking, setParking] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [driverAllowance, setDriverAllowance] = useState(0);

  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/admin/bookings/${bookingId}`);
        const data = await res.json();

        console.log("API RESPONSE:", data);

      if (data.success) {
      setBooking(data.booking);

      setToll(data.booking.toll || 0);
      setParking(data.booking.parking || 0);
      setStateTax(data.booking.stateTax || 0);
      setDriverAllowance(data.booking.driverAllowance || 0);

      setDriverName(data.booking.driverName || "");
      setDriverMobile(data.booking.driverMobile || "");

      } else {
      setBooking(null);
      }
      } catch (error) {
        console.log(error);
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <div className="p-10">Loading booking...</div>;
  }

  if (!booking) {
    return <div className="p-10">Booking not found</div>;
  }

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Booking Details</h1>
        <p className="text-gray-500 mt-2">{booking.bookingId}</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

        <div>
          <h3 className="font-bold mb-4">Customer Details</h3>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Mobile:</strong> {booking.mobile}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Gender:</strong> {booking.gender}</p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Trip Details</h3>
          <p><strong>Pickup:</strong> {booking.pickup}</p>
          <p><strong>Drop:</strong> {booking.drop}</p>
          <p><strong>Date:</strong> {booking.journeyDate}</p>
          <p><strong>Time:</strong> {booking.journeyTime}</p>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-4 md:p-6">

        <h3 className="font-bold mb-4">Payment Details</h3>

        <p><strong>Total Fare:</strong> ₹{booking.totalFare}</p>
        <p><strong>Advance Paid:</strong> ₹{booking.advancePaid}</p>
        <p><strong>Remaining:</strong> ₹{booking.remainingAmount}</p>
        <p><strong>Status:</strong> {booking.paymentStatus}</p>

        <p>
        <strong>Trip Status:</strong>{" "}
        {booking.tripStatus || "Booked"}
        </p>

        <div className="mt-6 border-t pt-4">

  <h3 className="font-bold mb-4">
    Driver & Extra Charges
  </h3>

  <label className="block font-medium mb-1">
  Driver Name
</label>

<input
  type="text"
  value={driverName}
  onChange={(e) => setDriverName(e.target.value)}
  className="border p-2 rounded w-full mb-3"
/>

<label className="block font-medium mb-1">
  Driver Mobile
</label>

<input
  type="text"
  value={driverMobile}
  onChange={(e) => setDriverMobile(e.target.value)}
  className="border p-2 rounded w-full mb-3"
/>

<label className="block font-medium mb-1">
  Toll Charges (₹)
</label>

<input
  type="number"
  value={toll}
  onChange={(e) => setToll(e.target.value)}
  className="border p-2 rounded w-full mb-3"
/>

<label className="block font-medium mb-1">
  Parking Charges (₹)
</label>

<input
  type="number"
  value={parking}
  onChange={(e) => setParking(e.target.value)}
  className="border p-2 rounded w-full mb-3"
/>

<label className="block font-medium mb-1">
  State Tax (₹)
</label>

<input
  type="number"
  value={stateTax}
  onChange={(e) => setStateTax(e.target.value)}
  className="border p-2 rounded w-full mb-3"
/>

<label className="block font-medium mb-1">
  Driver Allowance (₹)
</label>

<input
  type="number"
  value={driverAllowance}
  onChange={(e) => setDriverAllowance(e.target.value)}
  className="border p-2 rounded w-full mb-3"
/>

  <button
  onClick={async () => {
    try {
      const res = await fetch(
        `/api/admin/bookings/${booking.bookingId}/extras`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            toll,
            parking,
            stateTax,
            driverAllowance,
            driverName,
            driverMobile,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Extra charges saved successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Save failed");
    }
  }}
  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
>
  Save Charges
</button>

</div>

        {booking.remainingAmount > 0 && (
  <div className="mt-4">
    <button
      onClick={async () => {
        try {
          const res = await fetch(
            `/api/admin/bookings/${booking.bookingId}/pay`,
            { method: "PATCH" }
          );

          const data = await res.json();

          if (data.success) {
            alert("Payment marked as Fully Paid");
            window.location.reload();
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full md:w-auto"
    >
      Mark as Paid (Admin)
    </button>
  </div>
)}

{booking.tripStatus !== "Completed" && (
  <div className="mt-4">
    <button
      onClick={async () => {
        try {
          const res = await fetch(
            `/api/admin/bookings/${booking.bookingId}/trip-complete`,
            {
              method: "PATCH",
            }
          );

          const data = await res.json();

          if (data.success) {
            alert("Trip marked as completed");
            window.location.reload();
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      Mark Trip Completed
    </button>
  </div>
)}

  {booking.paymentStatus === "Fully Paid" &&
  booking.tripStatus === "Completed" ? (
  <div className="mt-6 space-y-3">

    <button
      onClick={() =>
      generateInvoicePDF({
      ...booking,
      toll,
      parking,
      stateTax,
      driverAllowance,
      driverName,
      driverMobile,
      })
      }
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full md:w-auto"
    >
      Download Invoice
    </button>

    <a
      href={`https://wa.me/91${booking.mobile}?text=Payment complete ho gaya hai. Aap apna trip invoice download kar sakte ho.`}
      target="_blank"
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg inline-block w-full md:w-auto text-center"
    >
      Send Invoice Message
    </a>

  </div>
  ) : (
    <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
    Your final tax invoice will be available for download after successful trip completion and full payment confirmation.
    </div>
  )}

        <div className="flex flex-col md:flex-row gap-3 mt-6">

          <a
            href={`https://wa.me/91${booking.mobile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            WhatsApp Customer
          </a>

          <a
            href={`tel:${booking.mobile}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Call Customer
          </a>

        </div>

      </div>

    </div>
  );
}