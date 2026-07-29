"use client";

import { useEffect, useState } from "react";

export default function DriverForm({ onSuccess, editingDriver, onCancel }) {
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    name: "",
    mobile: "",
    email: "",
    address: "",
    licenseNumber: "",
    vehicleAssigned: "",
    status: "Active",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingDriver) {
      setForm({
        name: editingDriver.name || "",
        mobile: editingDriver.mobile || "",
        email: editingDriver.email || "",
        address: editingDriver.address || "",
        licenseNumber: editingDriver.licenseNumber || "",
        vehicleAssigned: editingDriver.vehicleAssigned || "",
        status: editingDriver.status || "Active",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingDriver]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.mobile) {
      alert("Driver name and mobile are required");
      return;
    }

    try {
      setLoading(true);
      let url = "/api/admin/drivers";
      let method = "POST";

      if (editingDriver) {
        url = `/api/admin/drivers/${editingDriver._id}`;
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

      alert(editingDriver ? "Driver updated successfully" : "Driver added successfully");
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
            {editingDriver ? "📝 Edit Driver Registry" : "👤 Onboard New Driver"}
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Log operator metadata, contact lines, and active licenses.
          </p>
        </div>

        {editingDriver && (
          <button
            type="button"
            onClick={onCancel}
            className="text-rose-600 hover:text-rose-700 font-bold text-xs bg-rose-50 px-3 py-1.5 rounded-xl transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Inputs Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Driver Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., Ramesh Kumar"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Mobile Contact Line</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="e.g., 9876543210"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Email Coordinates</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g., ramesh@example.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Commercial License ID</label>
          <input
            type="text"
            name="licenseNumber"
            value={form.licenseNumber}
            onChange={handleChange}
            placeholder="e.g., MH31A20260012"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Vehicle Asset Allocation</label>
          <input
            type="text"
            name="vehicleAssigned"
            value={form.vehicleAssigned}
            onChange={handleChange}
            placeholder="e.g., Maruti Ertiga (MH31XX1234)"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Duty Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none bg-white focus:border-indigo-500 transition"
          >
            <option value="Active">Active / On Duty</option>
            <option value="Inactive">Inactive / Suspended</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Permanent Address Coordinates</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter complete residential address logs..."
            rows="3"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition resize-none"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-indigo-650 disabled:bg-slate-300 text-white p-3.5 rounded-xl font-bold transition shadow-sm text-sm tracking-wide md:col-span-2 mt-2"
        >
          {loading ? "Syncing Logs Pipeline..." : editingDriver ? "Update Driver Record" : "Confirm Onboard Authorization"}
        </button>

      </form>
    </div>
  );
}