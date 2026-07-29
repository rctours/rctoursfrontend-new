"use client";

export default function DriverTable({
  drivers = [],
  loading,
  onEdit,
  onDelete,
}) {

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/drivers/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("Driver deleted successfully");
        if (onDelete) {
          onDelete();
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  return (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
      
      {/* Table Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="font-black text-slate-900 text-lg tracking-tight">
            Active Driver Registry
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Monitor verified operators, assigned vehicle assets, and licensing states.
          </p>
        </div>
        <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full">
          Total: {drivers.length}
        </span>
      </div>

      {/* Conditonal Rendering */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 font-medium tracking-wide">
          Syncing operator logs...
        </div>
      ) : drivers.length === 0 ? (
        <div className="p-16 text-center text-slate-400 font-medium tracking-wide">
          No registered drivers found in the payload pipeline.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[11px]">
                <th className="p-4 pl-6">Operator ID</th>
                <th className="p-4">Driver Name</th>
                <th className="p-4">Contact Line</th>
                <th className="p-4">License Reference</th>
                <th className="p-4">Allocated Asset</th>
                <th className="p-4">Duty State</th>
                <th className="p-4 pr-6 text-right">Actions Matrix</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
              {drivers.map((driver) => (
                <tr
                  key={driver._id}
                  className="hover:bg-slate-50/50 transition duration-150"
                >
                  <td className="p-4 pl-6 font-mono font-bold text-slate-900 text-xs">
                    {driver.driverId}
                  </td>
                  
                  <td className="p-4 font-semibold text-slate-900">
                    {driver.name}
                  </td>
                  
                  <td className="p-4 text-slate-500 font-mono text-xs">
                    {driver.mobile}
                  </td>
                  
                  <td className="p-4 font-mono text-xs text-slate-600">
                    {driver.licenseNumber || "—"}
                  </td>
                  
                  <td className="p-4 text-slate-600 font-semibold">
                    {driver.vehicleAssigned || "—"}
                  </td>
                  
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide inline-block ${
                        driver.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40"
                          : "bg-rose-50 text-rose-700 border border-rose-200/40"
                      }`}
                    >
                      {driver.status || "Active"}
                    </span>
                  </td>

                  <td className="p-4 pr-6 text-right space-x-2">

                <a
                href={`/admin/drivers/${driver._id}`}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold transition duration-150 inline-block"
                >
                View
                </a>

                <button
                onClick={() => onEdit(driver)}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold transition duration-150"
                >
                Configure
                </button>

                <button
                onClick={() => handleDelete(driver._id)}
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