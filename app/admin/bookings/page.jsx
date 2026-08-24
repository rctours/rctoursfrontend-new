"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [driversCount, setDriversCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);

  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();

      if (data.success) {
        const sortedBookings = (data.bookings || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBookings(sortedBookings);
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

  const fetchStats = async () => {
    try {
      const [driversRes, vehiclesRes] = await Promise.all([
        fetch("/api/admin/drivers"),
        fetch("/api/admin/vehicles"),
      ]);
      const driversData = await driversRes.json();
      const vehiclesData = await vehiclesRes.json();

      if (driversData.success) setDriversCount(driversData.drivers.length);
      if (vehiclesData.success) setVehiclesCount(vehiclesData.vehicles.length);
    } catch (error) {
      console.log(error);
    }
  };

  const runningTrips = bookings.filter((b) => b.tripStatus === "Running").length;
  const completedTrips = bookings.filter((b) => b.tripStatus === "Completed").length;

  const filteredBookings = bookings.filter((b) => {
    const bookingId = String(b.bookingId || "").toLowerCase();
    const mobile = String(b.mobile || "").toLowerCase();
    const name = String(b.name || "").toLowerCase();
    const searchValue = search.toLowerCase().trim();

    return (
      bookingId.includes(searchValue) ||
      mobile.includes(searchValue) ||
      name.includes(searchValue)
    );
  });

  const getStatusColor = (status) => {
    if (status === "Fully Paid") return "bg-emerald-50 text-emerald-700 border border-emerald-200/40";
    if (status === "Advance Paid") return "bg-amber-50 text-amber-700 border border-amber-200/40";
    return "bg-rose-50 text-rose-700 border border-rose-200/40";
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Operations Hub
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">
          🚖 Master Reservations Ledger
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor incoming allocations, driver pipelines, and localized fleet schedules.
        </p>
      </div>

      {/* Numerical Metrics Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</span>
          <p className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{bookings.length}</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Drivers</span>
          <p className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{driversCount}</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Assets</span>
          <p className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{vehiclesCount}</p>
        </div>
        <div className="bg-blue-50/60 border border-blue-100/50 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-blue-800 text-xs uppercase tracking-wider font-bold">In Transit</span>
          <p className="text-2xl md:text-3xl font-black text-blue-900 mt-2">{runningTrips}</p>
        </div>
        <div className="bg-emerald-50/60 border border-emerald-100/50 rounded-2xl p-4 flex flex-col justify-between col-span-2 md:col-span-1">
          <span className="text-emerald-800 text-xs uppercase tracking-wider font-bold">Completed</span>
          <p className="text-2xl md:text-3xl font-black text-emerald-900 mt-2">{completedTrips}</p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
        <input
          type="text"
          placeholder="Search Token ID, Client Identity, Mobile Pipeline..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none font-medium text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white transition text-sm md:text-base"
        />
      </div>

      {/* Dynamic Render Flow */}
      {loading ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center text-slate-400 font-medium">
          Syncing logistics logs...
        </div>
      ) : (
        <>
          {/* Mobile Display Layout */}
          <div className="md:hidden space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-slate-900 text-xs">{booking.bookingId}</span>
                    {booking.isNew && (
                      <span className="ml-2 inline-block bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${getStatusColor(booking.paymentStatus)}`}>
                    {booking.paymentStatus || "Pending"}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <p><strong className="text-slate-400 uppercase text-[10px]">Client:</strong> {booking.name}</p>
                  <p><strong className="text-slate-400 uppercase text-[10px]">Contact:</strong> {booking.mobile}</p>
                  <p>
                  <strong className="text-slate-400 uppercase text-[10px]">
                  Trip:
                  </strong>{" "}
                  {booking.tripType || "Not Available"}
                  </p>

                  <p>
                  <strong className="text-slate-400 uppercase text-[10px]">
                  Journey Date:
                  </strong>{" "}
                  {booking.journeyDate || "Not Available"}
                  </p>

                  <p>
                  <strong className="text-slate-400 uppercase text-[10px]">
                  Journey Time:
                  </strong>{" "}
                  {booking.journeyTime || "Not Available"}
                  </p>

                  <p className="truncate">
                  <strong className="text-slate-400 uppercase text-[10px]">
                  Origin:
                  </strong>{" "}
                  {booking.pickup || "Not Available"}
                  </p>

                  <p className="truncate">
                  <strong className="text-slate-400 uppercase text-[10px]">
                  Dest:
                  </strong>{" "}
                  {booking.drop || "Not Available"}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t mt-2">
                    <span className="text-slate-900 font-black text-base">₹{Number(booking.fare || booking.totalFare || 0).toLocaleString("en-IN")}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      booking.tripStatus === "Completed" ? "bg-emerald-50 text-emerald-700" :
                      booking.tripStatus === "Running" ? "bg-blue-50 text-blue-700" :
                      "bg-amber-50 text-amber-700"
                    }`}>
                      {booking.tripStatus || "Pending"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/admin/bookings/${booking.bookingId}`}
                  className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-bold text-xs transition mt-2"
                >
                  Inspect Order
                </Link>
              </div>
            ))}

            {filteredBookings.length === 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center text-slate-400 font-medium">
                No matching dispatch entities.
              </div>
            )}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1400px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[11px]">
                    <th className="p-4 pl-6">Token ID</th>
                    <th className="p-4">Client Identity</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Trip Type</th>
                    <th className="p-4">Journey Date & Time</th>
                    <th className="p-4">Origin Point</th>
                    <th className="p-4">Destination Target</th>
                    <th className="p-4">Gross Fare</th>
                    <th className="p-4">Clearance</th>
                    <th className="p-4 pr-6 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/50 transition duration-150">
                      <td className="p-4 pl-6 font-mono font-bold text-slate-900 text-xs">
                        <div className="flex items-center gap-2">
                          {booking.bookingId}
                          {booking.isNew && (
                            <span className="bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                              NEW
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-900">{booking.name}</td>
                      <td className="p-4 text-slate-500 font-mono text-xs">{booking.mobile}</td>
                      
                      <td className="p-4">
                      <span className="inline-flex px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
                      {booking.tripType || "Not Available"}
                      </span>
                      </td>

                      <td className="p-4 text-xs text-slate-600">
                      <div className="font-semibold">
                      {booking.journeyDate || "Not Available"}
                      </div>

                      <div className="text-slate-400 mt-1">
                      {booking.journeyTime || ""}
                      </div>
                      </td>

                      <td className="p-4 max-w-[180px] truncate text-slate-600">{booking.pickup}</td>
                      <td className="p-4 max-w-[180px] truncate text-slate-600">{booking.drop}</td>
                      <td className="p-4 font-bold text-slate-900">
                        ₹{Number(booking.fare || booking.totalFare || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide inline-block ${getStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus || "Pending"}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-center">
                        <Link
                          href={`/admin/bookings/${booking.bookingId}`}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition duration-150"
                        >
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredBookings.length === 0 && (
              <div className="p-16 text-center text-slate-400 font-medium">
                No active records logged in parameters.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}