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
  const [distance, setDistance] = useState(0);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyTime, setJourneyTime] = useState("");
  const [totalFare, setTotalFare] = useState(0);

  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const [tripStatus, setTripStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDriversVehicles = async () => {
    try {
      const driverRes = await fetch("/api/admin/drivers");
      const driverData = await driverRes.json();
      if (driverData.success) {
        setDrivers(driverData.drivers || []);
      }

      const vehicleRes = await fetch("/api/admin/vehicles");
      const vehicleData = await vehicleRes.json();
      if (vehicleData.success) {
        setVehicles(vehicleData.vehicles || []);
      }
    } catch (error) {
      console.log("LOAD DRIVER VEHICLE ERROR", error);
    }
  };

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/bookings/${bookingId}`);
        const data = await res.json();

        if (data.success && data.booking.isNew) {
          await fetch(`/api/admin/bookings/${bookingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isNew: false }),
          });
        }

        if (data.success) {
          setBooking(data.booking);
          setToll(data.booking.toll || 0);
          setParking(data.booking.parking || 0);
          setStateTax(data.booking.stateTax || 0);
          setDriverAllowance(data.booking.driverAllowance || 0);
          setDistance(data.booking.distance || 0);
          setName(data.booking.name || "");
          setMobile(data.booking.mobile || "");
          setEmail(data.booking.email || "");
          setPickup(data.booking.pickup || "");
          setDrop(data.booking.drop || "");
          setJourneyDate(data.booking.journeyDate || "");
          setJourneyTime(data.booking.journeyTime || "");
          setTotalFare(data.booking.totalFare || 0);
          setDriverName(data.booking.driverName || "");
          setDriverMobile(data.booking.driverMobile || "");
          setDriverId(data.booking.driverId || "");
          setVehicleId(data.booking.vehicleId || "");
          setVehicleName(data.booking.vehicleName || "");
          setVehicleNumber(data.booking.vehicleNumber || "");
          setTripStatus(data.booking.tripStatus || "Pending");
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
    loadDriversVehicles();
  }, [bookingId]);

  const refreshBooking = async () => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`);
      const data = await res.json();
      if (data.success) {
        setBooking(data.booking);
        setToll(data.booking.toll || 0);
        setParking(data.booking.parking || 0);
        setStateTax(data.booking.stateTax || 0);
        setDriverAllowance(data.booking.driverAllowance || 0);
        setDistance(data.booking.distance || 0);
        setName(data.booking.name || "");
        setMobile(data.booking.mobile || "");
        setEmail(data.booking.email || "");
        setPickup(data.booking.pickup || "");
        setDrop(data.booking.drop || "");
        setJourneyDate(data.booking.journeyDate || "");
        setJourneyTime(data.booking.journeyTime || "");
        setTotalFare(data.booking.totalFare || 0);
        setDriverName(data.booking.driverName || "");
        setDriverMobile(data.booking.driverMobile || "");
        setDriverId(data.booking.driverId || "");
        setVehicleId(data.booking.vehicleId || "");
        setVehicleName(data.booking.vehicleName || "");
        setVehicleNumber(data.booking.vehicleNumber || "");
        setTripStatus(data.booking.tripStatus || "Pending");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBooking = async () => {
    try {
      const res = await fetch(`/api/admin/bookings/${booking.bookingId}/extras`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toll,
          parking,
          stateTax,
          driverAllowance,
          distance,

          bookingStatus:
          tripStatus === "Pending"
          ? "Pending"
          : tripStatus === "Confirmed"
          ? "Confirmed"
          : booking.bookingStatus,
          tripStatus,
          name,
          mobile,
          email,
          pickup,
          drop,
          journeyDate,
          journeyTime,
          totalFare,
          driverId,
          driverName,
          driverMobile,
          vehicleId,
          vehicleName,
          vehicleNumber,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Booking records updated successfully.");
        await refreshBooking();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Update execution failed.");
    }
  };

  if (loading) {
    return <div className="p-16 text-center text-slate-400 font-medium">Syncing data log pipeline...</div>;
  }

  if (!booking) {
    return <div className="p-16 text-center text-rose-500 font-bold">Booking token not found.</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">
      
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Logistical Record
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            Reservation Overview
          </h1>
          <p className="text-slate-400 font-mono text-sm mt-1">{booking.bookingId}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href={`tel:${booking.mobile}`}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2"
          >
            📞 Phone Call
          </a>
          <a
            href={`https://wa.me/91${booking.mobile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-2">
              👤 Customer Master Payload
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mobile Line</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Coordinates</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white"
                />
              </div>
            </div>
            <div className="text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-2 rounded-xl w-fit">
              Gender Demographics: <span className="text-slate-900">{booking.gender || "Not Specified"}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-2">
              🗺️ Routing & Transit Time
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Pickup Vector</label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Destination Vector</label>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Journey Date</label>
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Target Dispatch Time</label>
                  <input
                    type="time"
                    value={journeyTime}
                    onChange={(e) => setJourneyTime(e.target.value)}
                    className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-2">
              📋 Fleet Allocation & Variated Charges
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Assign Operator (Driver)</label>
                <select
                  value={driverId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setDriverId(id);
                    const drv = drivers.find((d) => d.driverId === id);
                    if (drv) {
                      setDriverName(drv.name);
                      setDriverMobile(drv.mobile);
                    }
                  }}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none bg-white"
                >
                  <option value="">Choose Driver</option>
                  {drivers
                  .filter(
                  (d) =>
                  d.status === "Available" ||
                  d.driverId === driverId
                  )
                  .map((d) => (
                  <option
                  key={d.driverId}
                  value={d.driverId}
                  >
                  {d.name} - {d.mobile}
                  </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Operator Mobile Backup</label>
                <input
                  type="text"
                  value={driverMobile}
                  onChange={(e) => setDriverMobile(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Allocate Vehicle Asset</label>
                <select
                  value={vehicleId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setVehicleId(id);
                    const vhc = vehicles.find((v) => v.vehicleId === id);
                    if (vhc) {
                      setVehicleName(vhc.vehicleName);
                      setVehicleNumber(vhc.vehicleNumber);
                    }
                  }}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none bg-white"
                >
                  <option value="">Choose Vehicle Asset</option>
                  {vehicles
                  .filter(
                  (v) =>
                  v.status === "Active" ||
                  v.vehicleId === vehicleId
                  )
                  .map((v) => (
                  <option
                  key={v.vehicleId}
                  value={v.vehicleId}
                  >
                  {v.vehicleName} - {v.vehicleNumber}
                  </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t pt-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Toll Matrix (₹)</label>
                <input
                  type="number"
                  value={toll}
                  onChange={(e) => setToll(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Parking Fee (₹)</label>
                <input
                  type="number"
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cross-State Tax (₹)</label>
                <input
                  type="number"
                  value={stateTax}
                  onChange={(e) => setStateTax(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Log distance (KM)</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-mono font-bold"
                />
              </div>
              <div className="col-span-2 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Night Driver Allowance (₹)</label>
                <input
                  type="number"
                  value={driverAllowance}
                  onChange={(e) => setDriverAllowance(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-mono font-bold"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleUpdateBooking}
                className="w-full bg-slate-900 hover:bg-indigo-650 text-white p-3.5 rounded-xl font-bold transition shadow-sm text-sm tracking-wide"
              >
                Sync Operations Metrics
              </button>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-2">
              💰 Fare Audit Matrix
            </h2>
            <div className="divide-y divide-slate-100 font-medium text-sm space-y-3">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400">Base Quoted Price</span>
                <span className="font-bold text-slate-900">₹{booking.totalFare}</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-400">Advance Escrow Collateral</span>
                <span className="font-bold text-emerald-600">₹{booking.advancePaid}</span>
              </div>
              <div className="flex justify-between items-center pt-3 bg-slate-50/50 p-2 rounded-xl border border-dashed">
                <span className="text-slate-500 font-bold">Unsettled Balance Due</span>
                <span className="font-black text-slate-900 text-base">₹{booking.remainingAmount}</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-slate-400">Clearance Status</span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  booking.paymentStatus === "Fully Paid" ? "bg-emerald-50 text-emerald-700" :
                  booking.paymentStatus === "Advance Paid" ? "bg-amber-50 text-amber-700" :
                  "bg-rose-50 text-rose-700"
                }`}>
                  {booking.paymentStatus || "Pending"}
                </span>
              </div>
            </div>

            {booking.remainingAmount > 0 && (
              <div className="pt-2">
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/admin/bookings/${booking.bookingId}/pay`, { method: "PATCH" });
                      const data = await res.json();
                      if (data.success) {
                        alert("Accounting marked as Fully Paid.");
                        await refreshBooking();
                      } else {
                        alert(data.message);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold p-3 rounded-xl transition border border-indigo-200/30"
                >
                  Mark Ledger as Fully Settled
                </button>
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">

  <h2 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-2">
    ⭐ Customer Rewards
  </h2>

  <div className="space-y-3">

    <div className="flex justify-between">
      <span className="text-slate-500">
        Loyalty Points
      </span>

      <span className="font-bold text-green-600">
        {booking.loyaltyPoints || 0}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">
        Total Bookings
      </span>

      <span className="font-bold">
        {booking.totalBookings || 0}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">
        Membership
      </span>

      <span className="font-bold text-blue-600">
        {booking.membership || "Bronze"}
      </span>
    </div>

    <hr />

    <div>

      <p className="font-semibold mb-2">
        Coupon Details
      </p>

      {booking.couponCode ? (

        <div className="bg-green-100 border border-green-300 rounded-xl p-4">

          <p className="text-xl font-bold">
            {booking.couponCode}
          </p>

          <p className="mt-2">
            Discount :
            <strong> ₹{booking.couponDiscount}</strong>
          </p>

          <p className="mt-2">

            Status :

            {booking.couponUsed ? (

              <span className="ml-2 text-red-600 font-bold">
                Used ❌
              </span>

            ) : (

              <span className="ml-2 text-green-600 font-bold">
                Available ✅
              </span>

            )}

          </p>

        </div>

      ) : (

        <div className="bg-gray-100 rounded-xl p-4">

          <p className="font-semibold">
            No Coupon Generated
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Customer has not unlocked any reward coupon yet.
          </p>

        </div>

      )}

    </div>

  </div>

</div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-2">
              🚀 Trip Status Engine
            </h2>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Change Operational Phase</label>
              <select
                value={tripStatus}
                onChange={(e) => setTripStatus(e.target.value)}
                className="w-full bg-slate-50 border rounded-xl p-3 text-sm font-semibold outline-none bg-white"
              >
                <option value="Pending">Pending Evaluation</option>
                <option value="Confirmed">Confirmed / Vehicle Dispatched</option>
                <option value="Running">En Route (Trip Active)</option>
                <option value="Completed">Completed Destination</option>
                <option value="Cancelled">Cancelled Void</option>
              </select>

            </div>

            <div className="pt-2">
  <button
    onClick={handleUpdateBooking}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold p-3 rounded-xl transition shadow-sm"
  >
    💾 Save Trip Status
  </button>
</div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-2">
              📄 Commercial Documents
            </h2>
            
            {booking.paymentStatus === "Fully Paid" && booking.tripStatus === "Completed" ? (
              <div className="space-y-3">
                <button
                  onClick={() =>
                    generateInvoicePDF({
                      ...booking,
                      toll,
                      parking,
                      stateTax,
                      driverAllowance,
                      driverId,
                      driverName,
                      driverMobile,
                      vehicleId,
                      vehicleName,
                      vehicleNumber,
                    })
                  }
                  className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold p-3 rounded-xl transition border border-purple-200/40"
                >
                  💾 Download Legal Tax Invoice
                </button>

                <a
                  href={`https://wa.me/91${booking.mobile}?text=Payment complete ho gaya hai. Aap apna trip invoice download kar sakte ho.`}
                  target="_blank"
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold p-3 rounded-xl transition border border-emerald-200/40 block text-center"
                >
                  📤 Push Invoice via WhatsApp Pipeline
                </a>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-200/30 text-amber-800 text-xs font-semibold rounded-xl leading-relaxed">
                ⚠️ Invoice Generation Locked. Complete the active transport phase and log total payment parameters to unlock invoicing modules.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}