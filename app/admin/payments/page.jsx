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
      setLoading(true);
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(data.success ? (data.bookings || []) : []);
    } catch (error) {
      console.error("Error:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = useMemo(() => {
    const searchValue = search.toLowerCase().trim();
    return bookings.filter((b) => {
      const matchSearch =
        String(b.bookingId || "").toLowerCase().includes(searchValue) ||
        String(b.name || "").toLowerCase().includes(searchValue) ||
        String(b.mobile || "").includes(searchValue);

      const status = String(b.paymentStatus || "").toLowerCase();
      let matchFilter = true;

      if (filter === "FULL") matchFilter = status.includes("full") || status.includes("paid");
      else if (filter === "ADVANCE") matchFilter = status.includes("advance") || status.includes("partial");
      else if (filter === "PENDING") matchFilter = !status || status.includes("pending") || status.includes("unpaid");

      return matchSearch && matchFilter;
    });
  }, [bookings, search, filter]);

  const stats = useMemo(() => {
    return bookings.reduce(
      (acc, b) => ({
        revenue: acc.revenue + (b.totalFare || 0),
        advance: acc.advance + (b.advancePaid || 0),
        pending: acc.pending + (b.remainingAmount || 0),
        count: !String(b.paymentStatus || "").toLowerCase().includes("full") ? acc.count + 1 : acc.count,
      }),
      { revenue: 0, advance: 0, pending: 0, count: 0 }
    );
  }, [bookings]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen p-16 text-center text-slate-400 font-medium">
        Syncing accounting ledger pipelines...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900">💰 Commercial Payments System</h1>
        <p className="text-slate-400 text-sm mt-1">Manage all transaction pipelines and ledger reconciliations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase">Revenue</p>
          <h2 className="text-xl font-black mt-1">₹{stats.revenue.toLocaleString("en-IN")}</h2>
        </div>
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-emerald-600 text-xs font-bold uppercase">Advance</p>
          <h2 className="text-xl font-black text-emerald-600 mt-1">₹{stats.advance.toLocaleString("en-IN")}</h2>
        </div>
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-rose-600 text-xs font-bold uppercase">Outstanding</p>
          <h2 className="text-xl font-black text-rose-600 mt-1">₹{stats.pending.toLocaleString("en-IN")}</h2>
        </div>
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-amber-600 text-xs font-bold uppercase">Unsettled</p>
          <h2 className="text-xl font-black text-amber-600 mt-1">{stats.count}</h2>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border rounded-2xl p-4 space-y-4">
        <input
          type="text"
          placeholder="Search by ID, Name or Mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none"
        />
        <div className="flex gap-2">
          {["ALL", "FULL", "ADVANCE", "PENDING"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold ${filter === type ? "bg-slate-900 text-white" : "bg-slate-100"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase font-bold">
              <tr>
                <th className="p-4">Token</th>
                <th className="p-4">Client</th>
                <th className="p-4">Total</th>
                <th className="p-4">Advance</th>
                <th className="p-4">Due</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {filteredBookings.map((b) => (
                <tr key={b._id}>
                  <td className="p-4 font-bold">{b.bookingId}</td>
                  <td className="p-4">{b.name}</td>
                  <td className="p-4 font-bold">₹{(b.totalFare || 0).toLocaleString()}</td>
                  <td className="p-4 font-bold text-emerald-600">₹{(b.advancePaid || 0).toLocaleString()}</td>
                  <td className="p-4 font-bold text-rose-600">₹{(b.remainingAmount || 0).toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold">{b.paymentStatus || "Pending"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}