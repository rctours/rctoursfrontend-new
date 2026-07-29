"use client";

import { useEffect, useState } from "react";

export default function VehicleForm({ onSuccess, editingVehicle, onCancel }) {
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    vehicleName: "",
    vehicleType: "",
    vehicleNumber: "",
    seats: "",
    ratePerKm: "",
    status: "Active",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingVehicle) {
      setForm({
        vehicleName: editingVehicle.vehicleName || "",
        vehicleType: editingVehicle.vehicleType || "",
        vehicleNumber: editingVehicle.vehicleNumber || "",
        seats: editingVehicle.seats || "",
        ratePerKm: editingVehicle.ratePerKm || "",
        status: editingVehicle.status || "Active",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingVehicle]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.vehicleName || !form.vehicleNumber || !form.ratePerKm) {
      alert("Vehicle name, number and rate are required");
      return;
    }

    try {
      setLoading(true);
      let url = "/api/admin/vehicles";
      let method = "POST";

      if (editingVehicle) {
        url = `/api/admin/vehicles/${editingVehicle._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Operation failed");
        return;
      }

      alert(editingVehicle ? "Vehicle updated successfully" : "Vehicle added successfully");
      setForm(emptyForm);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm max-w-4xl mx-auto">
      
      {/* Form Header */}
      <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {editingVehicle ? "📝 Edit Fleet Asset" : "🚗 Register New Vehicle Asset"}
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Log vehicle commercial specifications, registration numbers, and per-km pricing tiers.
          </p>
        </div>

        {editingVehicle && (
          <button
            type="button"
            onClick={onCancel}
            className="text-rose-600 hover:text-rose-700 font-bold text-xs bg-rose-50 px-3 py-1.5 rounded-xl transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Form Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Vehicle Model Name</label>
          <input
            type="text"
            name="vehicleName"
            value={form.vehicleName}
            onChange={handleChange}
            placeholder="e.g., Toyota Innova Crysta"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Vehicle Type / Segment</label>
          <input
            type="text"
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            placeholder="e.g., Premium SUV / Sedan"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Commercial Registration Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={form.vehicleNumber}
            onChange={handleChange}
            placeholder="e.g., MH31XX1234"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Seating Capacity</label>
          <input
            type="number"
            name="seats"
            value={form.seats}
            onChange={handleChange}
            placeholder="e.g., 7"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Taxi Rate Matrix (₹ Per KM)</label>
          <input
            type="number"
            name="ratePerKm"
            value={form.ratePerKm}
            onChange={handleChange}
            placeholder="e.g., 14"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-bold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Asset Operations State</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none bg-white focus:border-indigo-500 transition"
          >
            <option value="Active">Active / Available</option>
            <option value="Inactive">Inactive / Maintenance</option>
          </select>
        </div>

        <button
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-indigo-650 disabled:bg-slate-300 text-white p-3.5 rounded-xl font-bold transition shadow-sm text-sm tracking-wide md:col-span-2 mt-2"
        >
          {loading ? "Syncing Fleet Logs..." : editingVehicle ? "Update Fleet Asset Record" : "Confirm Fleet Authorization"}
        </button>

      </form>
    </div>
  );
}