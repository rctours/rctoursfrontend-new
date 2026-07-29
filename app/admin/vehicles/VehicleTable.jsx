"use client";

export default function VehicleTable({
  vehicles = [],
  loading,
  onEdit,
  onDelete,
}) {

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/vehicles/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("Vehicle deleted successfully");
        if (onDelete) {
          onDelete();
        }
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
      
      {/* Table Header Controls */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="font-black text-slate-900 text-lg tracking-tight">
            Active Fleet Asset Directory
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Monitor active rental segments, registration numbers, seats, and commercial pricing tiers.
          </p>
        </div>
        <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full">
          Total Fleet: {vehicles.length}
        </span>
      </div>

      {/* Conditional Layout Engine */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 font-medium tracking-wide">
          Syncing active fleet inventory logs...
        </div>
      ) : vehicles.length === 0 ? (
        <div className="p-16 text-center text-slate-400 font-medium tracking-wide">
          No active vehicle assets logged in directory database.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[11px]">
                <th className="p-4 pl-6">Asset Token</th>
                <th className="p-4">Model Name</th>
                <th className="p-4">Plate Number</th>
                <th className="p-4">Segment / Type</th>
                <th className="p-4">Cap (Seats)</th>
                <th className="p-4">Pricing Matrix</th>
                <th className="p-4">Fleet Status</th>
                <th className="p-4 pr-6 text-right">Actions Matrix</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle._id}
                  className="hover:bg-slate-50/50 transition duration-150"
                >
                  <td className="p-4 pl-6 font-mono font-bold text-slate-900 text-xs">
                    {vehicle.vehicleId}
                  </td>

                  <td className="p-4 font-semibold text-slate-900">
                    {vehicle.vehicleName}
                  </td>

                  <td className="p-4 font-mono text-xs text-slate-600 uppercase">
                    {vehicle.vehicleNumber}
                  </td>

                  <td className="p-4 text-slate-500 text-xs font-semibold">
                    {vehicle.vehicleType || "—"}
                  </td>

                  <td className="p-4 text-slate-600 font-mono text-xs pl-6">
                    {vehicle.seats} Str
                  </td>

                  <td className="p-4 font-bold text-slate-900">
                    ₹{vehicle.ratePerKm}<span className="text-[10px] text-slate-400 font-medium">/KM</span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide inline-block ${
                        vehicle.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40"
                          : "bg-rose-50 text-rose-700 border border-rose-200/40"
                      }`}
                    >
                      {vehicle.status || "Active"}
                    </span>
                  </td>

                  <td className="p-4 pr-6 text-right space-x-2">

                    <a
                    href={`/admin/vehicles/${vehicle._id}`}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold transition duration-150 inline-block"
                    >
                    View
                    </a>

                    <button
                      onClick={() => onEdit(vehicle)}
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold transition duration-150"
                    >
                      Configure
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-bold transition duration-150"
                    >
                      Purge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}