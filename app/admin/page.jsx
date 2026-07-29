"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
  fetchBookings();
  fetchCustomers();
  fetchDrivers();
  fetchVehicles();
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

  const fetchCustomers = async () => {
  try {
    const res = await fetch("/api/admin/customers");
    const data = await res.json();

    if (data.success) {
      setCustomers(data.customers || []);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchDrivers = async () => {
  try {
    const res = await fetch("/api/admin/drivers");
    const data = await res.json();

    if (data.success) {
      setDrivers(data.drivers || []);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchVehicles = async () => {
  try {
    const res = await fetch("/api/admin/vehicles");
    const data = await res.json();

    if (data.success) {
      setVehicles(data.vehicles || []);
    }
  } catch (error) {
    console.log(error);
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
  const fullyPaid = bookings.filter((b) => b.paymentStatus === "Fully Paid").length;
  const advancePaid = bookings.filter((b) => b.paymentStatus === "Advance Paid").length;
  const pending = bookings.filter((b) => !b.paymentStatus || b.paymentStatus === "Pending").length;
  const newBookings = bookings.filter((b) => b.isNew === true).length;
  const runningTrips = bookings.filter((b) => b.tripStatus === "Running").length;
  const completedTrips = bookings.filter((b) => b.tripStatus === "Completed").length;

  const totalCustomers = customers.length;
const totalDrivers = drivers.length;
const totalVehicles = vehicles.length;

  return (
    <main className="space-y-6 bg-slate-50 min-h-screen p-4 md:p-8">
      
      {/* Premium Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 rounded-3xl shadow-xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <span className="text-[12rem] font-black">RC</span>
        </div>
        <div className="relative z-10">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold">
            Control Panel
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-3 tracking-tight">
            RC Tours & Travels
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base font-medium">
            Live fleet metrics, customer reservations, payment pipelines, and commercial performance metrics.
          </p>
        </div>
      </div>

      {/* Financial Overview Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-3xl shadow-xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute right-6 bottom-4 text-white opacity-10 text-7xl font-bold pointer-events-none">INR</div>
        <p className="text-xs uppercase tracking-widest font-bold opacity-75">Gross Revenue Yield</p>
        <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tight">
          ₹{totalRevenue.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* Grid Status Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 md:p-5 flex flex-col justify-between transition hover:shadow-md">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</span>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{totalBookings}</h3>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 md:p-5 flex flex-col justify-between transition hover:shadow-md">
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Settled (Fully Paid)</span>
          <h3 className="text-2xl md:text-3xl font-black text-emerald-600 mt-2">{fullyPaid}</h3>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 md:p-5 flex flex-col justify-between transition hover:shadow-md">
          <span className="text-amber-600 text-xs font-bold uppercase tracking-wider">Partial (Advance)</span>
          <h3 className="text-2xl md:text-3xl font-black text-amber-600 mt-2">{advancePaid}</h3>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 md:p-5 flex flex-col justify-between transition hover:shadow-md">
          <span className="text-rose-600 text-xs font-bold uppercase tracking-wider">Unpaid Balance</span>
          <h3 className="text-2xl md:text-3xl font-black text-rose-600 mt-2">{pending}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
    <p className="text-xs uppercase tracking-wider text-blue-600 font-bold">
      Total Customers
    </p>

    <h3 className="text-3xl font-black mt-2">
      {totalCustomers}
    </h3>
  </div>

  <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
    <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
      Total Drivers
    </p>

    <h3 className="text-3xl font-black mt-2">
      {totalDrivers}
    </h3>
  </div>

  <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
    <p className="text-xs uppercase tracking-wider text-emerald-600 font-bold">
      Total Vehicles
    </p>

    <h3 className="text-3xl font-black mt-2">
      {totalVehicles}
    </h3>
  </div>

</div>

      {/* Trip Logistical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50/60 border border-blue-100/50 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-blue-800 text-xs uppercase tracking-wider font-bold">New Submissions</p>
            <h4 className="text-3xl font-black text-blue-900 mt-1">{newBookings}</h4>
          </div>
          <span className="text-2xl">📥</span>
        </div>

        <div className="bg-purple-50/60 border border-purple-100/50 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-purple-800 text-xs uppercase tracking-wider font-bold">Active Transits</p>
            <h4 className="text-3xl font-black text-purple-900 mt-1">{runningTrips}</h4>
          </div>
          <span className="text-2xl">🚗</span>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100/50 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-emerald-800 text-xs uppercase tracking-wider font-bold">Arrived Destinations</p>
            <h4 className="text-3xl font-black text-emerald-900 mt-1">{completedTrips}</h4>
          </div>
          <span className="text-2xl">🏁</span>
        </div>
      </div>

      {/* Search Input Filter */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Token ID, Client Name, Contact Number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none font-medium text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Data Management Table Component */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-black text-slate-900 text-lg tracking-tight">
            Live Reservation Registry
          </h2>
          <span className="text-xs bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full">
            Realtime
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-slate-400 font-medium tracking-wide">
            Syncing data logs...
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[11px]">
                  <th className="p-4 pl-6">Token</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Origin Route</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Fare Matrix</th>
                  <th className="p-4">Logistics</th>
                  <th className="p-4">Clearance</th>
                  <th className="p-4 pr-6 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="p-4 pl-6 font-mono font-bold text-slate-900 text-xs">
                      {booking.bookingId}
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{booking.name}</td>
                    <td className="p-4 text-slate-500 font-mono text-xs">{booking.mobile}</td>
                    <td className="p-4 max-w-[180px] truncate text-slate-600">{booking.pickup}</td>
                    <td className="p-4 max-w-[180px] truncate text-slate-600">{booking.drop}</td>
                    <td className="p-4 font-bold text-slate-900">
                      ₹{Number(booking.fare || booking.totalFare || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide inline-block ${
                        booking.tripStatus === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40" :
                        booking.tripStatus === "Running" ? "bg-blue-50 text-blue-700 border border-blue-200/40" :
                        booking.tripStatus === "Confirmed" ? "bg-purple-50 text-purple-700 border border-purple-200/40" :
                        "bg-amber-50 text-amber-700 border border-amber-200/40"
                      }`}>
                        {booking.tripStatus || "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide inline-block ${
                        booking.paymentStatus === "Fully Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40" :
                        booking.paymentStatus === "Advance Paid" ? "bg-amber-50 text-amber-700 border border-amber-200/40" :
                        "bg-rose-50 text-rose-700 border border-rose-200/40"
                      }`}>
                        {booking.paymentStatus || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-center">
                      <button
                        onClick={() => router.push(`/admin/bookings/${booking.bookingId}`)}
                        className="bg-slate-900 hover:bg-indigo-650 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition duration-150"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="p-16 text-center text-slate-400 font-medium tracking-wide">
                No record matches the filter payload.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}