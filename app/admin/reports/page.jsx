"use client";

import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

export default function ReportsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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

  const totalRevenue = useMemo(
    () => bookings.reduce((a, b) => a + Number(b.totalFare || b.fare || 0), 0),
    [bookings]
  );

  const totalAdvance = useMemo(
    () => bookings.reduce((a, b) => a + Number(b.advancePaid || 0), 0),
    [bookings]
  );

  const totalPending = useMemo(
    () => bookings.reduce((a, b) => a + Number(b.remainingAmount || 0), 0),
    [bookings]
  );

  const totalBookings = bookings.length;
  const fullyPaid = bookings.filter((b) => b.paymentStatus === "Fully Paid").length;
  const advancePaid = bookings.filter((b) => b.paymentStatus === "Advance Paid").length;
  const pending = bookings.filter((b) => !b.paymentStatus || b.paymentStatus === "Pending").length;
  const runningTrips = bookings.filter((b) => b.tripStatus === "Running").length;
  const completedTrips = bookings.filter((b) => b.tripStatus === "Completed").length;
  const cancelledTrips = bookings.filter((b) => b.tripStatus === "Cancelled").length;

  const filteredBookings = useMemo(() => {
    const today = new Date();

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);

      switch (filter) {
        case "today":
          return bookingDate.toDateString() === today.toDateString();

        case "week":
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          return bookingDate >= weekAgo;

        case "month":
          return (
            bookingDate.getMonth() === today.getMonth() &&
            bookingDate.getFullYear() === today.getFullYear()
          );

        default:
          return true;
      }
    });
  }, [bookings, filter]);

  const downloadExcel = () => {
    const excelData = filteredBookings.map((b) => ({
      BookingID: b.bookingId,
      Customer: b.name,
      Mobile: b.mobile,
      Pickup: b.pickup,
      Drop: b.drop,
      TripStatus: b.tripStatus,
      PaymentStatus: b.paymentStatus,
      TotalFare: b.totalFare || b.fare || 0,
      AdvancePaid: b.advancePaid || 0,
      RemainingAmount: b.remainingAmount || 0,
      Date: b.createdAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    XLSX.writeFile(workbook, "RC_Tours_Report.xlsx");
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen p-16 text-center text-slate-400 font-medium">
        Compiling analytical metrics datasets...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">

      {/* Header Panel */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Enterprise Intelligence
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            📊 Business Analytics Reports
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review growth parameters, gross returns yield, and operational payload delivery logs.
          </p>
        </div>

        <button
          onClick={downloadExcel}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition shadow-sm w-fit whitespace-nowrap"
        >
          📥 Export Excel Document
        </button>
      </div>

      {/* Timeline Controls */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex gap-2 flex-wrap">
        {[
          { id: "all", label: "All Records" },
          { id: "today", label: "Today" },
          { id: "week", label: "Last 7 Days" },
          { id: "month", label: "This Month" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition ${
              filter === btn.id
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Analytics Numerical Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Gross Yield</span>
          <h2 className="text-lg md:text-xl font-black text-slate-900 mt-2">₹{totalRevenue.toLocaleString("en-IN")}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Liquid Advance</span>
          <h2 className="text-lg md:text-xl font-black text-emerald-600 mt-2">₹{totalAdvance.toLocaleString("en-IN")}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-rose-600 text-xs font-bold uppercase tracking-wider">Receivables</span>
          <h2 className="text-lg md:text-xl font-black text-rose-600 mt-2">₹{totalPending.toLocaleString("en-IN")}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Bookings</span>
          <h2 className="text-lg md:text-xl font-black text-slate-900 mt-2">{totalBookings}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-purple-700 text-xs font-bold uppercase tracking-wider">In Transit</span>
          <h2 className="text-lg md:text-xl font-black text-purple-700 mt-2">{runningTrips}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Arrived</span>
          <h2 className="text-lg md:text-xl font-black text-emerald-700 mt-2">{completedTrips}</h2>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-rose-700 text-xs font-bold uppercase tracking-wider">Cancelled</span>
          <h2 className="text-lg md:text-xl font-black text-rose-700 mt-2">{cancelledTrips}</h2>
        </div>
      </div>

      {/* Split Section: Balance Distribution & Logs View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ledger Clearance Chart */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4 h-fit">
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Clearance Distribution
          </h2>
          <div className="divide-y divide-slate-100 font-medium text-sm space-y-3">
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-400">Fully Settled</span>
              <span className="font-bold text-emerald-600">{fullyPaid}</span>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="text-slate-400">Partial Token Claims</span>
              <span className="font-bold text-indigo-600">{advancePaid}</span>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="text-slate-400">Outstanding Balance Due</span>
              <span className="font-bold text-rose-600">{pending}</span>
            </div>
          </div>
        </div>

        {/* Live Ledger Data Stream */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900 tracking-tight">Recent Operation Logs</h2>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[10px]">
                  <th className="p-4 pl-6">Token</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Fare Matrix</th>
                  <th className="p-4">Advance</th>
                  <th className="p-4">Logistics</th>
                  <th className="p-4 pr-6">Payment State</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {filteredBookings.slice(0, 10).map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 pl-6 font-mono font-bold text-slate-900">{b.bookingId}</td>
                    <td className="p-4 font-semibold text-slate-900">{b.name}</td>
                    <td className="p-4 font-bold text-slate-900">₹{(b.totalFare || b.fare || 0).toLocaleString("en-IN")}</td>
                    <td className="p-4 font-bold text-emerald-600">₹{(b.advancePaid || 0).toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        b.tripStatus === "Completed" ? "bg-emerald-50 text-emerald-700" :
                        b.tripStatus === "Running" ? "bg-blue-50 text-blue-700" :
                        "bg-amber-50 text-amber-700"
                      }`}>
                        {b.tripStatus || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        b.paymentStatus === "Fully Paid" ? "bg-emerald-50 text-emerald-700" :
                        b.paymentStatus === "Advance Paid" ? "bg-indigo-50 text-indigo-700" :
                        "bg-rose-50 text-rose-700"
                      }`}>
                        {b.paymentStatus || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="p-12 text-center text-slate-400 font-medium tracking-wide">
              No historical data records mapped this interval.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}